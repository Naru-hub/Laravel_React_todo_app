<?php

namespace App\Services;

use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Hash;

class UserService
{
    /**
     * User一覧を取得
     */
    public function getUserList()
    {
        try {
            // 全ユーザーを取得
            $users = User::all();
            return $users;
        } catch (\Exception $e) {
            // エラーメッセージをログに記録
            Log::error($e->getMessage());
            throw new \Exception();
        }
    }

    /**
     * Userを作成
     */
    public function createUser($request)
    {
        try {
            // 新規のユーザーモデルを作成
            $user = new User();

            // Userの各項目をUserモデルに設定
            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = Hash::make($request->password);
            $user->is_admin = $request->is_admin ?? false;

            // DBにデータを登録
            $user->save();
        } catch (\Exception $e) {
            // エラーメッセージをログに記録
            Log::error($e->getMessage());
            throw new \Exception();
        }
    }

    /**
     * Userを削除
     */
    public function deleteUser($id)
    {
        try {
            // IDに紐づくUserを取得
            $user = User::findOrFail($id);

            // Userを削除
            $user->delete();
        } catch (ModelNotFoundException $e) {
            Log::error($e->getMessage());
            throw new \Exception('指定されたユーザーが見つかりませんでした');
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            throw new \Exception('ユーザーの削除中にエラーが発生しました');
        }
    }
}
