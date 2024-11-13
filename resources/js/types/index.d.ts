import { ChangeEventHandler, FormEventHandler } from "react";

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    created_at: Date;
    updated_at: Date;
    is_admin: boolean;
}

export interface Todo {
    id: number;
    user_id: number;
    title: string;
    description: string;
    is_completed: boolean;
    start_date: Date;
    due_date: Date;
    created_at: Date;
    updated_at: Date;
}

export interface TodoFormData {
    id: number;
    title: string;
    description: string;
    is_completed: boolean;
    start_date: Date;
    due_date: Date;
    created_at?: Date;
}

export interface TodoFormProps {
    data: TodoFormData;
    errors: {
        title?: string;
        description?: string;
        is_completed?: string;
        start_date?: string;
        due_date?: string;
    };
    processing: boolean;
    onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onSubmit: FormEventHandler;
    onCancel: () => void;
    isEditing: boolean;
    titleInputRef: React.RefObject<HTMLInputElement>;
    descriptionInputRef: React.RefObject<HTMLTextAreaElement>;
    setData: (name: keyof TodoFormData, value: any) => void;
}

interface DeleteConfirmFormProps {
    userId: number;
    onConfirm: (userId: number) => void;
    onCancel: () => void;
    className?: string;
}

export interface DateInputProps {
    id?: string;
    name?: string; 
    selected?: Date;
    onChange: (date: Date | null) => void;
    minDate: Date;
    className?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
    message?: string;
    isFlgMsg?: boolean | undefined;
};
