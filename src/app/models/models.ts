export interface Session {
  id: number;
  title: string;
  speaker: string;
  speakerId: number;
  abstract: string;
  timeStart: string;
  timeEnd: string;
  room: string;
  roomId: number;
}

export interface SessionGroup {
  timeStart: string;
  sessions: Session[];
}

export interface Speaker {
  id: number;
  name: string;
  company: string;
  blog: string;
  github: string;
  twitter: string;
  bio: string;
  imgUrl: string;
}
