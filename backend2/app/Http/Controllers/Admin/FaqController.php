<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;
use App\Services\Admin\FaqServices;
use Validator;
use Auth;
use File;

class FaqController extends Controller{
    protected $FaqServices;
    protected $status_true;
    protected $status_false;

    public function __construct(FaqServices $FaqServices) {
        $this->FaqServices = $FaqServices;
        $this->status_true = 'true';
        $this->status_false = 'false';
    }
    public function addUpdateFaqCateogory(Request $request) {
        try {             
            $data = $this->FaqServices->addUpdateFaqCateogries($request);
            if($data){
               return response()->json($data);  
             }
        } catch (Exception $ex) {
            return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
        }
    }    
    public function addUpdateFaqContent(Request $request) {
        try {             
            $data = $this->FaqServices->addUpdateFaqContent($request);
            if($data){
               return response()->json($data);  
             }
        } catch (Exception $ex) {
            return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
        }
    }    
    public function displayFaq(Request $request) {
        try {             
            $data = $this->FaqServices->getFaq($request);
            if($data){
               return response()->json($data);  
             }
        } catch (Exception $ex) {
            return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
        }
    }    
    
    public function displayMainFaq() {
        try {             
            $data = $this->FaqServices->getMainFaq();
            if($data){
               return response()->json($data);  
             }
        } catch (Exception $ex) {
            return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
        }
    }    
}
