<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Model;

class SplashScreen extends Model
{
    protected $fillable = [
        'file_path', 'file_name'
    ];
    
    public $timestamps = true;
    protected $table = 'splash_screen';
}
