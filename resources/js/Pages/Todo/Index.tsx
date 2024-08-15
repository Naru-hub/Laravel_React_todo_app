import { FormEventHandler, useEffect, useRef, useState } from 'react';

import Checkbox from '@/Components/Checkbox';
import DangerButton from '@/Components/DangerButton';
import EditButton from '@/Components/EditButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextareaInput from '@/Components/TextareaInput';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps, Todo } from '@/types';
import { Inertia } from '@inertiajs/inertia';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function todoIndex({ auth, todos, message }: PageProps) {
    // Todo一覧の型宣言
    const todoLists = todos as Todo[];
    // Todos作成・編集のステータス
    const [todoCreate, setTodoCreate] = useState(false);
    const [todoUpdate, setTodoUpdate] = useState(false);
    // formの変数
    const titleInput = useRef<HTMLInputElement>(null);
    const descriptionInput = useRef<HTMLInputElement>(null);
    // フラッシュメッセージの型宣言
    const actionMessage: string = message as string;
    const { props } = usePage();
    const errorMsg = props.errorMsg as string;
    // フラッシュメッセージの出現ステータス
    const [showActionMessage, setShowActionMessage] = useState(!!actionMessage);
    const [showErrorMessage, setShowErrorMessage] = useState(!!errorMsg);

    const { data, setData, post, put, processing, reset, errors } = useForm({
        // formの初期値を設定
        id: 0,
        title: "",
        description: "",
        is_completed: false,
    });

    // ADDボタン押下時
    const confirmTodoCreate = () => {
        setTodoCreate(true);
    };

    // 編集ボタン押下時
    const todoEditForm = (
        id: number,
        title: string,
        description: string,
        is_completed: boolean
    ) => {
        setData({
            id: id,
            title: title,
            description: description,
            is_completed: is_completed,
        });
        setTodoUpdate(true);
    };

    // Saveボタン押下時(Todo作成)
    const todoStore: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("todo.store"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => titleInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    // Saveボタン押下時(Todo編集)
    const todoUpdateStore: FormEventHandler = (e) => {
        e.preventDefault();

        put(route("todo.update", data.id), {
            preserveScroll: true,
            onSuccess: () => {
                updateCloseModal();
                // 成功時のみリセットする
                reset();
            },
            onError: () => titleInput.current?.focus(),
        });
    };

    // 削除ボタン押下時
    const deleteTodo = (id: number) => {
        Inertia.delete(route("todo.destroy", id), {
            preserveScroll: true,
            onFinish: () => reset(),
        });
    };

    // Todo作成モーダルのキャンセルボタン押下時
    const closeModal = () => {
        setTodoCreate(false);

        reset();
    };

    // Todo編集モーダルのキャンセルボタン押下時
    const updateCloseModal = () => {
        setTodoUpdate(false);

        reset();
    };

    // フラッシュメッセージの表示・非表示
    useEffect(() => {
        if (actionMessage) {
            setShowActionMessage(true);
            const timer = setTimeout(() => {
                setShowActionMessage(false);
            }, 3000); // 3秒後にメッセージを非表示にする

            return () => clearTimeout(timer); // タイマーをリセット
        }
    }, [actionMessage]);

    useEffect(() => {
        if (errorMsg) {
            setShowErrorMessage(true);
            const timer = setTimeout(() => {
                setShowErrorMessage(false);
            }, 3000); // 3秒後にエラーメッセージを非表示にする

            return () => clearTimeout(timer); // タイマーをリセット
        }
    }, [errorMsg]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Todo
                </h2>
            }
        >
            <Head title="Todo" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <PrimaryButton
                        onClick={confirmTodoCreate}
                        className="mb-5 mx-5"
                        disabled={processing}
                    >
                        Add
                    </PrimaryButton>

                    <Modal show={todoCreate} onClose={closeModal}>
                        <form onSubmit={todoStore} className="p-6">
                            <h2 className="text-lg text-gray-900 font-bold">
                                Todo 作成
                            </h2>

                            <div className="mt-6">
                                <InputLabel
                                    htmlFor="title"
                                    value="title"
                                    className="ml-2"
                                />

                                <TextInput
                                    id="title"
                                    type="text"
                                    name="title"
                                    ref={titleInput}
                                    value={data.title}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                    className="mt-1 block w-3/4"
                                    isFocused
                                    placeholder="todoを入力"
                                />

                                <InputError
                                    message={errors.title}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-6">
                                <InputLabel
                                    htmlFor="description"
                                    value="description"
                                    className="ml-2"
                                />

                                <TextareaInput
                                    id="description"
                                    name="description"
                                    ref={descriptionInput}
                                    value={data.description ?? ""}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                    className="mt-1 block w-3/4"
                                    placeholder="詳細を入力"
                                />

                                <InputError
                                    message={errors.description}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-6 flex justify-end">
                                <SecondaryButton onClick={closeModal}>
                                    Cancel
                                </SecondaryButton>

                                <PrimaryButton
                                    className="ms-3"
                                    disabled={processing}
                                >
                                    Save
                                </PrimaryButton>
                            </div>
                        </form>
                    </Modal>

                    <Modal show={todoUpdate} onClose={updateCloseModal}>
                        <form onSubmit={todoUpdateStore} className="p-6">
                            <h2 className="text-lg text-gray-900 font-bold">
                                Todo 編集
                            </h2>

                            <div className="mt-6">
                                <InputLabel
                                    htmlFor="title"
                                    value="title"
                                    className="ml-2"
                                />

                                <TextInput
                                    id="title"
                                    type="text"
                                    name="title"
                                    ref={titleInput}
                                    value={data.title}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                    className="mt-1 block w-3/4"
                                    isFocused
                                    placeholder="todoを入力"
                                />

                                <InputError
                                    message={errors.title}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-6">
                                <InputLabel
                                    htmlFor="description"
                                    value="description"
                                    className="ml-2"
                                />

                                <TextareaInput
                                    id="description"
                                    name="description"
                                    ref={descriptionInput}
                                    value={data.description ?? ""}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                    className="mt-1 block w-3/4"
                                    placeholder="詳細を入力"
                                />

                                <InputError
                                    message={errors.description}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-6">
                                <InputLabel
                                    htmlFor="is_completed"
                                    value="is_completed"
                                    className="ml-2"
                                />

                                <Checkbox
                                    id="is_completed"
                                    name="is_completed"
                                    type="checkbox"
                                    checked={data.is_completed}
                                    onChange={(e) =>
                                        setData(
                                            "is_completed",
                                            !data.is_completed
                                        )
                                    }
                                    className="mt-1 ml-1 block w-5"
                                />

                                <InputError
                                    message={errors.is_completed}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-6 flex justify-end">
                                <SecondaryButton onClick={updateCloseModal}>
                                    Cancel
                                </SecondaryButton>

                                <PrimaryButton
                                    className="ms-3"
                                    disabled={processing}
                                >
                                    Save
                                </PrimaryButton>
                            </div>
                        </form>
                    </Modal>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="py-3 px-6">
                            {showActionMessage && actionMessage && (
                                <div className="mt-2 text-green-700 bg-green-100 p-2 rounded-lg text-center font-bold">
                                    {actionMessage}
                                </div>
                            )}
                            {showErrorMessage && errorMsg && (
                                <div className="mt-2 text-red-700 bg-red-100 p-2 rounded-lg text-center font-bold">
                                    {errorMsg}
                                </div>
                            )}
                        </div>
                        <div className="p-6 text-gray-900">
                            {todoLists.length > 0 ? (
                                <table className="w-full border-separate border border-slate-400">
                                    <thead className="bg-cyan-500">
                                        <tr>
                                            <th className="border border-slate-300 text-white px-2 py-2">
                                                todo
                                            </th>
                                            <th className="border border-slate-300 text-white px-2 py-2">
                                                is_completed
                                            </th>
                                            <th className="border border-slate-300 text-white px-2 py-2">
                                                created_at
                                            </th>
                                            <th className="border border-slate-300 text-white px-2 py-2"></th>
                                            <th className="border border-slate-300 text-white px-2 py-2"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {todoLists.map((todo: Todo) => (
                                            <tr key={todo.id}>
                                                <td
                                                    className={`${
                                                        todo.is_completed
                                                            ? "border border-slate-300 px-2 py-2 line-through text-slate-400"
                                                            : "border border-slate-300 px-2 py-2"
                                                    }`}
                                                >
                                                    <Link
                                                        href={`/Todo/Detail/${todo.id}`}
                                                        method="get"
                                                    >
                                                        {todo.title}
                                                    </Link>
                                                </td>
                                                <td className="border border-slate-300 px-2 py-2">
                                                    {todo.is_completed
                                                        ? "完了"
                                                        : "未完了"}
                                                </td>
                                                <td className="border border-slate-300 px-2 py-2">
                                                    {new Date(
                                                        todo.created_at
                                                    ).toLocaleDateString(
                                                        "ja-JP",
                                                        {
                                                            year: "numeric",
                                                            month: "2-digit",
                                                            day: "2-digit",
                                                        }
                                                    )}
                                                </td>
                                                <td className="border border-slate-300 px-2 py-2 text-center">
                                                    <EditButton
                                                        onClick={() =>
                                                            todoEditForm(
                                                                todo.id,
                                                                todo.title,
                                                                todo.description,
                                                                todo.is_completed
                                                            )
                                                        }
                                                        disabled={processing}
                                                    >
                                                        編集
                                                    </EditButton>
                                                </td>
                                                <td className="border border-slate-300 px-2 py-2 text-center">
                                                    <DangerButton
                                                        onClick={() =>
                                                            deleteTodo(todo.id)
                                                        }
                                                        disabled={processing}
                                                    >
                                                        削除
                                                    </DangerButton>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p className="text-center">
                                    表示できるTodoデータがありません
                                    <span className="text-green-600 text-xl">
                                        &#x270e;
                                    </span>
                                    Todoを作成してください
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
