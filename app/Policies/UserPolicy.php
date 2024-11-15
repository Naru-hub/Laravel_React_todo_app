<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy
{
    // 管理者のみ操作可能
    public function isAdmin(User $user)
    {
        if (!$user->is_admin) {
            // 管理者権限がない場合は403エラーを返す
            abort(403, '管理者権限がありません。');
        }

        return true;
    }
}
