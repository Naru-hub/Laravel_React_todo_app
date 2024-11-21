<?php

namespace App\Services;

use App\Models\Team;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Hash;

class TeamService
{
    /**
     * ユーザー所属チーム一覧を取得
     */
    public function getUserInTeamList($userId)
    {
        try {

            // 対象ユーザーの所属チーム情報を取得
            $userTeamInfo = User::with('teams')->findOrFail($userId);

            return $userTeamInfo;
        } catch (\Exception $e) {
            // エラーメッセージをログに記録
            Log::error($e->getMessage());
            throw new \Exception();
        }
    }

    /**
     * 全チーム一覧を取得
     */
    public function getTeamList()
    {
        try {

            // チームリストを取得
            $allTeamList = Team::all();

            return $allTeamList;
        } catch (\Exception $e) {
            // エラーメッセージをログに記録
            Log::error($e->getMessage());
            throw new \Exception();
        }
    }

    /*
     * UserをTeamに所属させる
     */
    public function addUserToTeam($request)
    {
        try {
            // ユーザーを取得
            $user = User::findOrFail($request->user_id);

            // DBにデータを登録
            $user->teams()->syncWithoutDetaching($request->team_id);

            return $user->id;
        } catch (\Exception $e) {
            // エラーメッセージをログに記録
            Log::error($e->getMessage());
            throw new \Exception();
        }
    }

    /**
     * Teamからuserを削除(脱退処理)
     */
    public function removeUserFromTeam($id)
    {
        // try {
        //     // IDに紐づくUserを取得
        //     $user = User::findOrFail($id);

        //     // Userを削除
        //     $user->delete();
        // } catch (ModelNotFoundException $e) {
        //     Log::error($e->getMessage());
        //     throw new \Exception('指定されたユーザーが見つかりませんでした');
        // } catch (\Exception $e) {
        //     Log::error($e->getMessage());
        //     throw new \Exception('ユーザーの削除中にエラーが発生しました');
        // }
    }
}
