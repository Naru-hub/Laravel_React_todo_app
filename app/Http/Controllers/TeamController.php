<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;
use App\Models\User;

class TeamController extends Controller
{
    // ユーザー所属チーム一覧・編集ページを表示
    public function show($userId)
    {
        // 管理者権限がない場合は操作を拒否
        Gate::authorize('isAdmin');

        // 対象ユーザーの所属チームを情報を取得
        $userTeamInfo = User::with('teams')->findOrFail($userId);

        return Inertia::render('User/ListAndEditTeamsForm', [
            'userTeamInfo' => $userTeamInfo,
            'message' => session('message')
        ]);
    }
}
