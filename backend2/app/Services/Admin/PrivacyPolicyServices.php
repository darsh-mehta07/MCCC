<?php

namespace App\Services\Admin;

use DB;
//use Illuminate\Support\Facades\DB;
use Hash;
use App\User;
use App\Models\Admin\PrivacyPolicyModel;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
// use Auth;

class PrivacyPolicyServices
{
    protected $status_true;
    protected $status_false;
    
    public function __construct() {
        $this->status_true = 'true';
        $this->status_false = 'false';
    }
    
    public function getPrivacy(){
        
        try{
            return $policy = Cache::rememberForever('policy', function(){
            $data = PrivacyPolicyModel::select('description')->get();
            return ['status' => $this->status_true, 'code' => '200', 'data' => $data];
            });
        // return TermsConditions::all();
        }catch(Exception $exception){
            throw $exception;
        }
        
    }
    
}

