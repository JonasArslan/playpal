import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Button, StyleSheet, PermissionsAndroid, Platform, TouchableOpacity } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { useAppState } from '../state/AppState';

export default function HomeScreen({ navigation }: any) {
  const { friends } = useAppState();
  const [region, setRegion] = useState<Region | null>(null);
  const [hasLocation, setHasLocation] = useState(false);
  const mapRef = useRef<MapView | null>(null);
  const watchId = useRef<number | null>(null);

  useEffect(() => {
    const request = async () => {
      try {
        if (Platform.OS === 'ios') {
          const auth = await Geolocation.requestAuthorization('whenInUse');
          if (auth !== 'granted') {
            // Fallback to a default region so the map renders
            setRegion({ latitude: 37.7749, longitude: -122.4194, latitudeDelta: 0.2, longitudeDelta: 0.2 });
            return;
          }
        } else {
          const g = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
          if (g !== PermissionsAndroid.RESULTS.GRANTED) {
            setRegion({ latitude: 37.7749, longitude: -122.4194, latitudeDelta: 0.2, longitudeDelta: 0.2 });
            return;
          }
        }

        // Start watching position for better accuracy over time
        watchId.current = Geolocation.watchPosition(
          pos => {
            const { latitude, longitude } = pos.coords;
            const next = { latitude, longitude, latitudeDelta: 0.02, longitudeDelta: 0.02 };
            setRegion(prev => prev ?? next);
            setHasLocation(true);
          },
          () => {},
          { enableHighAccuracy: true, distanceFilter: 0, interval: 5000, fastestInterval: 2000, showsBackgroundLocationIndicator: false }
        );
      } catch {
        setRegion({ latitude: 37.7749, longitude: -122.4194, latitudeDelta: 0.2, longitudeDelta: 0.2 });
      }
    };
    request();
    return () => {
      if (watchId.current != null) {
        Geolocation.clearWatch(watchId.current);
        watchId.current = null;
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      {region && (
        <MapView
          ref={ref => (mapRef.current = ref)}
          style={styles.map}
          initialRegion={region}
          showsUserLocation={hasLocation}
        >
          {friends
            .filter(f => !!f.lastKnownLocation)
            .map(f => (
              <Marker
                key={f.id}
                coordinate={{
                  latitude: f.lastKnownLocation!.latitude,
                  longitude: f.lastKnownLocation!.longitude,
                }}
                title={f.name}
                description={new Date(f.lastKnownLocation!.timestamp).toLocaleTimeString()}
              />
            ))}
        </MapView>
      )}
      <View style={styles.actions}>
        <Button title="Quick Check-In" onPress={() => navigation.navigate('CheckIn')} />
        {hasLocation && (
          <TouchableOpacity
            accessibilityLabel="Recenter map"
            onPress={() => {
              if (mapRef.current && region) {
                mapRef.current.animateToRegion(region, 500);
              }
            }}
            style={styles.fab}
          >
            <Text style={styles.fabText}>◎</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 16 },
  map: { flex: 1, margin: 12, borderRadius: 12 },
  actions: { paddingHorizontal: 12, paddingBottom: 16 },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  fabText: { fontSize: 18 },
});
