<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;
use App\Services\User\ProfileService;
use App\Models\User\UserImages;
use App\Models\User\UserVideos;

use App\Http\Requests\UserProfileValidate;
// use App\Http\Requests\GetCityValidation;
use Validator;
use Auth;
use File;

class ProfileController extends Controller
{   
    protected $profileServices;
    protected $status_true;
    protected $status_false;
    
    public function __construct(ProfileService $profileServices) {
        $this->ProfileService = $profileServices;
        $this->status_true = 'true';
        $this->status_false = 'false';
    }
    
    
    public function addUserProfileData(UserProfileValidate $request)
    {
        try {
            $data = $this->ProfileService->addProfileData($request);
            return response()->json($data);
        } catch (Exception $ex) {
            return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
        }
    }
    
    public function userImageUpload(Request $request)
    {
        
         $validatedData = $request->validate([
                // 'user_id'       => 'required|numeric',
                'fileSource' => 'required',   // |max:2000
           ],
            [
                // 'user_id.required'          => 'User-id is Required',
                // 'user_id.numeric'           => 'Please enter only numbers.',
                'fileSource.required'    => 'image is required',
                // 'images.size'         => 'image should not more than 2 MB'
                ]);
       
        try{
            $data = $this->ProfileService->addUserImages($request);
                
                if($data){
                    return response()->json($data);
                }
        }catch (Exception $ex) {
            return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
        }
        
    }
    
    public function userUpdateImageUpload(Request $request)
    {
        
        $validatedData = $request->validate([
                // 'user_id'       => 'required|numeric',
                'fileSource' => 'required',   // |max:2000
            ],
            [
                // 'user_id.required'          => 'User-id is Required',
                // 'user_id.numeric'           => 'Please enter only numbers.',
                'fileSource.required'    => 'image is required',
                // 'images.size'         => 'image should not more than 2 MB'
            ]);
        try{
            $data = $this->ProfileService->updateUserImages($request);    
            if($data){
                return response()->json($data);
            }
        }catch (Exception $ex) {
            return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
        }
        
    }
    
    public function userVideoUpload(Request $request)
    {
        $validatedData = $request->validate([
                // 'user_id'  => 'required|numeric',
                'fileSource' => 'required',   // |max:2000
           ],
            [
                // 'user_id.required'    => 'User-id is Required',
                // 'user_id.numeric'     => 'Please enter only numbers.',
                'fileSource.required'     => 'Video is required',
                // 'images.size'         => 'image should not more than 2 MB'
                ]);
                
            try {
                $data = $this->ProfileService->addUserVideos($request);
                
                if($data){
                    return response()->json($data);
                }
                
            } catch (Exception $ex) {
                return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
            }
    }
    
    public function userUpdateVideoUpload(Request $request)
    {
        $validatedData = $request->validate([
                // 'user_id'  => 'required|numeric',
                'fileSource' => 'required',   // |max:2000
           ],
            [
                // 'user_id.required'    => 'User-id is Required',
                // 'user_id.numeric'     => 'Please enter only numbers.',
                'fileSource.required'     => 'Video is required',
                // 'images.size'         => 'image should not more than 2 MB'
                ]);
                
            try {
                $data = $this->ProfileService->updateUserVideos($request);
                
                if($data){
                    return response()->json($data);
                }
                
            } catch (Exception $ex) {
                return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
            }
    }
    
    public function userAddWorkExp(Request $request)
    {
        try {
            $data = $this->ProfileService->addProfileWorkExpData($request);

            if($data){
                return response()->json($data);
            }

        } catch (Exception $ex) {
            return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
        }
    }
    
}
