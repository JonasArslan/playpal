import React from 'react';
import { render, screen } from '@testing-library/react-native';
import HomeScreen from '../src/screens/HomeScreen';
import { AppStateProvider } from '../src/state/AppState';

function wrapper({ children }: any) {
  return <AppStateProvider>{children}</AppStateProvider>;
}

it('renders map with testID and a Quick Check-In button', async () => {
  render(<HomeScreen navigation={{ navigate: jest.fn() }} />, { wrapper });
  expect(await screen.findByTestId('home-map')).toBeTruthy();
  expect(await screen.findByText('Quick Check-In')).toBeTruthy();
});
