import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList } from 'react-native';
import { useAppState } from '../state/AppState';

export default function FriendsScreen() {
  const { parents, friends, addParent, addFriend } = useAppState();
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [friendName, setFriendName] = useState('');
  const [friendParentId, setFriendParentId] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Friends & Parents</Text>

      <Text style={styles.section}>Add Parent</Text>
      <TextInput
        placeholder="Parent name"
        value={parentName}
        onChangeText={setParentName}
        style={styles.input}
      />
      <TextInput
        placeholder="Phone (optional)"
        value={parentPhone}
        onChangeText={setParentPhone}
        style={styles.input}
      />
      <Button
        title="Add Parent"
        onPress={() => {
          if (parentName.trim()) {
            addParent({ id: '', name: parentName.trim(), phone: parentPhone.trim() || undefined });
            setParentName('');
            setParentPhone('');
          }
        }}
      />

      <Text style={styles.section}>Add Friend</Text>
      <TextInput
        placeholder="Friend name"
        value={friendName}
        onChangeText={setFriendName}
        style={styles.input}
      />
      <TextInput
        placeholder="Parent ID (optional)"
        value={friendParentId}
        onChangeText={setFriendParentId}
        style={styles.input}
      />
      <Button
        title="Add Friend"
        onPress={() => {
          if (friendName.trim()) {
            addFriend({ id: '', name: friendName.trim(), parentId: friendParentId.trim() || undefined });
            setFriendName('');
            setFriendParentId('');
          }
        }}
      />

      <Text style={styles.section}>Parents</Text>
      <FlatList
        data={parents}
        keyExtractor={p => p.id}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.name}{item.phone ? ` · ${item.phone}` : ''} (id: {item.id})</Text>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No parents yet.</Text>}
      />

      <Text style={styles.section}>Friends</Text>
      <FlatList
        data={friends}
        keyExtractor={f => f.id}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.name}{item.parentId ? ` · parent: ${item.parentId}` : ''} (id: {item.id})</Text>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No friends yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 12, textAlign: 'center' },
  section: { marginTop: 16, fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10, marginTop: 8, marginBottom: 8 },
  item: { paddingVertical: 8 },
  empty: { color: '#666', paddingVertical: 8 },
});
