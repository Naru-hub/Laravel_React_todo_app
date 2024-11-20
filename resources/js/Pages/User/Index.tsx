import DangerButton from "@/Components/DangerButton";
import EditButton from "@/Components/EditButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps, User } from "@/types";
import { Head, useForm, usePage, router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import DeleteUserConfirmForm from "./Modal/DeleteUserConfirmForm";

export default function userIndex({ auth, message, users }: PageProps) {
    // User一覧の型宣言
    const userList = users as User[];

    // フラッシュメッセージの型宣言
    let actionMessage: string = message as string;
    const { props } = usePage();
    let errorMessage = props.errorMsg as string;

    // フラッシュメッセージの出現ステータス
    const [showActionMessage, setShowActionMessage] = useState(!!actionMessage);
    const [showErrorMessage, setShowErrorMessage] = useState(!!errorMessage);

    // 削除確認フォームの表示状態
    const [confirmingDeletion, setConfirmingDeletion] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

    // フォームの設定
    const {
        data,
        setData,
        get,
        post,
        put,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        // formの初期値を設定
        // id: 0,
        // title: "",
        // description: "",
        // is_completed: false,
        // start_date: new Date(),
        // due_date: new Date(),
    });

    // ユーザー登録フォームを表示
    const showUserCreateForm = () => {
        router.get(route('user.create'));
    }

    // ユーザー所属チーム一覧・編集ページ表示
    const showUserInTeamList = (userId: number) => {

        // ユーザーIDを渡してチーム編集ページに遷移
        router.get(route('team.index',  {id: userId}));
    }

    // 削除確認フォームを表示
    const confirmDelete = (userId: number) => {
        setSelectedUserId(userId);
        setConfirmingDeletion(true);
    };

    // 削除処理
    const deleteUser = (userId: number) => {
        // 実際の削除処理
        destroy(route("user.destroy", userId), {
            preserveScroll: true,
            onSuccess: () => {
                setConfirmingDeletion(false);
                // 削除後にIDをリセット
                setSelectedUserId(null); 
            },
            onError: () => {},
        });
    };

    // キャンセル時にフォームを閉じる
    const cancelDelete = () => {
        setConfirmingDeletion(false);
        setSelectedUserId(null);
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
                    User
                </h2>
            }
        >
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

            <Head title="User" />

            <PrimaryButton
                onClick={showUserCreateForm}
                className="mb-5 mx-5"
                disabled={processing}
            >
                ユーザー登録
            </PrimaryButton>

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
                    <div className="p-6 text-gray-900">
                        {userList.length > 0 ? (
                            <table className="w-full border-separate border border-slate-400">
                                <thead className="bg-cyan-500">
                                    <tr>
                                        <th className="border border-slate-300 text-white px-2 py-2">
                                            ID
                                        </th>
                                        <th className="border border-slate-300 text-white px-2 py-2">
                                            名前
                                        </th>
                                        <th className="border border-slate-300 text-white px-2 py-2">
                                            メールアドレス
                                        </th>
                                        <th className="border border-slate-300 text-white px-2 py-2">
                                            管理者フラグ
                                        </th>
                                        <th className="border border-slate-300 text-white px-2 py-2">
                                            作成日
                                        </th>
                                        <th className="border border-slate-300 text-white px-2 py-2">
                                            更新日
                                        </th>
                                        <th className="border border-slate-300 text-white px-2 py-2"></th>
                                        <th className="border border-slate-300 text-white px-2 py-2"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userList.map((user: User) => (
                                        <tr key={user.id}>
                                            <td className="border border-slate-300 px-2 py-2">
                                                {user.id}
                                            </td>
                                            <td className="border border-slate-300 px-2 py-2">
                                                {/* <Link
                                                    href={`/Todo/Detail/${todo.id}`}
                                                    method="get"
                                                    className="underline decoration-solid"
                                                > */}
                                                    {user.name}
                                                {/* </Link> */}
                                            </td>
                                            <td className="border border-slate-300 px-2 py-2">
                                                {user.email}
                                            </td>
                                            <td className="border border-slate-300 px-2 py-2">
                                                {user.is_admin
                                                    ? "管理者"
                                                    : "一般ユーザー"}
                                            </td>
                                            <td className="border border-slate-300 px-2 py-2">
                                                {new Date(
                                                    user.created_at
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
                                                    user.updated_at
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
                                            {user.is_admin ?  null : (
                                                <EditButton
                                                    onClick={() => showUserInTeamList(user.id)}
                                                    disabled={processing}
                                                >
                                                    チーム編集
                                                </EditButton>
                                            )}
                                            </td> 
                                            <td className="border border-slate-300 px-2 py-2 text-center">
                                            {user.is_admin && user.id == 1 ?  null : (
                                                <DangerButton onClick={() => confirmDelete(user.id)} disabled={processing}>
                                                    ユーザー削除
                                                </DangerButton>
                                            )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-center">
                                表示できるUserデータがありません
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
        {/* 削除確認モーダル */}
        {confirmingDeletion && selectedUserId !== null && (
            <DeleteUserConfirmForm
                userId={selectedUserId}
                onConfirm={deleteUser}
                onCancel={cancelDelete}
            />
        )}
    </AuthenticatedLayout>
)}