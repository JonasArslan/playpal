import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { initNotifications, scheduleLocalNotification } from '../services/notifications';

export default function SettingsScreen() {
  const [notifState, setNotifState] = useState<{ granted: boolean; token: string | null } | null>(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text>Household, privacy, and notifications.</Text>
      <View style={{ height: 16 }} />
      <Button
        title="Enable Notifications"
        onPress={async () => {
          const res = await initNotifications();
          setNotifState(res);
        }}
      />
      {notifState && (
        <View style={{ marginTop: 12 }}>
          <Text>Permission: {notifState.granted ? 'Granted' : 'Denied'}</Text>
          <Text numberOfLines={1}>APNs Token: {notifState.token ?? '—'}</Text>
        </View>
      )}
      <View style={{ height: 8 }} />
      <Button
        title="Send Local Test Notification"
        onPress={() => scheduleLocalNotification('PlayPal Test', 'This is a local notification.')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 12 },
});
