<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;
//use Illuminate\Database\Eloquent\Factories\HasFactory;

class UserCastingCall extends Model
{
    
//    use HasFactory;
    
    public $timestamps = true;
    protected $table = 'user_applied_casting_call';
    
    protected $fillable = [
        'user_id', 'casting_id', 'image_1', 'image_2', 'image_3', 'video_1','application_id','image_4','image_5','image_6','video_2','video_3','saveAsDraft' 
    ];
    
    public function setApplicationIdAttribute($value){
        return 'MCCC'.str_pad($value,10,'0',STR_PAD_LEFT);
    }
    
    public function getMaster(){
        return $this->hasOne('App\Models\Admin\McccMastersModel', 'id', 'status');
    }
    
    public function getUserCastingModel() {
        return $this->hasOne('App\Models\Admin\CastingCallModel', 'id', 'casting_id');
//        return $this->hasMany(UserProfile::class);
    }
}
