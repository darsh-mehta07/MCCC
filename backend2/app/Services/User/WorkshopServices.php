<?php


namespace App\Services\User;

use Illuminate\Support\Facades\DB;
use App\User;
use Mail;
use Illuminate\support\Facades\Cache;
use App\Models\Frontend\States;
use App\Models\Frontend\Cities;
use App\Models\Frontend\Languages;
use App\Models\Admin\WorkshopEvents;
use App\Models\Admin\UserApplyForWorkshopModel;
use App\Models\Admin\UserApplyForEvents;
use Illuminate\Support\Facades\Auth;
use App\Mail\EventRegistration;
use App\Mail\EventRegistrationAdmin;
use App\Models\Admin\Events;

class WorkshopServices
{
    protected $status_true;
    protected $status_false;
    
    public function __construct() {
        $this->status_true = 'true';
        $this->status_false = 'false';
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
    
    public function useApplyForWorkshop($request){
        DB::beginTransaction();
        try{
            
            $count = count($request->fileSource);
                if($count > 0 && Auth::check()){
                
                $allowedfileExtension = ['jpg','png','jpeg'];
                
                //for pan card image
               $user = Auth::User();
               $profile = $user->UserProfile;
                    $folderPath  ='/home/mcccwdipl/public_html/backend2/public/uploads/Users/PancardImages/';
                    $folderPath2 ='/home/mcccwdipl/public_html/backend2/public/uploads/Users/AadharcardImages/';
                    $postdata = file_get_contents("php://input");
                    $request2 = json_decode($postdata);
                    // foreach ($request2->fileSource as $key => $value) {
                        $image_parts = explode(";base64,", $request2->fileSource[0]);
                        $image_type_aux = explode("image/", $image_parts[0]);
                        $image_type = $image_type_aux[1];
                        $name = $user->id.'_'. uniqid() .'.'.$image_type;
                        $name2 = $user->id.'_'. uniqid() .'.'.$image_type;
                        $image_base64 = base64_decode($image_parts[1]);
                        $file = $folderPath . $name;
                        file_put_contents($file, $image_base64);
                    // }
                    
                    // foreach ($request2->aadharfileSource as $key => $value) {
                        $image_parts = explode(";base64,", $request2->aadharfileSource[0]);
                        $image_type_aux = explode("image/", $image_parts[0]);
                        $image_type = $image_type_aux[1];
                        $name2 = $user->id.'_'. uniqid() .'.'.$image_type;
                        $image_base64 = base64_decode($image_parts[1]);
                        $file1 = $folderPath2 . $name2;
                        file_put_contents($file1, $image_base64);
                    // }
              
                        
                        $User = UserApplyForWorkshopModel::create([
                            'emergancy_contact'     => $request->sos_phone,
                            'user_id'               => $user->id,
                            'workshop_id'           => $request->workshop_id,
                            'institution_name'      => $request->edu_details,
                            'address'               => $request->address,
                            'aadharcard_image'      => $name2,
                            'aadharcard_image_path' => $folderPath2,
                            'pancard_image'         => $name,
                            'pancard_image_path'    => $folderPath,
                            'about_workshop'        => $request->about_workshop,
                        ]);
                        $workshopdata = array(
                                'emergancy_contact'     => $request->sos_phone,
                                'user_id'               => $user->id,
                                'event_id'              => $request->workshop_id,
                                'institution_name'      => $request->edu_details,
                                'address'               => $request->address,
                                'aadharcard_image'      => $name2,
                                'aadharcard_image_path' => $folderPath2,
                                'pancard_image'         => $name,
                                'pancard_image_path'    => $folderPath,
                                'about_event'           => $request->about_workshop,
                            );
                       
                        DB::commit();
                        $userEmail = $user->email;
                        $subjectForAdmin = 'New Workshop Registration.';
                        $subjectForUser = 'Workshop Registration.';
                        $event  = WorkshopEvents::select('id','title','description','location','start_date','closing_date')->where('id',$request->workshop_id)->get();
                        $email1 = Mail::to($userEmail)->send(new EventRegistration($user,$profile,$event,$subjectForUser));
                        $email2 = Mail::to('darshan@wdimails.com')->send(new EventRegistrationAdmin($user,$profile,$event,$workshopdata,$name2,$name,$subjectForAdmin));
                        
                        return ['status' => $this->status_true, 'code' => '200', 'data' => 'New Workshop  added successfully'];
                
                    }else{
                        return ['status' => $this->status_false, 'code' => '400', 'data' => 'Please select image'];
                    }
        }catch(Exception $exception){
            DB::rollBack();
            throw $exception;
        }
    }
    
    public function useApplyForEvent($request){

        DB::beginTransaction();
        // try{
            
            $count = count($request->fileSource);
                if($count > 0 && Auth::check()){
                
                $allowedfileExtension = ['jpg','png','jpeg'];
                
                //for pan card image
                    $user = Auth::User();
                    $profile = $user->UserProfile;
                    $folderPath  ='/home/mcccwdipl/public_html/backend2/public/uploads/Users/PancardImages/';
                    $folderPath2 ='/home/mcccwdipl/public_html/backend2/public/uploads/Users/AadharcardImages/';
                    $postdata = file_get_contents("php://input");
                    $request2 = json_decode($postdata);
                    
                        $image_parts = explode(";base64,", $request2->fileSource[0]);
                        $image_type_aux = explode("image/", $image_parts[0]);
                        $image_type = $image_type_aux[1];
                        $name = $user->id.'_'. uniqid() .'.'.$image_type;
                        $image_base64 = base64_decode($image_parts[1]);
                        $file = $folderPath . $name;
                        file_put_contents($file, $image_base64);
                      
                        $image_parts = explode(";base64,", $request2->aadharfileSource[0]);
                        $image_type_aux = explode("image/", $image_parts[0]);
                        $image_type = $image_type_aux[1];
                        $name2 = $user->id.'_'. uniqid() .'.'.$image_type;
                        $image_base64 = base64_decode($image_parts[1]);
                        $file1 = $folderPath2 . $name2;
                        file_put_contents($file1, $image_base64);
              
                            $eventdata = array(
                                'emergancy_contact'     => $request->sos_phone,
                                'user_id'               => $user->id,
                                'event_id'              => $request->workshop_id,
                                'institution_name'      => $request->edu_details,
                                'address'               => $request->address,
                                'aadharcard_image'      => $name2,
                                'aadharcard_image_path' => $folderPath2,
                                'pancard_image'         => $name,
                                'pancard_image_path'    => $folderPath,
                                'about_event'           => $request->about_workshop,
                            );
                            
                            $User = UserApplyForEvents::create([
                                'emergancy_contact'     => $request->sos_phone,
                                'user_id'               => $user->id,
                                'event_id'              => $request->workshop_id,
                                'institution_name'      => $request->edu_details,
                                'address'               => $request->address,
                                'aadharcard_image'      => $name2,
                                'aadharcard_image_path' => $folderPath2,
                                'pancard_image'         => $name,
                                'pancard_image_path'    => $folderPath,
                                'about_event'           => $request->about_workshop,
                            ]);
            
                        DB::commit();
                            $event  = Events::select('id','title','description','location','start_date','end_date','address','image','image_path')->where('id',$request->workshop_id)->get();
                            $userEmail = $user->email;
                            $subjectForAdmin = 'New Event Registration.';
                            $subjectForUser = 'Event Registration.';
                            $email1 = Mail::to($userEmail)->send(new EventRegistration($user,$profile,$event,$subjectForUser));
                            $email2 = Mail::to('darshan@wdimails.com')->send(new EventRegistrationAdmin($user,$profile,$event,$eventdata,$name2,$name,$subjectForAdmin));
                            return ['status' => $this->status_true, 'code' => '200', 'data' => 'New Event  added successfully'];
                        
                
                }else{
                            return ['status' => $this->status_false, 'code' => '400', 'data' => 'Please select image'];
            }
            
            
        // }catch(Exception $exception){
        //     DB::rollBack();
        //     throw $exception;
        // }
    }
    
    public function checkForApply($request){
        try{
                $user = Auth::User();
                $workshopData = UserApplyForWorkshopModel::select('id')
                                ->where('user_apply_for_workshop.workshop_id',$request->workshop_id)
                                ->where('user_apply_for_workshop.user_id',$user->id)
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
    
    public function checkForEventApply($request){
        try{
                $user = Auth::User();
                $workshopData = UserApplyForEvents::select('id')
                                ->where('user_apply_for_events.event_id',$request->event_id)
                                ->where('user_apply_for_events.user_id',$user->id)
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
}
?>