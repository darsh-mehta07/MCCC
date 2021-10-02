<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use App\Services\Admin\HelpMcccServices;
use Validator;
use Auth;

class HelpMcccController extends Controller
{
    protected $HelpMcccServices;
    protected $status_true;
    protected $status_false;

    public function __construct(HelpMcccServices $HelpMcccServices) {
        $this->HelpMcccServices = $HelpMcccServices;
        $this->status_true = 'true';
        $this->status_false = 'false';
    }
    public function addUpdateHelpMccc(Request $request) {
        try {             
            $data = $this->HelpMcccServices->addUpdateHelpMccc($request);
            if($data){
               return response()->json($data);  
             }
        } catch (Exception $ex) {
            return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
        }
    }    
    public function displayHelpMccc() {
        try {             
            $data = $this->HelpMcccServices->getHelpMccc();
            if($data){
               return response()->json($data);  
             }
        } catch (Exception $ex) {
            return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
        }
    }    
}
