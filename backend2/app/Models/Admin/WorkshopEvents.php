<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Model;

class WorkshopEvents extends Model
{
    public $timestamps = true;
    protected $table = 'workshop_events';
    protected $fillable = [
        'title', 'description', 'banner_image', 'start_date', 'closing_date', 'start_time', 'end_time','batch_1', 'batch_2','batch_3','batch_4','batch_5','state_id','city_id', 'location', 'more_details','banner_img_path','Status'
    ];
}
