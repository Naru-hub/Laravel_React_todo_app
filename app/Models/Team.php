<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    use HasFactory;

    /**
     * userとteamの多対多のリレーション
     */
    public function users()
    {
        return $this->belongsToMany(User::class)->withTimestamps();
    }

    /**
     * チーム内のユーザーのTODOを取得するリレーション
     */
    // public function todos()
    // {
    //     return $this->hasManyThrough(Todo::class, User::class);
    // }

    /**
     * チーム専用のToDoを取得
     */
    public function todos()
    {
        return $this->hasMany(Todo::class);
    }

    /**
     * チーム内のユーザーの全ToDoを取得
     */
    // public function allTodosThroughUsers()
    // {
    //     return $this->hasManyThrough(Todo::class, User::class);
    // }
}
