<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\Auth\UpdatePasswordRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;

class PasswordController extends Controller
{
    /**
     * Update the user's password.
     */
    public function update(UpdatePasswordRequest $request): RedirectResponse
    {
        // バリデーション済みのデータを使用してパスワードを更新
        $request->user()->update([
            'password' => Hash::make($request->password),
        ]);

        // パスワード更新後にリダイレクト
        return Redirect::route('profile.edit')->with([
            'message' => 'パスワードを更新しました',
            'isFlgMsg' => false,
        ]);
    }
}
