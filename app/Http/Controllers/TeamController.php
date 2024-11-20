<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;
use App\Models\User;
use App\Models\Team;

class TeamController extends Controller
{
    // ユーザー所属チーム一覧・編集ページを表示
    public function show($userId)
    {
        // 管理者権限がない場合は操作を拒否
        Gate::authorize('isAdmin');

        // チームリストを取得
        $allTeamList = Team::all();

        // 対象ユーザーの所属チームを情報を取得
        $userTeamInfo = User::with('teams')->findOrFail($userId);

        return Inertia::render('User/ListAndEditTeamsForm', [
            'allTeamList' => $allTeamList,
            'userTeamInfo' => $userTeamInfo,
            'message' => session('message')
        ]);
    }

    /**
     * チーム登録
     */
    public function store()
    {
        try {
            // 管理者権限がない場合は操作を拒否
            Gate::authorize('isAdmin');

            // ユーザーのチーム登録処理
            // $userService->createUser($request);

            return redirect('team.index')->with([
                'message' => 'ユーザーをチームに登録しました'
            ]);
        } catch (\Exception $e) {
            // エラーメッセージをセッションに保存して、ユーザーに通知
            return redirect()->back()->with([
                'errorMsg' => 'ユーザーのチーム登録中にエラーが発生しました'
            ]);
        }
    }
}
