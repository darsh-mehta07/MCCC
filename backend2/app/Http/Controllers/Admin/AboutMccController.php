<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;
use App\Services\Admin\AboutMccServices;
use Validator;
use Auth;
use File;

class AboutMccController extends Controller
{
    protected $AboutMccServices;
    protected $status_true;
    protected $status_false;

    public function __construct(AboutMccServices $AboutMccServices) {
        $this->AboutMccServices = $AboutMccServices;
        $this->status_true = 'true';
        $this->status_false = 'false';
    }
    public function addUpdateAboutMcc(Request $request) {
        try {             
            $data = $this->AboutMccServices->addUpdateAboutMcc($request);
            if($data){
               return response()->json($data);  
             }
        } catch (Exception $ex) {
            return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
        }
    }    
    public function displayAboutMccc() {
        try {             
            $data = $this->AboutMccServices->getAboutMccc();
            if($data){
               return response()->json($data);  
             }
        } catch (Exception $ex) {
            return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
        }
    }    
}
