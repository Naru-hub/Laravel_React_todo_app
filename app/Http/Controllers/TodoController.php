<?php

namespace App\Http\Controllers;

use App\Http\Requests\Todo\StoreRequest;
use App\Models\Todo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // todoを全て取得
        $todos = Todo::all();
        // 取得した全てのtodoを返却
        return Inertia::render('Todo/Index', [
            'todos' => $todos,
            'message' => session('message')
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        // 新規のTodoモデルを作成
        $todo = new Todo();
        // todoの各項目をTodoモデルに設定
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
     * Display the specified resource.
     */
    public function show(Todo $todo)
    {
        //
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
