<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Model;

class Events extends Model
{
     protected $fillable = [
        'title', 'description', 'location', 'start_date', 'end_date','address', 'image', 'image_path','create_at', 'update_at'
    ];
}
