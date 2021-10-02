<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;
use App\Services\User\UserNotificationServices;
use App\Models\User\UserImages;
use App\Models\User\UserVideos;

use App\Http\Requests\UserProfileValidate;
use Validator;
use Auth;

class Notification extends Controller
{
     public function __construct(UserNotificationServices $userNotificationServices) {
        $this->userNotificationServices = $userNotificationServices;
        $this->status_true = 'true';
        $this->status_false = 'false';
    }
    public function getUserNotification(Request $request){
        try {
            $data = $this->userNotificationServices->getUserNotification($request);
            return response()->json($data);
        } catch (Exception $ex) {
            return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
        }
    }
    
    public function userNotificationMarkRead(Request $request){
        try {
            $data = $this->userNotificationServices->userNotificationMarkRead($request);
            return response()->json($data);
        } catch (Exception $ex) {
            return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
        }
    }
    public function getUserNotificationCounter(Request $request){
        try {
            $data = $this->userNotificationServices->getUserNotificationCounter($request);
            return response()->json($data);
        } catch (Exception $ex) {
            return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
        }
    }
}
