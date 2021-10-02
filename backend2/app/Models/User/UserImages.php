<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;

class UserImages extends Model
{
    protected $fillable = [
        'user_id', 'image',
    ];
    protected $table = 'user_images';
    
    public function getUserImages()
    {
        return $this->belongsTo('App\User');
    }
}

    