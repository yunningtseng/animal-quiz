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
  firestoreApi.listenRoom('1234', (newRoom: Room) => {
    // - 有變化時 setRoom
    dispatch(setRoom(newRoom));
  });
};
// TODO 輸入 pin 後監聽，同 32 行，加進 userIdList

export default roomSlice;
