<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\User\UserDashboardService;
use App\Services\User\RecommendationService;
use App\Http\Requests\EditUserData;
use App\Http\Requests\ValidateUserAppliedCasting;

class UserDashboard extends Controller {

    protected $UserDashboardService;
    protected $status_true;
    protected $status_false;
    protected $RecommendationService;

    public function __construct(UserDashboardService $UserDashboardService, RecommendationService $RecommendationService) {
        $this->UserDashboardService = $UserDashboardService;
        $this->status_true = 'true';
        $this->status_false = 'false';
        $this->RecommendationService = $RecommendationService;
    }

    public function index(Request $request) {
        try {
            $data = $this->UserDashboardService->getUserData($request);
            return response()->json($data);
        } catch (Exception $ex) {
            return response()->json(['status' => $this->status_false, 'message' => $ex->getMessage()], 500);
        }
    }

    public function CastingBannerImage() {
        try {
            $data = $this->UserDashboardService->fetchCastingBanner();
            if ($data) {
                return response()->json($data);
            }
        } catch (Exception $ex) {
            return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
        }
    }

    public function castingcalls(Request $request) {
        try {
            $data = $this->UserDashboardService->getCastingCalls($request);
            if ($data) {
                return response()->json($data);
            }
        } catch (Exception $ex) {
            return response()->json(['status' => $this->status_false, 'message' => $ex->getMessage()], 500);
        }
    }

    public function endingSoonCastingcalls(Request $request) {
        try {
            $data = $this->UserDashboardService->getEndingSoonCastingCalls($request);
            if ($data) {
                return response()->json($data);
            }
        } catch (Exception $ex) {
            return response()->json(['status' => $this->status_false, 'message' => $ex->getMessage()], 500);
        }
    }

    public function showRecommendations(Request $request) {
        try {
            $data = $this->RecommendationService->displayRecommend($request);
            return response()->json($data);
        } catch (Exception $ex) {
            return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
        }
    }

    public function userDetails(Request $request) {
        try {
            $data = $this->UserDashboardService->getUserDetails($request);
            return response()->json($data);
        } catch (Exception $ex) {
            return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
        }
    }

    public function editProfile(EditUserData $request) {
        try {
            $data = $this->UserDashboardService->editUserProfile($request);
            return response()->json($data);
        } catch (Exception $ex) {
            return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
        }
    }

//    Casting image Video save
    public function addUserAppliedCasting(ValidateUserAppliedCasting $request) {
        try {
                ini_set('memory_limit', '-1');
             $data = $this->UserDashboardService->addUserAppliedCastingCall($request);
             if($data){
                 return response()->json($data);
             }
        } catch (Exception $ex) {
            return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
        }
    }
    public function addUserAppliedCastings(ValidateUserAppliedCasting $request) {
        try {
                ini_set('memory_limit', '-1');
             $data = $this->UserDashboardService->addUserAppliedCasting($request);
             if($data){
                 return response()->json($data);
             }
        } catch (Exception $ex) {
            return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
        }
    }
   public function confirmCastingApplication(Request $request) {
       try {
             $data = $this->UserDashboardService->confirmCastingApplication($request);
             if($data){
                 return response()->json($data);
             }
        } catch (Exception $ex) {
            return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
        }
   }

    public function userAppliedCasting(Request $request) {
        try {
            $data = $this->UserDashboardService->userAppliedCastingCall($request);
            return response()->json($data);
        } catch (Exception $ex) {
            return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
        }
    }

    public function userUpdateContactDetail(Request $request) {
        try {
            $data = $this->UserDashboardService->updateUserContact($request);
            return response()->json($data);
        } catch (Exception $ex) {
            return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
}
    }
    
    public function addUpdateAnatomy(Request $request) {
        try {
            $data = $this->UserDashboardService->addUpdateUserAnatomy($request);
            return response()->json($data);
        } catch (Exception $ex) {
            return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
        }
    }
    
    public function displayAnatomy() {
        try {
            $data = $this->UserDashboardService->fetchAnatomy();
            return response()->json($data);
        } catch (Exception $ex) {
            return response()->json(['status' => $this->status_false, 'code' => '500', 'message' => $ex->getMessage()]);
        }
    }

}
