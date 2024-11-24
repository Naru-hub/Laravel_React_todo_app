<?php

namespace App\Services;

use App\Models\Team;
use App\Models\User;
use App\Models\Todo;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class TeamService
{
    /**
     * ユーザー情報及び所属チーム一覧を取得
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

            // ユーザーIDを返す
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
    public function removeUserFromTeam($request)
    {
        try {
            // ユーザーとチームを取得
            $user = User::findOrFail($request->user_id);
            $team = Team::findOrFail($request->team_id);

            // チームからユーザーを削除
            $team->users()->detach($user->id);

            // ユーザーIDを返す
            return $user->id;
        } catch (ModelNotFoundException $e) {
            Log::error($e->getMessage());
            throw new \Exception('指定されたユーザーまたはチームが見つかりませんでした');
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            throw new \Exception('チームからユーザーを削除中にエラーが発生しました');
        }
    }

    /**
     * ユーザー所属チーム内の他ユーザーのTodo一覧を取得する
     */
    public function getTeamTodos()
    {
        try {
            // 現在の認証ユーザーを取得
            $user = Auth::user();

            // チーム内の他ユーザーのTodoを取得
            $todos = Todo::query()
                ->join('team_user as tu', 'todos.user_id', '=', 'tu.user_id')
                ->join('teams', 'tu.team_id', '=', 'teams.id')
                ->join('users', 'todos.user_id', '=', 'users.id')
                ->whereIn('tu.team_id', function ($query) use ($user) {
                    $query->select('team_id')
                        ->from('team_user')
                        ->where('user_id', $user->id); // ログインユーザーの所属するチームを取得
                })
                ->where('todos.user_id', '!=', $user->id) // ログインユーザー自身のTodoは除外
                ->select(
                    'todos.*',
                    'teams.id as team_id', // チームID
                    'teams.name as team_name', // チーム名
                    'users.name as user_name' // 他ユーザーの名前
                )
                ->get()
                ->groupBy('team_id'); // チームIDでグループ化

            // ユーザー所属のチーム別に他ユーザーのTodoを返す
            return $todos;
        } catch (\Exception $e) {
            // エラーメッセージをログに記録
            Log::error($e->getMessage());
            throw new \Exception();
        }
    }
}
