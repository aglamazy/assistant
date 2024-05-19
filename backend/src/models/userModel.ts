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
}

// Function to find a user by email
export const findUserByEmail = async (email: string): Promise<IUser | undefined> => {
    return db<IUser>('users').where({ email }).first();
};

// Function to create a new user
export const createUser = async (user: Partial<IUser>): Promise<IUser> => {
    const [newUser] = await db<IUser>('users').insert(user).returning('*');
    return newUser;
};

// Function to update user status
export const updateUserStatus = async (userId: number, status: UserStatus): Promise<void> => {
    await db<IUser>('users').where({ id: userId }).update({ status });
};
