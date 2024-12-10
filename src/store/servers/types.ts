export interface ServersState {
  data: GameServer[];
  loading: boolean;
}
export interface GameServer {
  title: string;
  ip: string;
  port?: string;
  type: string;
  playersNow: number;
}
