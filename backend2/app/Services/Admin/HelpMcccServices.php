<?php


namespace App\Services\Admin;

use Illuminate\Support\Facades\DB;
use App\User;
use Illuminate\support\Facades\Cache;
use App\Models\Admin\HelpMcccModel;
use Validator;
use Auth;

class HelpMcccServices
{
    protected $status_true;
    protected $status_false;
    
    public function __construct() {
        $this->status_true = 'true';
        $this->status_false = 'false';
    }
    
    public function addUpdateHelpMccc($data){
     
        DB::beginTransaction();
        
        try{            
            if (Auth::check()) {
                $validated = $data->validate([
                    'title' => 'required',
                    'description' => 'required',
                ],[
                    'title.required'    => 'Title field is Required',
                    'description.required'    => 'Discription field is Required'
                ]);
                
                if ($validated) {
                    if ($data->id == '' && $data->id == Null) {
                        $formData = HelpMcccModel::create([
                            'title' => $data['title'],
                            'description' => $data['description'],
                        ]);
                        DB::commit();
                        return ['status' => $this->status_true, 'code' => '200', 'data' => 'Added Successfully'];
                    } else {
                        HelpMcccModel::where('id', $data->id)->update([
                            'title' => $data->title,
                            'description' => $data->description,
                        ]);
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
    
    public function getHelpMccc() {
        try {
            $castingcalls = HelpMcccModel::orderBy('created_at', 'desc')->get();            
            return ['status' => $this->status_true, 'code' => '200', 'data' => $castingcalls];            
        } catch (Exception $exception) {
            throw $exception;
        }
    }
}

