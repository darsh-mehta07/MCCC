<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserBookmarkTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('user_bookmark')) {
            Schema::create('user_bookmark', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->integer('user_id');
                $table->integer('casting_card_id');
                $table->tinyInteger('bookmark_status')->default('1')->comment('0= not-bookmarked, 1=bookmarked');
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_bookmark');
    }
}
