import { ChangeEventHandler, FormEventHandler } from 'react';

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
    team_id: number | null;
    created_at: Date;
    updated_at: Date;
    team_name: string | null;
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
    setData: (name: keyof TodoFormData, value: any) => void;
}

export interface DeleteConfirmFormProps {
    id: number;
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

export interface UserFormData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    is_admin: boolean;
}

// チーム情報の型
export interface Team {
    id: number;
    name: string;
    // ISO 8601 形式の日付文字列
    created_at: string;
    updated_at: string;
}

// Team情報を含んだTodoの型定義
export interface TeamTodo {
    id: number;
    user_id: number;
    title: string;
    description: string;
    is_completed: boolean;
    start_date: Date;
    due_date: Date;
    team_id: number | null;
    created_at: Date;
    updated_at: Date;
    team?: Team; // オプションとしてTeam型のリレーションを含む
}

// ユーザーと所属チーム情報の型
export interface UserInTeamInfo {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    // ISO 8601 形式の日付文字列
    created_at: string;
    updated_at: string;
    is_admin: number;
    // チーム情報の配列
    teams: Team[];
}

export interface anotherUserTodo {
    id: number;
    user_id: number;
    title: string;
    description: string;
    is_completed: boolean;
    start_date: Date;
    due_date: Date;
    created_at: Date;
    updated_at: Date;
    team_id: number;
    team_name: string;
    user_name: string;
}

/** ユーザー所属チームの他ユーザーのTodo一覧の型 */
export interface sameTeamAnotherUserTodos {
    [teamId: string]: anotherUserTodo[];
}

/** チームのTodo一覧の型 */
export interface allTeamTodos {
    [teamId: string]: Todo[];
}

/** チームのTodoの型 */
export interface TeamTodoFormData {
    id: number;
    title: string;
    description: string;
    is_completed: boolean;
    start_date: Date;
    due_date: Date;
    created_at?: Date;
    team_id: number;
}

/** チームのTodoFormの型 */
export interface TeamTodoFormProps {
    data: TeamTodoFormData;
    allTeamList: Team[];
    errors: {
        title?: string;
        description?: string;
        is_completed?: string;
        start_date?: string;
        due_date?: string;
        team_id?: string;
    };
    processing: boolean;
    onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onSubmit: FormEventHandler;
    onCancel: () => void;
    isEditing: boolean;
    titleInputRef: React.RefObject<HTMLInputElement>;
    setData: (name: keyof TeamTodoFormData, value: any) => void;
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
