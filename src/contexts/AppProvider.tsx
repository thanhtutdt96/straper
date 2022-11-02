import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { useAuth } from 'contexts/AuthProvider';
import useFirestore from 'hooks/useFirestore';
import { AppContext, Room } from 'types/App';
import { User } from 'types/Auth';
import { CollectionCondition, CollectionName } from 'types/Firestore';

const appContext = createContext<AppContext>({
  rooms: [],
  roomMembers: [],
  selectedRoomId: '',
  selectedRoom: undefined,
  isAddRoomModalVisible: false,
  isInviteMemberModalVisible: false,
});

export default function AppProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [isAddRoomModalVisible, setIsAddRoomModalVisible] = useState(false);
  const [isInviteMemberModalVisible, setIsInviteMemberModalVisible] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState('');

  const roomConditions = useMemo<CollectionCondition>(() => {
    return {
      fieldName: 'members',
      operator: 'array-contains',
      compareValue: user?.uid || '',
    };
  }, [user?.uid]);

  const { documents: rooms } = useFirestore<Room>(CollectionName.ROOMS, roomConditions);

  const selectedRoom = useMemo(
    () => rooms.find((room) => room.id === selectedRoomId),
    [rooms, selectedRoomId],
  );

  const roomUsersConditions = useMemo<CollectionCondition>(() => {
    return {
      fieldName: 'uid',
      operator: 'in',
      compareValue: selectedRoom?.members || [],
    };
  }, [selectedRoom?.members]);

  const { documents: roomMembers } = useFirestore<User>(CollectionName.USERS, roomUsersConditions);

  return (
    <appContext.Provider
      value={{
        rooms,
        roomMembers,
        selectedRoom,
        selectedRoomId,
        isAddRoomModalVisible,
        isInviteMemberModalVisible,
        setSelectedRoomId,
        setIsAddRoomModalVisible,
        setIsInviteMemberModalVisible,
      }}
    >
      {children}
    </appContext.Provider>
  );
}

export function useApp() {
  return useContext(appContext);
}
