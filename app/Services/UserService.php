<?php

namespace App\Services;

use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Carbon\Carbon;
use Illuminate\Support\Facades\Gate;

class UserService
{
    /**
     * User一覧を取得
     */
    public function getUserList()
    {
        try {

            // ユーザーの閲覧権限を確認
            Gate::authorize('viewAny', User::class);

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
    // public function createTodo($request)
    // {
    //     try {
    //         // 新規のTodoモデルを作成
    //         $todo = new Todo();

    //         // リクエストデータから日付を取得し、MySQLのDATETIME形式に変換
    //         $start_date_format = isset($request->start_date) ? Carbon::parse($request->start_date)->format('Y-m-d H:i:s') : null;
    //         $due_date_format = isset($request->due_date) ? Carbon::parse($request->due_date)->format('Y-m-d H:i:s') : null;

    //         // Todoの各項目をTodoモデルに設定
    //         $todo->user_id = Auth::id(); // ログインしているuser_idを設定
    //         $todo->title = $request->title;
    //         $todo->description = $request->description;
    //         $todo->start_date =  $start_date_format;
    //         $todo->due_date = $due_date_format;

    //         // DBにデータを登録
    //         $todo->save();
    //     } catch (\Exception $e) {
    //         // エラーメッセージをログに記録
    //         Log::error($e->getMessage());
    //         throw new \Exception();
    //     }
    // }

    /**
     * Userの詳細を取得
     */
    // public function getTodoById($id)
    // {
    //     try {
    //         // Todo一覧のリンクから選択したTodoの詳細情報を取得
    //         return Todo::findOrFail($id);
    //     } catch (ModelNotFoundException $e) {
    //         // エラーメッセージをログに記録
    //         Log::error($e->getMessage());
    //         throw new \Exception('指定されたTodoが見つかりませんでした');
    //     } catch (\Exception $e) {
    //         Log::error($e->getMessage());
    //         throw new \Exception('Todoの取得中にエラーが発生しました。');
    //     }
    // }

    /**
     * Userを更新
     */
    // public function updateTodo($id, $request)
    // {
    //     try {
    //         // IDに紐づくTodoを取得
    //         $todo = Todo::findOrFail($id);

    //         // リクエストデータから日付を取得し、MySQLのDATETIME形式に変換
    //         $start_date_format = isset($request->start_date) ? Carbon::parse($request->start_date)->format('Y-m-d H:i:s') : null;
    //         $due_date_format = isset($request->due_date) ? Carbon::parse($request->due_date)->format('Y-m-d H:i:s') : null;

    //         // Todoの各項目をTodoモデルに設定
    //         $todo->title = $request->title;
    //         $todo->description = $request->description;
    //         $todo->is_completed = $request->is_completed;
    //         $todo->start_date = $start_date_format;
    //         $todo->due_date = $due_date_format;

    //         // DBのTodoの値を更新
    //         $todo->save();
    //     } catch (ModelNotFoundException $e) {
    //         // エラーメッセージをログに記録
    //         Log::error($e->getMessage());
    //         throw new \Exception('指定されたTodoが見つかりませんでした');
    //     } catch (\Exception $e) {
    //         // エラーメッセージをログに記録
    //         Log::error($e->getMessage());
    //         throw new \Exception('Todoの更新中にエラーが発生しました');
    //     }
    // }

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
