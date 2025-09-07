import React from 'react';
import { renderHook, act } from '@testing-library/react-native';
import { AppStateProvider, useAppState } from '../src/state/AppState';

function wrapper({ children }: any) {
  return <AppStateProvider>{children}</AppStateProvider>;
}

it('checkIn and checkOut create visit events', () => {
  const { result } = renderHook(() => useAppState(), { wrapper });
  const host = 'house-1';
  const kid = 'kid-1';
  const friend = 'friend-1';

  act(() => result.current.checkIn(host, kid, friend));
  act(() => result.current.checkOut(host, kid, friend));

  expect(result.current.visits.length).toBe(2);
  expect(result.current.visits[0].type).toBe('checkin');
  expect(result.current.visits[1].type).toBe('checkout');
});
