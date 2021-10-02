<?php

namespace App\Models\Admin;
use Illuminate\Database\Eloquent\Model;

class UserApplyForEvents extends Model
{
    public $timestamps = true;
    protected $table = 'user_apply_for_events';
    protected $fillable = [
        'emergancy_contact', 'institution_name', 'address', 'aadharcard_image', 'aadharcard_image_path', 'pancard_image', 'pancard_image_path', 'about_event', 'user_id', 'event_id'
    ];
}
