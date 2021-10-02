<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddBannerImageToCastingCall extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('casting_call', function (Blueprint $table) {
            $table->string('banner_image',500)->nullable();
            $table->string('skin_color',255)->nullable();
            $table->string('age_range',100)->nullable();
            $table->string('height',100)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('casting_call', function (Blueprint $table) {
            //
        });
    }
}
