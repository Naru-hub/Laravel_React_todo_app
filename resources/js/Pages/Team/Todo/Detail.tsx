import { useEffect, useState } from 'react';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps, TeamTodo, Todo } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function TeamTodoDetail({ auth, todo }: PageProps) {
    // Todoデータの型宣言
    const todoData = todo as TeamTodo;
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
                    TeamTodoDetail
                </h2>
            }
        >
            <Head title="TodoDetail" />

            <div className="py-1">
                <div className="max-w-7xl mx-auto py-2 sm:px-6 lg:px-8">
                    <div className="py-3 px-6">
                        {showErrorMessage && errorMsg && (
                            <div className="mt-2 text-red-700 bg-red-100 p-2 rounded-lg text-center font-bold">
                                {errorMsg}
                            </div>
                        )}
                    </div>
                    <div className="px-4 py-6 sm:px-0">
                        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                            <div className="px-4 py-5 sm:px-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    Todo詳細
                                </h3>
                            </div>
                            <div className="border-t border-gray-200">
                                <dl>
                                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">
                                            タイトル
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {todoData.title}
                                        </dd>
                                    </div>
                                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">
                                            詳細
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {todoData.description}
                                        </dd>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">
                                            ステータス
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {todoData.is_completed
                                                ? "完了"
                                                : "未完了"}
                                        </dd>
                                    </div>
                                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">
                                            開始日
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {new Date(
                                                    todoData.start_date
                                                ).toLocaleDateString(
                                                    "ja-JP",
                                                    {
                                                        year: "numeric",
                                                        month: "2-digit",
                                                        day: "2-digit",
                                                    }
                                                )
                                            }
                                        </dd>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">
                                            期限日
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {new Date(
                                                    todoData.due_date
                                                ).toLocaleDateString(
                                                    "ja-JP",
                                                    {
                                                        year: "numeric",
                                                        month: "2-digit",
                                                        day: "2-digit",
                                                    }
                                                )
                                            }
                                        </dd>
                                    </div>
                                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">
                                            作成日
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {new Date(
                                                    todoData.created_at
                                                ).toLocaleDateString(
                                                    "ja-JP",
                                                    {
                                                        year: "numeric",
                                                        month: "2-digit",
                                                        day: "2-digit",
                                                    }
                                                )
                                            }
                                        </dd>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">
                                            チームID
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {todoData.team_id}
                                        </dd>
                                    </div>
                                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">
                                            チーム名
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {todoData.team?.name}
                                        </dd>
                                    </div>
                                    <div className="border-t border-gray-100"></div>
                                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500"></dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            <Link
                                                href="/team/todo/index/"
                                                method="get"
                                                as="button"
                                                type="button"
                                                className="bg-gray-400 text-white font-semibold py-2 px-4 rounded"
                                            >
                                                一覧へ戻る
                                            </Link>
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
