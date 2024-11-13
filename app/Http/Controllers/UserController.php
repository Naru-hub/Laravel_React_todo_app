<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\UserService;

use Inertia\Inertia;



class UserController extends Controller
{
    /**
     * ユーザー一覧
     */
    public function index(UserService $userService)
    {
        try {
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
     * User削除
     */
    public function destroy($id, UserService $userService)
    {
        try {
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
