import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogoComponent } from './logo/logo.component';
import { Splash1Component } from './splash/splash1/splash1.component';
import { Splash2Component } from './splash/splash2/splash2.component';
import { Splash3Component } from './splash/splash3/splash3.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SigninComponent } from './signin/signin.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { Signup1Component } from './signup/signup1/signup1.component'; 
import { Signup2Component } from './signup/signup2/signup2.component';
import { Signup3Component } from './signup/signup3/signup3.component';
import { Signup4Component } from './signup/signup4/signup4.component';
import { Signup5Component } from './signup/signup5/signup5.component';
import { Signup6Component } from './signup/signup6/signup6.component';
import { Signup7Component } from './signup/signup7/signup7.component';
import { Signup8Component } from './signup/signup8/signup8.component';
import { Signup9Component } from './signup/signup9/signup9.component';
import { Signup10Component } from './signup/signup10/signup10.component';
import { Signup11Component } from './signup/signup11/signup11.component';
import { HomeComponent } from './home/home.component';
import { ProfileFirstStepComponent } from './profile/profile-first-step/profile-first-step.component';
import { ProfileSecondStepComponent } from './profile/profile-second-step/profile-second-step.component';
import { ProfileFinalStepComponent } from './profile/profile-final-step/profile-final-step.component';
import { ThankyouComponent } from './profile/thankyou/thankyou.component';
import { AuthGuard } from './_helpers/auth.guard';
import { CastingInnerComponent } from './casting/casting-inner/casting-inner.component';
import { CastingAllComponent } from './casting/casting-all/casting-all.component';
import { ApplyCastingComponent } from './casting/apply-casting/apply-casting.component';
import { ThankyouCastingComponent } from './casting/thankyou-casting/thankyou-casting.component';
import { MyApplicationComponent } from './my-application/my-application.component';
import { ApplicationConfirmCastingComponent } from './casting/application-confirm-casting/application-confirm-casting.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { MyCastingInnerComponent } from './my-application/my-casting-inner/my-casting-inner.component';
import { BtsVideosComponent } from './bts-videos/bts-videos.component';
import { BtsInnerComponent } from './bts-videos/bts-inner/bts-inner.component';
import { BtsVideoViewComponent } from './bts-videos/bts-video-view/bts-video-view.component';
import { RouteReuseStrategy } from '@angular/router';
import { CustomReuseStrategy } from './_service/custom_reuse_strategy';

import { EventComponent } from './event/event/event.component';
import { EventInnerComponent } from './event/event-inner/event-inner.component';
import { EventApplyComponent } from './event/event-apply/event-apply.component';
import { EventThankyouComponent } from './event/event-thankyou/event-thankyou.component';

import {WorkshopComponent} from './workshop/workshop.component'
import { WorkshopRegistrationComponent } from './workshop/workshop-registration/workshop-registration.component';
import { WorkshopRegistrationFormComponent } from './workshop/workshop-registration-form/workshop-registration-form.component';
import { ThankYouPageComponent } from './workshop/thank-you-page/thank-you-page.component';
import { NoInternetComponent } from './no-internet/no-internet.component';
import { AboutMcccComponent } from './common/about-mccc/about-mccc.component';
import { FaqsComponent } from './common/faqs/faqs.component';
import { HelpComponent } from './common/help/help.component';
import { FaqInnerComponent } from './common/faq-inner/faq-inner.component';
import { AnatomyComponent } from './common/anatomy/anatomy.component';
import { PersonalComponent } from './common/personal/personal.component';
import { ContactDetailsComponent } from './common/contact-details/contact-details.component';
import { AnatomyInnerComponent } from './common/anatomy-inner/anatomy-inner.component';


const routes: Routes = [
  {    
    path: '',    
    redirectTo: 'logo',    
    pathMatch: 'full',    
  },    
  {    
    path: 'logo',component: LogoComponent,    
    data: {title: 'Logo Page'}    
  },    
  {    
    path: 'splash1',component: Splash1Component,    
    data: {storeRoute: true,title: 'Casting Page'}    
  }, 
  {    
    path: 'splash2',component: Splash2Component,    
    data: {storeRoute: true,title: 'Traning Page'}    
  },
  {    
    path: 'splash3',component: Splash3Component,    
    data: {storeRoute: true,title: 'Events Page'}    
  },
  {    
    path: 'welcome',component: WelcomeComponent,    
    data: {storeRoute: true,title: 'Welcome Page'}    
  },
  {    
    path: 'signin',component: SigninComponent,    
    data: {storeRoute: true,title: 'Signin Page'}    
  }, 
  {    
    path: 'splash2',component: Splash2Component,    
    data: {storeRoute: true, title: 'Traning Page'}    
  },
  {    
    path: 'splash3',component: Splash3Component,    
    data: {storeRoute: true, title: 'Events Page'}    
  },
  {    
    path: 'welcome',component: WelcomeComponent,    
    data: {storeRoute: true, title: 'Welcome Page'}    
  },
  {    
    path: 'signin',component: SigninComponent,    
    data: {storeRoute: true, title: 'Signin Page'}    
  },
  {    
    path: 'forgot-password',component: ForgotPasswordComponent,    
    data: {title: 'Forgot Password Page'}    
  },
  {    
    path: 'reset-password/:token',component: ResetPasswordComponent,    
    data: {title: 'Reset Password Page'}    
  },
  {    
    path: 'signup-name',component: Signup1Component,    
    data: {title: 'Name Page'}    
  },
  {    
    path: 'signup-email',component: Signup2Component,    
    data: {title: 'Email Page'}    
  },
  {    
    path: 'signup-phone',component: Signup3Component,    
    data: {title: 'Phone Page'}    
  },
  {    
    path: 'signup-otp',component: Signup4Component,    
    data: {title: 'OTP Page'}    
  },
  {    
    path: 'signup-gendar',component: Signup5Component,    
    data: {title: 'Gendar Page'}    
  },
  {    
    path: 'signup-dob',component: Signup6Component,    
    data: {title: 'Date of Birth Page'}    
  },
  {    
    path: 'signup-state-city',component: Signup7Component,    
    data: {title: 'Signup State & City Page'}    
  },
  {    
    path: 'signup-password',component: Signup8Component,    
    data: {title: 'Signup Password Page'}    
  },
  {    
    path: 'signup-confirm-password',component: Signup9Component,    
    data: {title: 'Signup Confirm Password Page'}    
  },
  {    
    path: 'signup-terms',component: Signup10Component,    
    data: {title: 'Signup Terms And Condition Page'}    
  },
  {    
    path: 'signup-success',component: Signup11Component,    
    data: {title: 'Signup Success Page'}    
  },
  {    
    path: 'home',component: HomeComponent, canActivate: [AuthGuard],   
    data: {storeRoute: true,title: 'Home Page'}    
  },
  {    
    path: 'profile_first_step',component: ProfileFirstStepComponent, canActivate: [AuthGuard],   
    data: {title: 'Upload Image Page'}    
  },
  {    
    path: 'profile_second_step',component: ProfileSecondStepComponent, canActivate: [AuthGuard],   
    data: {title: 'Upload Video Page'}    
  },
  {    
    path: 'profile_final_step',component: ProfileFinalStepComponent,canActivate: [AuthGuard],
    data: {title: 'Final Step Page'}    
  },
  {    
    path: 'thankyou',component: ThankyouComponent,canActivate: [AuthGuard],  
    data: {title: 'Thank You Page'}    
  },
  {    
    path: 'casting-inner/:id',component: CastingInnerComponent,canActivate: [AuthGuard],    
    data: {storeRoute: true,title: 'Casting Inner Page'}    
  },
  {    
    path: 'casting-all/:id',component: CastingAllComponent,canActivate: [AuthGuard],    
    data: {storeRoute: true,title: 'Casting All Page'}    
  },
  {    
    path: 'apply-casting/:id',component: ApplyCastingComponent,canActivate: [AuthGuard],    
    data: {storeRoute: true,title: 'Apply Casting Page'}   
  },
  {    
    path: 'casting-all/:id',component: CastingAllComponent,canActivate: [AuthGuard],    
    data: {storeRoute: true, title: 'Casting All Page'}    
  },
  {    
    path: 'apply-casting/:id',component: ApplyCastingComponent,canActivate: [AuthGuard],    
    data: {storeRoute: true, title: 'Apply Casting Page'}    
  },
  {    
    path: 'casting-confirm/:id',component: ApplicationConfirmCastingComponent,canActivate: [AuthGuard],    
    data: {title: 'Confirmation Casting Page'}    
  },
  {    
    path: 'thank-casting/:application_no',component: ThankyouCastingComponent,canActivate: [AuthGuard],    
    data: {title: 'Thankyou Casting Page'}    
  },
  {    
    path: 'my-aaplication',component: MyApplicationComponent,canActivate: [AuthGuard],    
    data: {storeRoute: true,title: 'My Application Page'}    
  },
  {    
    path: 'edit-profile',component: EditProfileComponent,canActivate: [AuthGuard],    
    data: {title: 'Edit Profile Page'}    
  },
  {    
    path: 'my-casting/:id',component: MyCastingInnerComponent,canActivate: [AuthGuard],    
    data: {storeRoute: true,title: 'My casting Page'}    
  },
  {    
    path: 'bts-video',component: BtsVideosComponent,canActivate: [AuthGuard],    
    data: {storeRoute: true,title: 'BTS Videos'}    
  },
  {    
    path: 'bts-inner/:id',component: BtsInnerComponent,canActivate: [AuthGuard],    
    data: {storeRoute: true,title: 'BTS Inner'}    
  },
  {    
    path: 'bts-video',component: BtsVideosComponent,canActivate: [AuthGuard],    
    data: {storeRoute: true, title: 'BTS Videos'}    
  },
  {    
    path: 'bts-inner/:id',component: BtsInnerComponent,canActivate: [AuthGuard],    
    data: {storeRoute: true, title: 'BTS Inner'}    
  },
  {    
    path: 'bts-video-view/:id/:type',component: BtsVideoViewComponent,canActivate: [AuthGuard],    
    data: {storeRoute: true,title: 'BTS Inner'}    
  },
  {    
    path: 'workshop/:id',component: WorkshopComponent,canActivate: [AuthGuard],    
    data: {storeRoute: true,title: 'Workshop'}    
  },
  {    

    path: 'event/:id',component: EventComponent,canActivate: [AuthGuard],    
    data: {storeRoute: true,title: 'Event page'}    
  },
  {    
    path: 'event-inner/:id',component: EventInnerComponent,canActivate: [AuthGuard],    
    data: {storeRoute: true,title: 'Event Inner page'}    
  },
  {    
    path: 'event-apply/:id',component: EventApplyComponent,canActivate: [AuthGuard],    
    data: {storeRoute: true,title: 'Event Apply page'}    
  },
  {    
    path: 'event-thankyou',component: EventThankyouComponent,canActivate: [AuthGuard],    
    data: {storeRoute: true,title: 'Event Thankyou page'}    
  },
  {
    path: 'workshop-registration/:id',component: WorkshopRegistrationComponent,canActivate: [AuthGuard],    
    data: {storeRoute: true,title: 'Workshop Registration'}    
  },
  {    
    path: 'workshop-registration-form/:id/:type',component: WorkshopRegistrationFormComponent,canActivate: [AuthGuard],    
    data: {storeRoute: true,title: 'Workshop Registration Form'}    
  },
  {    
    path: 'thank-you-workshop/:name',component: ThankYouPageComponent,canActivate: [AuthGuard],    
    data: {storeRoute: true,title: 'Workshop Registration Form'}    
  },
  {    
    path: 'no-internet',component: NoInternetComponent,    
    data: {storeRoute: true,title: 'Workshop Registration Form'}    
  },
  {    
    path: 'about-MCCC',component: AboutMcccComponent,    
    data: {storeRoute: true,title: 'About MCCC'}    
  },
  {    
    path: 'faq',component: FaqsComponent,    
    data: {storeRoute: true,title: 'FAQS'}    
  },
  {    
    path: 'faq-inner/:id',component: FaqInnerComponent,    
    data: {storeRoute: true,title: 'FAQ Inner'}    
  },
  {    
    path: 'help',component: HelpComponent,    
    data: {storeRoute: true,title: 'Help'}    
  },
  {    
    path: 'anatomy',component: AnatomyComponent,    
    data: {storeRoute: true,title: 'Anatomy'}    
  },
  {    
    path: 'anatomy-inner',component: AnatomyInnerComponent,    
    data: {storeRoute: true,title: 'Anatomy Inner'}    
  },
  {    
    path: 'personal',component: PersonalComponent,    
    data: {storeRoute: true,title: 'Parsanal'}    
  },
  {    
    path: 'contact-details',component: ContactDetailsComponent,    
    data: {storeRoute: true,title: 'Anatomy'}    
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
