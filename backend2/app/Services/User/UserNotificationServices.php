<?php
namespace App\Services\User;

use Illuminate\Support\Facades\DB;
use App\User;
use Mail;
use Illuminate\support\Facades\Cache;
use Illuminate\Support\Facades\Auth;
use App\Mail\EventRegistration;
use App\Mail\EventRegistrationAdmin;
use App\Models\Admin\UserNotificationModel;
use Carbon\Carbon;
class UserNotificationServices{
    protected $status_true;
    protected $status_false;
    
    public function __construct() {
        $this->status_true = 'true';
        $this->status_false = 'false';
    }
    
    public function add_custom_user_notification($requets){
        try{
                $addData    = UserNotificationModel::create([
                    'user_id'     => $user->id,
                    'message_id'  => $requets->message_id,
                    'is_read'     => '0',
                    'link'        => $requets->link
                ]);
        }catch(Exception $exception){
                throw $exception;
            }
    }
    
    public function add_general_user_notification($requets){
        
        $getAllUsers = $users = DB::table('users')->where('is_admin','0')->where('is_active','1')->where('is_delete','0')->get();
        try{
                foreach($getAllUsers as $user){
                    $addData =  UserNotificationModel::create([
                                    'user_id'     => $user->id,
                                    'message_id'  => $requets['message_id'],
                                    'is_read'     => '0',
                                    'link'        => $requets['link'],
                                ]);
                }
        } catch(Exception $exception){
                throw $exception;
            }
    }
    
    public function getUserNotification($requets){
        $user = Auth::User();
        
        try{
        $getData = UserNotificationModel::join('master_notification','user_notification.message_id','=','master_notification.id')
                    ->select('user_notification.*','master_notification.title','master_notification.message')
                    ->where('user_notification.user_id','=',$user->id)
//                    ->where('user_notification.is_read',0)
                    ->orderBy('user_notification.id', 'DESC')
                    ->get();
                if(count($getData) != 0 ){
                    $data = $getData;
                } else{
                    $data = $getData;
                }   
                return ['status' => $this->status_true, 'code' => '200', 'data' => $data];
        } catch(Exception $exception){
                throw $exception;
            }
    }
    
    public function getUserNotificationCounter($requets){
        $user = Auth::User();
        try{
        $getData = UserNotificationModel::join('master_notification','user_notification.message_id','=','master_notification.id')
                    ->select('user_notification.*','master_notification.title','master_notification.message')
                    ->where('user_notification.user_id','=',$user->id)
                    ->where('user_notification.is_read',0)
                    ->get();
                if(count($getData) != 0 ){
                    $data = count($getData);
                } else{
                    $data = $getData;
                }   
                return ['status' => $this->status_true, 'code' => '200', 'data' => $data];
        } catch(Exception $exception){
                throw $exception;
            }
    }
    
    public function userNotificationMarkRead(){
        $user = Auth::User();
        
        try{
                $affected = DB::table('user_notification')
                        ->where('user_id', $user->id)
                        ->update(['is_read' => 1]);
                 return ['status' => $this->status_true, 'code' => '200', 'data' => 'Data Updated'];
        } catch(Exception $exception){
                throw $exception;
            }
    }
}

?>