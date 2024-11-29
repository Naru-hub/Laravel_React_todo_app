<?php

namespace App\Http\Requests\Team;

use Illuminate\Foundation\Http\FormRequest;

class TeamStoreRequest extends FormRequest
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
            'user_id' => 'required|exists:users,id',
            'team_id' => 'required|exists:teams,id',
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'user_id.exists' => 'ユーザーが見つかりませんでした。',
            'team_id.required' => 'チームを選択してください。',
            'team_id.exists' => '選択したチームは無効です。再度選択してください。',
        ];
    }
}
