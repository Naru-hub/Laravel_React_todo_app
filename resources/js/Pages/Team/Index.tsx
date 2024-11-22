import { format } from 'date-fns';
import { useEffect, useState } from 'react';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps, Todo } from '@/types';
import { Head, usePage } from '@inertiajs/react';

export default function TeamUserTodoIndex({ auth, anotherUserTodoListByTeam }: PageProps) {
    console.log(anotherUserTodoListByTeam);
    //  // 本日のTodo一覧の型宣言
    // const todayTodoList = anotherUserTodoListByTeam as [];

    // // 本日の日付を取得,フォーマットを変換
    // const Today = new Date();
    // const formattedToday = format(Today, 'yyyy-MM-dd');

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
                    TeamUserTodo
                </h2>
            }
        >
            <Head title="TeamUserTodoIndex" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="py-3 px-6">
                        {showErrorMessage && errorMsg && (
                            <div className="mt-2 text-red-700 bg-red-100 p-2 rounded-lg text-center font-bold">
                                {errorMsg}
                            </div>
                        )}
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <h2 className="p-6 text-2xl font-semibold text-black dark:text-white">
                            所属チーム他ユーザーTodo一覧
                        </h2>
                        {/* {todayTodoList && todayTodoList.length > 0 ? (
                                <div className="pl-6">
                                    <ul className="pl-6 mb-6 list-disc">
                                        {todayTodoList.map((todo) => {
                                            // "YYYY-MM-DD"形式のstring型に変換
                                            const dueDateString = format(todo.due_date, 'yyyy-MM-dd');

                                            return (
                                                <li
                                                    key={todo.id}
                                                    className={dueDateString === formattedToday ? "mb-2 text-red-500" : "mb-3"}
                                                >
                                                    {todo.title}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                        ) : (
                            <div className="pl-6">
                                <p className="pl-6 mb-10">
                                    なし
                                </p>
                            </div>
                            )} */}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
