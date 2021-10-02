<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;

class UserProfile extends Model
{
    protected $fillable = [
        'tag_line', 'short_bio', 'language_id','user_id', 'skin_color', 'height', 'home_town', 'hobbies'
    ];
    
    public $timestamps = true;
    protected $table = 'user_profile';
        
    public function getUserProfile()
    {
        return $this->belongsTo('App\User');
    }
    public function getLanguages()
    {
        return $this->hasMany('App\Models\Frontend\Languages', 'id');
    }
}
