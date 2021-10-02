<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserApplyForWorkshopTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_apply_for_workshop', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('user_id',55);
            $table->integer('workshop_id',15);
            $table->string('emergancy_contact',25);
            $table->string('institution_name',255);
            $table->string('address',255);
            $table->string('aadharcard_image',255);
            $table->string('aadharcard_image_path',255);
            $table->string('pancard_image',255);
            $table->string('pancard_image_path',255);
            $table->string('about_workshop',255);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_apply_for_workshop');
    }
}
