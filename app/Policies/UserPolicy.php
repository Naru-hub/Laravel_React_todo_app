<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy
{
    // 管理者のみ一覧を閲覧可能
    public function viewAny(User $user)
    {
        return $user->is_admin;
    }
}
