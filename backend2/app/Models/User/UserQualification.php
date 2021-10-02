<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;

class UserQualification extends Model
{
    protected $fillable = [
        'qualification','user_id'
    ];
    
    public $timestamps = true;
    protected $table = 'user_qualification';
}
