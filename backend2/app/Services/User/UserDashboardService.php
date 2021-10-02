<?php

namespace App\Services\User;

use Illuminate\Support\Facades\DB;
use Hash;
use App\User;
use App\Models\User\UserProfile;
use App\Models\User\UserCastingCall;
use Illuminate\support\Facades\Cache;
use Illuminate\Support\Facades\Auth;
use App\Models\Admin\CastingCallModel;
use App\Models\Admin\CastingcallBanner;
use App\Models\Frontend\Cities;
use App\Models\Frontend\Languages;
use App\Models\User\UserImages;
use App\Models\User\UserVideos;
use App\Models\User\UserAnatomyModel;
use Carbon\Carbon;

class UserDashboardService {

    protected $status_true;
    protected $status_false;

    public function __construct() {
        $this->status_true = 'true';
        $this->status_false = 'false';
    }

    public function getUserData() {
        try {
            if (Auth::check()) {
                $user = Auth::user();
                return ['status' => $this->status_true, 'code' => '200', 'data' => $user];
            } else {
                return ['status' => $this->status_false, 'code' => '200', 'data' => 'User not logged in.'];
            }
        } catch (Exception $exception) {
            throw $exception;
        }
    }

    public function fetchCastingBanner() {
        try {
            if (Auth::check()) {
                $banner = CastingcallBanner::where('banner_status', 1)->get();
                return ['status' => $this->status_true, 'code' => '200', 'data' => $banner];
            } else {
                return ['status' => $this->status_false, 'code' => '200', 'data' => 'User not logged in.'];
            }
        } catch (Exception $exception) {
            throw $exception;
        }
    }

    public function getCastingCalls($data) {
        try {
            if (Auth::check()) {

                if ($data->limit != '' || $data->limit != null) {
                    $casting_call = CastingCallModel::orderBy('id', 'DESC')->take($data->limit)->get();
                }
                if ($data->casting_id != '' || $data->casting_id != null) {
                    $casting_call = CastingCallModel::where('id', $data->casting_id)->get();
                }
                if ($data->casting_id == '' && $data->limit == '') {
                    $casting_call = CastingCallModel::orderBy('id', 'DESC')->get();
                }
                return ['status' => $this->status_true, 'code' => '200', 'data' => $casting_call];
            } else {
                return ['status' => $this->status_false, 'code' => '200', 'data' => 'User not logged in.'];
            }
        } catch (Exception $exception) {
            throw $exception;
        }
    }

    public function getEndingSoonCastingCalls($data) {
        try {
            if (Auth::check()) {

                if ($data->limit != '' || $data->limit != null) {
//                         print_r($data->limit);exit;
//                               $casting_call = CastingCallModel::orderBy('id', 'DESC')->take(5)->get();                   
                    $past_10_days_data = CastingCallModel::where('created_at', '>',
                                    Carbon::now()->subHours(240)->toDateTimeString())->orderBy('id', 'DESC')->take($data->limit)->get();

                    if (count($past_10_days_data) != 0) {
                        $casting_call = $past_10_days_data;
                    } else {
                        $casting_call = 'No data found';
                    }
                }

                if ($data->casting_id != '' || $data->casting_id != null) {

//                        $casting_call = CastingCallModel::where('id', $data->casting_id)->get();
                    $past_10_days_data = CastingCallModel::where('created_at', '>',
                                    Carbon::now()->subHours(240)->toDateTimeString())->where('id', $data->casting_id)->orderBy('id', 'DESC')->get();

                    if (count($past_10_days_data) != 0) {
                        $casting_call = $past_10_days_data;
                    } else {
                        $casting_call = 'No Record found';
                    }
                }

                if ($data->casting_id == '' && $data->limit == '') {
                    $past_10_days_data = CastingCallModel::where('created_at', '>',
                                    Carbon::now()->subHours(240)->toDateTimeString())->orderBy('id', 'DESC')->get();

                    if (count($past_10_days_data) != 0) {
                        $casting_call = $past_10_days_data;
                    } else {
                        $casting_call = 'No data found';
                    }
                }
//            }
                return ['status' => $this->status_true, 'code' => '200', 'data' => $casting_call];
            } else {
                return ['status' => $this->status_false, 'code' => '200', 'data' => 'User not logged in.'];
            }
        } catch (Exception $exception) {
            throw $exception;
        }
    }

    public function getUserDetails() {
        try {
            if (Auth::check()) {
                $User = Auth::user();
//                $dob = $user->dob;
                $data['age'] = Carbon::parse($User->dob)->diff(Carbon::now())->y;
//                print_r($age);exit;
//                $users = User::with('UserProfile')->where('user_id',$User_details->id)->get();
                $data['user_details'] = User::join('user_profile', 'users.id', '=', 'user_profile.user_id')
//                        ->join('user_images', 'users.id', '=', 'user_images.user_id')
//                        ->join('user_videos', 'users.id', '=', 'user_videos.user_id')
                        ->select(
                                'users.name',
                                'users.phone',
                                'users.dob',
                                'users.city_id',
                                'users.state_id',
                                'user_profile.*'
//                                'user_images.image',
//                                'user_videos.videos'
                        )->where('users.id', '=', $User->id)
                        ->first();
//                $data['user_details'] = User::with('UserProfile')->with('images')->with('videos')->where('id',$User->id)->get();
                $data['user_details']['images'] = UserImages::where('user_id',$data['user_details']->user_id)->get();
                $data['user_details']['video'] = UserVideos::where('user_id',$data['user_details']->user_id)->first();
                if (!empty($data['user_details']->city_id)) {
                    $city = Cities::select('id', 'name')->where('id', $data['user_details']->city_id)->first();
                    $data['user_details']['city_name'] = $city->name;
                }
                if (!empty($data['user_details']->language_id)) {
                    $value = explode(',', $data['user_details']->language_id);
                    $languages = Languages::select('id', 'name')->whereIn('id', $value)->get();
                    $lang = [];
                    foreach ($languages as $language) {
                        $lang[] = $language->name;
                    }
                    $data['user_details']['language'] = implode(',', $lang);
                }

//                print_r($user_details);exit;
                return ['status' => $this->status_true, 'code' => '200', 'data' => $data];
            } else {
                return ['status' => $this->status_false, 'code' => '200', 'data' => 'User not logged in.'];
            }
        } catch (Exception $exception) {
            throw $exception;
        }
    }

    public function editUserProfile($data) {
        DB::beginTransaction();
        try {
            if (Auth::check()) {
                $user = Auth::user();
//                $phone = User::where('phone', $data['phone'])->first();
//                if($phone){
//                    return ['status' => $this->status_false, 'code' => '400', 'data' => 'This Mobile number already Used by another user'];
//                }else{
//                    $userProfile = UserProfile::where('user_id',$user->id)->first();
                $langs = implode(',', $data['language_id']);
                $userUpdate = User::findOrFail($user->id);
                $userUpdate->update([
                    'name' => $data['name'],
                    'phone' => $data['phone'],
                    'dob' => $data['dob'],
                    'city_id' => $data['select_city'],
                ]);

                $affected = DB::table('user_profile')
                        ->where('user_id', $user->id)
                        ->update(['height' => $data['height'],
                    'home_town' => $data['home_town'],
                    'hobbies' => $data['hobbies'],                            
                    'language_id' => $langs
                ]);
                DB::commit();
                return ['status' => $this->status_true, 'code' => '200', 'data' => 'Data update successfully'];
//                }
            } else {
                return ['status' => $this->status_false, 'code' => '200', 'data' => 'User not logged in.'];
            }
        } catch (Exception $exception) {
            DB::rollBack();
            throw $exception;
        }
    }
    
    public function displayPersonalInfo() {
        try {
            if (Auth::check()) {
                $user = Auth::user();
//                $dataUser = User::select('name','dob','phone','city_id')->where('id',$user->id)->orderBy('updated_at','DESC')->first();
                $dataProfile = UserProfile::select('height','home_town','hobbies','language_id')->where('user_id',$user->id)->orderBy('updated_at','DESC')->first();
                
                $dataUser = User::with('getUserProfile')->get();
                
                if (!empty($dataProfile->language_id)) {
                    $value = explode(',', $dataProfile->language_id);
                    $languages = Languages::select('id', 'name')->whereIn('id', $value)->get();
                    $lang = [];
                    foreach ($languages as $language) {
                        $lang[] = $language->name;
                    }
                    $dataProfile['language_id'] = implode(',', $lang);
                }
                
//                $data = array_merge($dataUser,$dataProfile);
                
                return ['status' => $this->status_true, 'code' => '200', 'data' => $dataUser];
            } else {
                return ['status' => $this->status_false, 'code' => '200', 'data' => 'Please logged in.'];
            }
        } catch (Exception $exception) {
            DB::rollBack();
            throw $exception;
        }
    }

    public function userAppliedCastingCall($data) {
        try {
            if (Auth::check()) {
                $user = Auth::user();
                
                if ($data->casting_id == '' || $data->casting_id == null) {
                    $castingcalls = UserCastingCall::with('getUserCastingModel')->where('user_id',$user->id)->with('getMaster')->get();
                }
                if ($data->casting_id != '') {
                    $castingcalls = UserCastingCall::join('casting_call', 'casting_call.id', '=', 'user_applied_casting_call.casting_id')
                                    ->where('user_id', $user->id)
                                    ->where('casting_id', $data->casting_id)->get();
                }

                return ['status' => $this->status_true, 'code' => '200', 'data' => $castingcalls];
//              print_r($user->id);
            }
        } catch (Exception $exception) {
//            DB::rollBack();addUserAppliedCastingCall
            throw $exception;
        }
    }
    public function addUserAppliedCasting($data) {
        DB::beginTransaction();
        try {
            if (Auth::check()) {
                $user = Auth::user();
               $saveResult = UserCastingCall::firstOrCreate([
                                'user_id' => $user->id,
                                'casting_id' => $data->casting_id
                            ]);
                // $count = count($data->newfileSource) + count($data->oldfileSource);
                $folderPath ='/home/mcccwdipl/public_html/backend2/public/uploads/UserImages/';
                $videofolderPath ='/home/mcccwdipl/public_html/backend2/public/uploads/UserVideos/';
                $postdata = file_get_contents("php://input");
                $request = json_decode($postdata);
                 $z = 1;
                 $i = 1;
                if(!empty($data->oldvideofileSource)){
                    // foreach ($data->oldvideofileSource as $key => $value){
                        $vcolumnName = 'video_'.$z;
                        $saveResult->$vcolumnName = $data->oldvideofileSource['videos'];
                        $saveResult->saveAsDraft = $data->saveAsDraft;
                        $saveResult->application_id = $saveResult->id;
                        $saveResult->save();
                        $z++;
                    // }
                }
                if(!empty($data->newvideofileSource)){
                    foreach ($data->newvideofileSource as $key => $value) {
                        $image_parts = explode(";base64,", $value);
                        $name = $user->id.'_'. uniqid() .'.mp4';
                        $image_base64 = base64_decode($image_parts[1]);
                        $file = $videofolderPath . $name;
                        file_put_contents($file, $image_base64);
                        $image_parts = null;
                        $image_base64 = null;
                        $imgagePath = $name;
                        
                        $columnName = 'video_'.$z;
                        $saveResult->$columnName = $name;
                        $saveResult->saveAsDraft = $data->saveAsDraft;
                        $saveResult->application_id = $saveResult->id;
                        $saveResult->save();
                        $i++;
                    }
                }
                if(!empty($data->oldfileSource)){
                    foreach ($data->oldfileSource as $key => $value){
                        $columnName = 'image_'.$i;
                        $saveResult->$columnName = $value['image'];
                        $saveResult->saveAsDraft = $data->saveAsDraft;
                         $saveResult->application_id = $saveResult->id;
                        $saveResult->save();
                        $i++;
                    }
                }
                if(!empty($data->newfileSource)){
                    foreach ($request->newfileSource as $key => $value){
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
                        $columnName = 'image_'.$i;
                        $saveResult->$columnName = $name;
                        $saveResult->saveAsDraft = $data->saveAsDraft;
                        $saveResult->application_id = $saveResult->id;
                        $saveResult->save();
                        $i++;
                    }
                }
                $saveResult = UserCastingCall::where('id',$saveResult->id)->first();
                        DB::commit();
                return ['status' => $this->status_true, 'code' => '200', 'data' => $saveResult];
            }
        } catch (Exception $exception) {
            DB::rollBack();
            throw $exception;
        }
    }
    public function confirmCastingApplication($request){
        DB::beginTransaction();
        try{
            $application_id = 'MCCC'.str_pad($request->application_id,10,'0',STR_PAD_LEFT);
            $saveResult = UserCastingCall::where('id',$request->application_id)->update([
                'application_id' => $application_id,
                'confirm' => 1
            ]);
            DB::commit();
            return ['status' => $this->status_true, 'code' => '200', 'data' => $application_id];
        }catch(Exception $exception) {
            DB::rollBack();
            throw $exception;
        }
    }
    public function addUserAppliedCastingCall($data) {
        DB::beginTransaction();
        try {
            if (Auth::check()) {
                $user = Auth::user();
                $images = $data->fileSource;
                $Videos = $data->video;
                if ($data->hasFile('fileSource')){                    
//                    $allowedfileExtension = ['jpg', 'png', 'jpeg'];
//                    $extension = $images->getClientOriginalExtension();
//                    $check = in_array($extension, $allowedfileExtension);
                    
//                    if($check){
                    $files = $data->fileSource;
//                        Image Save
                        foreach ($images as $item):
                            $destinationPath = public_path('/uploads/UserImages');

                            $var = date_create();
                            $time = date_format($var, 'YmdHis');
                            $imageName = $time . '-' . $item->getClientOriginalName();
                            $move = $item->move($destinationPath, $imageName);
                            $arr[] = $imageName;
                        endforeach;

//                        VideoSave
                        $VideodestinationPath = public_path('/uploads/UserVideos');                            
                        $VideoVar = date_create();
                        $videotime = date_format($VideoVar, 'YmdHis');
                        $videoName = $videotime . '-' . $Videos->getClientOriginalName();
                        $Videomove = $Videos->move($VideodestinationPath, $videoName);
                        
                        if ($move && $Videomove) {
                                $saveResult = UserCastingCall::create([
                                            'user_id' => $user->id,
                                            'casting_id' => $data->casting_id,
                                'image_1' => $arr[0],
                                'image_2' => $arr[1],
                                'image_3' => $arr[2],
                                'video_1' => $videoName
                                ]);
                            } else {
                                return ['status' => $this->status_false, 'code' => '400', 'data' => 'Some error accoured'];
                            }
                    DB::commit();
                        return ['status' => $this->status_true, 'code' => '200', 'data' => $saveResult->id];
//                    } else {
//                        return ['status' => $this->status_false, 'code' => '400', 'data' => 'Only jpg,png,jpeg files are allowed'];
//                    }
                }else {
                    return ['status' => $this->status_false, 'code' => '400', 'data' => 'No file selected'];
                }
            }
        } catch (Exception $exception) {
            DB::rollBack();
            throw $exception;
        }
    }
    
    public function updateUserContact($data){
        DB::beginTransaction();        
        try{            
            if (Auth::check()) {
                $validated = $data->validate([
                    'phone' => 'required|numeric|digits_between:10,12',
                    'email' => 'required',
                    'address' => 'required',
                ]);                
                if ($validated) {
                    User::where('id', $data->id)->update([
                        'phone' => $data->phone,
                        'email' => $data->email,
                        'address' => $data->address,
                    ]);
                    DB::commit();
                    return ['status' => $this->status_true, 'code' => '200', 'data' => 'Updated Successfully'];
                }else{
                    return ['error' => $this->status_false, 'code' => '200', 'data' => 'Something went Wrong'];
                }
            }else{
                return ['error' => $this->status_false, 'code' => '200', 'data' => 'User not logged in.'];
            }
        }catch(Exception $exception){
            DB::rollBack();
            throw $exception;
        }
    }
    
    public function addUpdateUserAnatomy($data){     
        DB::beginTransaction();       
        try{            
            if (Auth::check()) {
                $user = Auth::user();
                $validated = $data->validate([
                    'weight' => 'required',
                    'waist' => 'required',
                    'chest' => 'required',
                    'bust' => 'required',
                    'hair' => 'required',
                    'tattoo' => 'required',
                ]);                
                if ($validated) {
                    if ($data->id == '' && $data->id == Null) {
                        $formData = UserAnatomyModel::create([                            
                            'user_id' => $user->id,
                            'weight' => $data['weight'],
                            'waist' => $data['waist'],
                            'chest' => $data['chest'],
                            'bust' => $data['bust'],
                            'hair' => $data['hair'],
                            'tattoo' => $data['tattoo'],
                        ]);
                        DB::commit();
                        return ['status' => $this->status_true, 'code' => '200', 'data' => 'Added Successfully'];
                    } else {
                        UserAnatomyModel::where('id', $user->id)->where('user_id',$user->id)->update([
                            'weight' => $data->weight,
                            'waist' => $data->waist,
                            'chest' => $data->chest,
                            'bust' => $data->bust,
                            'hair' => $data->hair,
                            'tattoo' => $data->tattoo,
                        ]);
                        DB::commit();
                        return ['status' => $this->status_true, 'code' => '200', 'data' => 'Updated Successfully'];
                    }
                }else{
                    return ['error' => $this->status_false, 'code' => '200', 'data' => 'Something went Wrong'];
                }
            }else{
                return ['error' => $this->status_false, 'code' => '200', 'data' => 'User not logged in.'];
            }
        }catch(Exception $exception){
            DB::rollBack();
            throw $exception;
        }
    }
    public function fetchAnatomy(){  
        try{            
            if (Auth::check()) {
                $user = Auth::user();
                $data = UserAnatomyModel::where('user_id',$user->id)->first();
                return ['status' => $this->status_true, 'code' => '200', 'data' => $data];
            }else{
                return ['error' => $this->status_false, 'code' => '200', 'data' => 'User not logged in.'];
            }
        }catch(Exception $exception){
            throw $exception;
        }
    }

}
