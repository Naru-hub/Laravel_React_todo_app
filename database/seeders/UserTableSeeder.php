<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'name' => 'テスト太郎',
            'email' => 'taro@example.com',
            'password' => bcrypt('password'),
            'is_admin' => false,
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('users')->insert([
            'name' => 'テスト花子',
            'email' => 'hanako@example.com',
            'password' => bcrypt('password'),
            'is_admin' => false,
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('users')->insert([
            'name' => 'テスト次郎',
            'email' => 'jiro@example.com',
            'password' => bcrypt('password'),
            'is_admin' => false,
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('users')->insert([
            'name' => 'テスト三郎',
            'email' => 'saburo@example.com',
            'password' => bcrypt('password'),
            'is_admin' => false,
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}
