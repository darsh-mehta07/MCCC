<?php


namespace App\Services\Admin;

use Illuminate\Support\Facades\DB;
use App\User;
use Illuminate\support\Facades\Cache;
use App\Models\Admin\FaqCategoriesModel;
use App\Models\Admin\FaqContentModel;
use Validator;
use Auth;

class FaqServices
{
    protected $status_true;
    protected $status_false;
    
    public function __construct() {
        $this->status_true = 'true';
        $this->status_false = 'false';
    }
    
    public function addUpdateFaqCateogries($data){
     
        DB::beginTransaction();
        
        try{            
            if (Auth::check()) {
                $validated = $data->validate([
                    'name' => 'required',
                ],[
                    'name.required'    => 'Name field is Required'
                ]);
                
                if ($validated) {
                    if ($data->id == '' && $data->id == Null) {
                        $formData = FaqCategoriesModel::create([
                            'name' => $data['name'],
                        ]);                        
                        DB::commit();
                        return ['status' => $this->status_true, 'code' => '200', 'data' => 'Added Successfully'];
                    } else {
                        FaqCategoriesModel::where('id', $data->id)->update(['name' => $data->name]);                        
                        DB::commit();
                        return ['status' => $this->status_true, 'code' => '200', 'data' => 'Updated Successfully'];
                    }
                }else{
                    return ['error' => $this->status_false, 'code' => '200', 'data' => 'Something went Wrong'];
                }
            }else{
                return ['status' => $this->status_false, 'code' => '200', 'data' => 'User not logged in.'];
            }
        }catch(Exception $exception){
            DB::rollBack();
            throw $exception;
        }
    }
    
    public function addUpdateFaqContent($data){
     
        DB::beginTransaction();
        
        try{            
            if (Auth::check()) {
                $validated = $data->validate([
                    'title' => 'required',
                    'description' => 'required',
                    'faq_category_id' => 'required',
                ],[
                    'title.required'    => 'Name field is Required',
                    'description.required'    => 'Description field is Required',
                    'faq_category_id.required'    => 'Please select Category'
                ]);
                
                if ($validated) {
                    if ($data->id == '' && $data->id == Null) {
                        $formData = FaqContentModel::create([
                            'title' => $data['title'],
                            'description' => $data['description'],
                            'faq_category_id' => $data['faq_category_id'],
                        ]);                        
                        DB::commit();
                        return ['status' => $this->status_true, 'code' => '200', 'data' => 'Added Successfully'];
                    } else {
                        FaqContentModel::where('id', $data->id)->update([
                            'title' => $data->title,
                            'description' => $data->description,
                            'faq_category_id' => $data->faq_category_id,
                        ]);                        
                        DB::commit();
                        return ['status' => $this->status_true, 'code' => '200', 'data' => 'Updated Successfully'];
                    }
                }else{
                    return ['error' => $this->status_false, 'code' => '200', 'data' => 'Something went Wrong'];
                }
            }else{
                return ['status' => $this->status_false, 'code' => '200', 'data' => 'User not logged in.'];
            }
        }catch(Exception $exception){
            DB::rollBack();
            throw $exception;
        }
    }
    
    public function getFaq($data) {
        try {
            if($data->faq_category_id != '' && $data->limit != null){
                
                $castingcalls = FaqContentModel::select('title','description')->where('faq_category_id',$data->faq_category_id)->orderBy('updated_at','DESC')->take($data->limit)->get();
                if(count($castingcalls) == 0){
                    $castingcalls = 'No Record Found';
                }
            }elseif($data->faq_category_id != ''){
                $castingcalls = FaqContentModel::select('title','description')->where('faq_category_id',$data->faq_category_id)->orderBy('updated_at','DESC')->get();
                if(count($castingcalls) == 0){
                    $castingcalls = 'No Record Found';
                }
            }else{
                $castingcalls = 'No Record Found';
            }
            return ['status' => $this->status_true, 'code' => '200', 'data' => $castingcalls];            
        } catch (Exception $exception) {
            throw $exception;
        }
    }
    
    public function getMainFaq() {
        try {            
            $data['casting_calls'] = FaqContentModel::select('title','description')->where('faq_category_id','1')->orderBy('updated_at','DESC')->take(4)->get();
            $data['bts'] = FaqContentModel::select('title','description')->where('faq_category_id','2')->orderBy('updated_at','DESC')->take(4)->get();
            $data['events'] = FaqContentModel::select('title','description')->where('faq_category_id','3')->orderBy('updated_at','DESC')->take(4)->get();
            $data['training'] = FaqContentModel::select('title','description')->where('faq_category_id','4')->orderBy('updated_at','DESC')->take(4)->get();
            $data['casting_calls'] = FaqContentModel::select('title','description')->where('faq_category_id','5')->orderBy('updated_at','DESC')->take(4)->get();
            
            if(count($data) == 0){
                $data = 'No Record Found';
            }
            return ['status' => $this->status_true, 'code' => '200', 'data' => $data];            
        } catch (Exception $exception) {
            throw $exception;
        }
    }
}

