<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;

class UserVideos extends Model
{
     protected $fillable = [
        'user_id', 'videos',
    ];
    protected $table = 'user_videos';
    
     public function getUserVideos()
    {
        return $this->belongsTo('App\User');
    }
}
