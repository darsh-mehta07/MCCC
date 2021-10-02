<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Model;

class McccMastersModel extends Model
{
    protected $fillable = [
        'reasons', 'is_active'
    ];
    
    public $timestamps = true;
    protected $table = 'mccc_masters';
    
    public function getUserCastingCall(){
        return $this->belongsTo('App\Models\User\UserCastingCall');
    }
}
