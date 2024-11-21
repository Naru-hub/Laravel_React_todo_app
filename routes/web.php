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
    // 管理者用(ユーザー操作のルーティングを設定)
    // ユーザー一覧
    Route::get('/users', [UserController::class, 'index'])->name('user.index');
    // ユーザー登録
    Route::get('/user/create', [UserController::class, 'create'])->name('user.create');
    Route::post('/user/store', [UserController::class, 'store'])->name('user.store');
    // ユーザー削除
    Route::delete('/user/destroy/{id}', [UserController::class, 'destroy'])->name('user.destroy');

    // チーム一覧
    Route::get('/user/{id}/teams', [TeamController::class, 'show'])->name('team.index');
    // チーム登録
    Route::post('/user/{id}/team/store', [TeamController::class, 'store'])->name('team.store');
    // チーム削除
    Route::delete('/user/team/remove', [TeamController::class, 'destroy'])->name('team.destroy');


    // ユーザー用
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Todoのルーティングを設定
    // 一覧
    Route::get('/Todo/Index', [TodoController::class, 'index'])->name('todo.index');
    // 作成
    Route::post('/Todo/store', [TodoController::class, 'store'])->name('todo.store');
    // 詳細
    Route::get('/Todo/Detail/{id}', [TodoController::class, 'show'])->name('todo.detail');
    // 編集
    Route::put('/Todo/update/{id}', [TodoController::class, 'update'])->name('todo.update');
    // 削除
    Route::delete('/Todo/destroy/{id}', [TodoController::class, 'destroy'])->name('todo.destroy');
});

require __DIR__ . '/auth.php';
