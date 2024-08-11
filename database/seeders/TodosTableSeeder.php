<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TodosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('todos')->insert([
            'user_id' => 1,
            'title' => 'ジムに行く',
            'description' => 'ジムで運動してストレスと運動不足を解消する',
            'is_completed' => false,
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('todos')->insert([
            'user_id' => 1,
            'title' => '本を読む',
            'description' => '',
            'is_completed' => false,
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('todos')->insert([
            'user_id' => 1,
            'title' => 'プログラミングの勉強をする',
            'description' => 'PHPとJavaScriptの勉強をする',
            'is_completed' => false,
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('todos')->insert([
            'user_id' => 1,
            'title' => '犬と散歩に行く',
            'description' => 'トリミング前に散歩に連れて行く',
            'is_completed' => false,
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('todos')->insert([
            'user_id' => 1,
            'title' => '友達に電話する',
            'description' => '次の予定の時間を決める',
            'is_completed' => false,
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}
