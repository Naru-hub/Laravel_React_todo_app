<?php

namespace APP\Services;

use Illuminate\Support\Facades\Auth;
use App\Models\Todo;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class TodoService
{
    /**
     * Todo一覧を取得
     */
    public function getTodoListByUser()
    {
        try {
            // ログインしたユーザーのTodoのみを取得
            $user = Auth::user();
            $todos = Todo::where('user_id', $user->id)->get();
            return $todos;
        } catch (\Exception $e) {
            // エラーメッセージをログに記録
            Log::error($e->getMessage());
            throw new \Exception('Todoの一覧取得中にエラーが発生しました');
        }
    }

    /**
     * Todoを作成
     */
    public function createTodo($request)
    {
        try {
            // 新規のTodoモデルを作成
            $todo = new Todo();

            // Todoの各項目をTodoモデルに設定
            $todo->user_id = Auth::id(); // ログインしているuser_idを設定
            $todo->title = $request->title;
            $todo->description = $request->description;

            // DBにデータを登録
            $todo->save();
        } catch (\Exception $e) {
            // エラーメッセージをログに記録
            Log::error($e->getMessage());
            throw new \Exception('Todoの作成中にエラーが発生しました');
        }
    }

    /**
     * Todoの詳細を取得
     */
    public function getTodoById($id)
    {
        try {
            // Todo一覧のリンクから選択したTodoの詳細情報を取得
            return Todo::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            // エラーメッセージをログに記録
            Log::error($e->getMessage());
            throw new \Exception('指定されたTodoが見つかりませんでした');
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            throw new \Exception('Todoの取得中にエラーが発生しました。');
        }
    }

    /**
     * Todoを更新
     */
    public function updateTodo($id, $request)
    {
        try {
            // IDに紐づくTodoを取得
            $todo = Todo::findOrFail($id);

            // Todoの各項目をTodoモデルに設定
            $todo->title = $request->title;
            $todo->description = $request->description;
            $todo->is_completed = $request->is_completed;

            // DBのTodoの値を更新
            $todo->save();
        } catch (ModelNotFoundException $e) {
            // エラーメッセージをログに記録
            Log::error($e->getMessage());
            throw new \Exception('指定されたTodoが見つかりませんでした');
        } catch (\Exception $e) {
            // エラーメッセージをログに記録
            Log::error($e->getMessage());
            throw new \Exception('Todoの更新中にエラーが発生しました');
        }
    }

    /**
     * Todoを削除
     */
    public function deleteTodo($id)
    {
        try {
            //  IDに紐づくTodoを取得
            $todo = Todo::findOrFail($id);

            // Todoを削除
            $todo->delete();
        } catch (ModelNotFoundException $e) {
            Log::error($e->getMessage());
            throw new \Exception('指定されたTodoが見つかりませんでした');
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            throw new \Exception('Todoの削除中にエラーが発生しました');
        }
    }
}