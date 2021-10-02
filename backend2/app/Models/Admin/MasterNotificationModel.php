<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Model;

class MasterNotificationModel extends Model
{
    public $timestamps = true;
    protected $table = 'workshop_events';
    protected $fillable = [
        'title','message'
        ];
}
