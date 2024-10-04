<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;


class UserController extends Controller
{
    /**
     * ユーザー一覧
     */
    public function index()
    {

        // ユーザーの閲覧権限を確認
        Gate::authorize('viewAny', User::class);

        // 全ユーザーを取得
        $users = User::all();
        return Inertia::render('Todo/Index', [
            'users' => $users,
        ]);
    }
}
