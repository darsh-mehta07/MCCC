<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;

class BookmarkModel extends Model
{
    protected $fillable = [
        'user_id', 'casting_card_id', 'bookmark_status'
    ];
    
    public $timestamps = true;
    protected $table = 'user_bookmark';
}
