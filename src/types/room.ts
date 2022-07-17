export interface Room {
  id: string;
  pin: string;
  status: string;
  hostId: string;
  userMap: { [key: string]: string };
}
