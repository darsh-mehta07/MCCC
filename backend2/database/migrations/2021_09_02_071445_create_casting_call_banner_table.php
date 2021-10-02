<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCastingCallBannerTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('casting_call_banner')) {
        Schema::create('casting_call_banner', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('casting_banner_image');
            $table->string('banner_image_path',500)->nullable();
            $table->string('banner_status')->default('1');
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
        Schema::dropIfExists('casting_call_banner');
    }
}
