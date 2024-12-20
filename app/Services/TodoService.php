<?php

namespace APP\Services;

use Illuminate\Support\Facades\Auth;
use App\Models\Todo;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Carbon\Carbon;

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
            // team_idがnullの個人ユーザーのタスクだけを取得
            $todos = Todo::where('user_id', $user->id)->where('team_id', null)->get();
            return $todos;
        } catch (\Exception $e) {
            // エラーメッセージをログに記録
            Log::error($e->getMessage());
            throw new \Exception();
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

            // リクエストデータから日付を取得し、MySQLのDATETIME形式に変換
            $start_date_format = isset($request->start_date) ? Carbon::parse($request->start_date)->format('Y-m-d H:i:s') : null;
            $due_date_format = isset($request->due_date) ? Carbon::parse($request->due_date)->format('Y-m-d H:i:s') : null;

            // Todoの各項目をTodoモデルに設定
            $todo->user_id = Auth::id(); // ログインしているuser_idを設定
            $todo->title = $request->title;
            $todo->description = $request->description;
            $todo->start_date =  $start_date_format;
            $todo->due_date = $due_date_format;

            // DBにデータを登録
            $todo->save();
        } catch (\Exception $e) {
            // エラーメッセージをログに記録
            Log::error($e->getMessage());
            throw new \Exception();
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

            // リクエストデータから日付を取得し、MySQLのDATETIME形式に変換
            $start_date_format = isset($request->start_date) ? Carbon::parse($request->start_date)->format('Y-m-d H:i:s') : null;
            $due_date_format = isset($request->due_date) ? Carbon::parse($request->due_date)->format('Y-m-d H:i:s') : null;

            // Todoの各項目をTodoモデルに設定
            $todo->title = $request->title;
            $todo->description = $request->description;
            $todo->is_completed = $request->is_completed;
            $todo->start_date = $start_date_format;
            $todo->due_date = $due_date_format;

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

    /**
     * dashboardのTodo一覧(本日の予定)を取得
     */
    public function getTodayTodoList()
    {
        try {
            // ログインしたユーザーのTodoのみを取得
            $user = Auth::user();
            $today = Carbon::today();
            $todayTodoList = Todo::where('user_id', $user->id)
                ->where('start_date', '<=', $today)
                ->where('due_date', '>=', $today)
                ->where('is_completed', false)
                // team_idがnullの個人のTodoだけを取得
                ->whereNull('team_id')
                ->get();
            return $todayTodoList;
        } catch (\Exception $e) {
            // エラーメッセージをログに記録
            Log::error($e->getMessage());
            throw new \Exception('今日の予定のTodoの取得中にエラーが発生しました。');
        }
    }
}
