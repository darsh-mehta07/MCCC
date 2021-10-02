<?php


namespace App\Services\Admin;

use Illuminate\Support\Facades\DB;
use App\User;
use Illuminate\support\Facades\Cache;
use App\Models\Admin\AboutMccc;
use Validator;
use Auth;

class AboutMccServices
{
    protected $status_true;
    protected $status_false;
    
    public function __construct() {
        $this->status_true = 'true';
        $this->status_false = 'false';
    }
    
    public function addUpdateAboutMcc($data){
     
        DB::beginTransaction();
        
        try{            
            if (Auth::check()) {
                $validated = $data->validate([
                    'discription' => 'required|max:500',
                ],[
                    'discription.required'    => 'Discription field is Required',
                    'discription.max'    => 'Maximum Limit is 500'
                ]);
                
                if ($validated) {
                    if ($data->id == '' && $data->id == Null) {
                        $formData = AboutMccc::create([
                            'discription' => $data['discription'],
                        ]);
                        DB::commit();
                        return ['status' => $this->status_true, 'code' => '200', 'data' => 'Added Successfully'];
                    } else {
                        AboutMccc::where('id', $data->id)->update(['discription' => $data->discription]);
                        DB::commit();
                        return ['status' => $this->status_true, 'code' => '200', 'data' => 'Updated Successfully'];
                    }
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
    
    public function getAboutMccc() {
        try {
            $castingcalls = AboutMccc::orderBy('created_at', 'desc')->first();
            
            return ['status' => $this->status_true, 'code' => '200', 'data' => $castingcalls];            
        } catch (Exception $exception) {
            throw $exception;
        }
    }
}

