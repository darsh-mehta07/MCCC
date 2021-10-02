<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::get("users/{id?}",'User\FrontendController@getRegisteredUsers');
Route::post("register",'User\FrontendController@UserRegisteration');
Route::post("social_login",'User\FrontendController@CheckSocialId');

Route::post("check_email",'Auth\AdminAuthController@checkAdminEmail');
Route::post("login",'Auth\AdminAuthController@UserLogin');
Route::get("states",'User\FrontendController@getStates');
Route::post("cities",'User\FrontendController@getCities');
Route::get("otp",'User\FrontendController@generateOTP');
Route::get("terms",'User\FrontendController@termsConditions');
Route::post("phone_number_check",'Auth\AdminAuthController@checkPhoneMumber');
Route::post("forgot_password",'Auth\ForgotPasswordController@forgot');

// Route::get("test",'User\FrontendController@test');
Route::get("languages",'User\FrontendController@getLanguage');
Route::get("show-recommendations",'User\UserDashboard@showRecommendations');
Route::post("splash_screen",'Admin\AdminController@addSplashScreen');
Route::post("create-mcc-master",'Admin\AdminController@createMccMaster');
// Route::post("add_casting_call",'Admin\CastingCallController@addCastingCallData');
Route::post("add_casting_banner",'Admin\CastingCallController@addCastingBanner');

    // BTS categories
Route::post("get_categories",'Admin\BtsController@getCategories');   
//BTS routes
Route::post("add_bts",'Admin\BtsController@addBtsVideos');
Route::post("get_bts_videos",'Admin\BtsController@BtsVideos');
Route::post("bts_videos_by_id",'Admin\BtsController@getParticularVideos');
Route::post("add_workshop_data",'Admin\WorkshopEventsController@addWorkshopData');

Route::middleware(['auth:api'])->group(function () {
    Route::post("logout",'Auth\AdminAuthController@logout');
    Route::post("casting_banner_image",'User\UserDashboard@CastingBannerImage');
    Route::post("new_casting_calls",'User\UserDashboard@castingcalls');
    Route::post("call_ending_soon",'User\UserDashboard@endingSoonCastingcalls');
    Route::post("show_recommendations",'User\UserDashboard@showRecommendations');
    Route::post("bookmark",'User\BookmarkController@handleBookmark');   
    Route::post("user_details",'User\UserDashboard@userDetails');
    Route::post("user_edit",'User\UserDashboard@editProfile');
    Route::get("display_user_personal_info",'User\UserDashboard@displayUserProfileInfo');
    Route::post("user_applied_casting",'User\UserDashboard@addUserAppliedCasting');
    Route::post("confirm_casting_application",'User\UserDashboard@confirmCastingApplication');
    Route::post("get_user_applied_casting",'User\UserDashboard@userAppliedCasting');
    Route::post("reset_password",'Auth\ResetPasswordController@resetPassword');
    Route::get("dashboard",'User\UserDashboard@index');
    Route::post("profile_final_step",'User\ProfileController@addUserProfileData');
    Route::post("profile_first_step",'User\ProfileController@userImageUpload'); 
    Route::post("profile_second_step",'User\ProfileController@userVideoUpload'); 
    Route::post("user_applied_castings",'User\UserDashboard@addUserAppliedCastings');
    Route::post("user_update_contact",'User\UserDashboard@userUpdateContactDetail');
    Route::post("views_count",'Admin\BtsController@addViewsCount');
        
    //Workshop Api
    Route::post("get_upcoming_workshop_data",'User\WorkshopController@getUpcomingWorkshopData');
    Route::post("get_endingsoon_workshop_data",'User\WorkshopController@getEndingSoonWorkshopData');
    Route::post("get_previous_workshop_data",'User\WorkshopController@getPreviousWorkshopData');
    Route::post("get_each_workshop_data",'User\WorkshopController@getEachWorkshopData');
    Route::post("user_apply_for_workshop",'User\WorkshopController@useApplyForWorkshop');
    Route::post("check_for_apply",'User\WorkshopController@checkForApply');
    Route::post("check_for_event_apply",'User\WorkshopController@checkForEventApply');
    
    
    Route::post("user_apply_for_events",'User\WorkshopController@useApplyForEvent');
    
    //Notification Api
    Route::post("get_user_notification",'User\Notification@getUserNotification');
    Route::post("user_notification_mark_read",'User\Notification@userNotificationMarkRead');
    Route::post("get_user_notification_counter",'User\Notification@getUserNotificationCounter');
    
    //static Data
    Route::post("user_image_update",'User\ProfileController@userUpdateImageUpload');
    Route::post("user_video_update",'User\ProfileController@userUpdateVideoUpload');
    Route::post("add_update_about_mcc",'Admin\AboutMccController@addUpdateAboutMcc');
    Route::get("display_about_mccc",'Admin\AboutMccController@displayAboutMccc');
    Route::post("add_update_faq_category",'Admin\FaqController@addUpdateFaqCateogory');
    Route::post("add_update_faq_content",'Admin\FaqController@addUpdateFaqContent');
    Route::post("display_faq",'Admin\FaqController@displayFaq');
    Route::get("display_main_faq",'Admin\FaqController@displayMainFaq');
    Route::post("add_update_help_mccc",'Admin\HelpMcccController@addUpdateHelpMccc');
    Route::get("display_help_mccc",'Admin\HelpMcccController@displayHelpMccc');
    Route::post("add_update_terms",'Admin\TermsConditionController@addUpdateTermsCondition');
    Route::get("display_terms",'Admin\TermsConditionController@displayTermsCondition');
    Route::post("send_enquiry",'User\ContactEnquiryController@sendEnquiry');
    Route::post("add_update_anatomy",'User\UserDashboard@addUpdateAnatomy');
    Route::get("display_anatomy",'User\UserDashboard@displayAnatomy');
    Route::post("add_edit_work_exp",'User\ProfileController@userAddWorkExp');
    Route::post("user_update_contact_detail",'User\ProfileController@userUpdateContactDetail');
    Route::get("user_display_contact_detail",'User\ProfileController@userDisplayContactDetail');
    Route::get("display_user_image_data",'User\ProfileController@displayUserImageData'); 
    Route::get("display_user_video_data",'User\ProfileController@displayUserVideoData'); 
    
    //----------EventAPI----------------
    Route::get('events','Admin\EventsController@getEvents');
    Route::post('event_inner','Admin\EventsController@eventInner');
    
 });
