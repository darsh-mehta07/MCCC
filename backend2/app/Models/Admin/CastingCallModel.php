<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Model;

class CastingCallModel extends Model
{
    public $timestamps = true;
    protected $table = 'casting_call';
    protected $fillable = [
        'title', 'short_description', 'gender', 'closing_date', 'location', 'tags', 'long_description', 'language_id','age_range', 'banner_image', 'banner_img_path', 'skin_color', 'height'
    ];
    
    
    public function getTagsAttribute($value){
        $tags = explode(',',$value);
        return $tags;
    }
    public function getLanguageIdAttribute($value){
        $tags = explode(',',$value);
        return $tags;
    }
    public function getLanguage() {
        $data =  $this->hasMany('App\Models\Frontend\Languages', 'id');
        return $data;
    }
}
