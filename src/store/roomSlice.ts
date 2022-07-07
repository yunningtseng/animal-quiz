import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import firestoreApi from '../api/firestore';
import { Room } from '../types/room';
import type { AppThunk } from './store';

export interface RoomState {
  room: Room;
}

const initialState: RoomState = {
  room: {} as Room,
};

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setRoom: (state: RoomState, action: PayloadAction<Room>) => {
      state.room = action.payload;
    },
    // startRoom: (state: RoomState, action: PayloadAction<string>) => {
    //   state.room.status = action.payload;
    // },
  },
});

export const { setRoom } = roomSlice.actions;

export const createRoom = (): AppThunk => async (dispatch, getState) => {
  // * 將 host 資料傳進 room 的初始資料中
  const userId = getState().auth.user.id;
  const room = await firestoreApi.setRoom(userId);
  dispatch(setRoom(room));
  // - 監聽 firestore
  // * 當新的 room 進來的時候，會執行匿名 function
  // * 如有其他 user 加入
  firestoreApi.listenRoom('1234', (newRoom) => {
    // - 有變化時 setRoom
    dispatch(setRoom(newRoom));
  });
};
export const enterRoom = (): AppThunk => (dispatch, getState) => {
  const userId = getState().auth.user.id;
  firestoreApi.addUserIdToRoom('1234', userId);
  firestoreApi.listenRoom('1234', (newRoom) => {
    dispatch(setRoom(newRoom));
  });
};
// TODO
export const startRoom = (): AppThunk => (dispatch) => {
  firestoreApi.listenRoom('1234', (newRoom) => {
    dispatch(setRoom(newRoom));
  });
  firestoreApi.startRoom('1234');
};
export default roomSlice;
