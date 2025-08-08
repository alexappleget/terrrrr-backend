import { Request } from "express";

export interface IAuthPayload {
  id: string;
}

export interface IAuthenticatedRequest extends Request {
  user?: IAuthPayload;
}

export interface IBoss {
  id?: string;
  name: string;
  health: string;
  stage: string;
  worldProgress?: IWorldBossProgress[];
}

export interface IUserUpdates {
  username?: string;
  password?: string;
  salt?: string;
}

export interface IUser {
  id?: string;
  username: string;
  password: string;
  salt: string;
  memberships: IWorldMembership[];
  events?: IEvent[];
  RSVPs?: IEventRSVP[];
  notes?: INote[];
}

export interface IEvent {
  id: string;
  name: string;
  description?: string;
  scheduledAt: Date;
  worldId: string;
  createdById: string;
  RSVPs: IEventRSVP[];
}

export interface IEventRSVP {
  id: string;
  userId: string;
  eventId: string;
}

export interface INote {
  id: string;
  content: string;
  authorId: string;
  worldId: string;
  createdAt: Date;
}

export interface IWorldBossProgress {
  id: string;
  bossId: string;
  worldId: string;
}

export interface IWorldMembership {
  id: string;
  userId: string;
  worldId: string;
  role: string;
}
