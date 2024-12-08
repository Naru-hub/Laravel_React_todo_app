<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TodoController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TeamController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('Dashboard', [TodoController::class, 'dashboardIndex'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    /**
     * 管理者用(ルーティングを設定)
     */
    // ユーザー一覧
    Route::get('/users', [UserController::class, 'index'])->name('user.index');
    // ユーザー登録
    Route::get('/user/create', [UserController::class, 'create'])->name('user.create');
    Route::post('/user/store', [UserController::class, 'store'])->name('user.store');
    // ユーザー削除
    Route::delete('/user/destroy/{id}', [UserController::class, 'destroy'])->name('user.destroy');

    // ユーザーの所属チーム一覧
    Route::get('/user/{id}/teams', [TeamController::class, 'show'])->name('team.index');
    // ユーザーのチーム登録
    Route::post('/user/{id}/team/store', [TeamController::class, 'userTeamStore'])->name('team.store');
    // ユーザーのチーム脱退
    Route::delete('/user/team/remove', [TeamController::class, 'userTeamDestroy'])->name('team.destroy');

    // チームTodo一覧
    Route::get('/team/todo/index', [TeamController::class, 'teamTodoIndex'])->name('team.todo.index');
    // チームTodo詳細
    Route::get('/team/todo/detail/{id}', [TeamController::class, 'teamTodoShow'])->name('team.todo.detail');
    // チームTodo作成
    Route::post('/team/todo/store', [TeamController::class, 'teamTodoStore'])->name('team.todo.store');
    // チームTodo編集
    Route::put('/team/todo/update/{id}', [TeamController::class, 'teamTodoUpdate'])->name('team.todo.update');
    // チームTodo削除
    Route::delete('/team/todo/destroy/{id}', [TeamController::class, 'teamTodoDestroy'])->name('team.todo.destroy');

    /**
     * ユーザー用(ルーティングを設定)
     */
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    /** Todoのルーティングを設定 */
    // 一覧
    Route::get('/todo/index', [TodoController::class, 'index'])->name('todo.index');
    // 作成
    Route::post('/todo/store', [TodoController::class, 'store'])->name('todo.store');
    // 詳細
    Route::get('/todo/detail/{id}', [TodoController::class, 'show'])->name('todo.detail');
    // 編集
    Route::put('/todo/update/{id}', [TodoController::class, 'update'])->name('todo.update');
    // 削除
    Route::delete('/todo/destroy/{id}', [TodoController::class, 'destroy'])->name('todo.destroy');

    // チームユーザーTodo一覧
    Route::get('/team/users/todos', [TeamController::class, 'TeamUserTodoIndex'])->name('team.users.todos.index');
});

require __DIR__ . '/auth.php';
