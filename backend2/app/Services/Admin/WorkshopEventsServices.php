<?php


namespace App\Services\Admin;

use Illuminate\Support\Facades\DB;
use App\User;
use Illuminate\support\Facades\Cache;
use App\Models\Frontend\States;
use App\Models\Frontend\Cities;
use App\Models\Frontend\Languages;
use App\Models\Admin\WorkshopEvents;
use App\Models\Admin\UserApplyForWorkshopModel;
use Illuminate\Support\Facades\Auth;

class WorkshopEventsServices
{
    public function __construct() {
        $this->status_true = 'true';
        $this->status_false = 'false';
    }
    
    public function addWorkshopData($data){
        DB::beginTransaction();
        try{
            
            if($data->hasFile('fileSource'))
            {
               $allowedfileExtension = ['jpg','png','jpeg'];
                $file = $data->fileSource; 
                $filename   = uniqid().'.'.$file->getClientOriginalExtension();
                $extension  = $file->getClientOriginalExtension();
                $check      = in_array($extension,$allowedfileExtension); 
                
                if($check){
                    $destinationPath    = public_path('/uploads/Admin/WorkshopBannerImages');
                    $path               = 'public/uploads/Admin/WorkshopBannerImages';
                    if($file->move($destinationPath, $filename)) {
                        
                        $User = WorkshopEvents::create([
                        'title'             => $data['title'],
                        'description'       => $data['description'],
                        'start_date'        => $data['start_date'],
                        'closing_date'      => $data['closing_date'],
//                        'start_time'        => $data['start_time'],
//                        'end_time'          => $data['end_time'],
//                         'banner_1'          
                        'state_id'          => $data['state_id'],
                        'city_id'           => $data['city_id'],
                        'location'          => $data['location'],
                        'more_details'      => $data['more_details'],
                        'banner_image'      => $filename,
                        'banner_img_path'   => $path
                    ]);
            
                DB::commit();
                
                return ['status' => $this->status_true, 'code' => '200', 'data' => 'New Workshop  added successfully'];
                    }else{
                             return ['status' => $this->status_false, 'code' => '400', 'data' => 'Some error accoured'];
                        }
                }else{
                return ['status' => $this->status_false, 'code' => '400', 'data' => 'Only jpg,png,jpeg files are allowed'];   
                }
            }else{
                return ['status' => $this->status_false, 'code' => '400', 'data' => 'Please select banner image'];
            }
            
            
        }catch(Exception $exception){
            DB::rollBack();
            throw $exception;
        }
    }
    
    public function getUpcomingWorkshopData($request){
            try{
                
                $start_time = date('Y-m-d', strtotime('+3 Days'));
                $workshopData     = WorkshopEvents::join('cities','workshop_events.city_id','=','cities.id')
                                    ->join('states','workshop_events.state_id','=','states.id')
                                    ->select('workshop_events.*','cities.name as city_name','states.name as state_name')
                                    ->where('workshop_events.start_date' ,'>=', $start_time )
                                    ->where('workshop_events.Status',1)
                                    ->orderBy('workshop_events.id', 'DESC')
                                    ->take($request->limit)
                                    ->get();
                if(count($workshopData) != 0 ){
                    $data = $workshopData;
                } else{
                    $data = 'No Data';
                }   
                return ['status' => $this->status_true, 'code' => '200', 'data' => $data];
            }
            catch(Exception $exception){
                throw $exception;
            }
    }
    
    public function getEndingSoonWorkshopData($request){
            try{
                $start_time = date('Y-m-d H:i:s');
                $upcoming_time = date("Y-m-d H:i:s", strtotime('+2 Days'));
                $workshopEndingSoonData = WorkshopEvents::join('cities','workshop_events.city_id','=','cities.id')
                                          ->join('states','workshop_events.state_id','=','states.id')
                                          ->select('workshop_events.*','cities.name as city_name','states.name as state_name')
                                          ->whereBetween('workshop_events.start_date', [$start_time, $upcoming_time])
                                          ->where('workshop_events.closing_date' ,'>=', date('Y-m-d'))   
                                          ->OrWhere('workshop_events.start_date','<=',$start_time)
                                          ->where('workshop_events.closing_date','>=', date('Y-m-d'))
                                          ->where('workshop_events.Status',1)
                                          ->orderBy('workshop_events.id', 'DESC')
                                          ->take($request->limit)
                                          ->get();
                if(count($workshopEndingSoonData) != 0 ){
                    $data = $workshopEndingSoonData;
                } else{
                    $data = 'No Data';
                }  
                return ['status' => $this->status_true, 'code' => '200', 'data' => $data];
            }
            catch(Exception $exception){
                throw $exception;
            }
    }
    
    public function getPreviousWorkshopData($request){
            try{
                $workshopData = WorkshopEvents::join('cities','workshop_events.city_id','=','cities.id')
                                ->join('states','workshop_events.state_id','=','states.id')
                                ->select('workshop_events.*','cities.name as city_name','states.name as state_name')
                                ->where('workshop_events.closing_date' ,'<', date('Y-m-d'))
                                ->where('workshop_events.Status',1)
                                ->orderBy('workshop_events.id', 'DESC')
                                ->take($request->limit)
                                ->get();
                if(count($workshopData) != 0 ){
                    $data = $workshopData;
                } else{
                    $data = 'No Data';
                }
                return ['status' => $this->status_true, 'code' => '200', 'data' => $data];
            }
            catch(Exception $exception){
                throw $exception;
            }
    }
    
    public function getEachWorkshopData($request){
        try{
                $workshopData = WorkshopEvents::join('cities','workshop_events.city_id','=','cities.id')
                                ->join('states','workshop_events.state_id','=','states.id')
                                ->select('workshop_events.*','cities.name as city_name','states.name as state_name')
                                ->where('workshop_events.id',$request->id)
                                ->get();
                if(count($workshopData) != 0 ){
                    $data = $workshopData;
                } else{
                    $data = 'No Data';
                }
                return ['status' => $this->status_true, 'code' => '200', 'data' => $data];
            }
            catch(Exception $exception){
                throw $exception;
            }
    }
    
    public function useApplyForWorkshop($data){
        echo $user =  Auth::user();
        exit();
        DB::beginTransaction();
        try{
            
            if($data->hasFile('panfileSource') && $data->hasFile('aadharfileSource'))
            {
                
                $allowedfileExtension = ['jpg','png','jpeg'];
                
                //for pan card image
                $file = $data->panfileSource; 
                $filename   = uniqid().'.'.$file->getClientOriginalExtension();
                $extension  = $file->getClientOriginalExtension();
                $check      = in_array($extension,$allowedfileExtension); 
                
                //for aadhar card image
                $file2 = $data->aadharfileSource; 
                $filename2   = uniqid().'.'.$file2->getClientOriginalExtension();
                $extension2  = $file2->getClientOriginalExtension();
                $check2      = in_array($extension,$allowedfileExtension); 
                
                if($check && $check2){
                    $destinationPath    = public_path('/uploads/Admin/UserPanCardImages');
                    $destinationPath2   = public_path('/uploads/Admin/UserAadharCardImages');
                    $path               = 'public/uploads/Admin/UserPanCardImages';
                    $path2              = 'public/uploads/Admin/UserAadharCardImages';
                    $upload1 = $file->move($destinationPath, $filename);
                    $upload2 = $file2->move($destinationPath2, $filename2);
                    if($upload1 && $upload2) {
                        
                        $User = WorkshopEvents::create([
                            'emergancy_contact'     => $data['emergancy_contact'],
                            'institution_name'      => $data['institution_name'],
                            'address'               => $data['address'],
                            'aadharcard_image'      => $filename2,
                            'aadharcard_image_path' => $destinationPath2,
                            'pancard_image'         => $filename,
                            'pancard_image_path'    => $destinationPath,
                            'about_workshop'        => $data['location'],
                        ]);
            
                        DB::commit();
                        return ['status' => $this->status_true, 'code' => '200', 'data' => 'New Workshop  added successfully'];
                    }else{
                            return ['status' => $this->status_false, 'code' => '400', 'data' => 'Some error accoured'];
                        }
                }else{
                            return ['status' => $this->status_false, 'code' => '400', 'data' => 'Only jpg,png,jpeg files are allowed'];   
                }
            }else{
                            return ['status' => $this->status_false, 'code' => '400', 'data' => 'Please select banner image'];
            }
            
            
        }catch(Exception $exception){
            DB::rollBack();
            throw $exception;
        }
    }
}
?>