<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('todos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('title');
            $table->text('description')->nullable();
            $table->boolean('is_completed')->default(false);
            // 開始日と期限日のカラム
            $table->date('start_date');
            $table->date('due_date');
            $table->foreignId('team_id')
                ->nullable() // 個人ToDoの場合はnullを許可
                ->default(null) // デフォルト値をnullに設定
                ->constrained('teams') // 'teams'テーブルを参照
                ->onDelete('cascade'); // チーム削除時に関連ToDoを削除
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('todos');
    }
};
