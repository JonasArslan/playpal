import React from 'react';
import { View, Text, Button, StyleSheet, TextInput, ScrollView } from 'react-native';
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
        <Button
          key={k.id}
          title={`${selectedKids.includes(k.id) ? '✓ ' : ''}${k.name}`}
          onPress={() => setSelectedKids(prev => toggle(prev, k.id))}
        />
      ))}

      <Text style={styles.section}>Select Friend(s)</Text>
      {friends.map(f => (
        <Button
          key={f.id}
          title={`${selectedFriends.includes(f.id) ? '✓ ' : ''}${f.name}`}
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
      <Button
        title="Confirm Check-In"
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
