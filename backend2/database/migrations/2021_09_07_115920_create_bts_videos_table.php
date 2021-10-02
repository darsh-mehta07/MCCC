<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBtsVideosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('bts_videos')) {
            Schema::create('bts_videos', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->bigInteger('category_id');
                $table->string('video_url',255);
                $table->string('title',500);
                $table->longText('description');
                $table->string('thumbnail',500);
                $table->string('youtube_thumbnail',255);
                $table->string('thumbnail_path',1000);
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
        Schema::dropIfExists('bts_videos');
    }
}
