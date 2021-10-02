<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFaqContentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {   
        if (!Schema::hasTable('faq_contents')) {
            Schema::create('faq_contents', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->string('title',1000)->nullable();
                $table->string('description',1000)->nullable();
                $table->string('faq_category_id',1000)->nullable();
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
        Schema::dropIfExists('faq_contents');
    }
}
