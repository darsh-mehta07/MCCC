<?php

namespace App\Http\Controllers\Auth;
use DB;
use Hash;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\User;

class ResetPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset requests
    | and uses a simple trait to include this behavior. You're free to
    | explore this trait and override any methods you wish to tweak.
    |
    */

    // use ResetsPasswords;    //  comment by rahul

    /**
     * Where to redirect users after resetting their password.
     *
     * @var string
     */
    // protected $redirectTo = '/home';  //  comment by rahul

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
        // $this->middleware('guest');   //  comment by rahul
    }
    
    
   /* protected function resetPassword($user, $password)
    {
        $user->password = Hash::make($password);
        $user->save();
        event(new PasswordReset($user));
    }
    protected function sendResetResponse(Request $request, $response)
    {
        $response = ['message' => "Password reset successful"];
        return response($response, 200);
    }
    protected function sendResetFailedResponse(Request $request, $response)
    {
        $response = "Token Invalid";
        return response($response, 401);
    }
    */
    
    public function resetPassword(Request  $request){
        $validatedData = $request->validate([
                'password' => 'required|regex:/^((?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])).{6,8}$/',   // |max:2000
           ],
            [
                'password.required'    => 'Please enter password',
                // 'password.min'      =>  'Password should be atleast of 6 characters',
                'password.regex'     => 'Should have At least one Uppercase letter,one Lower case letter,one numeric value,one special character and only 8 characters are allowed'
                ]);
                
                try{
                    $pass = $request->password;
                    $user =  Auth::user(); 
                    DB::table('users')
                    ->where('id', $user->id)
                    ->where('otp', $request->otp)
                    ->update([
                        'password' => Hash::make($pass),
                        'otp'=>null
                    ]);
                    
                   $result = Auth::user()->token()->revoke();
                    if($result){
                    return response()->json(['status' => $this->status_true, 'code' => '200', 'message' => 'Password change successfully']);
                    }else{
                     return response()->json(['status' => $this->status_false, 'code' => '400', 'message' => 'Some error accoured']);   
                    }
                    }catch (Exception $ex) {
                        return response()->json(['status' => $this->status_false, 'code' => '500','message' => $ex->getMessage()]);
                    }
                
                
               
    }
    
}
