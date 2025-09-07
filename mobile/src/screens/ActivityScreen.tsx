import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useAppState } from '../state/AppState';

export default function ActivityScreen() {
  const { visits, kids, friends } = useAppState();

  const rows = useMemo(() => {
    return visits
      .slice()
      .sort((a, b) => b.timestamp - a.timestamp)
      .map(v => {
        const kid = kids.find(k => k.id === v.kidId)?.name ?? 'Kid';
        const friend = friends.find(f => f.id === v.friendId)?.name ?? 'Friend';
        const when = new Date(v.timestamp).toLocaleTimeString();
        const action = v.type === 'checkin' ? 'arrived' : 'left';
        return { id: v.id, text: `${friend} ${action} to visit ${kid} at ${when}` };
      });
  }, [visits, kids, friends]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activity</Text>
      <FlatList
        data={rows}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Text style={styles.item}>{item.text}</Text>}
        ListEmptyComponent={<Text style={styles.empty}>No activity yet.</Text>}
        contentContainerStyle={rows.length === 0 ? styles.emptyContainer : undefined}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 12, textAlign: 'center' },
  item: { paddingVertical: 10, fontSize: 16 },
  empty: { textAlign: 'center', color: '#666' },
  emptyContainer: { flex: 1, justifyContent: 'center' },
});
