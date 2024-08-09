export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export interface Todo {
    id: number;
    user_id: number;
    title: string;
    description: string;
    is_completed: boolean;
    created_at: Date;
    updated_at: Date;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};
