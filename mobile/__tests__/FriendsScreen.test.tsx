import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import FriendsScreen from '../src/screens/FriendsScreen';
import { AppStateProvider } from '../src/state/AppState';

function wrapper({ children }: any) {
  return <AppStateProvider>{children}</AppStateProvider>;
}

it('adds a parent and friend via forms', async () => {
  render(<FriendsScreen />, { wrapper });
  const parentInput = await screen.findByPlaceholderText('Parent name');
  fireEvent.changeText(parentInput, 'Test Parent');
  const addParentBtn = await screen.findByRole('button', { name: 'Add Parent' });
  fireEvent.press(addParentBtn);
  await waitFor(async () => expect(await screen.findByText(/Test Parent/)).toBeTruthy());

  const friendInput = await screen.findByPlaceholderText('Friend name');
  fireEvent.changeText(friendInput, 'Test Friend');
  const addFriendBtn = await screen.findByRole('button', { name: 'Add Friend' });
  fireEvent.press(addFriendBtn);
  await waitFor(async () => expect(await screen.findByText(/Test Friend/)).toBeTruthy());
});
