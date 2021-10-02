<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;
use App\Services\Admin\SplashScreenServices;
use Validator;
use Auth;
use File;

class AdminController extends Controller
{
    protected $splashScreenServices;
    protected $status_true;
    protected $status_false;

    public function __construct(SplashScreenServices $splashScreenServices) {
        $this->SplashScreenServices = $splashScreenServices;
        $this->status_true = 'true';
        $this->status_false = 'false';
    }
    
    public function addSplashScreen(Request $request){
        $validatedData = $request->validate([
                // 'filePath'       => 'required',
                'fileSource'     => 'required',   // |max:2000
           ],
            [
                // 'filePath.required'          => 'file Path is Required',
                'fileSource.required'    => 'image is required'
                ]);
         try {
             
            $data = $this->SplashScreenServices->splashScreenAdd($request);
            if($data){
               return response()->json($data);  
             }
            
        } catch (Exception $ex) {
            return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
        }
    }
    
    
}
