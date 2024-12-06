import { format } from "date-fns";
import { FormEventHandler, useEffect, useRef, useState } from "react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { allTeamTodos, PageProps, Team, Todo } from "@/types";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import EditButton from "@/Components/EditButton";
import DangerButton from "@/Components/DangerButton";
import PrimaryButton from "@/Components/PrimaryButton";
import TeamTodoForm from "./Modal/TeamTodoForm";
import Modal from "@/Components/Modal";

export default function TeamTodoIndex({
    auth,
    allTeamTodos,
    allTeamList
}: PageProps) {
    // チームのTodo一覧の型宣言
    const allTeamTodoList = allTeamTodos as allTeamTodos;

     // Todo作成・編集のステータス
    const [todoCreate, setTodoCreate] = useState(false);
    const [todoUpdate, setTodoUpdate] = useState(false);

     // form要素の状態を管理
    const titleInput = useRef<HTMLInputElement>(null);
    const descriptionInput = useRef<HTMLTextAreaElement>(null);

    const { props } = usePage();
    // フラッシュメッセージの型宣言
    const errorMsg = props.errorMsg as string;
    // フラッシュメッセージの出現ステータス
    const [showErrorMessage, setShowErrorMessage] = useState(!!errorMsg);

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
        team_id: 1,
    });

/** TeamTodo作成関連処理 */
     // 追加ボタン押下時
    const confirmTeamTodoCreate = () => {
        reset();
        // バリデーションエラーメッセージをクリア
        errors.title = "";
        errors.description = "";
        setTodoCreate(true);
    };

     // Saveボタン押下時(Todo作成)
    const todoStore: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("team.todo.store"), {
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
            team_id: 0
        });
        // バリデーションエラーメッセージをクリア
        errors.title = "";
        errors.description = "";
        errors.start_date = "";
        errors.due_date = "";
    };


    // フラッシュメッセージの表示・非表示
    useEffect(() => {
        if (errorMsg) {
            setShowErrorMessage(true);
            const timer = setTimeout(() => {
                setShowErrorMessage(false);
            }, 3000); // 3秒後にエラーメッセージを非表示にする

            return () => clearTimeout(timer); // タイマーをリセット
        } else {
            setShowErrorMessage(false); // エラーメッセージがなくなった場合も対応
        }
    }, [errorMsg]);

    // 削除ボタン押下時
    const deleteTeamTodo = (id: number, teamName: string | null) => {
        if (teamName !== null && window.confirm(`${teamName}のIDが${id}のTodoを本当に削除してよろしいですか？`)) {
            destroy(route("team.todo.destroy", id), {
                // リクエスト後にページのスクロール位置を保持
                preserveScroll: true,
                onFinish: () => reset(),
            });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    TeamTodo
                </h2>
            }
        >
            <Head title="TeamTodoIndex" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <PrimaryButton
                        onClick={confirmTeamTodoCreate}
                        className="mb-5 mx-5"
                        disabled={processing}
                    >
                        追加
                    </PrimaryButton>

                    <Modal show={todoCreate} onClose={closeModal}>
                        <TeamTodoForm
                            data={data}
                            setData={setData}
                            allTeamList={allTeamList as Team[]}
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

                    <div className="px-6">
                        {showErrorMessage && errorMsg && (
                            <div className="mt-2 text-red-700 bg-red-100 p-2 rounded-lg text-center font-bold">
                                {errorMsg}
                            </div>
                        )}
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h2 className="pt-5 text-xl font-semibold text-black dark:text-white">
                            チームTodo一覧
                        </h2>

                        {Object.keys(allTeamTodoList).length === 0 ? (
                            <p className="text-gray-500 py-3 px-3">
                                チームのTodoが存在しません。
                            </p>
                        ) : (
                            Object.entries(allTeamTodoList).map(
                                ([teamId, todos], index, array) => (
                                    <div key={teamId} className="py-3">
                                        <h3 className="px-3 text-l mb-2">
                                            {
                                                    todos[0]?.team_name || "不明なチーム"
                                            }
                                        </h3>
                                        <table className="min-w-full border-separate border border-slate-400">
                                            <thead className="bg-emerald-300">
                                                <tr>
                                                    <th className="border border-slate-300 text-white px-2 py-2">
                                                        ID
                                                    </th>
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
                                                {todos.map((todo: Todo) => (
                                                    <tr
                                                        key={todo.id}
                                                        className="hover:bg-gray-50"
                                                    >
                                                        <td className="border border-slate-300 px-4 py-2 break-words">
                                                            {todo.id}
                                                        </td>
                                                        <td
                                                            className={`${
                                                                todo.is_completed
                                                                    ? "border border-slate-300 px-2 py-2 line-through text-slate-400"
                                                                    : "border border-slate-300 px-2 py-2"
                                                            }`}
                                                        >
                                                            <Link
                                                                href={`/team/todo/detail/${todo.id}`}
                                                                method="get"
                                                                className="underline decoration-solid"
                                                            >
                                                                {todo.title}
                                                            </Link>
                                                        </td>
                                                        <td className="border border-slate-300 px-4 py-2 text-center">
                                                            {todo.is_completed
                                                                ? "完了"
                                                                : "未完了"}
                                                        </td>
                                                        <td className="border border-slate-300 px-4 py-2 text-center whitespace-nowrap">
                                                            {format(
                                                                new Date(
                                                                    todo.start_date
                                                                ),
                                                                "yyyy-MM-dd"
                                                            )}
                                                        </td>
                                                        <td className="border border-slate-300 px-4 py-2 text-center whitespace-nowrap">
                                                            {format(
                                                                new Date(
                                                                    todo.due_date
                                                                ),
                                                                "yyyy-MM-dd"
                                                            )}
                                                        </td>
                                                        <td className="border border-slate-300 px-4 py-2 text-center whitespace-nowrap">
                                                            {format(
                                                                new Date(
                                                                    todo.created_at
                                                                ),
                                                                "yyyy-MM-dd"
                                                            )}
                                                        </td>
                                                        <td className="border border-slate-300 px-2 py-2 text-center">
                                                            <EditButton
                                                                // onClick={() =>
                                                                //     todoEditForm(
                                                                //         todo.id,
                                                                //         todo.title,
                                                                //         todo.description,
                                                                //         todo.is_completed,
                                                                //         todo.start_date,
                                                                //         todo.due_date
                                                                //     )
                                                                // }
                                                                // disabled={processing}
                                                            >
                                                                編集
                                                            </EditButton>
                                                        </td>
                                                        <td className="border border-slate-300 px-2 py-2 text-center">
                                                            <DangerButton
                                                                onClick={() => todo.team_name !== null && deleteTeamTodo(todo.id, todo.team_name)}
                                                                disabled={processing}
                                                            >
                                                                削除
                                                            </DangerButton>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        {
                                            // 最後の要素以外の時にborderを出す
                                            index < array.length - 1 && (
                                                <div className="border-t-2 border-gray-300 mt-8"></div>
                                            )
                                        }
                                    </div>
                                )
                            )
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

