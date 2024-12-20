<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // 管理者アカウントの作成
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
            'is_admin' => true, // 管理者権限
        ]);

        $this->call(UserTableSeeder::class);
        $this->call(TeamsTableSeeder::class);
        $this->call(TodosTableSeeder::class);
        $this->call(Team_UserTableSeeder::class);
    }
}
