import { WorldRole } from "@prisma/client";
import { Request } from "express";

export interface IAuthPayload {
  id: string;
}

export interface IAuthenticatedRequest extends Request {
  user?: IAuthPayload;
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
  events: IEvent[];
}

export interface IWorld {
  id?: string;
  name: string;
  ownerId: string;
  members?: IWorldMember[];
}

export interface IWorldMember {
  id?: string;
  worldId: string;
  userId: string;
  role: WorldRole;
}
