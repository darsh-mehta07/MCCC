<?php

namespace App\Services\Admin;

use DB;
use Hash;
use App\Models\Admin\BtsVideos;
use App\Models\Admin\BtsCategory;
use App\Models\Admin\ViewsCount;
use App\Models\Admin\VideoCount;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Carbon\Carbon;
use App\Services\User\UserNotificationServices;

class BtsServices

{
    protected $status_true;
    protected $status_false;
    
    public function __construct(UserNotificationServices $UserNotificationServices) {
        $this->userNotificationServices = $UserNotificationServices;
        $this->status_true = 'true';
        $this->status_false = 'false';
    }
    
    public function btsVideosAdd($data){
        DB::beginTransaction();
        try{
            if($data->hasFile('fileSource'))
            {
//                print_r($data->youtubeThumbnail);exit;
                    $destinationPath         =  base_path().'/public/uploads/Admin/ThumbnailImages/';
                    
                    $image_parts        = explode(";base64,", $data->cropedBtsImage);
                    $image_type_aux     = explode("image/", $image_parts[0]);
                    $image_type         = $image_type_aux[1];  //'png';
                    $image_base64       = base64_decode($image_parts[1]);
                    
                    $imageName          = uniqid() .'.'.$image_type; 
                    $file               = $destinationPath . $imageName;
                    file_put_contents($file, $image_base64);
                    
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
                    
                    $User = BtsVideos::create([
                        'category_id'       => $data['category_id'],
                        'video_url'         => $data['video_url'],
                        'title'             => $data['title'],
                        'description'       => $data['description'],
                        'thumbnail'         => $imageName,
                        'youtube_thumbnail' => $data['youtubeThumbnail'],
                        'thumbnail_path'    => $destinationPath
                    ]);
                        
                        if($User){
                       ViewsCount::create([
                            'video_id' => $User->id 
                        ]); 
                        }
                       
                DB::commit();
                $requestData = array(
                    'message_id' => '4',
                    'link' => '/bts-video-view/'.$User->id.'/'.$data['category_id']
                );    
                $this->userNotificationServices->add_general_user_notification($requestData);
                return ['status' => $this->status_true, 'code' => '200', 'data' => 'new video added successfully'];
                    
            }else{
                $User = BtsVideos::create([
                        'category_id'       => $data['category_id'],
                        'video_url'         => $data['video_url'],
                        'title'             => $data['title'],
                        'description'       => $data['description'],
                        'thumbnail'         => '',
                        'youtube_thumbnail' => $data['youtubeThumbnail'],
                        'thumbnail_path'    => ''
                    ]);
                        
                        if($User){
                       ViewsCount::create([
                            'video_id' => $User->id 
                        ]); 
                        }
                       
                DB::commit();
                $requestData = array(
                    'message_id' => '1',
                    'link' => '/bts-video-view/'.$User->id.'/'.$data['category_id']
                );    
                $this->userNotificationServices->add_general_user_notification($requestData);
                return ['status' => $this->status_true, 'code' => '200', 'data' => 'new video added successfully'];
            }
                          
            
        }catch(Exception $exception){
            DB::rollBack();
            throw $exception;
        }
        
    }
    
    public function getBtsVideos($data){
        try{
            if($data->category_id == null || $data->category_id == ""){
                
                if($data->limit == "" || $data->limit == null){
                    
//                return $videos = Cache::rememberForever('videos', function(){
                $videos = BtsVideos::join('bts_category', 'bts_category.id', '=', 'bts_videos.category_id')
                                    ->Join('videos_count', 'videos_count.video_id', '=', 'bts_videos.id','LEFT')
                                    ->select('bts_videos.id','bts_videos.category_id','bts_videos.video_url','bts_videos.title','bts_videos.description','bts_videos.youtube_thumbnail','bts_videos.thumbnail','bts_videos.thumbnail_path'
                                            ,'bts_category.category', DB::raw("count(videos_count.video_id) AS viewsCount"))
                                    ->groupBy('bts_videos.id')
                                    ->orderBy('viewsCount', 'DESC')
                                    ->get();
//                print_r($videos);exit;
                return ['status' => $this->status_true, 'code' => '200', 'data' => $videos];
//                 });
                }
                if($data->limit != ""){
//                   return $videolmt = Cache::rememberForever('videolmt', function(){
                $videos = BtsVideos::join('bts_category', 'bts_category.id', '=', 'bts_videos.category_id')
                                    ->Join('videos_count', 'videos_count.video_id', '=', 'bts_videos.id','Left')
                                    ->select('bts_videos.id','bts_videos.category_id','bts_videos.video_url','bts_videos.title','bts_videos.description','bts_videos.youtube_thumbnail','bts_videos.thumbnail','bts_videos.thumbnail_path'
                                            ,'bts_category.category',DB::raw("count(videos_count.video_id) AS viewsCount"))
                                    ->groupBy('bts_videos.id')
                                    ->orderBy('viewsCount', 'DESC')
                                    ->take($data->limit)
                                    ->get();
                
                return ['status' => $this->status_true, 'code' => '200', 'data' => $videos];
//                });
                }
               
            }else{
                
//                $categories = BtsCategory::all();
                
//                foreach($categories as $cat){
////                    print_r($cat->id);
//                    if($data->category_id ==  $cat->id){
                        
                        if($data->limit == "" || $data->limit == null){
//                        return $videoscat = Cache::rememberForever('videoscat', function(){  
                        $videos = BtsVideos::join('bts_category', 'bts_category.id', '=', 'bts_videos.category_id')
                                            ->Join('videos_count', 'videos_count.video_id', '=', 'bts_videos.id','LEFT')
                                            ->select('bts_videos.id','bts_videos.category_id','bts_videos.video_url','bts_videos.title','bts_videos.description','bts_videos.youtube_thumbnail','bts_videos.thumbnail','bts_videos.thumbnail_path'
                                                    ,'bts_category.category',DB::raw("count(videos_count.video_id) AS viewsCount"))
                                            ->groupBy('bts_videos.id')
                                            ->orderBy('viewsCount', 'DESC')
                                            ->where('bts_videos.category_id',$data->category_id)->get();
                        
                        return ['status' => $this->status_true, 'code' => '200', 'data' => $videos];
//                          });
                        }
                        if($data->limit != ""){
//                        return $videoscatlmt = Cache::rememberForever('videoscatlmt', function(){   
                        $videos = BtsVideos::join('bts_category', 'bts_category.id', '=', 'bts_videos.category_id')
                                            ->Join('videos_count', 'videos_count.video_id', '=', 'bts_videos.id','LEFT')
                                            ->select('bts_videos.id','bts_videos.category_id','bts_videos.video_url','bts_videos.title','bts_videos.description','bts_videos.youtube_thumbnail','bts_videos.thumbnail','bts_videos.thumbnail_path'
                                                    ,'bts_category.category',DB::raw("count(videos_count.video_id) AS viewsCount"))
                                            ->where('bts_videos.category_id',$data->category_id)
                                            ->groupBy('bts_videos.id')
                                            ->orderBy('viewsCount', 'DESC')
                                            ->take($data->limit)
                                            ->get();
                        return ['status' => $this->status_true, 'code' => '200', 'data' => $videos];
//                        });
                        }
//                    }else{
//                        $videos = 'No record found in these category'; 
//                    }
//                }
            }
            
            
            return ['status' => $this->status_true, 'code' => '200', 'data' => $videos];
        }catch(Exception $exception){
            throw $exception;
        }
    }
    
    public function getVideosById($data){
        
        try{
//            return $btsVideos = Cache::rememberForever('btsVideos', function(){
            $single_video = BtsVideos::join('bts_category', 'bts_category.id', '=', 'bts_videos.category_id')
                                            ->Join('videos_count', 'videos_count.video_id', '=', 'bts_videos.id','LEFT')
                                            ->select('bts_videos.id','bts_videos.category_id','bts_videos.video_url','bts_videos.title','bts_videos.description','bts_videos.youtube_thumbnail','bts_videos.thumbnail','bts_videos.thumbnail_path'
                                                    ,'bts_category.category',DB::raw("count(videos_count.video_id) AS viewsCount"))
                                            ->where('bts_videos.id',$data->video_id)->get();
            
            if(count($single_video) != 0 ){
                $c_id = $single_video[0]['category_id'];
                $category_videos = BtsVideos::join('bts_category', 'bts_category.id', '=', 'bts_videos.category_id')
                                            ->Join('videos_count', 'videos_count.video_id', '=', 'bts_videos.id','LEFT')
                                            ->select('bts_videos.id','bts_videos.category_id','bts_videos.video_url','bts_videos.title','bts_videos.description','bts_videos.youtube_thumbnail','bts_videos.thumbnail','bts_videos.thumbnail_path'
                                                    ,'bts_category.category',DB::raw("count(videos_count.video_id) AS viewsCount"))
                                            ->groupBy('bts_videos.id')
                                            ->orderBy('viewsCount', 'DESC')
                                            ->where('bts_videos.category_id',$c_id)
                                            ->where('bts_videos.id', '!=', $data->video_id)->get();
//                $video = $single_video;
            }else{
                $single_video = 'No video found';
                $category_videos = '';
            }
            
            return ['status' => $this->status_true, 'code' => '200', 'data' => $single_video, 'category_videos' => $category_videos];
//            });
        }catch(Exception $exception){
            throw $exception;
        }
    }
    
    public function manageViewsCount($data){
        DB::beginTransaction();
        try{
            $data->video_id;
/*            $count = ViewsCount::where('video_id',$data->video_id)->get('view_count');
            if(count($count) == 0){
                ViewsCount::create([
                    'video_id' => $data['video_id'],
                    'view_count' => 1
                    
                ]);
                
            }else{   */
            if($data->video_id){
                   ViewsCount::where('video_id', $data->video_id)
                                ->update([
                                'view_count'=> DB::raw('view_count+1') 
//                                'view_count' => Carbon::now()
                              ]);
               DB::commit();
               return ['status' => $this->status_true, 'code' => '200', 'data' => 'Count updated successfully'];    
            }else{
                return ['status' => $this->status_false, 'code' => '404', 'data' => 'Video not found'];    
            }
            
                    
        }catch(Exception $exception){
             DB::rollBack();
            throw $exception;
        }
    }
    
     public function manageViewsCount1($data){
        DB::beginTransaction();
        try{
            if (Auth::check()) {
                
                $user = Auth::user();
                $data->video_id;
                $getCount = VideoCount::where('video_id', $data->video_id)->where('user_id', $user->id)->first();
                
                if(!empty($getCount)){
                    return ['status' => $this->status_false, 'code' => '400', 'data' => 'View count already add fir these user'];
                }else{
                    
                     $countAdd   =   VideoCount::create(['video_id' => $data->video_id, 'user_id' => $user->id ]);
                     DB::commit();
                     
                     return ['status' => $this->status_true, 'code' => '200', 'data' => 'Count added for these video'];
                     
                }
            
            } else {
                return ['status' => $this->status_false, 'code' => '200', 'data' => 'Please Login.'];
            }        
        }catch(Exception $exception){
             DB::rollBack();
            throw $exception;
        }
    }
    
     public function getBtsCategories(){
         try{
           $category_list = BtsCategory::select('id','category')->where('status', 1)->where('id', '!=', 1 )->where('id', '!=', 2)->get();
           
           if(!empty($category_list))
           {
           return ['status' => $this->status_true, 'code' => '200', 'data' => $category_list];
           }
           else
           {
              return ['status' => $this->status_false, 'code' => '200', 'data' => 'No record found']; 
           }
         }catch(Exception $exception){
             DB::rollBack();
            throw $exception;
        }
     }
    
}

