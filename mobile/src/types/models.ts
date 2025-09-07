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
};

export type Household = {
  id: UUID;
  name: string;
  address: string;
  guardians: ParentContact[];
  kids: Kid[];
};

export type VisitEvent = {
  id: UUID;
  timestamp: number;
  type: 'checkin' | 'checkout';
  hostHouseholdId: UUID;
  kidId: UUID;
  friendId: UUID;
};
