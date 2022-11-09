import { Dispatch, SetStateAction } from 'react';
import { User } from 'types/Auth';

export type Room = {
  id: string;
  name: string;
  description?: string;
  members: string[];
};

export type Timestamp = {
  nanoseconds?: number;
  seconds?: number;
};

export type MessageType = {
  text: string;
  uid: string;
  photoURL?: string;
  displayName: string;
  roomId: string;
  createdAt: Timestamp;
};

export type AppContext = {
  rooms: Room[];
  roomMembers: User[];
  selectedRoom?: Room;
  selectedRoomId: string;
  setIsAddRoomModalVisible?: Dispatch<SetStateAction<boolean>>;
  setIsInviteMemberModalVisible?: Dispatch<SetStateAction<boolean>>;
  setSelectedRoomId?: Dispatch<SetStateAction<string>>;
  isAddRoomModalVisible: boolean;
  isInviteMemberModalVisible: boolean;
};
