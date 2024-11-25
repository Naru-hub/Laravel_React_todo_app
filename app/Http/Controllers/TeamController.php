<?php

namespace App\Http\Controllers;

use App\Http\Requests\Team\TeamStoreRequest;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Auth;
use App\Services\TeamService;
use Illuminate\Http\Request;
use App\Services\TodoService;

class TeamController extends Controller
{
    /**
     * ユーザー所属チーム一覧・編集ページを表示
     */
    public function show($userId, TeamService $teamService)
    {
        // 管理者権限がない場合は操作を拒否
        Gate::authorize('isAdmin');

        // チームリストを取得
        $allTeamList = $teamService->getTeamList();

        // 対象ユーザーの所属チーム情報を取得
        $userTeamInfo = $teamService->getUserInTeamList($userId);

        return Inertia::render('User/ListAndEditTeamsForm', [
            'allTeamList' => $allTeamList,
            'userTeamInfo' => $userTeamInfo,
            'message' => session('message')
        ]);
    }

    /**
     * チーム登録
     */
    public function store(TeamStoreRequest $request, TeamService $teamService)
    {
        try {
            // 管理者権限がない場合は操作を拒否
            Gate::authorize('isAdmin');

            // ユーザーのチーム登録処理
            $userId = $teamService->addUserToTeam($request);

            return redirect()->route('team.index', ['id' => $userId])->with([
                'message' => 'ユーザーをチームに登録しました'
            ]);
        } catch (\Exception $e) {
            // エラーメッセージをセッションに保存して、ユーザーに通知
            return redirect()->back()->with([
                'errorMsg' => 'ユーザーのチーム登録中にエラーが発生しました'
            ]);
        }
    }

    /**
     * ユーザーをチームから削除
     */
    public function destroy(Request $request, TeamService $teamService)
    {
        try {
            // 管理者権限がない場合は操作を拒否
            Gate::authorize('isAdmin');

            // チームからユーザーを削除する処理
            $userId = $teamService->removeUserFromTeam($request);

            return redirect()->route('team.index', ['id' => $userId])->with([
                'message' => 'チームからユーザーを削除しました'
            ]);
        } catch (\Exception $e) {
            // エラーメッセージをセッションに保存して、ユーザーに通知
            return redirect()->back()->with([
                'errorMsg' => 'チームからユーザーを削除中にエラーが発生しました'
            ]);
        }
    }

    /**
     * 所属チーム他ユーザーのTodo一覧を取得・表示
     */
    public function TeamUserTodoIndex(TeamService $teamService)
    {
        try {
            // 対象ユーザーの所属チーム情報を取得
            $userTeamInfo = $teamService->getUserInTeamList(Auth::user()->id);

            // 所属チーム他ユーザーのTodo一覧を取得
            $anotherUserTodoListByTeam = $teamService->getTeamTodos();

            // 取得したTodo一覧を返却
            return Inertia::render('Team/Index', [
                'anotherUserTodoListByTeam' => $anotherUserTodoListByTeam,
                'userTeamInfo' => $userTeamInfo,
                'message' => session('message')
            ]);
        } catch (\Exception $e) {
            // エラーメッセージをセッションに保存して、ユーザーに通知
            return redirect()->back()->with('errorMsg', '所属チーム他ユーザーのTodo一覧の取得中にエラーが発生しました。');
        }
    }
}
