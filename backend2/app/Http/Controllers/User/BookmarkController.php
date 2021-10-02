<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Response;
use App\Services\User\BookmarkService;
use Validator;
use Auth;

class BookmarkController extends Controller
{
    protected $bookmarkServices;
    protected $status_true;
    protected $status_false;
    
    public function __construct(BookmarkService $bookmarkServices) {
        $this->bookmarkServices = $bookmarkServices;
        $this->status_true = 'true';
        $this->status_false = 'false';
    }
    
    public function handleBookmark(Request $request)
    {
        $validatedData = $request->validate([
                'casting_card_id'   => 'required|numeric',   // |max:2000
           ],
            [
                'casting_card_id.required'  => 'casting cardid is required',
                'casting_card_id.numeric'   => 'Please enter only numberic values.'
            ]);
        
        try{
            $data = $this->bookmarkServices->manageBookmark($request);
            if($data){
            return response()->json($data);     
            }
            
        }catch(Exception $ex){
                return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
            }   
       }
}
