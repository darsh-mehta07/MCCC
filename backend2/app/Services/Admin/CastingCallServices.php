<?php
namespace App\Services\Admin;

use Illuminate\Support\Facades\DB;
use App\User;
use Illuminate\support\Facades\Cache;
use App\Models\Frontend\States;
use App\Models\Frontend\Cities;
use App\Models\Frontend\Languages;
use App\Models\Admin\CastingCallModel;
use App\Models\Admin\CastingcallBanner;
use App\Services\User\UserNotificationServices;
use Image;

class CastingCallServices
{
    protected $status_true;
    protected $status_false;
    
    public function __construct(UserNotificationServices $UserNotificationServices) {
        $this->userNotificationServices = $UserNotificationServices;
        $this->status_true = 'true';
        $this->status_false = 'false';
    }
    
    public function addCastingCall($data){
     
        DB::beginTransaction();
        try{
//            print_r($data->fileSource);exit;
            if($data->hasFile('fileSource'))
            {
                    $destinationPath         =  base_path().'/public/uploads/Admin/CastingImages/';
                    
                    $image_parts        = explode(";base64,", $data->cropedImage);
                    $image_type_aux     = explode("image/", $image_parts[0]);
                    $image_type         = $image_type_aux[1];  //'png';
                    $image_base64       = base64_decode($image_parts[1]);
                    
                    $imageName          = uniqid() .'.'.$image_type; 
                    $file               = $destinationPath . $imageName;
                    file_put_contents($file, $image_base64);
//                    $destinationPath    = public_path('/uploads/Admin/CastingImages/'.$file);
                    
                    try {
                        \Tinify\setKey('gCckvmDb6K9dlkV8fjbB3qh6z1ktGwxv');
                        $source = \Tinify\fromFile($file);
                        $source->toFile($file);
                    } catch(\Tinify\AccountException $e) {
                        // Verify your API key and account limit.
                        return ['status' => $this->status_false, 'code' => '400', 'data' => $e->getMessage()];
                    } catch(\Tinify\ClientException $e) {
                        // Check your source image and request options.
                        return ['status' => $this->status_false, 'code' => '400', 'data' => $e->getMessage()];
                    } catch(\Tinify\ServerException $e) {
                        // Temporary issue with the Tinify API.
                        return ['status' => $this->status_false, 'code' => '400', 'data' => $e->getMessage()];
                    } catch(\Tinify\ConnectionException $e) {
                        // A network connection error occurred.
                        return ['status' => $this->status_false, 'code' => '400', 'data' => $e->getMessage()];
                    } catch(Exception $e) {
                        // Something else went wrong, unrelated to the Tinify API.
                        return ['status' => $this->status_false, 'code' => '400', 'data' => $e->getMessage()];
                    }
                        $langs = implode(',',$data['language_id']);
                        $all_tags = implode(',', $data['tags']);
                        $addData = CastingCallModel::create([
                        'title'             => $data['title'],
                        'short_description' => $data['short_description'],
                        'gender'            => $data['gender'],
                        'closing_date'      => $data['closing_date'],
                        'location'          => $data['location'],
                        'tags'              => $all_tags,
                        'long_description'  => $data['long_description'],
                        'language_id'       => $langs,
                        'banner_image'      => $imageName,
                        'banner_img_path'   => $destinationPath
                    ]);
                 
                $requestData = array(
                    'message_id' => '1',
                    'link' => '/casting-inner/'.$addData->id.''
                );    
                $this->userNotificationServices->add_general_user_notification($requestData);
                DB::commit();
                
                return ['status' => $this->status_true, 'code' => '200', 'data' => 'new casting added successfully'];

            }else{
                return ['status' => $this->status_false, 'code' => '400', 'data' => 'Please select casting call banner image'];
            }
                 
        }catch(Exception $exception){
            DB::rollBack();
            throw $exception;
        }
    }
    
    public function addCastingBannerService($data){
        DB::beginTransaction();
        try{
            if($data->hasFile('fileSource'))
            {
                $allowedfileExtension = ['jpg','png','jpeg'];
                $files = $data->fileSource;
//                $user =  Auth::user(); 

                foreach($files as $file){
                    $filename   = uniqid().'.'.$file->getClientOriginalExtension();
                    $extension  = $file->getClientOriginalExtension();
                    $check      = in_array($extension,$allowedfileExtension); 
                    
                    if($check){
                                      
                        $destinationPath = public_path('/uploads/Admin/CastingBanners');
                        $path = 'public/uploads/Admin/CastingBanners';
                        if($file->move($destinationPath, $filename)) {
                            //  return $splashImg = Cache::rememberForever('splashImg', function(){
                             $saveResult    =   CastingcallBanner::create(['casting_banner_image' => $filename, 'banner_image_path' => $path ]);
                            //  });
                        }else{
                             return ['status' => $this->status_false, 'code' => '400', 'data' => 'Some error accoured'];
                        }
                        
                    }else{
                        return ['status' => $this->status_false, 'code' => '400', 'data' => 'Only jpg,png,jpeg files are allowed'];
                    }
                }
                DB::commit();
                return ['status' => $this->status_true, 'code' => '200', 'data' => 'Image uploaded successfully'];
            }else{
                     return ['status' => $this->status_false, 'code' => '400', 'data' => 'No file selected'];
                }
        }catch(Exception $exception){
            DB::rollBack();
            throw $exception;
        }
    }
    
    
}

