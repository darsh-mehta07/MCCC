<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Model;

class ViewsCount extends Model
{
     protected $fillable = [
        'video_id', 'view_count'
    ];
    
    public $timestamps = true;
    protected $table = 'view_count';
}
