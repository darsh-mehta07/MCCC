<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\User;
use DB;
use Illuminate\Support\Facades\Mail;
use App\Mail\SendEmail;
use App\Mail\PasswordReset;
use Illuminate\Support\Facades\Auth;

class ForgotPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset emails and
    | includes a trait which assists in sending these notifications from
    | your application to your users. Feel free to explore this trait.
    |
    */

    // use SendsPasswordResetEmails;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
     
    protected $status_true;
    protected $status_false; 
     
    public function __construct()
    {
        $this->status_true = 'true';
        $this->status_false = 'false';
        // $this->middleware('guest');
    }
    
   /* public function forgot(Request $request)
    {
        $email = $request->email;
        
        if(User::where('email',$email)->doesntExist()){
            return response([
                'message' => 'user not exists!'
                ], 404);
        }
        
        $token = Str::random(10);
        
        try{
           DB::table('password_resets')->insert([
            'email' => $email,
            'token' => $token
            ]); 
            
            $user = User::where('email', $email)->first();
            //  print_r($user);exit;
            Mail::to($user->email)->send(new SendEmail);
            
            // $mail = Mail::send('email.mail-template', $user, function($message) use ($user) {
            //         $message->to($user->email);
            //         $message->subject('Laravel send emails example');
            //     });
            // if($mail){
            //       return 'Mail Send Successfully';
            //     }
            
            // Mail::send(new SendEmail);
            return response([
                'message' => 'check your email!'
                ]);
            
        }catch(\Exception $exception){
            return response([
                'message' => $exception->getMessage()
                ],400);
                
        }
       
    }
    */
    
    public function forgot(Request $request)
    {
         $validatedData = $request->validate([
                'email_or_mobile' => 'required',   // |max:2000
           ],
            [
                'email_or_mobile.required'    => 'Please enter your email-id or Mobile number',
                ]);
                
        try{
            
            if(is_numeric($request->get('email_or_mobile'))){

                $email_or_mobile = $request->email_or_mobile; 
                
                if(User::where('phone',$email_or_mobile)->doesntExist()){
                    
                return response(['status' => $this->status_false, 'code' => '404', 'message' => 'user not exists!']);
                }else{
                    $data['registerUser'] = User::where('phone',$email_or_mobile)->first();
                    // $user =  Auth::user();
                    $token = $data['registerUser']->createToken('TutsForWeb')->accessToken;

                    return response()->json(['status' => $this->status_true, 'code' => '200','token' => $token]);
                }
            }
            
            if(filter_var($request->get('email_or_mobile'), FILTER_VALIDATE_EMAIL)){
                
               $email_or_mobile = $request->email_or_mobile; 
            
                if(User::where('email',$email_or_mobile)->doesntExist()){
   
                return response(['status' => $this->status_false, 'code' => '404', 'message' => 'user not exists!']);
                }else{
                    $otp = mt_rand(1000,9999);
                    $user =  User::where('email', $email_or_mobile)
                                ->update(['otp' => $otp]);
                    Mail::to($email_or_mobile)->send(new PasswordReset($otp));
                    $data['registerUser'] = User::where('email',$email_or_mobile)->first();
                    // $user =  Auth::user();
                    //   print_r($user);exit;
                    $token = $data['registerUser']->createToken('TutsForWeb')->accessToken;

                    return response()->json(['status' => $this->status_true, 'code' => '200','token' => $token,'otp'=>$otp]);
                } 
            }
    
        }catch (Exception $ex) {
            return response()->json(['status' => $this->status_false, 'code' => '500','message' => $ex->getMessage()]);
        }
    }
}
