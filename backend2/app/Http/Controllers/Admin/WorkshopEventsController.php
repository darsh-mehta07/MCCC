<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;
use App\Services\Admin\WorkshopEventsServices;
use App\Http\Requests\ValidateWorkshopData;  
use Validator;
use Auth;
use File;
use App\Models\Admin\WorkshopEvents;
use App\Models\Admin\UserApplyForWorkshopModel;
class WorkshopEventsController extends Controller
{
    
    protected $workshopEventsServices;
    protected $status_true;
    protected $status_false;
    
    public function __construct(WorkshopEventsServices $workshopEventsServices) {
        $this->WorkshopEventsServices = $workshopEventsServices;
        // $this->middleware('auth');
        $this->status_true = 'true';
        $this->status_false = 'false';
    }
    
    public function addWorkshopData(ValidateWorkshopData $request)
    {
         try{
             $data = $this->WorkshopEventsServices->addWorkshopData($request);
             if($data){
                 return response()->json($data); 
             }
         }catch(Exception $ex){
             return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
         }
    }
    
    
    
    
}
