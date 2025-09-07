import {jest} from '@jest/globals';

jest.mock('react-native-geolocation-service', () => ({
  requestAuthorization: jest.fn(async () => 'granted'),
  getCurrentPosition: jest.fn((success) => success?.({ coords: { latitude: 1, longitude: 2 } })),
  watchPosition: jest.fn((success) => {
    // Immediately invoke success once in tests
    success?.({ coords: { latitude: 1, longitude: 2 } });
    return 1;
  }),
  clearWatch: jest.fn(),
}));

jest.mock('react-native-maps', () => {
  const React = require('react');
  const { View } = require('react-native');
  const Mock = (props) => React.createElement(View, props);
  Mock.Marker = (props) => React.createElement(View, props);
  return Mock;
});

jest.mock('react-native-vector-icons/Ionicons', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return ({ name, color, size }) => React.createElement(Text, {}, name || 'icon');
});

jest.mock('@react-native-community/push-notification-ios', () => ({
  getDeviceToken: jest.fn(async () => 'test-token'),
  addNotificationRequest: jest.fn(),
}));

jest.mock('react-native-permissions', () => ({
  RESULTS: { GRANTED: 'granted', LIMITED: 'limited' },
  request: jest.fn(async () => 'granted'),
  check: jest.fn(async () => 'granted'),
  PERMISSIONS: { IOS: { NOTIFICATIONS: 'NOTIFICATIONS' } },
}));

jest.mock('react-native-qrcode-svg', () => {
  const React = require('react');
  const { View } = require('react-native');
  return (props) => React.createElement(View, props);
});

jest.mock('@react-native-async-storage/async-storage', () => require('@react-native-async-storage/async-storage/jest/async-storage-mock'));
