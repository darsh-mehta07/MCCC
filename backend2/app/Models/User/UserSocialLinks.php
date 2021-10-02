<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;

class UserSocialLinks extends Model
{
    
    protected $fillable = [
        'social_links','user_id'
    ];
    
    public $timestamps = true;
    protected $table = 'user_social_links';
}
