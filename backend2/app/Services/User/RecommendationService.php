<?php

namespace App\Services\User;

use Illuminate\Support\Facades\DB;
use App\User;
use Illuminate\support\Facades\Cache;
use App\Models\User\UserProfile;
use App\Models\Frontend\Cities;
use App\Models\Admin\CastingCallModel;
use App\Models\Frontend\Languages;
use Auth;
use Carbon\Carbon;

class RecommendationService
{
    
    protected $status_true;
    protected $status_false;
    
    public function __construct() {
        $this->status_true = 'true';
        $this->status_false = 'false';
    }
    
    
    public function displayRecommend($request){
        
        try{            
            if (Auth::check()) {
            $loginUser = Auth::user();
            $castingUser = CastingCallModel::all();
            
//            $userlanguage = Languages::whereIn('id',$castingUser[0]->language_id)->pluck('name');
//            $lang = explode(',', $userlanguage);
//            $langName = implode(',',$langID);            
            
            $age = Carbon::parse($loginUser->dob)->diff(Carbon::now())->y;  
            if($age == null || $age == ""){
                $age = 0;
            }
            $DataArray = array();
            $data = array();
            if ($request->limit != '' || $request->limit != null) {
                for ($i=0; $i < count($castingUser); $i++) {                               
                    $range = explode(',', $castingUser[$i]->age_range);
                    if($loginUser->gender == $castingUser[$i]->gender){
                        if(empty($range[0]) || $range[0] == '' || $range[0] == NULL){
                            $range[0] = 1;
                        }
                        if(empty($range[1]) || $range[1] == '' || $range[1] == NULL){
                            $range[1] = 1;
                        }
                        
                        if ( in_array($age, range($range[0],$range[1])) ) {
                            if($loginUser->UserProfile->height == $castingUser[$i]->height){
                                if($loginUser->UserProfile->skin_color == $castingUser[$i]->skin_color){   
                                    if($loginUser->UserProfile->language_id == $castingUser[$i]->language_id){
                                        if($loginUser->cityName == $castingUser[$i]->location){
                                            $data[0] = CastingCallModel::where('gender', $castingUser[$i]->gender)->where('age_range', $castingUser[$i]->age_range)->where('height', $castingUser[$i]->height)->where('skin_color', $castingUser[$i]->skin_color)->where('language_id', $castingUser[$i]->language_id)->where('location', $castingUser[$i]->location)->orderBy('id', 'DESC')->take($request->limit)->get()->toArray();
                                        }else{
                                            $data[0] = CastingCallModel::where('gender', $castingUser[$i]->gender)->where('age_range', $castingUser[$i]->age_range)->where('height', $castingUser[$i]->height)->where('skin_color', $castingUser[$i]->skin_color)->where('language_id', $castingUser[$i]->language_id)->orderBy('id', 'DESC')->take($request->limit)->get()->toArray();
                                        }
                                    }else{
                                        $data[0] = CastingCallModel::where('gender', $castingUser[$i]->gender)->where('age_range', $castingUser[$i]->age_range)->where('height', $castingUser[$i]->height)->where('skin_color', $castingUser[$i]->skin_color)->orderBy('id', 'DESC')->take($request->limit)->get()->toArray();
                                    }
                                }else{  
                                    
                                    $data[0] = CastingCallModel::where('gender', $castingUser[$i]->gender)->where('age_range', $castingUser[$i]->age_range)->where('height', $castingUser[$i]->height)->orderBy('id', 'DESC')->take($request->limit)->get()->toArray();
                                }
                            }else{
                                $data[0] = CastingCallModel::where('gender', $castingUser[$i]->gender)->where('age_range', $castingUser[$i]->age_range)->orderBy('id', 'DESC')->take($request->limit)->get()->toArray();
                            }
                        }else{ 
                            $data[0] = CastingCallModel::where('gender', $castingUser[$i]->gender)->orderBy('id', 'DESC')->take($request->limit)->get()->toArray();
                        }
                    }elseif($loginUser->UserProfile->skin_color == $castingUser[$i]->skin_color) {
                        if($loginUser->UserProfile->height == $castingUser[$i]->height){
                            if($loginUser->UserProfile->skin_color == $castingUser[$i]->skin_color){   
                                if($loginUser->UserProfile->language_id == $castingUser[$i]->language_id){
                                    if($loginUser->cityName == $castingUser[$i]->location){
                                        $data[0] = CastingCallModel::where('height', $castingUser[$i]->height)->where('skin_color', $castingUser[$i]->skin_color)->where('language_id', $castingUser[$i]->language_id)->where('location', $castingUser[$i]->location)->orderBy('id', 'DESC')->take($request->limit)->get()->toArray();
                                    }else{
                                        $data[0] = CastingCallModel::where('height', $castingUser[$i]->height)->where('skin_color', $castingUser[$i]->skin_color)->where('language_id', $castingUser[$i]->language_id)->orderBy('id', 'DESC')->take($request->limit)->get()->toArray();
                                    }
                                }else{
                                    $data[0] = CastingCallModel::where('height', $castingUser[$i]->height)->where('skin_color', $castingUser[$i]->skin_color)->orderBy('id', 'DESC')->take($request->limit)->get()->toArray();
                                }
                            }else{                            
                                $data[0] = CastingCallModel::where('height', $castingUser[$i]->height)->orderBy('id', 'DESC')->take($request->limit)->get()->toArray();
                            }
                        }else{                        
                            $data[0] = CastingCallModel::where('skin_color', $castingUser[$i]->skin_color)->orderBy('id', 'DESC')->take($request->limit)->get()->toArray();
                        }
                    }elseif($loginUser->UserProfile->height == $castingUser[$i]->height){ 
                        if($loginUser->UserProfile->language_id == $castingUser[$i]->language_id){
                            if($loginUser->cityName == $castingUser[$i]->location){
                                $data[0] = CastingCallModel::where('height', $castingUser[$i]->height)->where('language_id', $castingUser[$i]->language_id)->where('location', $castingUser[$i]->location)->orderBy('id', 'DESC')->take($request->limit)->get()->toArray();
                            }else{
                                $data[0] = CastingCallModel::where('height', $castingUser[$i]->height)->where('language_id', $castingUser[$i]->language_id)->orderBy('id', 'DESC')->take($request->limit)->get()->toArray();
                            }
                        }else{
                            $data[0] = CastingCallModel::where('height', $castingUser[$i]->height)->orderBy('id', 'DESC')->take($request->limit)->get()->toArray();
                        }
                    }elseif($loginUser->UserProfile->language_id == $castingUser[$i]->language_id){
                        if($loginUser->cityName == $castingUser[$i]->location){
                            $data[0] = CastingCallModel::where('language_id', $castingUser[$i]->language_id)->where('location', $castingUser[$i]->location)->orderBy('id', 'DESC')->take($request->limit)->get()->toArray();
                        }else{
                            $data[0] = CastingCallModel::where('language_id', $castingUser[$i]->language_id)->orderBy('id', 'DESC')->take($request->limit)->get()->toArray();
                        }
                    }else{
                        $data[0] = CastingCallModel::where('gender', $castingUser[$i]->gender)->orderBy('id', 'DESC')->take($request->limit)->get()->toArray();
//                        $data = array('No Record Found');
                    }
                    
                //  $datas = array_merge($DataArray,$data);
                    // $itemms = array_values ( $datas );
                    $itemms = array_shift ( $data );
                    $items = self::check_multi_unique($itemms); 
                    if(count($items) == 0){
                        $items = 'No Record Found';
                    } 
                } 
            }
            
            if ($request->casting_id != '' || $request->casting_id != null) {
                $items = CastingCallModel::where('id', $request->casting_id)->orderBy('id', 'DESC')->get()->toArray(); 
                if(count($items) == 0){
                    $items = array('No Record Found');
                }
            }
            
            if ($request->casting_id == '' && $request->limit == '') {                
                for ($i=0; $i < count($castingUser); $i++) {                               
                    $range = explode(',', $castingUser[$i]->age_range);
                    if($loginUser->gender == $castingUser[$i]->gender){ 
                        if(empty($range[0]) || $range[0] == '' || $range[0] == NULL){
                            $range[0] = 1;
                        }
                        if(empty($range[1]) || $range[1] == '' || $range[1] == NULL){
                            $range[1] = 1;
                        }
                        if ( in_array($age, range($range[0],$range[1])) ) {
                            if($loginUser->UserProfile->height == $castingUser[$i]->height){
                                if($loginUser->UserProfile->skin_color == $castingUser[$i]->skin_color){   
                                    if($loginUser->UserProfile->language_id == $castingUser[$i]->language_id){
                                        if($loginUser->cityName == $castingUser[$i]->location){
                                            $data[0] = CastingCallModel::where('gender', $castingUser[$i]->gender)->where('age_range', $castingUser[$i]->age_range)->where('height', $castingUser[$i]->height)->where('skin_color', $castingUser[$i]->skin_color)->where('language_id', $castingUser[$i]->language_id)->where('location', $castingUser[$i]->location)->orderBy('id', 'DESC')->get()->toArray();
                                        }else{
                                            $data[0] = CastingCallModel::where('gender', $castingUser[$i]->gender)->where('age_range', $castingUser[$i]->age_range)->where('height', $castingUser[$i]->height)->where('skin_color', $castingUser[$i]->skin_color)->where('language_id', $castingUser[$i]->language_id)->orderBy('id', 'DESC')->get()->toArray();
                                        }
                                    }else{
                                        $data[0] = CastingCallModel::where('gender', $castingUser[$i]->gender)->where('age_range', $castingUser[$i]->age_range)->where('height', $castingUser[$i]->height)->where('skin_color', $castingUser[$i]->skin_color)->orderBy('id', 'DESC')->get()->toArray();
                                    }
                                }else{  
                                    
                                    $data[0] = CastingCallModel::where('gender', $castingUser[$i]->gender)->where('age_range', $castingUser[$i]->age_range)->where('height', $castingUser[$i]->height)->orderBy('id', 'DESC')->get()->toArray();
                                }
                            }else{
                                $data[0] = CastingCallModel::where('gender', $castingUser[$i]->gender)->where('age_range', $castingUser[$i]->age_range)->orderBy('id', 'DESC')->get()->toArray();
                            }
                        }else{ 
                            $data[0] = CastingCallModel::where('gender', $castingUser[$i]->gender)->orderBy('id', 'DESC')->get()->toArray();
                        }
                    }elseif($loginUser->UserProfile->skin_color == $castingUser[$i]->skin_color) {
                        if($loginUser->UserProfile->height == $castingUser[$i]->height){
                            if($loginUser->UserProfile->skin_color == $castingUser[$i]->skin_color){   
                                if($loginUser->UserProfile->language_id == $castingUser[$i]->language_id){
                                    if($loginUser->cityName == $castingUser[$i]->location){
                                        $data[0] = CastingCallModel::where('height', $castingUser[$i]->height)->where('skin_color', $castingUser[$i]->skin_color)->where('language_id', $castingUser[$i]->language_id)->where('location', $castingUser[$i]->location)->orderBy('id', 'DESC')->get()->toArray();
                                    }else{
                                        $data[0] = CastingCallModel::where('height', $castingUser[$i]->height)->where('skin_color', $castingUser[$i]->skin_color)->where('language_id', $castingUser[$i]->language_id)->orderBy('id', 'DESC')->get()->toArray();
                                    }
                                }else{
                                    $data[0] = CastingCallModel::where('height', $castingUser[$i]->height)->where('skin_color', $castingUser[$i]->skin_color)->orderBy('id', 'DESC')->get()->toArray();
                                }
                            }else{                            
                                $data[0] = CastingCallModel::where('height', $castingUser[$i]->height)->orderBy('id', 'DESC')->get()->toArray();
                            }
                        }else{                        
                            $data[0] = CastingCallModel::where('skin_color', $castingUser[$i]->skin_color)->orderBy('id', 'DESC')->get()->toArray();
                        }
                    }elseif($loginUser->UserProfile->height == $castingUser[$i]->height){ 
                        if($loginUser->UserProfile->language_id == $castingUser[$i]->language_id){
                            if($loginUser->cityName == $castingUser[$i]->location){
                                $data[0] = CastingCallModel::where('height', $castingUser[$i]->height)->where('language_id', $castingUser[$i]->language_id)->where('location', $castingUser[$i]->location)->orderBy('id', 'DESC')->get()->toArray();
                            }else{
                                $data[0] = CastingCallModel::where('height', $castingUser[$i]->height)->where('language_id', $castingUser[$i]->language_id)->orderBy('id', 'DESC')->get()->toArray();
                            }
                        }else{
                            $data[0] = CastingCallModel::where('height', $castingUser[$i]->height)->orderBy('id', 'DESC')->get()->toArray();
                        }
                    }elseif($loginUser->UserProfile->language_id == $castingUser[$i]->language_id){
                        if($loginUser->cityName == $castingUser[$i]->location){
                            $data[0] = CastingCallModel::where('language_id', $castingUser[$i]->language_id)->where('location', $castingUser[$i]->location)->orderBy('id', 'DESC')->get()->toArray();
                        }else{
                            $data[0] = CastingCallModel::where('language_id', $castingUser[$i]->language_id)->orderBy('id', 'DESC')->get()->toArray();
                        }
                    }else{
                        $data[0] = CastingCallModel::orderBy('id', 'DESC')->get()->toArray();
//                        $data = array('No Record Found');
                    }
                    $itemms = array_shift ( $data );
                    $items = self::check_multi_unique($itemms);
                    
                    if(count($items) == 0){
                        $items = 'No Record Found';
                    } 
                }
            }
            return ['status' => $this->status_true, 'code' => '200', 'data' => $items];
            }
        }catch(Exception $exception){
            DB::rollBack();
            throw $exception;
        }
    }
    
    
    public function check_multi_unique($src){
        $results = array_map("unserialize",array_unique(array_map("serialize", $src)));
        return $results;
    }
}