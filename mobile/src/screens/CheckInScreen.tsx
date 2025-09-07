import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAppState } from '../state/AppState';

export default function CheckInScreen({ navigation }: any) {
  const { kids, friends, households, checkIn } = useAppState();
  const host = households[0]?.id ?? 'host-1';
  const kid = kids[0]?.id ?? 'kid-1';
  const friend = friends[0]?.id ?? 'friend-1';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Check-In</Text>
      <Text>Stub: using first kid/friend if available.</Text>
      <Button
        title="Confirm"
        onPress={() => {
          checkIn(host, kid, friend);
          navigation.goBack();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 12 },
});
