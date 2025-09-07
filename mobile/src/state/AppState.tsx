import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Household, Kid, Friend, ParentContact, VisitEvent, UUID } from '../types/models';

export type AppStateValue = {
  households: Household[];
  parents: ParentContact[];
  friends: Friend[];
  kids: Kid[];
  visits: VisitEvent[];
  checkIn: (hostHouseholdId: UUID, kidId: UUID, friendId: UUID) => void;
  checkOut: (hostHouseholdId: UUID, kidId: UUID, friendId: UUID) => void;
  addParent: (parent: ParentContact) => void;
  addFriend: (friend: Friend) => void;
};

const AppStateContext = createContext<AppStateValue | undefined>(undefined);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  // Demo seed data
  const [households, setHouseholds] = useState<Household[]>([
    {
      id: 'house-1',
      name: 'Smith Household',
      address: '123 Maple St',
      guardians: [
        { id: 'parent-1', name: 'Alex Smith', phone: '+1-555-0101' },
        { id: 'parent-2', name: 'Jamie Smith', phone: '+1-555-0102' },
      ],
      kids: [
        { id: 'kid-1', name: 'Mia Smith' },
        { id: 'kid-2', name: 'Noah Smith' },
      ],
    },
  ]);
  const [parents, setParents] = useState<ParentContact[]>([
    { id: 'parent-3', name: 'Taylor Lee', phone: '+1-555-0201' },
  ]);
  const [friends, setFriends] = useState<Friend[]>([
    { id: 'friend-1', name: 'Ava Lee', parentId: 'parent-3' },
  ]);
  const [kids, setKids] = useState<Kid[]>([
    { id: 'kid-1', name: 'Mia Smith' },
    { id: 'kid-2', name: 'Noah Smith' },
  ]);
  const [visits, setVisits] = useState<VisitEvent[]>([]);

  const checkIn = (hostHouseholdId: UUID, kidId: UUID, friendId: UUID) => {
    setVisits(prev => [
      ...prev,
      { id: String(Date.now()), timestamp: Date.now(), type: 'checkin', hostHouseholdId, kidId, friendId },
    ]);
  };

  const checkOut = (hostHouseholdId: UUID, kidId: UUID, friendId: UUID) => {
    setVisits(prev => [
      ...prev,
      { id: String(Date.now()), timestamp: Date.now(), type: 'checkout', hostHouseholdId, kidId, friendId },
    ]);
  };

  const addParent = (parent: ParentContact) => {
    setParents(prev => [{ ...parent, id: parent.id || `parent-${Date.now()}` }, ...prev]);
  };

  const addFriend = (friend: Friend) => {
    setFriends(prev => [{ ...friend, id: friend.id || `friend-${Date.now()}` }, ...prev]);
  };

  const value = useMemo(
    () => ({ households, parents, friends, kids, visits, checkIn, checkOut, addParent, addFriend }),
    [households, parents, friends, kids, visits]
  );

  // Persistence
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem('playpal_state');
        if (raw) {
          const s = JSON.parse(raw);
          if (s.households) setHouseholds(s.households);
          if (s.parents) setParents(s.parents);
          if (s.friends) setFriends(s.friends);
          if (s.kids) setKids(s.kids);
          if (s.visits) setVisits(s.visits);
        }
      } catch {}
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const toSave = JSON.stringify({ households, parents, friends, kids, visits });
        await AsyncStorage.setItem('playpal_state', toSave);
      } catch {}
    })();
  }, [households, parents, friends, kids, visits]);

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider');
  return ctx;
}
