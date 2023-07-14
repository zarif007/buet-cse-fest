export interface UserInterface {
    name: string;
    email: string;
    role: 'general' | 'admin' | 'superadmin';
    createdAt?: string;
    updatedAt?: string;
    __v?: number
}