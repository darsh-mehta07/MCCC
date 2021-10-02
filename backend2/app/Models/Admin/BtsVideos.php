<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Model;

class BtsVideos extends Model
{
     protected $fillable = [
        'category_id', 'video_url', 'title', 'description', 'youtube_thumbnail' , 'thumbnail', 'thumbnail_path'
    ];
    
    public $timestamps = true;
    protected $table = 'bts_videos';
    
     public function category()
    {
        return $this->hasOne('App\Models\Admin\BtsCategory');
    }
    
}
