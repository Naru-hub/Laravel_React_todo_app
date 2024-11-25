import { format } from "date-fns";
import { useEffect, useState } from "react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    anotherUserTodo,
    PageProps,
    sameTeamAnotherUserTodos,
    UserInTeamInfo,
} from "@/types";
import { Head, usePage } from "@inertiajs/react";

export default function TeamUserTodoIndex({
    auth,
    anotherUserTodoListByTeam,
    userTeamInfo,
}: PageProps) {
    // ユーザー所属チームの他ユーザーのTodo一覧の型宣言
    const anotherUserTodoList =
        anotherUserTodoListByTeam as sameTeamAnotherUserTodos;

    // User情報・所属チーム情報の型宣言
    const userIncludeTeamInfo = userTeamInfo as UserInTeamInfo;

    const { props } = usePage();
    // フラッシュメッセージの型宣言
    const errorMsg = props.errorMsg as string;
    // フラッシュメッセージの出現ステータス
    const [showErrorMessage, setShowErrorMessage] = useState(!!errorMsg);

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

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    TeamUserTodo
                </h2>
            }
        >
            <Head title="TeamUserTodoIndex" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="px-6">
                        {showErrorMessage && errorMsg && (
                            <div className="mt-2 text-red-700 bg-red-100 p-2 rounded-lg text-center font-bold">
                                {errorMsg}
                            </div>
                        )}
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-black dark:text-white">
                            ユーザー所属チーム
                        </h3>
                        {userIncludeTeamInfo.teams.length === 0 ? (
                            <p className="text-gray-500 py-3">
                                チームに所属していません。
                            </p>
                        ) : (
                            userIncludeTeamInfo.teams.map((team) => (
                                <div key={team.id} className="my-2">
                                    <ul>
                                        <li className="mx-3">{team.name}</li>
                                    </ul>
                                </div>
                            ))
                        )}
                        <h2 className="pt-2 text-xl font-semibold text-black dark:text-white">
                            所属チーム他ユーザーTodo一覧
                        </h2>

                        {Object.keys(anotherUserTodoList).length === 0 &&
                        userIncludeTeamInfo.teams.length !== 0 ? (
                            <p className="text-gray-500 py-3 px-3">
                                他ユーザーのTodoが存在しません。
                            </p>
                        ) : (
                            Object.entries(anotherUserTodoList).map(
                                ([teamId, todos]) => (
                                    <div key={teamId} className="my-6">
                                        <h3 className="px-3 text-l mb-2 text-blue-500">
                                            {todos[0]?.team_name ||
                                                "不明なチーム"}
                                        </h3>
                                        <table className="min-w-full border-collapse border border-gray-200">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th className="border border-gray-300 px-4 py-2 w-[120px]">
                                                        ユーザー名
                                                    </th>
                                                    <th className="border border-gray-300 px-4 py-2 w-1/4">
                                                        タイトル
                                                    </th>
                                                    <th className="border border-gray-300 px-4 py-2 w-1/3">
                                                        説明
                                                    </th>
                                                    <th className="border border-gray-300 px-4 py-2 w-[140px]">
                                                        完了状況
                                                    </th>
                                                    <th className="border border-gray-300 px-4 py-2 w-[150px] whitespace-nowrap">
                                                        開始日
                                                    </th>
                                                    <th className="border border-gray-300 px-4 py-2 w-[150px] whitespace-nowrap">
                                                        期限日
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {todos.map(
                                                    (todo: anotherUserTodo) => (
                                                        <tr
                                                            key={todo.id}
                                                            className="hover:bg-gray-50"
                                                        >
                                                            <td className="border border-gray-300 px-4 py-2 text-center whitespace-nowrap">
                                                                {todo.user_name}
                                                            </td>
                                                            <td className="border border-gray-300 px-4 py-2 break-words">
                                                                {todo.title}
                                                            </td>
                                                            <td className="border border-gray-300 px-4 py-2 break-words">
                                                                {
                                                                    todo.description
                                                                }
                                                            </td>
                                                            <td className="border border-gray-300 px-4 py-2 text-center">
                                                                {todo.is_completed
                                                                    ? "完了"
                                                                    : "未完了"}
                                                            </td>
                                                            <td className="border border-gray-300 px-4 py-2 text-center whitespace-nowrap">
                                                                {format(
                                                                    new Date(
                                                                        todo.start_date
                                                                    ),
                                                                    "yyyy-MM-dd"
                                                                )}
                                                            </td>
                                                            <td className="border border-gray-300 px-4 py-2 text-center whitespace-nowrap">
                                                                {format(
                                                                    new Date(
                                                                        todo.due_date
                                                                    ),
                                                                    "yyyy-MM-dd"
                                                                )}
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
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
