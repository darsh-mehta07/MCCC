<?php

namespace App\Services;

use DB;
use Hash;
use App\User;
use Mail;
use App\Models\Frontend\States;
use App\Models\Frontend\Cities;
use App\Models\Frontend\Languages;
use App\Models\Frontend\TermsConditions;
use App\Models\User\UserProfile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use App\Mail\Welcome;

class FrontendService

{  
    protected $status_true;
    protected $status_false;
    
    public function __construct() {
        $this->status_true = 'true';
        $this->status_false = 'false';
    }
    
    
    public function getRegisteredData($id)
    {
        try{
            
            if (Auth::check()) {
                return $id?User::findOrFail($id): User::all();
            }else{
                return ['status' => $this->status_false, 'code' => '200', 'data' => 'User not logged in.'];   
            }
        	
        }catch(Exception $exception){
            throw $exception;
        }
        
    }

    public function getallStates()
    {  
        try{
            return $state = Cache::rememberForever('states', function(){
            return States::select('id','name')->get();
            });
        }catch(Exception $exception){
            throw $exception;
        }
        
    }
    
    public function getallCities($data)
    {
        try{
            return Cities::select('id','state_id','name')->where('status','1')->where('state_id',$data['state_id'])->get();
        }catch(Exception $exception){
            throw $exception;
        }
        
    }
    
    public function getTermsConditions(){
        
        try{
            return $terms = Cache::rememberForever('terms', function(){
            $data["start_terms"] = TermsConditions::select('id','title','description')->orderBy('id', 'asc')->take(4)->get();
            $data["all_terms"] = TermsConditions::select('id','title','description')->get();
            return $data;
            });
        // return TermsConditions::all();
        }catch(Exception $exception){
            throw $exception;
        }
        
    }
    
    public function getLanguages(){
        
        try{
            return $language = Cache::rememberForever('languages', function(){
            return Languages::select('id','name')->get();
            });
        }catch(Exception $exception){
            throw $exception;
        }
       
    }

    public function newUserRegistration($data){
        DB::beginTransaction();
        try{
            
            $data['registerUser'] = User::create([
                'name'              =>$data['name'],
                'email'             =>$data['email'],
                'phone'             =>$data['phone'],
                'password'          => Hash::make($data['confirm_password']),
                'dob'               =>$data['dob'],
                'gender'            =>$data['gender'],
                'state_id'          =>$data['select_state'],
                'city_id'           =>$data['select_city'],
            ]);
            
            $user =  Auth::user();
            
            $data['token'] = $data['registerUser']->createToken('TutsForWeb')->accessToken;
            Mail::to($data['email'])->send(new Welcome);
            DB::commit();
            return $data;
        }catch(Exception $exception){
            DB::rollBack();
            throw $exception;
        }
    }

    public function newOTPInsert($data){
        try{
            $otp = mt_rand(1000,9999);
            $user =  User::where('phone', $data['phone'])
                                ->update(['otp' => $otp]);
            if($user){
                return $otp;
            }
            
            // $user =  RegisterUser::where('phone', $data['phone'])->first();
            // $user->update([
            //     'otp' =>$otp,
            // ]);
            
        }catch (Exception $exception){
            throw $exception;
        }
    }

    
    public function socialLoginCheck($req)
    {
         DB::beginTransaction();
        try{
            if($req->provider_name === 'FACEBOOK')
            {
                // $matchThese = ['email' => $req['email'], 'client_id' => $req['client_id'] ];
                $user = User::where('email', $req['email'])
                            ->where('client_id', $req['client_id'])
                                ->first();
                
                $checkEmail = User::select('email')->where('email', $req['email'])->first();
                
                if(!$user){
                    if($checkEmail){
                        return false;   // already exists email on Registered.
                    }else{
                          $user = User::create([ 
                            'name'              =>$req['name'],
                            'email'             =>$req['email'],
                            'client_id'         =>$req['client_id'],
                            'provider_name'     =>$req['provider_name']
                        ]);  
                    }
                    
                }
                
                    $userDetails = ['id'                => $user->id,
                                    'name'              => $user->name,
                                    'email'             => $user->email,
                                    'phone'             => $user->phone,
                                    'gender'            => $user->gender,
                                    'dob'               => $user->dob,
//                                    'client_id'         => $user->client_id,
//                                    'provider_name'     => $user->provider_name,
                                    'address'           => $user->address,
                                    'state_id'          => $user->state_id,
                                    'city_id'           => $user->city_id,
//                                    'is_active'         => $user->is_active,
                                    'created_at'        => date('d-m-Y', strtotime($user->created_at)),
                                    ];
                    Auth::login($user);
                    
                    $userProfile = UserProfile::where('user_id', $userDetails['id'])->first();
                    if ($userProfile) {
                       $profileStatus = $this->status_true;
                    }else{
                        $profileStatus = $this->status_false; 
                    }
                    
                    $data["code"] = '200';
                    $data["profileStatus"] = $profileStatus;
                    $data["status"] = $this->status_true;
                    $data["userDetails"] = $userDetails;
                    $data["token"] = $user->createToken('TutsForWeb')->accessToken;
                    DB::commit();
                    return $data;
                }
            
            if($req->provider_name === 'GOOGLE')
            {
                $user = User::where('email', $req['email'])
                            ->where('client_id', $req['client_id'])
                                ->first();
                
                $checkEmail = User::where('email', $req['email'])->first();
                
                // $checkEmail = User::where('client_id', $req['client_id'])->first();
            if(!$user){
                if($checkEmail){
                        return false;   // already exists email on Registered.
                    }else{
                        // print_r('hello');exit;
                $user = User::create([ 
                    'name'              =>$req['name'],
                    'email'             =>$req['email'],
                    'client_id'         =>$req['client_id'],
                    'provider_name'     =>$req['provider_name']
                ]);
                    }
                
            }
                $userDetails = ['id'                => $user->id,
                                'name'              => $user->name,
                                'email'             => $user->email,
                                'phone'             => $user->phone,
                                'gender'            => $user->gender,
                                'dob'               => $user->dob,
//                                'client_id'         => $user->client_id,
//                                'provider_name'     => $user->provider_name,
                                'address'           => $user->address,
                                'state_id'          => $user->state_id,
                                'city_id'           => $user->city_id,
//                                'is_active'         => $user->is_active,
                                'created_at'        => date('d-m-Y', strtotime($user->created_at)),
                            ];
                Auth::login($user);
                
                    $userProfile = UserProfile::where('user_id', $userDetails['id'])->first();
                    if ($userProfile) {
                       $profileStatus =  $this->status_true;
                    }else{
                        $profileStatus = $this->status_false; 
                    }
                    $data["code"] = '200';
                    $data["profileStatus"] = $profileStatus;
                    $data["status"] = $this->status_true;
                    $data["user"] = $userDetails;
                    $data["token"] = $user->createToken('TutsForWeb')->accessToken;
                    DB::commit();
                return $data;
            }
        }catch(Exception $exception){
            DB::rollBack();
            throw $exception;
        }
        
        
    }
}