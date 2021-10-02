<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Model;

class CastingcallBanner extends Model
{
    protected $fillable = [
        'casting_banner_image', 'banner_image_path' , 'banner_status'
    ];
    
    public $timestamps = true;
    protected $table = 'casting_call_banner';
}
