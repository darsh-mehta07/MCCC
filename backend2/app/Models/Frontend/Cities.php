<?php

namespace App\Models\Frontend;

use Illuminate\Database\Eloquent\Model;

class Cities extends Model
{
    protected $fillable = [
        'name', 'status',
    ];
    protected $table = 'cities';
}
