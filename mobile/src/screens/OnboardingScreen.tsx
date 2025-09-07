import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '../state/Auth';

export default function OnboardingScreen({ navigation }: any) {
  const { completeOnboarding } = useAuth();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to PlayPal</Text>
      <Text style={styles.subtitle}>Create your household to get started.</Text>
      <Button
        title="Continue"
        onPress={async () => {
          await completeOnboarding();
          navigation.replace('HomeTabs');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 24, fontWeight: '600', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 24, textAlign: 'center' },
});
