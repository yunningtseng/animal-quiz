export interface Room {
  id: string;
  pin: string;
  status: string;
  hostId: string;
  userIdList: string[];
  userNameList: string[];
}
