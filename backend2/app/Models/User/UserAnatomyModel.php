<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;

class UserAnatomyModel extends Model
{
    protected $table = 'user_anatomy';
    
    protected $fillable = [
        'user_id','weight','waist','chest','bust','hair','tattoo'
    ];
}
