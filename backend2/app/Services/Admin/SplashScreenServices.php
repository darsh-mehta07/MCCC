<?php

namespace App\Services\Admin;

use DB;
use Hash;
use App\Models\Admin\SplashScreen;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

class SplashScreenServices

{
     protected $status_true;
    protected $status_false;
    
    public function __construct() {
        $this->status_true = 'true';
        $this->status_false = 'false';
    }
    
    public function splashScreenAdd($request){
         DB::beginTransaction();
        try{
            if($request->hasFile('fileSource'))
            {
                $allowedfileExtension = ['jpg','png','jpeg'];
                $files = $request->fileSource;
                $user =  Auth::user(); 
                
                
                //  $path = $request->file('fileSource')->store('public/uploads/Admin/Splashscreen_img');
                // print_r($path);exit;
                foreach($files as $file){
                    $filename   = uniqid().'.'.$file->getClientOriginalExtension();
                    $extension  = $file->getClientOriginalExtension();
                    $check      = in_array($extension,$allowedfileExtension); 
                    
                    if($check){
                                      
                        $destinationPath = public_path('/uploads/Admin/Splashscreen_img');
                        $path = 'public/uploads/Admin/Splashscreen_img';
                        if($file->move($destinationPath, $filename)) {
                            //  return $splashImg = Cache::rememberForever('splashImg', function(){
                             $saveResult    =   SplashScreen::create(['file_name' => $filename, 'file_path' => $path]);
                            //  });
                        }else{
                             return ['status' => $this->status_false, 'code' => '400', 'data' => 'Some error accoured'];
                        }
                        
                    }else{
                        return ['status' => $this->status_false, 'code' => '400', 'data' => 'Only jpg,png,jpeg files are allowed'];
                    }
                }
                DB::commit();
                return ['status' => $this->status_true, 'code' => '200', 'data' => 'Image uploaded successfully'];
            }else{
                     return ['status' => $this->status_false, 'code' => '400', 'data' => 'No file selected'];
                }
        }catch(Exception $ex){
            DB::rollBack();
            return response()->json(['status' => $this->status_false, 'code' => '500','message' => $ex->getMessage()]);
        } 
        
    }
}