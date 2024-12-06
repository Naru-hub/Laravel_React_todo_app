<?php

namespace App\Http\Requests\Team;

use Illuminate\Foundation\Http\FormRequest;

class TodoUpdateRequest extends FormRequest
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
            'title' => 'required | string | max:50',
            'description' => 'nullable | string | max:255',
            'is_completed' => 'boolean',
            'start_date' => 'required|date',
            'due_date' => 'required|date|after_or_equal:start_date',
            'team_id' => 'required | integer',
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
            'title.required' => 'タイトルは必須です。',
            'title.string' => 'タイトルは文字列である必要があります。',
            'title.max' => 'タイトルは50文字以内で入力してください。',
            'description.string' => '詳細は文字列である必要があります。',
            'description.max' => '詳細は255文字以内で入力してください。',
            'start_date.required' => '開始日は必須です。',
            'start_date.date' => '開始日は有効な日付である必要があります。',
            'due_date.required' => '期限日は必須です。',
            'due_date.date' => '期限日は有効な日付である必要があります。',
            'due_date.after_or_equal' => '期限日は開始日以降の日付である必要があります。',
            'team_id.required' => 'チームの選択は必須です。',
            'team_id.integer' => 'チームidは数値型である必要があります。',
        ];
    }
}
