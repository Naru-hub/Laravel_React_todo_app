import { FormEventHandler, useEffect, useRef, useState } from "react";

import DangerButton from "@/Components/DangerButton";
import EditButton from "@/Components/EditButton";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps, Todo } from "@/types";
import { Head, Link, useForm, usePage } from "@inertiajs/react";

import TodoForm from "./Modal/TodoForm";

export default function todoIndex({ auth, todos, message }: PageProps) {
    // Todo一覧の型宣言
    const todoLists = todos as Todo[];
    // Todo作成・編集のステータス
    const [todoCreate, setTodoCreate] = useState(false);
    const [todoUpdate, setTodoUpdate] = useState(false);

    // form要素の状態を管理
    const titleInput = useRef<HTMLInputElement>(null);
    const descriptionInput = useRef<HTMLTextAreaElement>(null);

    // フラッシュメッセージの型宣言
    let actionMessage: string = message as string;
    const { props } = usePage();
    let errorMessage = props.errorMsg as string;
    // フラッシュメッセージの出現ステータス
    const [showActionMessage, setShowActionMessage] = useState(!!actionMessage);
    const [showErrorMessage, setShowErrorMessage] = useState(!!errorMessage);

    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        // formの初期値を設定
        id: 0,
        title: "",
        description: "",
        is_completed: false,
        start_date: new Date(),
        due_date: new Date(),
    });

    // 追加ボタン押下時
    const confirmTodoCreate = () => {
        reset();
        // バリデーションエラーメッセージをクリア
        errors.title = "";
        errors.description = "";
        setTodoCreate(true);
    };

    // 編集ボタン押下時
    const todoEditForm = (
        id: number,
        title: string,
        description: string,
        is_completed: boolean,
        start_date: Date,
        due_date: Date
    ) => {
        reset();
        setData({
            id: id,
            title: title,
            description: description,
            is_completed: is_completed,
            start_date: start_date,
            due_date: due_date,
        });
        // バリデーションエラーメッセージをクリア
        errors.title = "";
        errors.description = "";
        setTodoUpdate(true);
    };

    // 保存ボタン押下時(Todo作成)
    const todoStore: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("todo.store"), {
            preserveScroll: true,
            onSuccess: () => {
                // 成功時にリセット
                reset();
                closeModal();
            },
            onError: () => {
                if (errors.title && titleInput.current) {
                    // titleにエラーがある場合、titleInputにフォーカスを移す
                    titleInput.current.focus();
                } else if (errors.description && descriptionInput.current) {
                    // descriptionにエラーがある場合、descriptionInputにフォーカスを移す
                    descriptionInput.current.focus();
                }
            },
        });
    };

    // 保存ボタン押下時(Todo編集)
    const todoUpdateStore: FormEventHandler = (e) => {
        e.preventDefault();

        put(route("todo.update", data.id), {
            preserveScroll: true,
            onSuccess: () => {
                // 成功時のみリセットする
                reset();
                updateCloseModal();
            },
            onError: () => {
                if (errors.title && titleInput.current) {
                    // titleにエラーがある場合、titleInputにフォーカスを移す
                    titleInput.current.focus();
                } else if (errors.description && descriptionInput.current) {
                    // descriptionにエラーがある場合、descriptionInputにフォーカスを移す
                    descriptionInput.current.focus();
                }
            },
        });
    };

    // 削除ボタン押下時
    const deleteTodo = (id: number) => {
        destroy(route("todo.destroy", id), {
            // リクエスト後にページのスクロール位置を保持
            preserveScroll: true,
            onFinish: () => reset(),
        });
    };

    // Todo作成モーダルのキャンセルボタン押下時
    const closeModal = () => {
        reset();
        setTodoCreate(false);
        setData({
            id: 0,
            title: "",
            description: "",
            is_completed: false,
            start_date: new Date(),
            due_date: new Date(),
        });
        // バリデーションエラーメッセージをクリア
        errors.title = "";
        errors.description = "";
        errors.start_date = "";
        errors.due_date = "";
    };

    // Todo編集モーダルのキャンセルボタン押下時
    const updateCloseModal = () => {
        reset();
        setTodoUpdate(false);
        setData({
            id: 0,
            title: "",
            description: "",
            is_completed: false,
            start_date: new Date(),
            due_date: new Date(),
        });
        // バリデーションエラーメッセージをクリア
        errors.title = "";
        errors.description = "";
        errors.start_date = "";
        errors.due_date = "";
    };

    // フラッシュメッセージの表示・非表示
    useEffect(() => {
        if (actionMessage) {
            setShowActionMessage(true);
            const timer = setTimeout(() => {
                setShowActionMessage(false);
            }, 3000); // 3秒後にメッセージを非表示

            return () => clearTimeout(timer); // タイマーをリセット
        }
    }, [actionMessage]);

    useEffect(() => {
        if (errorMessage) {
            setShowErrorMessage(true);
            const timer = setTimeout(() => {
                setShowErrorMessage(false);
            }, 3000); // 3秒後にエラーメッセージを非表示

            return () => clearTimeout(timer); // タイマーをリセット
        }
    }, [errorMessage]);

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
                        追加
                    </PrimaryButton>

                    <Modal show={todoCreate} onClose={closeModal}>
                        <TodoForm
                            data={data}
                            setData={setData}
                            errors={errors}
                            processing={processing}
                            onChange={(e) =>
                                setData(
                                    e.target.name as keyof typeof data,
                                    e.target.value
                                )
                            }
                            onSubmit={todoStore}
                            onCancel={closeModal}
                            isEditing={false}
                            titleInputRef={titleInput}
                            descriptionInputRef={descriptionInput}
                        />
                    </Modal>

                    <Modal show={todoUpdate} onClose={updateCloseModal}>
                        <TodoForm
                            data={data}
                            setData={setData}
                            errors={errors}
                            processing={processing}
                            onChange={(e) => {
                                const target = e.target as HTMLInputElement;
                                const value =
                                    target.type === "checkbox"
                                        ? target.checked
                                        : target.value;
                                setData(
                                    e.target.name as keyof typeof data,
                                    value
                                );
                            }}
                            onSubmit={todoUpdateStore}
                            onCancel={updateCloseModal}
                            isEditing={true}
                            titleInputRef={titleInput}
                            descriptionInputRef={descriptionInput}
                        />
                    </Modal>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="py-3 px-6">
                            {showActionMessage && actionMessage && (
                                <div className="mt-2 text-green-700 bg-green-100 p-2 rounded-lg text-center font-bold">
                                    {actionMessage}
                                </div>
                            )}
                            {showErrorMessage && errorMessage && (
                                <div className="mt-2 text-red-700 bg-red-100 p-2 rounded-lg text-center font-bold">
                                    {errorMessage}
                                </div>
                            )}
                        </div>
                        <div className="px-6 pb-6 text-gray-900">
                            <h2 className="text-2xl font-semibold text-black dark:text-white mb-3">
                                    Todo一覧
                            </h2>
                            {todoLists.length > 0 ? (
                                <table className="w-full border-separate border border-slate-400">
                                    <thead className="bg-cyan-500">
                                        <tr>
                                            <th className="border border-slate-300 text-white px-2 py-2">
                                                タイトル
                                            </th>
                                            <th className="border border-slate-300 text-white px-2 py-2">
                                                完了状況
                                            </th>
                                            <th className="border border-slate-300 text-white px-2 py-2">
                                                開始日
                                            </th>
                                            <th className="border border-slate-300 text-white px-2 py-2">
                                                期限日
                                            </th>
                                            <th className="border border-slate-300 text-white px-2 py-2">
                                                作成日
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
                                                        className="underline decoration-solid"
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
                                                        todo.start_date
                                                    ).toLocaleDateString(
                                                        "ja-JP",
                                                        {
                                                            year: "numeric",
                                                            month: "2-digit",
                                                            day: "2-digit",
                                                        }
                                                    )}
                                                </td>
                                                <td className="border border-slate-300 px-2 py-2">
                                                    {new Date(
                                                        todo.due_date
                                                    ).toLocaleDateString(
                                                        "ja-JP",
                                                        {
                                                            year: "numeric",
                                                            month: "2-digit",
                                                            day: "2-digit",
                                                        }
                                                    )}
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
                                                                todo.is_completed,
                                                                todo.start_date,
                                                                todo.due_date
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
