import fs from 'fs/promises';
import path from 'path';
import { User } from '../../domain/entities/User';
import { loadEnvConfig } from '../../config/env';

const env = loadEnvConfig();
const filePath = path.resolve(__dirname, '../data/', env.DATA_USERS);

export const UserRepository = {
    async readUsers(): Promise<User[]> {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data) as User[];
    },

    async writeUsers(users: User[]): Promise<void> {
        await fs.writeFile(filePath, JSON.stringify(users), 'utf-8');
    },

    async getUserById(userId: string): Promise<User | undefined> {
        const users = await this.readUsers();
        return users.find(u => u.id === userId);
    },

    filterSensitiveInfo(user: User): User {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
};
