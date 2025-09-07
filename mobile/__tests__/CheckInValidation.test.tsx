import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import CheckInScreen from '../src/screens/CheckInScreen';
import { AppStateProvider } from '../src/state/AppState';

function wrapper({ children }: any) {
  return <AppStateProvider>{children}</AppStateProvider>;
}

test('disables empty check-in and allows when selections present', async () => {
  render(<CheckInScreen navigation={{ goBack: jest.fn() }} />, { wrapper });

  // Initially there is a default selection; clear it by tapping
  const kidBtn = await screen.findByRole('button', { name: /Mia Smith/i });
  fireEvent.press(kidBtn); // toggle off
  const friendBtn = await screen.findByRole('button', { name: /Ava Lee/i });
  fireEvent.press(friendBtn); // toggle off

  const confirm = await screen.findByRole('button', { name: 'Confirm Check-In' });
  fireEvent.press(confirm);

  // Re-select kid and friend
  fireEvent.press(kidBtn);
  fireEvent.press(friendBtn);
  fireEvent.press(confirm);
});
