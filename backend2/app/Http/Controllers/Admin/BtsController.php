<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;
use App\Services\Admin\BtsServices;
use Validator;
use Auth;
use File;

class BtsController extends Controller
{
    protected $btsServices;
    protected $status_true;
    protected $status_false;
    
    public function __construct(BtsServices $btsServices) {
        $this->BtsServices = $btsServices;
        $this->status_true = 'true';
        $this->status_false = 'false';
    }
    
    public function addBtsVideos(Request $request){
        $validatedData = $request->validate([
                'category_id'       => 'required',
                'video_url'         => 'required',   // |max:2000
                'title'             => 'required',
                'description'       => 'required',
//                'fileSource'        => 'required',
           ],
        [
            'category_id.required'   => 'category-Id Path is Required',
            'video_url.required'     => 'Video url is required',
            'title.required'         => 'Title is required',
            'description.required'   => 'Description is required',
//            'fileSource.required'    => 'Thumbnail is required',
            ]);
         try {
             
            $data = $this->BtsServices->btsVideosAdd($request);
            if($data){
               return response()->json($data);  
             }
            
        } catch (Exception $ex) {
            return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
        }
    }
    
    public function BtsVideos(Request $request){
        try {
             
            $data = $this->BtsServices->getBtsVideos($request);
            if($data){
               return response()->json($data);  
             }
            
        } catch (Exception $ex) {
            return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
        }
    }
    
     public function getParticularVideos(Request $request){
        $validatedData = $request->validate([
                'video_id'         => 'required',   // |max:2000
           ],
        [
            'video_id.required'     => 'Video-Id is required'
            ]);
        try{
            $data = $this->BtsServices->getVideosById($request);
            if($data){
               return response()->json($data);  
             }
        }catch(Exception $exception){
            throw $exception;
        }
    }
    
    public function addViewsCount(Request $request){
        $validatedData = $request->validate([
               'video_id'               => 'required|regex:/^[0-9]+$/'
           ],
            [
                'video_id.required'     => 'Video-Id is required',
                'video_id.regex'        => 'Only numbers are allowed'
            ]);
        try{
            $data = $this->BtsServices->manageViewsCount1($request);
            if($data){
               return response()->json($data);  
             }
        }catch (Exception $ex) {
            return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
        }
    }
    
    public function getCategories(){
        try{
            $data = $this->BtsServices->getBtsCategories();
            if($data){
               return response()->json($data);  
             }
        }catch (Exception $ex) {
            return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
        }
    }
}
