<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class ConfirmPasswordRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'password' => ['required', 'string'],
        ];
    }

    /**
     * バリデーション後にユーザーのパスワードを確認
     */
    public function validatePassword(): bool
    {
        return Auth::guard('web')->validate([
            // 現在のユーザーのメールを取得して検証
            'email' => $this->user()->email,
            // フォームで送信されたパスワードを検証
            'password' => $this->password,
        ]);
    }
}
