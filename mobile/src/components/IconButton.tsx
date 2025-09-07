import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, GestureResponderEvent } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  icon: string;
  label: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: any;
  disabled?: boolean;
  testID?: string;
};

export default function IconButton({ icon, label, onPress, style, disabled, testID }: Props) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={label}
      style={[styles.button, disabled && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled}
      testID={testID}
    >
      <View style={styles.row}>
        <Icon name={icon} size={18} color={disabled ? '#999' : '#fff'} />
        <Text style={styles.label}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2f80ed',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
  },
  disabled: {
    backgroundColor: '#cbd5e1',
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  label: { color: '#fff', fontWeight: '600', marginLeft: 8 },
});


