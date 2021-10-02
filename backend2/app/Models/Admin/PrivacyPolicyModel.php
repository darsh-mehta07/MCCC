<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Model;

class PrivacyPolicyModel extends Model
{
    public $timestamps = true;
    protected $table = 'privacy_policy';
    protected $fillable = ['description'];
}
