<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;
use App\Services\Admin\CastingCallServices;
use App\Http\Requests\ValidateCastingCall;  
use Validator;
use Auth;
use File;
use App\Models\Admin\CastingCallModel;

class CastingCallController extends Controller
{
    protected $castingCallServices;
    protected $status_true;
    protected $status_false;
    
    public function __construct(CastingCallServices $castingCallServices) {
        $this->CastingCallService = $castingCallServices;
        $this->status_true = 'true';
        $this->status_false = 'false';
        
        $this->middleware('auth');
    }
    
     public function addCastingCallData(ValidateCastingCall $request)
    {
//        $content = $request->input('long_description');exit;
         try{
             
//             $casting = new CastingCallModel;
//                $casting->title = $data['title'];
//                $casting->short_description = $data['short_description'];
//				$casting->gender = $data['gender'];
//				$casting->closing_date = $data['closing_date'];
//                                $casting->tags = $data['tags'];
//                                $casting->location = $data['location'];
//                                $casting->long_description = $data['long_description'];
//                                $casting->language_id = $data['language_id'];
//				$casting->save();
//				return redirect('add_casting_call')->with('status',"Insert successfully");
             $data = $this->CastingCallService->addCastingCall($request);
             if($data){
//                return back()->with('success','Item created successfully!');
                 return response()->json($data); 
             }
         }catch(Exception $ex){
             return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
         }
    }
    
    public function addCastingBanner(Request $request){
        $validatedData = $request->validate([
                'fileSource'     => 'required',   // |max:2000
           ],
            [
                'fileSource.required'    => 'image is required'
            ]);
        try{
            $data = $this->CastingCallService->addCastingBannerService($request);
            if($data){
               return response()->json($data);  
             }
        }catch (Exception $ex) {
            return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
        }
        
    }
    
     
}

?>
