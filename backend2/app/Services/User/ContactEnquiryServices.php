<?php


namespace App\Services\User;

use Illuminate\Support\Facades\DB;
use App\User;
use Illuminate\support\Facades\Cache;
use App\Models\User\ContactEnquiryModel;
use Validator;
use Auth;

class ContactEnquiryServices
{
    protected $status_true;
    protected $status_false;
    
    public function __construct() {
        $this->status_true = 'true';
        $this->status_false = 'false';
    }
    
    public function sendContactForm($data){
        DB::beginTransaction();
        try{            
            if (Auth::check()) {
                $validated = $data->validate([
                    'name' => 'required',
                    'email' => 'required|email',
                    'phone' => 'required|numeric|digits_between:10,12',
                    'subject' => 'required',
                    'message' => 'required'
                ]);
                
                if ($validated) {
                    $formData = ContactEnquiryModel::create([
                        'name' => $data['name'],
                        'email' => $data['email'],
                        'phone' => $data['phone'],
                        'subject' => $data['subject'],
                        'message' => $data['message'],
                    ]);
                    DB::commit();
                    return ['status' => $this->status_true, 'code' => '200', 'data' => 'Enquiry send Successfully'];
                }else{
                    return ['error' => $this->status_false, 'code' => '200', 'data' => 'Something went Wrong'];
                }
            }else{
                return ['error' => $this->status_false, 'code' => '200', 'data' => 'User not logged in.'];
            }
        }catch(Exception $exception){
            DB::rollBack();
            throw $exception;
        }
    }
}