<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;
use App\Services\FrontendService;
use App\Http\Requests\RegisteredUsers;
use App\Http\Requests\GetCityValidation;
use Validator;
use Auth;
use File;

class FrontendController extends Controller
{
    protected $frontendServices;
    protected $status_true;
    protected $status_false;
    protected $RecommendationService;

    public function __construct(FrontendService $frontendServices) {
        $this->status_true = 'true';
        $this->status_false = 'false';
        $this->frontendServices = $frontendServices;
    }

    public function getRegisteredUsers($id = null)
    {
        try {
            $data = $this->frontendServices->getRegisteredData($id);
            return response()->json(['status' => $this->status_true, 'code' => '200', 'data' => $data]);
        } catch (Exception $ex) {
            return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
        }
    }
    
    
    public function test(){
        return view('about');
    }
    
    public function getLanguage(){
        try {
            $data = $this->frontendServices->getLanguages();
            return response()->json(['status' => $this->status_true, 'code' => '200', 'data' => $data]);
        } catch (Exception $ex) {
            return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
        }
    }

    public function UserRegisteration(RegisteredUsers $request){
        // print_r($request);exit;
        try{
            $data = $this->frontendServices->newUserRegistration($request);
            
            return response()->json(['status' => $this->status_true, 'code' => '200', 'userDetails' => $data['registerUser'], 'token' => $data['token']]);
        }catch(\Exception $ex){
            return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
        }
    }

    

    public function CheckSocialId(Request $request){
         $validatedData = $request->validate([
               'name'               => 'required|max:28|',
               'email'              => 'required|email|max:28',
               'provider_name'      => 'required',
               'client_id'          => 'required'
           ],
            [
                'name.required'             => 'Name is required',
                'email.required'            => 'Email is Required', // custom message
                'email.email'               => 'Please enter valid email address', // custom message
                // 'email.unique'              =>  'These Email already exists! Please use another one.',
                'provider_name.required'    => 'Please Provide us the Provider Name',
                'client_id.required'        => 'Social id is required'
            ]);
        
        try {
            $data = $this->frontendServices->socialLoginCheck($request);
            if($data == false){
                 return response()->json(['status' => $this->status_false, 'code' => '201', 'message' => 'User already registered with these email-id. Please use another email-id']);
            }else{
               return response()->json($data); 
            }
            
            
            
        } catch (Exception $ex) {
            return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
        }
    }


    public function  getStates(){
        try{
          
            $data = $this->frontendServices->getallStates();
            
            return response()->json(['status' => $this->status_true, 'code' => '200', 'data' => $data]);
        }catch(Exception $ex){
            return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
        }
    }

    
    public function  getCities(GetCityValidation $request){
        try{
            $data = $this->frontendServices->getallCities($request);
            
            if(!$data->isEmpty()){
            return response()->json(['status' => $this->status_true, 'code' => '200', 'data' => $data]);
            }else{
                 return response()->json(['status' => $this->status_true, 'code' => '404', 'data' => 'no cities found']);
            }
        }catch(Exception $ex){
            return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
        }
    }
    
    public function termsConditions(){
         try{
            $data = $this->frontendServices->getTermsConditions();
            
            return response()->json(['status' => $this->status_true, 'code' => '200', 'firstFourTerms' => $data['start_terms'], 'allTerms' => $data['all_terms']]);
        }catch(Exception $ex){
            return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
        }
    }


    public function generateOTP(Request $request){ 
        try{
            $otp = mt_rand(1000,9999);
            return response()->json(['status' => $this->status_true, 'code' => '200', 'otp' => $otp]);

        }catch(Exception $ex){
            return response()->json(['status' => $this->status_false, 'code' => '500','message' => $ex->getMessage()]);
        }   
        // $data = $this->frontendServices->newOTPInsert($request);
        
    }

    public function displayImage($filename)
        {
            $path = storage_path('app/public/img/' . $filename);
            // $path = Storage::path('public/img/' . $filename);
            // print_r($path);exit;

            if (!File::exists($path)) {
                // print_r('hello');exit;
                abort(404);
            }

            $file = File::get($path);

            $type = File::mimeType($path);
            // print_r($file);exit;
            $response = Response::make($file, 200);
            $response->header("Content-Type", $type);
            return $response;

        }
        
    
}
