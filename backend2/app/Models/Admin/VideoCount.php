<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Model;

class VideoCount extends Model
{
     protected $fillable = [
        'video_id', 'user_id'
    ];
    
    public $timestamps = true;
    protected $table = 'videos_count';
}
