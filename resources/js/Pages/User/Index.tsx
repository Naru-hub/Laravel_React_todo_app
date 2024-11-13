import DangerButton from "@/Components/DangerButton";
import EditButton from "@/Components/EditButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps, User } from "@/types";
import { Head, useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";


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

    // フォームの設定
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
        // id: 0,
        // title: "",
        // description: "",
        // is_completed: false,
        // start_date: new Date(),
        // due_date: new Date(),
    });

    // 削除ボタン押下時
    // const deleteTodo = (id: number) => {
    //     destroy(route("user.destroy", id), {
    //         // リクエスト後にページのスクロール位置を保持
    //         preserveScroll: true,
    //         onFinish: () => reset(),
    //     });
    // };
    const deleteTodo = (id: number) => {
        destroy(route("user.destroy", id), {
            // リクエスト後にページのスクロール位置を保持
            preserveScroll: true,
            onFinish: () => reset(),
        });
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
                                                    onClick={() =>
                                                        deleteTodo(user.id)
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
                                表示できるUserデータがありません
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
)}