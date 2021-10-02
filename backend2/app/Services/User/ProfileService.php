<?php

namespace App\Services\User;

use Illuminate\Support\Facades\DB;

use Hash;
use App\User;
use Illuminate\support\Facades\Cache;
use App\Models\Frontend\States;
use App\Models\Frontend\Cities;
use App\Models\Frontend\Languages;
use App\Models\User\UserProfile;
use App\Models\User\UserQualification;
use App\Models\User\UserSocialLinks;
use App\Models\User\UserWorkExperience;
use App\Models\User\UserImages;
use App\Models\User\UserVideos;
use Illuminate\Support\Facades\Auth;
use Mail;
use App\Mail\ProfileCompletion;
// use Auth;

class ProfileService
{ 
    protected $status_true;
    protected $status_false;
    
    public function __construct() {
        $this->status_true = 'true';
        $this->status_false = 'false';
    }
    
//   protected $userId;
   
//   $userId = Auth::user()->id;
    
    public function addProfileData($data){
        DB::beginTransaction();
        try{
            if (Auth::check()) {
                $user =  Auth::user(); 
//                $phone = User::where('phone', $data['phone'])->where('id','!=', $user->id )->first();
                // print_r($phone);exit;
//                if($phone){
//                    return ['status' => $this->status_false, 'code' => '400', 'data' => 'This Mobile number already Used by another user'];
//                }else{
                    
                    $userProfile = UserProfile::where('user_id',$user->id)->first();
                    
                    if($userProfile){
                        return ['status' => $this->status_false, 'code' => '400', 'data' => 'User profile already created for these user'];
                    }else{
//                        $langs = implode(',',(array)$data->language_id);
                        $langs = implode(',',$data['language_id']);
//                        print_r($langs);exit;
                        $User = UserProfile::create([
                        'user_id'       => $user->id,
                        'tag_line'      => $data['tag_line'],
                        'short_bio'     => $data['short_bio'],
                        'height'        => $data['height'],
                        'skin_color'    => $data['skin_color'],
                        'language_id'   => $langs,
                    ]);
                    
                        $experience = $data['work_experiences'];
                        // print_r($experience);exit;
                        foreach($experience as $key => $exp){ 
                            if(!empty($exp['experience'])){
                                 UserWorkExperience::create([
                                'user_id'           => $user->id,
                                'work_experience'   => $exp['experience'],
                            ]);
                        }
                    }
                    
                      $qualification = $data['qualifications'];
//                    $qualification = (array)$data->qualifications;
                     foreach($qualification as $key => $qui){ 
                         if(!empty($qui['qualification'])){
                        UserQualification::create([
                        'user_id'           => $user->id,
                        'qualification'     => $qui['qualification']
                    ]);
                     }
                    }
                    
                     $links = $data['social_links'];
//                    $links = (array)$data->social_links;
                    foreach($links as $key => $lnk){
                        if(!empty($lnk['social_link'])){
                         UserSocialLinks::create([
                        'user_id'           =>$user->id,
                        'social_links'      =>$lnk['social_link']
                    ]);
                    }
                    }
                    
                    if($user->provider_name == 'GOOGLE' || $user->provider_name == 'FACEBOOK'){
                        $phone = User::where('phone', $data['phone'])->where('id','!=', $user->id )->first();
                        if($phone){
                    return ['status' => $this->status_false, 'code' => '400', 'data' => 'This Mobile number already Used by another user'];
                }else{
                    $userUpdate = User::findOrFail($user->id);
                    $userUpdate->update([
                        'phone' => $data['phone'],
                        'gender' => $data['gender'],
                        'dob' => $data['dob'],
                        'state_id' => $data['state_id'],
                        'city_id' => $data['city_id'],
                    ]);
                    }
                    }
                    Mail::to($user->email)->send(new ProfileCompletion);
             DB::commit();
                    return ['status' => $this->status_true, 'code' => '200', 'data' => $User];
                    }
                    
                    
//                }
            }else{
                return ['status' => $this->status_false, 'code' => '200', 'data' => 'User not logged in.'];
            }
            
            
        }catch(Exception $exception){
            DB::rollBack();
            throw $exception;
        }
    }
    
    
    public function addUserImages($request){
        DB::beginTransaction();
        try{
            
            if (Auth::check()) {
                
                $count = count($request->fileSource);
                if($count > 2 && Auth::check()){
//                    $fileSource = $request->fileSource;    //add by rahul used in foreach because giving error in as non-object...
                    $user = Auth::User();
                    $folderPath ='/home/mcccwdipl/public_html/backend2/public/uploads/UserImages/';
                    $postdata = file_get_contents("php://input");
                    $request = json_decode($postdata);
                    foreach ($request->fileSource as $key => $value) {
                        $image_parts = explode(";base64,", $value);
                        $image_type_aux = explode("image/", $image_parts[0]);
                        $image_type = $image_type_aux[1];
                        $name = $user->id.'_'. uniqid() .'.'.$image_type;
                        $image_base64 = base64_decode($image_parts[1]);
                        $file = $folderPath . $name;
                        file_put_contents($file, $image_base64);
                        $image_parts = null;
                        $image_type_aux = null;
                        $image_type = null;
                        $image_base64 = null;
                        $imgagePath = $name;
                        
//                        if ($request->id == '' && $request->id == Null) {
                            UserImages::create(['image' => $name, 'user_id' => $user->id]);
//                        }else{
//                            UserImages::where('id', $request->id)->update([
//                                'image' => $name, 
//                                'user_id' => $user->id
//                            ]);
//                        }
                    }
        DB::commit();            
                    return ['status' => $this->status_true, 'code' => '200', 'data' => 'Image uploaded successfully'];
                }else{
                    return ['status' => $this->status_false, 'code' => '400', 'data' => 'Please Select 3 Images'];
                }  
            }else{
                return ['status' => $this->status_false, 'code' => '200', 'data' => 'User not logged in.'];   
            }
             
        }catch(Exception $exception){
             DB::rollBack();
            throw $exception;
        }
        
    }
    
    public function updateUserImages($request){
        DB::beginTransaction();
        try{
            
            if (Auth::check()) {                
                $count = count($request->fileSource);
                if($count > 2 && Auth::check()){
//                    $fileSource = $request->fileSource;    //add by rahul used in foreach because giving error in as non-object...
                    $user = Auth::User();
                    $folderPath ='/home/mcccwdipl/public_html/backend2/public/uploads/UserImages/';
                    $postdata = file_get_contents("php://input");
                    $request = json_decode($postdata);
                    foreach ($request->fileSource as $key => $value) {
                        $image_parts = explode(";base64,", $value);
                        $image_type_aux = explode("image/", $image_parts[0]);
                        $image_type = $image_type_aux[1];
                        $name = $user->id.'_'. uniqid() .'.'.$image_type;
                        $image_base64 = base64_decode($image_parts[1]);
                        $file = $folderPath . $name;
                        file_put_contents($file, $image_base64);
                        $image_parts = null;
                        $image_type_aux = null;
                        $image_type = null;
                        $image_base64 = null;
                        $imgagePath = $name;
                        
                        UserImages::where('id', $request->id)->update([
                            'image' => $name, 
                            'user_id' => $user->id
                        ]);
                    }
                    DB::commit();            
                    return ['status' => $this->status_true, 'code' => '200', 'data' => 'Image uploaded successfully'];
                }else{
                    return ['status' => $this->status_false, 'code' => '400', 'data' => 'Please Select 3 Images'];
                }  
            }else{
                return ['status' => $this->status_false, 'code' => '200', 'data' => 'User not logged in.'];   
            }
             
        }catch(Exception $exception){
             DB::rollBack();
            throw $exception;
        }
        
    }
    
    public function addUserVideos($request){
         DB::beginTransaction();
        try{
            
            if (Auth::check()) {
               $count = count($request->fileSource);
                if($count > 0 && Auth::check()){
//                    $fileSource = $request->fileSource;    //add by rahul used in foreach because giving error in as non-object...
                    $user = Auth::User();
                    $folderPath ='/home/mcccwdipl/public_html/backend2/public/uploads/UserVideos/';
                    $postdata = file_get_contents("php://input");
                    $request = json_decode($postdata);
                    foreach ($request->fileSource as $key => $value) {
                        $image_parts = explode(";base64,", $value);
                        // $image_type_aux = explode("image/", $image_parts[0]);
                        // $image_type = $image_type_aux[1];
                        $name = $user->id.'_'. uniqid() .'.mp4';
                        $image_base64 = base64_decode($image_parts[1]);
                        $file = $folderPath . $name;
                        file_put_contents($file, $image_base64);
                        $image_parts = null;
                        // $image_type_aux = null;
                        // $image_type = null;
                        $image_base64 = null;
                        $imgagePath = $name;
                        
//                        if ($request->id == '' && $request->id == Null) {
                            UserVideos::create(['videos' => $name, 'user_id' => $user->id]);
//                        }else{
//                            UserVideos::where('id', $request->id)->update([
//                                'videos' => $name, 
//                                'user_id' => $user->id
//                            ]);
//                        }
                    }
             DB::commit();        
                     return ['status' => $this->status_true, 'code' => '200', 'data' => 'Video uploaded successfully'];
                }else{
                    return ['status' => $this->status_false, 'code' => '400', 'data' => 'No file selected'];
                } 
            }else{
                return ['status' => $this->status_false, 'code' => '200', 'data' => 'User not logged in.'];   
            }
              
        }catch(Exception $exception){
            DB::rollBack();
            throw $exception;
        }
        
    }
    
    public function updateUserVideos($request){
         DB::beginTransaction();
        try{
            
            if (Auth::check()) {
               $count = count($request->fileSource);
                if($count > 0 && Auth::check()){
//                    $fileSource = $request->fileSource;    //add by rahul used in foreach because giving error in as non-object...
                    $user = Auth::User();
                    $folderPath ='/home/mcccwdipl/public_html/backend2/public/uploads/UserVideos/';
                    $postdata = file_get_contents("php://input");
                    $request = json_decode($postdata);
                    foreach ($request->fileSource as $key => $value) {
                        $image_parts = explode(";base64,", $value);
                        // $image_type_aux = explode("image/", $image_parts[0]);
                        // $image_type = $image_type_aux[1];
                        $name = $user->id.'_'. uniqid() .'.mp4';
                        $image_base64 = base64_decode($image_parts[1]);
                        $file = $folderPath . $name;
                        file_put_contents($file, $image_base64);
                        $image_parts = null;
                        // $image_type_aux = null;
                        // $image_type = null;
                        $image_base64 = null;
                        $imgagePath = $name;
                        
                        UserVideos::where('id', $request->id)->update([
                            'videos' => $name, 
                            'user_id' => $user->id
                        ]);
                    }
                    DB::commit();        
                     return ['status' => $this->status_true, 'code' => '200', 'data' => 'Video uploaded successfully'];
                }else{
                    return ['status' => $this->status_false, 'code' => '400', 'data' => 'No file selected'];
                } 
            }else{
                return ['status' => $this->status_false, 'code' => '200', 'data' => 'User not logged in.'];   
            }
              
        }catch(Exception $exception){
            DB::rollBack();
            throw $exception;
        }
        
    }
    
    public function addProfileWorkExpData($data){
        DB::beginTransaction();
        try{
            if (Auth::check()) {
                $user =  Auth::user();
                $validated = $data->validate([
                    'work_experiences' => 'required',
                ]);  
//                $userProfile = UserProfile::where('user_id',$user->id)->first();
//                if($userProfile){
//                    return ['status' => $this->status_false, 'code' => '400', 'data' => 'User profile already created for these user'];
//                }else{
                  
                if ($validated) {
                    $experience = $data['work_experiences'];
                    foreach($experience as $exp){
                        if(!empty($exp)){
                            if ($data->id == '' && $data->id == Null) {
                                $val = UserWorkExperience::create([
                                    'user_id'           => $user->id,
                                    'work_experience'   => $exp,
                                ]);
                            }else{
                                $val = UserWorkExperience::where('id', $data->id)->update([
                                    'user_id'           => $user->id,
                                    'work_experience'   => $exp,
                                ]);
                            }
                        }
                    }
                }
                    DB::commit();
                    return ['status' => $this->status_true, 'code' => '200', 'data' => 'Updated Successfully'];
//                }
            }else{
                return ['status' => $this->status_false, 'code' => '200', 'data' => 'User not logged in.'];
            }
            
            
        }catch(Exception $exception){
            DB::rollBack();
            throw $exception;
        }
    }
}