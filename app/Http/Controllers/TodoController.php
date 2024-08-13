<?php

namespace App\Http\Controllers;

use App\Http\Requests\Todo\StoreRequest;
use App\Http\Requests\Todo\UpdateRequest;
use App\Models\Todo;
use Inertia\Inertia;

class TodoController extends Controller
{
    /**
     * Todo一覧
     */
    public function index()
    {
        // Todoを全て取得
        $todos = Todo::all();

        // 取得した全てのTodoを返却
        return Inertia::render('Todo/Index', [
            'todos' => $todos,
            'message' => session('message')
        ]);
    }

    /**
     * Todo作成・保存
     */
    public function store(StoreRequest $request)
    {
        // 新規のTodoモデルを作成
        $todo = new Todo();

        // Todoの各項目をTodoモデルに設定
        // user_idをログインしているuserに設定
        $userId = \Illuminate\Support\Facades\Auth::id();
        $todo->user_id = $userId;
        $todo->title = $request->get('title');
        $todo->description = $request->get('description');

        // DBにデータを登録
        $todo->save();
        return redirect('Todo/Index')->with([
            'message' => 'Todoを作成しました'
        ]);
    }

    /**
     * Todo詳細
     */
    public function show($id)
    {
        // Todo一覧のリンクから選択したTodoの詳細情報を取得
        $todo = Todo::find($id);
        return Inertia::render('Todo/Detail', ['todo' => $todo]);
    }

    /**
     * Todo編集・保存
     */
    public function update(UpdateRequest $request, $id)
    {
        // IDに紐づくTodoを取得
        $todo = Todo::find($id);

        // Todoの各項目をTodoモデルに設定
        $todo->title = $request->get('title');
        $todo->description = $request->get('description');
        $todo->is_completed = $request->get('is_completed');

        // DBのTodoの値を更新
        $todo->save();
        return redirect('Todo/Index')->with([
            'message' => 'Todoを保存しました'
        ]);
    }

    /**
     * Todo削除
     */
    public function destroy($id)
    {
        //  IDに紐づくTodoを取得
        $todo = Todo::find($id);

        // Todoを削除
        $todo->delete();
        return redirect('Todo/Index')->with([
            'message' => 'Todoを削除しました'
        ]);
    }
}
