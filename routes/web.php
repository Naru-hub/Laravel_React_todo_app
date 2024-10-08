<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TodoController;
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
    Route::delete('Todo/destroy/{id}', [TodoController::class, 'destroy'])->name('todo.destroy');
});

require __DIR__ . '/auth.php';
