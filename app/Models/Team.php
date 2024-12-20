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
     * チーム専用のToDoを取得
     */
    public function todos()
    {
        return $this->hasMany(Todo::class);
    }
}
