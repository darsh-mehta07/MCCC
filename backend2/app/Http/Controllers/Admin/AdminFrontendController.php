<?php

namespace App\Http\Controllers\Admin;

use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Frontend\Languages;
use App\Models\Admin\BtsCategory;
use App\Models\Frontend\States;
use App\Services\FrontendService;

class AdminFrontendController extends Controller
{
    protected $frontendServices;
       use AuthenticatesUsers;
       protected $redirectTo = '/Dashboard';
       
       
       public function __construct(FrontendService $frontendServices)
    {
//        $this->middleware('IsAdmin')->except('logout');
            $this->frontendServices = $frontendServices;
    }   
       
    
    public function adminlogin(){
        $Name = "Rahul";
        return view('Admin.page-login',compact('Name'));
      }
      
    public function dashboard(){
        return view('Admin.index');
      }
      
    public function navbar(){
        return view('Admin.navbar');
      }  
      
    public function castingCallPage(){
        $data = Languages::select('id','name')->orderBy('name')->get();
        return view('Admin.castingCall',['data'=>$data] );
      }
    
    public function btsPage(){
         $data = BtsCategory::select('id','category')->where('status',1)->orderBy('category')->get();
        return view('Admin.bts',['data'=>$data]);
      }  
    
    public function WorkshopPage(){
        
        $State = States::select('id','name')->orderBy('name')->get();
//        $City = Cities::select('id', 'state_id' ,'name')->orderBy('name')->get();
        return view('Admin.workShop',[ 'State'=> $State ]);
      }  
      
      
      public function checkLogin(Request $request)
      {
          $validatedData = $request->validate([
               'email' => 'required|email|max:28',
              'password' => 'required',
           ],
            [
                'email.required'=> 'Email is Required', // custom message
                'email.email'=> 'Please enter valid email address', // custom message
                'password.required' => 'Password is required',
            ]);

//          print_r($request->password);exit;
         if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) 
//          if(auth()->attempt(array('email' => $input['email'], 'password' => md5($input['password']))))
          {
              if (auth()->user()->is_admin == 1) {
                 $user =  Auth::user();
                return redirect()->route('dashboard',compact('user'));

            }else{
                return redirect()->route('home');

            }

          }else{
            return 'error! Email-Address And Password Are Wrong.';

        }
      }
      
      public function getCityByState(Request $request)
      {
           try{
             $data = $this->frontendServices->getallCities($request);
             if($data){
                 return response()->json($data); 
             }
         }catch(Exception $ex){
             return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
         }
      }
}
