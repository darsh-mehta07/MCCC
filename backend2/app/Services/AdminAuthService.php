<?php
namespace App\Services;

use Exception;
use App\User;
use DB;

class AdminAuthService
{
      protected $status_true;
    protected $status_false;
    
    public function __construct() {
        $this->status_true = 'true';
        $this->status_false = 'false';
    }
    
    public function checkAdminEmail($data)
    {   
        try{
        	$admin = User::where('email', $data['email'])->count();
        	return ($admin > 0) ? $this->status_true : $this->status_false; 
        }catch(Exception $exception){
            throw $exception;
        }
        
    }
    
     public function checkusersPhoneNumber($data)
    {  
        try{
        	$phone = User::where('phone', $data['phone'])->count();
        	return ($phone > 0) ? $this->status_true : $this->status_false;
        }catch(Exception $exception){
            throw $exception;
        }
       
    }
    
    public function checkEmailExists($data)
    {   
        try{
            $admin = User::where('email', $data['email_or_mobile'])->count();
    	    return ($admin > 0) ? $this->status_true : $this->status_true;
        }catch(Exception $exception){
            throw $exception;
        }
    	
    }
    
    public function checkPhoneNumberExists($data)
    {   
        try{
            $phone = User::where('phone', $data['email_or_mobile'])->count();
    	    return ($phone > 0) ? $this->status_true : $this->status_true;
        }catch(Exception $exception){
            throw $exception;
        }
    	
    }
}