<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;

class UserWorkExperience extends Model
{
    protected $fillable = [
        'work_experience','user_id'
    ];
    
    public $timestamps = true;
    protected $table = 'user_work_experience';
}
