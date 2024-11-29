<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class Team_UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('team_user')->insert([
            'team_id' => 1,
            'user_id' => 2,
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('team_user')->insert([
            'team_id' => 1,
            'user_id' => 3,
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('team_user')->insert([
            'team_id' => 3,
            'user_id' => 3,
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('team_user')->insert([
            'team_id' => 1,
            'user_id' => 4,
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}
