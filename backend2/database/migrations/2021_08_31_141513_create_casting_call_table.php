<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCastingCallTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('casting_call')) {
            Schema::create('casting_call', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->string('title',255);
                $table->string('short_description',2000);
                $table->string('gender',255)->nullable();
                $table->string('closing_date',255)->nullable();
                $table->string('location',255)->nullable();
                $table->longText('tags');
                $table->longText('long_description');
                $table->string('language_id', 2000)->nullable();
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
        Schema::dropIfExists('casting_call');
    }
}
