import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import firestoreApi from '../api/firestore';
import { Room } from '../types/room';
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
    // * 輸入 pin 後判斷是否可以進入 waiting
    setCanEnter: (state: RoomState, action: PayloadAction<string>) => {
      state.enterStatus = action.payload;
    },
    clearState: () => initialState,
  },
});

export const { setRoom, setCanEnter, clearState } = roomSlice.actions;

export const createRoom = (): AppThunk => async (dispatch, getState) => {
  // * 將 host 資料傳進 room 的初始資料中
  const userId = getState().auth.user.id;
  const userName = getState().auth.user.name;
  const room = await firestoreApi.addRoom(userId, userName);

  dispatch(setRoom(room));
  // - 監聽 firestore
  // * 當新的 room 進來的時候，會執行匿名 function
  // * 譬如當有其他 user 加入
  const docId = await firestoreApi.listenRoom(room.pin, (newRoom) => {
    // - 有變化時 setRoom
    dispatch(setRoom(newRoom));
  });
};

export const enterRoom = (pin: string): AppThunk => async (dispatch, getState) => {
  const userId = getState().auth.user.id;
  const userName = getState().auth.user.name;
  // * 監聽特定 pin 的 room，並回傳 docId 即為 roomId
  const docId = await firestoreApi.listenRoom(pin, (newRoom) => {
    dispatch(setRoom(newRoom));
  });

  if (docId) {
    firestoreApi.addUserIdToRoom(pin, userId, userName ?? '匿名');
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
