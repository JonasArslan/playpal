import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Alert } from 'react-native';
import IconButton from '../components/IconButton';
import { useAppState } from '../state/AppState';
import { haversineDistanceMeters } from '../utils/geo';

export default function CheckInScreen({ navigation }: any) {
  const { kids, friends, households, checkIn } = useAppState();
  const host = households[0]?.id ?? 'host-1';
  const hostHouse = households.find(h => h.id === host);
  const [selectedKids, setSelectedKids] = React.useState<string[]>(kids.slice(0, 1).map(k => k.id));
  const [selectedFriends, setSelectedFriends] = React.useState<string[]>(friends.slice(0, 1).map(f => f.id));
  const [note, setNote] = React.useState('');
  const [expectedPickupAt, setExpectedPickupAt] = React.useState<string>('');
  const [currentLocation, setCurrentLocation] = React.useState<{ latitude: number; longitude: number } | null>(null);

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

      <Text style={styles.section}>Expected Pickup (HH:mm)</Text>
      <TextInput
        placeholder="e.g., 18:00"
        value={expectedPickupAt}
        onChangeText={setExpectedPickupAt}
        style={styles.input}
        keyboardType="numeric"
      />

      <View style={{ height: 12 }} />
      <IconButton
        icon="checkmark"
        label="Confirm Check-In"
        onPress={() => {
          if (selectedKids.length === 0 || selectedFriends.length === 0) {
            Alert.alert('Selection required', 'Please select at least one kid and one friend.');
            return;
          }
          const verified = (() => {
            if (!hostHouse?.location || !hostHouse?.geofenceRadiusM || !currentLocation) return undefined;
            const d = haversineDistanceMeters(currentLocation, hostHouse.location);
            return d <= hostHouse.geofenceRadiusM;
          })();
          const exp = (() => {
            if (!expectedPickupAt) return undefined;
            const now = new Date();
            const [hh, mm] = expectedPickupAt.split(':').map(Number);
            if (Number.isFinite(hh) && Number.isFinite(mm)) {
              const dt = new Date(now);
              dt.setHours(hh, mm, 0, 0);
              if (dt.getTime() < now.getTime()) dt.setDate(dt.getDate() + 1);
              return dt.getTime();
            }
            return undefined;
          })();

          selectedKids.forEach(k => selectedFriends.forEach(f => checkIn(host, k, f, { verified, expectedPickupAt: exp, note })));
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
