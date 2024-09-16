<?php

namespace App\Http\Controllers;

use App\Http\Requests\Todo\StoreRequest;
use App\Http\Requests\Todo\UpdateRequest;
use Inertia\Inertia;
use App\Services\TodoService;

class TodoController extends Controller
{
    /**
     * Todo一覧
     */
    public function index(TodoService $todoService)
    {
        try {
            $todos = $todoService->getTodoListByUser();

            // 取得したTodo一覧を返却
            return Inertia::render('Todo/Index', [
                'todos' => $todos,
                'message' => session('message')
            ]);
        } catch (\Exception $e) {
            // エラーメッセージをセッションに保存して、ユーザーに通知
            return redirect()->back()->with('errorMsg', 'Todoの取得中にエラーが発生しました。');
        }
    }

    /**
     * Todo作成・保存
     */
    public function store(StoreRequest $request, TodoService $todoService)
    {
        try {
            $todoService->createTodo($request);
            return redirect('Todo/Index')->with([
                'message' => 'Todoを作成しました'
            ]);
        } catch (\Exception $e) {
            // エラーメッセージをセッションに保存して、ユーザーに通知
            return redirect()->back()->with([
                'errorMsg' => 'Todoの作成中にエラーが発生しました'
            ]);
        }
    }

    /**
     * Todo詳細
     */
    public function show($id, TodoService $todoService)
    {
        try {
            $todo = $todoService->getTodoById($id);
            return Inertia::render('Todo/Detail', ['todo' => $todo]);
        } catch (\Exception $e) {
            // エラーメッセージをセッションに保存して、ユーザーに通知
            return redirect()->back()->with([
                'errorMsg' => $e->getMessage()
            ]);
        }
    }

    /**
     * Todo編集・保存
     */
    public function update(UpdateRequest $request, $id, TodoService $todoService)
    {
        try {
            $todoService->updateTodo($id, $request);
            return redirect('Todo/Index')->with([
                'message' => 'Todoを保存しました'
            ]);
        } catch (\Exception $e) {
            // エラーメッセージをセッションに保存して、ユーザーに通知
            return redirect()->back()->with([
                'errorMsg' => $e->getMessage()
            ]);
        }
    }

    /**
     * Todo削除
     */
    public function destroy($id, TodoService $todoService)
    {
        try {
            $todoService->deleteTodo($id);
            return redirect('Todo/Index')->with([
                'message' => 'Todoを削除しました'
            ]);
        } catch (\Exception $e) {
            // エラーメッセージをセッションに保存して、ユーザーに通知
            return redirect()->back()->with([
                'errorMsg' => $e->getMessage()
            ]);
        }
    }
}
