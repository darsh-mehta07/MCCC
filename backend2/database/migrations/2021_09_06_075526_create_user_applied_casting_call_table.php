<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserAppliedCastingCallTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('user_applied_casting_call')) {
            Schema::create('user_applied_casting_call', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->bigInteger('user_id');
                $table->bigInteger('casting_id');
                $table->string('image_1',200)->nullable();
                $table->string('image_2',200)->nullable();
                $table->string('image_3',200)->nullable();
                $table->string('video_1',200)->nullable();
//                $table->foreign('user_id')->references('id')->on('users');
//                $table->foreign('casting_id')->references('id')->on('casting_call');
                $table->timestamps();
            });
            DB::statement('ALTER TABLE user_applied_casting_call CHANGE id id bigIncrements(10) UNSIGNED ZEROFILL NOT NULL');
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_applied_casting_call');
    }
}
