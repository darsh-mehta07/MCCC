<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;
use App\Services\Admin\PrivacyPolicyServices; 
use Validator;
use Auth;
use File;

class PrivacyPolicyController extends Controller
{
   protected $privacyPolicyServices;
    protected $status_true;
    protected $status_false;
    
    public function __construct(PrivacyPolicyServices $privacyPolicyServices) {
        $this->PrivacyPolicyService = $privacyPolicyServices;
        $this->status_true = 'true';
        $this->status_false = 'false';
    }
    
    
    public function getPrivacyPolicy()
    {
        try{
            $data = $this->PrivacyPolicyService->getPrivacy();
             if($data){
//                return back()->with('success','Item created successfully!');
                 return response()->json($data); 
             }
        }catch(Exception $ex){
             return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
         }
    }
}
