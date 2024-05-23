import {db} from "./database";

export enum UserStatus {
    Pending = "pending",
    Active = "active"
}

export interface IUser {
    id?: number;
    name: string;
    email: string;
    hash: string;
    status: UserStatus;
    last_registration_email: Date;
}

export const findUserByEmail = async (email: string): Promise<IUser | undefined> => {
    return db<IUser>('users').where({ email }).first();
};

export const updateUser = async(user: IUser): Promise<IUser> => {
    return db<IUser>('users').where('id', user.id).update(user);
}

export const createUser = async (user: Partial<IUser>): Promise<IUser> => {
    const [newUser] = await db<IUser>('users').insert(user).returning('*');
    return newUser;
};
