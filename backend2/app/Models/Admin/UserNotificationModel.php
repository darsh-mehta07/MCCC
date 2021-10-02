<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class UserNotificationModel extends Model
{
    public $timestamps = true;
    protected $table = 'user_notification';
    protected $fillable = [
        'user_id', 'message_id', 'is_read', 'link'
    ];
    public function getCreatedAtAttribute($value){
        
        return Carbon::createFromTimeStamp(strtotime($value) )->diffForHumans();

    }
}
