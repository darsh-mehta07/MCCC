<?php

namespace App\Models\Frontend;

use Illuminate\Database\Eloquent\Model;

class Languages extends Model
{
    //

    protected $fillable = [
        'name'
    ];

    protected $table = 'languages';
    
    public function getLanguage() {
        $data =  $this->belongsTo('App\Models\Admin\CastingCallModel');
        return $data;
    }
}
