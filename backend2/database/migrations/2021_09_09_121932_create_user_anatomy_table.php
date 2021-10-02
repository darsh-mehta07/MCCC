<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserAnatomyTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('user_anatomy')) {
            Schema::create('user_anatomy', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->string('user_id');
                $table->string('weight');
                $table->string('waist');
                $table->string('chest');
                $table->string('bust');
                $table->string('hair');
                $table->string('tattoo');
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
        Schema::dropIfExists('user_anatomy');
    }
}
