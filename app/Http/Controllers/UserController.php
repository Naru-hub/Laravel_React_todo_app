<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\UserStoreRequest;
use Illuminate\Http\Request;
use App\Services\UserService;
use Illuminate\Support\Facades\Gate;

use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * ユーザー一覧
     */
    public function index(UserService $userService)
    {
        try {
            // 管理者権限がない場合は操作を拒否
            Gate::authorize('isAdmin');

            // ユーザー一覧情報を取得
            $users = $userService->getUserList();

            return Inertia::render('User/Index', [
                'users' => $users,
                'message' => session('message')
            ]);
        } catch (\Exception $e) {
            // エラーメッセージをセッションに保存して、ユーザーに通知
            return redirect()->back()->with('errorMsg', 'User一覧を取得中にエラーが発生しました。');
        }
    }

    /**
     * ユーザー作成フォームを表示
     */
    public function create()
    {
        // 管理者権限がない場合はアクセス拒否
        Gate::authorize('isAdmin');

        return inertia('User/UserRegister');
    }

    /**
     * ユーザー登録
     */
    public function store(UserStoreRequest $request, UserService $userService)
    {
        try {
            // 管理者権限がない場合は操作を拒否
            Gate::authorize('isAdmin');

            // ユーザー登録処理
            $userService->createUser($request);

            return redirect('users')->with([
                'message' => 'ユーザーを登録しました'
            ]);
        } catch (\Exception $e) {
            // エラーメッセージをセッションに保存して、ユーザーに通知
            return redirect()->back()->with([
                'errorMsg' => 'ユーザーの作成中にエラーが発生しました'
            ]);
        }
    }


    /**
     * User削除
     */
    public function destroy($id, UserService $userService)
    {
        try {
            // 管理者権限がない場合は操作を拒否
            Gate::authorize('isAdmin');

            // ユーザーを削除
            $userService->deleteUser($id);

            return redirect('users')->with([
                'message' => 'ユーザーを削除しました'
            ]);
        } catch (\Exception $e) {
            // エラーメッセージをセッションに保存して、ユーザーに通知
            return redirect()->back()->with([
                'errorMsg' => $e->getMessage()
            ]);
        }
    }
}
