import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps, Team, UserInTeamInfo} from "@/types";

export default function ListAndEditTeamsForm ({ auth, message, userTeamInfo }: PageProps) {
    // User・User所属チーム情報の型宣言
    const userIncludeTeamInfo = userTeamInfo as UserInTeamInfo;
    // User所属チーム一覧情報の型宣言
    const userTeamList = userIncludeTeamInfo.teams;
    
    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">            
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        ユーザー所属チーム一覧
                    </h2>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="py-3 px-6">
                                {/* {showActionMessage && actionMessage && (
                                    <div className="mt-2 text-green-700 bg-green-100 p-2 rounded-lg text-center font-bold">
                                        {actionMessage}
                                    </div>
                                )}
                                {showErrorMessage && errorMessage && (
                                    <div className="mt-2 text-red-700 bg-red-100 p-2 rounded-lg text-center font-bold">
                                        {errorMessage}
                                    </div>
                                )} */}
                            </div>
                            <div className="p-6 text-gray-900">
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
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { userTeamList.map((team: Team) => (
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
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p className="text-center">
                                        表示できるユーザー所属チームデータがありません
                                    </p>
                                )}
                        </div>
                    </div>
                </div>
            </div>
    
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        ユーザー所属チーム編集フォーム
                    </h2>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">

                    </div>
                </div>               
            </div>
        </AuthenticatedLayout>
        
        
    );
}