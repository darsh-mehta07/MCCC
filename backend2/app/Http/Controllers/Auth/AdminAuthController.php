<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\AdminAuthService;
use App\User;
use App\Http\Requests\LoginValidate;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\UserDetailResource;
use App\Models\User\UserProfile;
use App\Models\User\UserImages;
use App\Models\User\UserVideos;
// use Auth;
use Validator;

class AdminAuthController extends Controller
{

    protected $adminAuthService;
    protected $status_true;
    protected $status_false;

    public function __construct(AdminAuthService $adminAuthService) {
        $this->adminAuthService = $adminAuthService;
        $this->status_true = 'true';
        $this->status_false = 'false';
    }
    //

    public function Userlogin(LoginValidate $request) {
        try {
            
            if(is_numeric($request->get('email_or_mobile'))){
                if (Auth::attempt(['phone' => $request->email_or_mobile, 'password' => $request->password])) {
                    $userDetails = [ 'id'        => Auth::user()->id,
                                     'name'      => Auth::user()->name,
                                     'email'     => Auth::user()->email,
                                     'phone'     => Auth::user()->phone,
                                     'gender'    => Auth::user()->gender,
                                     'dob'       => Auth::user()->dob,
                                     'state_id'  => Auth::user()->state_id,
                                     'city_id'   => Auth::user()->city_id,
//                                     'is_active' => Auth::user()->is_active,
                                     'created_at'=> date('d-m-Y', strtotime(Auth::user()->created_at)),
                                ];
                    $user =  Auth::user();
                    
                    
                }else {
                    return response()->json(['status' => $this->status_false,'code' => '400', 'message' => 'Please Enter Valid Username and Password']);
                }
                
            }elseif(filter_var($request->get('email_or_mobile'), FILTER_VALIDATE_EMAIL)){
                if (Auth::attempt(['email' => $request->email_or_mobile, 'password' => $request->password])) {
                   $userDetails = [ 'id'        => Auth::user()->id,
                                    'name'      => Auth::user()->name,
                                    'email'     => Auth::user()->email,
                                    'phone'     => Auth::user()->phone,
                                    'gender'    => Auth::user()->gender,
                                    'dob'       => Auth::user()->dob,
                                    'state_id'  => Auth::user()->state_id,
                                    'city_id'   => Auth::user()->city_id,
//                                    'is_active' => Auth::user()->is_active,
                                    'created_at'=> date('d-m-Y', strtotime(Auth::user()->created_at)),
                                ];
                    $user =  Auth::user();          
                }else {
                    return response()->json(['status' => $this->status_false, 'code' => '400', 'message' => 'Please Enter Valid Username and Password']);
                }
            }
            
            if($userDetails){
                $userProfile = UserProfile::where('user_id', $userDetails['id'])->first();
                    if ($userProfile) {
                       $profileStatus = 'true';
                    }else{
                        $profileStatus = 'false'; 
                    }
                
                // print_r($user);exit;
            $token = $user->createToken('TutsForWeb')->accessToken;
            return response()->json(['status'=> $this->status_true, 'profileStatus' => $profileStatus, 'code' => '200', 'userDetails' => $userDetails,'token' => $token]);
            // return response()->json($token, 200);
             } else {
            return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => 'Something went wrong while login! Please Try again']);
            }
        } catch (\Exception $ex) {
            return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
        }
    }

    public function checkAdminEmail(Request $request) {
         $validatedData = $request->validate([
               'email' => 'required|email|max:28',
           ],
            [
                'email.required'=> 'Email is Required', // custom message
                'email.email'=> 'Please enter valid email address', // custom message
            ]);
        try{
            return $this->adminAuthService->checkAdminEmail($request);
            
        }catch(\Exception $ex){
            return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
        }
        
       
    }
    
    public function checkPhoneMumber(Request $request){
        $validatedData = $request->validate([
               'phone' => 'required|numeric|digits:10',
           ],
            [
                'phone.required'    => 'phone number is Required',
                'phone.numeric'     => 'Please enter only numbers.',
                'phone.digits'      => 'Please enter only 10 digits numbers.',
            ]);
            try{
                return $this->adminAuthService->checkusersPhoneNumber($request);
            
            }catch(\Exception $ex){
                return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
            }
    }

    public function logout(Request $request){
        try{
            
            if (Auth::check()) {
                $detleteToken =  Auth::user()->AauthAcessToken()->delete();
                return $response = response()->json(['status'=> $this->status_true, 'code' => '200', 'message'=>'logout successfully.']);
            }else{
                return response()->json(['status'=> $this->status_false, 'code' => '404', 'message'=>'Toekn not found.']);
            }

        }catch(\Exception $ex){
            return response()->json(['status' => $this->status_false, 'code' => '500','message' => $ex->getMessage()]);
        }
       
    }
}
