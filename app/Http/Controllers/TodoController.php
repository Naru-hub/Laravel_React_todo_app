<?php

namespace App\Http\Controllers;

use App\Http\Requests\Todo\StoreRequest;
use App\Models\Todo;
use Illuminate\Http\Request;
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
        // 一覧のリンクから選択したtodoの詳細情報を取得
        $todo = Todo::find($id);
        return Inertia::render('Todo/Detail', ['todo' => $todo]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Todo $todo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Todo $todo)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Todo $todo)
    {
        //
    }
}
