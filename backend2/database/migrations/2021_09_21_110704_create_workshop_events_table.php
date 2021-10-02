<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWorkshopEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('workshop_events', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title',255);
            $table->string('description',1000);
            $table->string('banner_image',255);
            $table->string('banner_img_path',255);
            $table->string('start_date',255);
            $table->string('closing_date',255);
            // $table->string('start_time',255);
            // $table->string('end_time',255);
            $table->string('state_id',100);
            $table->string('city_id',100);
            $table->string('location',255);
            $table->string('more_details',2000);
            $table->string('batch_1',100);
            $table->string('batch_2',100);
            $table->string('batch_3',100);
            $table->string('batch_4',100);
            $table->string('batch_5',100);
            $table->integer('Status',11);
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
        Schema::dropIfExists('workshop_events');
    }
}
