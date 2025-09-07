import { haversineDistanceMeters } from '../src/utils/geo';

test('haversine ~111km per degree lat', () => {
  const a = { latitude: 0, longitude: 0 };
  const b = { latitude: 1, longitude: 0 };
  const d = haversineDistanceMeters(a, b);
  expect(Math.round(d / 1000)).toBe(111);
});

