import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import IconButton from '../components/IconButton';
import { useAppState } from '../state/AppState';

export default function CheckInScreen({ navigation }: any) {
  const { kids, friends, households, checkIn } = useAppState();
  const host = households[0]?.id ?? 'host-1';
  const [selectedKids, setSelectedKids] = React.useState<string[]>(kids.slice(0, 1).map(k => k.id));
  const [selectedFriends, setSelectedFriends] = React.useState<string[]>(friends.slice(0, 1).map(f => f.id));
  const [note, setNote] = React.useState('');

  const toggle = (arr: string[], id: string) =>
    arr.includes(id) ? arr.filter(x => x !== id) : [...arr, id];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Check-In</Text>
      <Text style={styles.section}>Select Kid(s)</Text>
      {kids.map(k => (
        <IconButton
          icon={selectedKids.includes(k.id) ? 'person' : 'person-outline'}
          label={k.name}
          onPress={() => setSelectedKids(prev => toggle(prev, k.id))}
        />
      ))}

      <Text style={styles.section}>Select Friend(s)</Text>
      {friends.map(f => (
        <IconButton
          icon={selectedFriends.includes(f.id) ? 'people' : 'people-outline'}
          label={f.name}
          onPress={() => setSelectedFriends(prev => toggle(prev, f.id))}
        />
      ))}

      <Text style={styles.section}>Note</Text>
      <TextInput
        placeholder="Optional note (e.g., pickup by 6pm)"
        value={note}
        onChangeText={setNote}
        style={styles.input}
      />

      <View style={{ height: 12 }} />
      <IconButton
        icon="checkmark"
        label="Confirm Check-In"
        onPress={() => {
          selectedKids.forEach(k => selectedFriends.forEach(f => checkIn(host, k, f)));
          navigation.goBack();
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: 'stretch', justifyContent: 'flex-start', padding: 16 },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 12, textAlign: 'center' },
  section: { marginTop: 16, marginBottom: 8, fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10 },
});
