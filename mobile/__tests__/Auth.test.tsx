import React from 'react';
import { renderHook, act } from '@testing-library/react-native';
import { AuthProvider, useAuth } from '../src/state/Auth';

function wrapper({ children }: any) {
  return <AuthProvider>{children}</AuthProvider>;
}

it('persists onboarding flag', async () => {
  const { result } = renderHook(() => useAuth(), { wrapper });
  await act(async () => {
    await result.current.completeOnboarding();
  });
  expect(result.current.isOnboarded).toBe(true);
});
