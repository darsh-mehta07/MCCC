<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;
use App\Services\User\WorkshopServices;
use App\Http\Requests\ValidateWorkshopData;  
use Validator;
use Auth;
use File;
use App\Models\Admin\WorkshopEvents;
use App\Models\Admin\UserApplyForWorkshopModel;


class WorkshopController extends Controller
{
    protected $workshopEventsServices;
    protected $status_true;
    protected $status_false;
    
    public function __construct(WorkshopServices $workshopEventsServices) {
        $this->WorkshopServices = $workshopEventsServices;
        $this->middleware('auth');
        $this->status_true = 'true';
        $this->status_false = 'false';
    }
    
    
    public function getUpcomingWorkshopData(Request $request)
    {
         try{
             $data = $this->WorkshopServices->getUpcomingWorkshopData($request);
             if($data){
                 return response()->json($data); 
             }
         }catch(Exception $ex){
             return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
         }
    }
    
    public function getEndingSoonWorkshopData(Request $request)
    {
         try{
             $data = $this->WorkshopServices->getEndingSoonWorkshopData($request);
             if($data){
                 return response()->json($data); 
             }
         }catch(Exception $ex){
             return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
         }
    }
    
    public function getPreviousWorkshopData(Request $request)
    {
         try{
             $data = $this->WorkshopServices->getPreviousWorkshopData($request);
             if($data){
                 return response()->json($data); 
             }
         }catch(Exception $ex){
             return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
         }
    }
    
    public function getEachWorkshopData(Request $request)
    {
         try{
             $data = $this->WorkshopServices->getEachWorkshopData($request);
             if($data){
                 return response()->json($data); 
             }
         }catch(Exception $ex){
             return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
         }
    }
    
    public function useApplyForWorkshop(Request $request){
        try{
             $data = $this->WorkshopServices->useApplyForWorkshop($request);
             if($data){
                 return response()->json($data); 
             }
         }catch(Exception $ex){
             return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
         }
    }
    
    public function useApplyForEvent(Request $request){
        try{
             $data = $this->WorkshopServices->useApplyForEvent($request);
             if($data){
                 return response()->json($data); 
             }
         }catch(Exception $ex){
             return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
         }
    }
    
    public function checkForApply(Request $request){
        try{
             $data = $this->WorkshopServices->checkForApply($request);
             if($data){
                 return response()->json($data); 
             }
         }catch(Exception $ex){
             return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
         }
    }
    
    public function checkForEventApply(Request $request){
        try{
             $data = $this->WorkshopServices->checkForEventApply($request);
             if($data){
                 return response()->json($data); 
             }
         }catch(Exception $ex){
             return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
         }
    }
}
