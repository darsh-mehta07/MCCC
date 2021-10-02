<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use App\Services\User\ContactEnquiryServices;
use Validator;
use Auth;

class ContactEnquiryController extends Controller
{
    protected $ContactEnquiryServices;
    protected $status_true;
    protected $status_false;

    public function __construct(ContactEnquiryServices $ContactEnquiryServices) {
        $this->ContactEnquiryServices = $ContactEnquiryServices;
        $this->status_true = 'true';
        $this->status_false = 'false';
    }
    public function sendEnquiry(Request $request) {
        try {             
            $data = $this->ContactEnquiryServices->sendContactForm($request);
            if($data){
               return response()->json($data);  
             }
        } catch (Exception $ex) {
            return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
        }
    } 
}
