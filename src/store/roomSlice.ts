import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import firestoreApi from '../api/firestore';
import { Room } from '../types/room';
import { User } from '../types/user';
import type { AppThunk } from './store';

export interface RoomState {
  room: Room;
  enterStatus: string;
}

const initialState: RoomState = {
  room: {} as Room,
  enterStatus: 'initial',
};

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setRoom: (state: RoomState, action: PayloadAction<Room>) => {
      state.room = action.payload;
    },

    setCanEnter: (state: RoomState, action: PayloadAction<string>) => {
      state.enterStatus = action.payload;
    },
    clearState: () => initialState,
  },
});

export const { setRoom, setCanEnter, clearState } = roomSlice.actions;

export const createRoom = (user: User): AppThunk => async (dispatch, getState) => {
  const room = await firestoreApi.addRoom(user.id, user.name);

  dispatch(setRoom(room));

  const docId = await firestoreApi.listenRoom(room.pin, (newRoom) => {
    dispatch(setRoom(newRoom));
  });
};

export const enterRoom = (pin: string, user: User): AppThunk => async (dispatch, getState) => {
  const docId = await firestoreApi.listenRoom(pin, (newRoom) => {
    dispatch(setRoom(newRoom));
  });

  if (docId) {
    firestoreApi.addUserIdToRoom(pin, user.id, user.name ?? '匿名');
    dispatch(setCanEnter('success'));
  } else {
    dispatch(setCanEnter('error'));
  }
};

export const startRoom = (): AppThunk => (dispatch, getState) => {
  const roomId = getState().room.room.id;
  firestoreApi.startRoom(roomId);
};

export const endRoom = (): AppThunk => (dispatch, getState) => {
  const roomId = getState().room.room.id;
  firestoreApi.endRoom(roomId);
  dispatch(clearState());
};
export default roomSlice;
