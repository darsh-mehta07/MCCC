<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Model;

class BtsCategory extends Model
{
     protected $fillable = [
        'category', 'status'
    ];
    
    public $timestamps = true;
    protected $table = 'bts_category';
    
    
     public function videos()
    {
        return $this->belongsTo('App\Models\Admin\BtsVideos');
    }
}
