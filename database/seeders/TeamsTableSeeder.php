<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TeamsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('teams')->insert([
            'name' => 'チームA',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('teams')->insert([
            'name' => 'チームB',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('teams')->insert([
            'name' => 'チームC',
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}
