<?php

namespace App\Services\User;

use Illuminate\Support\Facades\DB;
use App\User;
use Illuminate\support\Facades\Cache;
use App\Models\User\BookmarkModel;
use Illuminate\Support\Facades\Auth;

class BookmarkService
{
    
    protected $status_true;
    protected $status_false;
    
    public function __construct() {
        $this->status_true = 'true';
        $this->status_false = 'false';
    }
    
    public function manageBookmark($data){
        
        DB::beginTransaction();
        try{
            if (Auth::check()) {
                $user =  Auth::user(); 
                $u_id = $user->id;
                
                $matchThese = ['user_id' => $u_id, 'casting_card_id' => $data['casting_card_id']];
//                $checkUserBookmarked = BookmarkModel::where([['user_id', '=', $u_id],['casting_card_id' , '=', $data['casting_card_id']]])->first();
                $checkUserBookmarked = BookmarkModel::where($matchThese)->first();
                
                if($checkUserBookmarked){
                    if($checkUserBookmarked->bookmark_status == 1){
//                        print_r('1 here');exit;
                       $checkUserBookmarked = $checkUserBookmarked->update([ 'bookmark_status' => '0']);
                       DB::commit();
                       return ['status' => $this->status_true, 'code' => 200, 'data' => ['Bookmark removed']];
                       
                    }elseif($checkUserBookmarked->bookmark_status == 0){
                        $checkUserBookmarked = $checkUserBookmarked->update([ 'bookmark_status' => 1 ]);
                       DB::commit(); 
                      return ['status' => $this->status_true, 'code' => 200, 'data' => ['Bookmark Added']];  
                    }
                    
                }else{
                     $User = BookmarkModel::create([
                    'user_id'             => $u_id,
                    'casting_card_id'     => $data['casting_card_id']
                    ]);
            DB::commit();
                return ['status' => $this->status_true, 'code' => 200, 'data' => ['Bookmarked successfully']];
                }
            }else{
                return ['status' => $this->status_false, 'code' => '400', 'data' => ['not logged in']];
            }
        }catch(Exception $exception){
            DB::rollBack();
            throw $exception;
        }
    }
}

