<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {   
        if (!Schema::hasTable('users')) {
            Schema::create('users', function (Blueprint $table) {
                 $table->bigIncrements('id');
                $table->string('name',255);
                $table->string('email',255)->unique();
                $table->string('password',255)->nullable();
                $table->string('phone',100)->unique();
                $table->string('gender',100)->nullable();
                $table->string('dob',100)->nullable();
                $table->string('state_id')->nullable();
                $table->string('city_id')->nullable();
                $table->string('client_id')->nullable();
                $table->string('provider_name')->nullable();
                $table->tinyInteger('is_admin')->default(0)->nullable();
                $table->string('is_active')->default('1');
                $table->string('is_delete')->default('0');
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
        Schema::dropIfExists('users');
    }
}
