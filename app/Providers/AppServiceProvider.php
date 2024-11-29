<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;
use App\Policies\UserPolicy;

class AppServiceProvider extends ServiceProvider
{
    protected $policies = [
        \App\Models\User::class => \App\Policies\UserPolicy::class,
    ];

    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // 全てのリクエストで例外処理のフラッシュメッセージを共有
        Inertia::share([
            'errorMsg' => function () {
                return Session::get('errorMsg');
            },
        ]);

        // 管理者のみ許可するGateの定義
        Gate::define('isAdmin', [UserPolicy::class, 'isAdmin']);
    }
}
