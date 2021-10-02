<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use App\Services\Admin\TermsConditionServices;
use Validator;
use Auth;

class TermsConditionController extends Controller
{
    protected $TermsConditionServices;
    protected $status_true;
    protected $status_false;

    public function __construct(TermsConditionServices $TermsConditionServices) {
        $this->TermsConditionServices = $TermsConditionServices;
        $this->status_true = 'true';
        $this->status_false = 'false';
    }
    public function addUpdateCondition(Request $request) {
        try {             
            $data = $this->TermsConditionServices->addUpdateTermsCondition($request);
            if($data){
               return response()->json($data);  
             }
        } catch (Exception $ex) {
            return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
        }
    }    
    public function displayTermsCondition() {
        try {             
            $data = $this->TermsConditionServices->getTermsCondition();
            if($data){
               return response()->json($data);  
             }
        } catch (Exception $ex) {
            return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
        }
    }
}
