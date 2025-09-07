import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function InviteScreen() {
  const invitePayload = JSON.stringify({ v: 1, type: 'friend_invite', code: 'PP-' + Date.now() });
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Invite a Parent</Text>
      <Text style={styles.subtitle}>Share this QR so the other parent can link.</Text>
      <View style={{ marginTop: 16 }}>
        <QRCode value={invitePayload} size={200} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 8 },
  subtitle: { color: '#666' },
});
