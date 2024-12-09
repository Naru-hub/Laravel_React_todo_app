import { format } from "date-fns";
import { useEffect, useState } from "react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { allTeamTodos, PageProps, Team, Todo } from "@/types";
import { Head, usePage } from "@inertiajs/react";

export default function Dashboard({
    auth,
    todayTodos,
    userInTeamTodos,
    // allTeamList,
}: PageProps) {
    // 本日のTodo一覧の型宣言
    const todayTodoList = todayTodos as Todo[];
    // ユーザー所属チームのTodo一覧の型宣言
    const userTeamTodoList = userInTeamTodos as allTeamTodos;
    // チームリストの型宣言
    // const allTeamListInfo = allTeamList as Team[];

    // 本日の日付を取得,フォーマットを変換
    const Today = new Date();
    const formattedToday = format(Today, "yyyy-MM-dd");

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
        }
    }, [errorMsg]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="py-3 px-6">
                        {showErrorMessage && errorMsg && (
                            <div className="mt-2 text-red-700 bg-red-100 p-2 rounded-lg text-center font-bold">
                                {errorMsg}
                            </div>
                        )}
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {auth.user.name}さん、こんにちは！
                        </div>
                        <h2 className="p-6 text-2xl font-semibold text-black dark:text-white">
                            本日の予定
                        </h2>
                        {todayTodoList && todayTodoList.length > 0 ? (
                            <div className="pl-6">
                                <ul className="pl-6 mb-6 list-disc">
                                    {todayTodoList.map((todo) => {
                                        // "YYYY-MM-DD"形式のstring型に変換
                                        const dueDateString = format(
                                            todo.due_date,
                                            "yyyy-MM-dd"
                                        );

                                        return (
                                            <li
                                                key={todo.id}
                                                className={
                                                    dueDateString ===
                                                    formattedToday
                                                        ? "mb-2 text-red-500"
                                                        : "mb-3"
                                                }
                                            >
                                                {todo.title}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        ) : (
                            <div className="pl-6">
                                <p className="pl-6 mb-10">なし</p>
                            </div>
                        )}
                    </div>

                    {
                    // ログインユーザーが管理者の場合はチームの予定は表示させない（管理者はチームに所属できない）
                    auth.user.is_admin ? null :
                    // 管理者以外の場合はチームの予定を表示
                    (
                        <div className="py-8 bg-gray-100">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <h2 className="px-6 pt-3 text-2xl font-semibold text-black dark:text-white">
                                    チームの予定
                                </h2>
                                {Object.keys(userTeamTodoList).length === 0 ? (
                                    <p className="pl-12 my-6">なし</p>
                                ) : (
                                    Object.entries(userTeamTodoList).map(
                                        ([teamId, todos], index, array) => (
                                            <div key={teamId} className="pb-8 pt-3">
                                                <h3 className="px-8 text-l mb-2 font-bold">
                                                {
                                                    todos[0]?.team_name
                                                    || "不明なチーム"
                                                }
                                                </h3>
                                                <table className="border-separate border border-slate-400 ml-8">
                                                    <thead className="bg-teal-500">
                                                        <tr>
                                                            <th className="text-white border border-slate-300 px-4 py-2 w-3/4">
                                                                タイトル
                                                            </th>
                                                            <th className="text-white border border-slate-300 px-4 py-2">
                                                                期限日
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {todos.map((todo: Todo) => (
                                                            <tr
                                                                key={todo.id}
                                                                className="hover:bg-gray-50"
                                                            >
                                                                <td className="border border-slate-300 px-4 py-2 break-words">
                                                                    {todo.title}
                                                                </td>
                                                                <td className="border border-slate-300 px-4 py-2 text-center whitespace-nowrap">
                                                                    {format(
                                                                        new Date(
                                                                            todo.due_date
                                                                        ),
                                                                        "yyyy/MM/dd"
                                                                    )}
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
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
