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
            'start_date' => now()->subDays(2)->startOfDay(),
            'due_date' => now()->subDays(1)->endOfDay(),
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('todos')->insert([
            'user_id' => 1,
            'title' => '本を読む',
            'description' => '',
            'is_completed' => false,
            'start_date' => now()->startOfDay(),
            'due_date' => now()->addDays(3)->endOfDay(),
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('todos')->insert([
            'user_id' => 2,
            'title' => 'プログラミングの勉強をする',
            'description' => 'PHPとJavaScriptの勉強をする',
            'is_completed' => false,
            'start_date' => now()->copy()->addDays(2)->startOfDay(), // 作成日から2日後
            'due_date' => now()->copy()->addDays(2)->addDays(3)->endOfDay(), // 開始日から3日後
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('todos')->insert([
            'user_id' => 3,
            'title' => '犬と散歩に行く',
            'description' => 'トリミング前に散歩に連れて行く',
            'is_completed' => false,
            'start_date' => now()->copy()->addDays(1)->startOfDay(), // 作成日から1日後
            'due_date' => now()->copy()->addDays(1)->addDays(6)->endOfDay(), // 開始日から6日後
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('todos')->insert([
            'user_id' => 4,
            'title' => '友達に電話する',
            'description' => '次の予定の時間を決める',
            'is_completed' => false,
            'start_date' => now()->startOfDay(),
            'due_date' => now()->addDays(5)->endOfDay(),
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('todos')->insert([
            'user_id' => 3,
            'title' => '買い物に行く',
            'description' => '日用品を買いに行く',
            'is_completed' => false,
            'start_date' => now()->subDays(3)->startOfDay(),
            'due_date' => now()->subDays(3)->endOfDay(),
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('todos')->insert([
            'user_id' => 2,
            'title' => '打ち合わせ',
            'description' => '打ち合わせに行く',
            'is_completed' => false,
            'start_date' => now()->subDays(3)->startOfDay(),
            'due_date' => now()->subDays(3)->endOfDay(),
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('todos')->insert([
            'user_id' => 3,
            'title' => '会議',
            'description' => '会議に行く',
            'is_completed' => false,
            'start_date' => now()->subDays(3)->startOfDay(),
            'due_date' => now()->subDays(3)->endOfDay(),
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('todos')->insert([
            'user_id' => 4,
            'title' => 'プレゼン資料の作成',
            'description' => 'プレゼン資料の作成をする',
            'is_completed' => false,
            'start_date' => now()->subDays(3)->startOfDay(),
            'due_date' => now()->subDays(3)->endOfDay(),
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}
