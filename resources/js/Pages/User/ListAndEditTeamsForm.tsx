import { FormEventHandler, useEffect, useState } from 'react';

import DangerButton from '@/Components/DangerButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps, Team, UserInTeamInfo } from '@/types';
import { useForm, usePage } from '@inertiajs/react';

export default function ListAndEditTeamsForm ({ auth, message, userTeamInfo, allTeamList }: PageProps) {
    // セレクトボックス用のチーム一覧の型宣言
    const selectAllTeamList = allTeamList as Team[];
    // User情報・所属チーム情報の型宣言
    const userIncludeTeamInfo = userTeamInfo as UserInTeamInfo;
    // User所属チーム一覧情報の型宣言
    const userTeamList = userIncludeTeamInfo.teams as Team[];

    // フラッシュメッセージの型宣言
    let actionMessage: string = message as string;
    const { props } = usePage();
    let errorMessage = props.errorMsg as string;

    // フラッシュメッセージの出現ステータス
    const [showActionMessage, setShowActionMessage] = useState(!!actionMessage);
    const [showErrorMessage, setShowErrorMessage] = useState(!!errorMessage);

    // フォームの設定
    const { data, setData, post, reset, delete: destroy, processing } = useForm<{
        id: number;
        user_id: number;
        team_id: number | null;
    }>({
        // formの初期値を設定
        id: 0,
        user_id: userIncludeTeamInfo.id,
        // 初期値はnull
        team_id: null, 
    });

    //削除処理かどうかのフラグ
    const [isDeleting, setIsDeleting] = useState(false);

    // ユーザーをチームから削除（脱退）する処理の値をセット
    const deleteUserFromTeam = (teamId: number) => {
        if (window.confirm('本当にこのユーザーをチームから削除しますか？')) {
             // 削除処理中のフラグを立てる
            setIsDeleting(true);

            setData((prevData) => ({
                ...prevData,
                // team_idを引数のteamIdで設定
                team_id: teamId,  
            }));
        }
    };

    // ユーザーをチームから削除（脱退）する処理
    useEffect(() => {
        if (isDeleting && data.team_id !== null) {
            destroy(route('team.destroy', { team_id: data.team_id, user_id: data.user_id }), {
                preserveScroll: true,
                onSuccess: () => {
                    // 削除が成功したらフラグをリセット
                    setIsDeleting(false);
                },
                onError: () => {
                    // 削除が失敗したらフラグをリセット
                    setIsDeleting(false); 
                },
            });
        }
        // data.team_idが更新されたときに実行 
    }, [data.team_id, isDeleting]);  

    // ユーザーがすでに所属しているチームのIDリストを作成
    const userTeamIds = userTeamList.map(team => team.id);

    // セレクトボックスで表示するチームリストをフィルタリング
    const availableTeamList = selectAllTeamList.filter(team => !userTeamIds.includes(team.id));

    // セレクトボックスの値の変更を検知する関数
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        // selectの値をuseFormで管理しているチームIDにセット
        setData('team_id', Number(event.target.value));
    };

    // チーム登録処理
    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (data.team_id !== null) {
            // 登録処理中は削除処理フラグをリセット
            setIsDeleting(false); 

            post(route("team.store", { id: data.user_id }), {
                preserveScroll: true,
                onSuccess: () => {
                    // 成功時にリセット
                    reset();
                },
            });
        }
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
        <AuthenticatedLayout user={auth.user}>
            <div className="pt-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        {/* ユーザー情報セクション */}
                        <section className="pl-10">
                            <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
                                ユーザー情報
                            </h2>
                            <dl className="space-y-4">
                                <div className="flex">
                                    <dt className="text-lg font-medium text-gray-500">ユーザーID：</dt>
                                    <dd className="ml-3 text-lg text-gray-900">{userIncludeTeamInfo.id}</dd>
                                </div>
                                <div className="flex">
                                    <dt className="text-lg font-medium text-gray-500">ユーザー名：</dt>
                                    <dd className="ml-3 text-lg text-gray-900">{userIncludeTeamInfo.name}</dd>
                                </div>
                                <div className="flex">
                                    <dt className="text-lg font-medium text-gray-500">メールアドレス：</dt>
                                    <dd className="ml-3 text-lg text-gray-900">{userIncludeTeamInfo.email}</dd>
                                </div>
                            </dl>
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
                            <div className="pt-6">
                                { userTeamList.length > 0 ? (
                                    <h2 className="text-l font-bold text-gray-700">
                                        ユーザー所属チーム一覧
                                    </h2>
                                ) : (null)}
                            </div>
                            <div className="text-gray-900">
                                { userTeamList.length > 0 ? (
                                    <table className="w-2/4 border-separate border border-slate-400">
                                        <thead className="bg-emerald-500">
                                            <tr>
                                                <th className="border border-slate-300 text-white px-2 py-2">
                                                    チームID
                                                </th>
                                                <th className="border border-slate-300 text-white px-2 py-2">
                                                    チーム名
                                                </th>
                                                <th className="border border-slate-300 text-white px-2 py-2">
                                                    チーム所属開始日
                                                </th>
                                                <th className="border border-slate-300 text-white px-2 py-2">
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { userTeamList
                                                // チームid順にソート
                                                .sort((a, b) => a.id - b.id) 
                                                .map((team: Team) => (
                                                    <tr key={team.id}>
                                                        <td className="border border-slate-300 px-2 py-2">
                                                            {team.id}
                                                        </td>
                                                        <td className="border border-slate-300 px-2 py-2">
                                                            {team.name}
                                                        </td>
                                                        <td className="border border-slate-300 px-2 py-2">
                                                            {new Date(
                                                                team.created_at
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
                                                            {!auth.user.is_admin && auth.user.id != 1 ?  null : (
                                                                <DangerButton onClick={() => deleteUserFromTeam(team.id)} disabled={processing}>
                                                                    チーム脱退
                                                                </DangerButton>
                                                            )}
                                                        </td>
                                                    </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : ( null )}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
    
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg py-6">
                        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
                            チーム登録
                        </h2>
                        <form onSubmit={submit} className="flex items-center justify-center w-4/5 mx-auto space-x-4">
                            <select 
                                onChange={handleChange} 
                                value={data.team_id ?? ''} 
                                className="w-3/4 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                            >
                                <option value="" disabled>選択してください</option>
                                {availableTeamList.map(option => (
                                    <option key={option.id} value={option.id}>
                                        {option.name}
                                    </option>
                                ))}
                            </select>
                            <button
                                disabled={data.team_id === null}
                                className="w-1/4 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                チームに登録する
                            </button>
                        </form>
                    </div>
                </div>               
            </div>
        </AuthenticatedLayout>
    );
}