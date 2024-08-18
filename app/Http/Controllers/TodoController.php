<?php

namespace App\Http\Controllers;

use App\Http\Requests\Todo\StoreRequest;
use App\Http\Requests\Todo\UpdateRequest;
use App\Models\Todo;
use Exception;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class TodoController extends Controller
{
    /**
     * Todo一覧
     */
    public function index()
    {
        try {
            // ログインしたユーザーのTodoのみを取得
            $user = Auth::user();
            $todos = Todo::where('user_id', $user->id)->get();

            // 取得したTodoを返却
            return Inertia::render('Todo/Index', [
                'todos' => $todos,
                'message' => session('message')
            ]);
        } catch (\Exception $e) {
            // エラーメッセージをログに記録
            Log::error($e->getMessage());

            // エラーメッセージをセッションに保存して、ユーザーに通知
            return redirect()->back()->with([
                'errorMsg' => 'Todoの一覧取得中にエラーが発生しました'
            ]);
        }
    }

    /**
     * Todo作成・保存
     */
    public function store(StoreRequest $request)
    {
        try {
            // 新規のTodoモデルを作成
            $todo = new Todo();

            // Todoの各項目をTodoモデルに設定
            // user_idをログインしているuserに設定
            $userId = Auth::id();
            $todo->user_id = $userId;
            $todo->title = $request->get('title');
            $todo->description = $request->get('description');

            // DBにデータを登録
            $todo->save();

            return redirect('Todo/Index')->with([
                'message' => 'Todoを作成しました'
            ]);
        } catch (\Exception $e) {
            // エラーメッセージをログに記録
            Log::error($e->getMessage());

            // エラーメッセージをセッションに保存して、ユーザーに通知
            return redirect()->back()->with([
                'errorMsg' => 'Todoの作成中にエラーが発生しました'
            ]);
        }
    }

    /**
     * Todo詳細
     */
    public function show($id)
    {
        try {
            // Todo一覧のリンクから選択したTodoの詳細情報を取得
            $todo = Todo::findOrFail($id);
            return Inertia::render('Todo/Detail', ['todo' => $todo]);
        } catch (ModelNotFoundException $e) {
            // エラーメッセージをログに記録
            Log::error($e->getMessage());

            // エラーメッセージをセッションに保存して、ユーザーに通知
            return redirect()->back()->with([
                'errorMsg' => '指定されたTodoが見つかりませんでした。'
            ]);
        } catch (\Exception $e) {
            // エラーメッセージをログに記録
            Log::error($e->getMessage());

            // エラーメッセージをセッションに保存して、ユーザーに通知
            return redirect()->back()->with([
                'errorMsg' => 'Todoの詳細表示中にエラーが発生しました。'
            ]);
        }
    }

    /**
     * Todo編集・保存
     */
    public function update(UpdateRequest $request, $id)
    {
        try {
            // IDに紐づくTodoを取得
            $todo = Todo::findOrFail($id);

            // Todoの各項目をTodoモデルに設定
            $todo->title = $request->get('title');
            $todo->description = $request->get('description');
            $todo->is_completed = $request->get('is_completed');

            // DBのTodoの値を更新
            $todo->save();
            return redirect('Todo/Index')->with([
                'message' => 'Todoを保存しました'
            ]);
        } catch (ModelNotFoundException $e) {
            // エラーメッセージをログに記録
            Log::error($e->getMessage());

            // エラーメッセージをセッションに保存して、ユーザーに通知
            return redirect()->back()->with([
                'errorMsg' => '指定されたTodoが見つかりませんでした。'
            ]);
        } catch (\Exception $e) {
            // エラーメッセージをログに記録
            Log::error($e->getMessage());

            // エラーメッセージをセッションに保存して、ユーザーに通知
            return redirect()->back()->with([
                'errorMsg' => 'Todoの更新中にエラーが発生しました。'
            ]);
        }
    }

    /**
     * Todo削除
     */
    public function destroy($id)
    {
        try {
            //  IDに紐づくTodoを取得
            $todo = Todo::findOrFail($id);

            // Todoを削除
            $todo->delete();
            return redirect('Todo/Index')->with([
                'message' => 'Todoを削除しました'
            ]);
        } catch (ModelNotFoundException $e) {
             // エラーメッセージをログに記録
            Log::error($e->getMessage());

             // エラーメッセージをセッションに保存して、ユーザーに通知
            return redirect()->back()->with([
                'errorMsg' => '指定されたTodoが見つかりませんでした。'
            ]);
        } catch (\Exception $e) {
             // エラーメッセージをログに記録
            Log::error($e->getMessage());

            // エラーメッセージをセッションに保存して、ユーザーに通知
            return redirect()->back()->with([
                'errorMsg' => 'Todoの削除中にエラーが発生しました。'
            ]);
        }
    }
}
