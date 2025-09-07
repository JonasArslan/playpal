export type UUID = string;

export type ParentContact = {
  id: UUID;
  name: string;
  phone?: string;
  email?: string;
};

export type Kid = {
  id: UUID;
  name: string;
};

export type Friend = {
  id: UUID;
  name: string;
  parentId?: UUID;
  lastKnownLocation?: { latitude: number; longitude: number; timestamp: number };
};

export type Household = {
  id: UUID;
  name: string;
  address: string;
  guardians: ParentContact[];
  kids: Kid[];
  location?: { latitude: number; longitude: number };
};

export type VisitEvent = {
  id: UUID;
  timestamp: number;
  type: 'checkin' | 'checkout';
  hostHouseholdId: UUID;
  kidId: UUID;
  friendId: UUID;
};
