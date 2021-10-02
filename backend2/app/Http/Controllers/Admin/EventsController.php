<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Admin\Events;
use App\Models\Frontend\Cities;
use Auth;
use Carbon\Carbon;

class EventsController extends Controller
{
    protected $status_true = 'true';
    protected $status_false = 'false';
    
    public function getEvents(){
        try{
            $user =  Auth::user();
            $date = Carbon::now();
            $location = Cities :: select('name')->where('id',$user->city_id)->first();
            // $ongoingEvents = Events::whereDate('start_date',"!=",$date->toDateString())->where('location',"!=",$location->name)->get();
            $ongoingEvents = Events::select('title','description','location','start_date','id')->whereDate('start_date',"!=",$date->toDateString())->get();
            $upcomingEvents = Events::select('title','description','location','start_date','id')->whereDate('start_date', $date->toDateString())->get();
            $eventForU = Events::select('title','description','location','start_date','id')->where('location',$location->name)->get();
            if(count($upcomingEvents) < 1){
                $upcoming[] = [
                    'noData' => true
                    ];
            }else{
                $upcoming = $upcomingEvents;
            }
             if(count($eventForU) < 1){
                $eventForyou[] = [
                    'noData' => true
                    ];
            }else{
                $eventForyou = $eventForU;
            }
            if(count($ongoingEvents) < 1){
                $onGoingEvents[] = [
                    'noData' => true
                    ];
            }else{
                $onGoingEvents = $ongoingEvents;
            }
            $events['on_going']  = $onGoingEvents;
            $events['upcoming']  = $upcoming;
            $events['event_for_u']  = $eventForyou;
            return ['status' => $this->status_true, 'code' => '200', 'data' => $events];
        }catch(Exception $ex){
             return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
         }
    }
    public function eventInner(Request $request){
         try{
             $validatedData = $request->validate([
                'id'     => 'required',   // |max:2000
           ],
            [
                'id.required'    => 'id is required'
            ]);
            $event = Events::select('id','title','description','location','start_date','end_date','address','image','image_path')->where('id',$request->id)->first();
            if(empty($event)){
                $Events = [
                    'noData' => true
                    ];
            }else{
                $Events = $event;
            }
            
            return ['status' => $this->status_true, 'code' => '200', 'data' => $Events];
        }catch(Exception $ex){
             return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
         }
    }
}
