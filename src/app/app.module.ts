import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LogoComponent } from './logo/logo.component';
import { Splash1Component } from './splash/splash1/splash1.component';
import { Splash2Component } from './splash/splash2/splash2.component';
import { Splash3Component } from './splash/splash3/splash3.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SigninComponent } from './signin/signin.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { FacebookLoginProvider } from 'angularx-social-login';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
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
import { AutoFocus } from './_helpers/auto-focus.directive';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NiceSelectModule } from "ng-nice-select";
import { ProfileFirstStepComponent } from './profile/profile-first-step/profile-first-step.component';
import { ProfileSecondStepComponent } from './profile/profile-second-step/profile-second-step.component';
import { ProfileFinalStepComponent } from './profile/profile-final-step/profile-final-step.component';
import { ThankyouComponent } from './profile/thankyou/thankyou.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AlertComponent } from './_components/alert/alert.component';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { CastingInnerComponent } from './casting/casting-inner/casting-inner.component';
import { CastingAllComponent } from './casting/casting-all/casting-all.component';
import { ApplyCastingComponent } from './casting/apply-casting/apply-casting.component';
import { ApplicationConfirmCastingComponent } from './casting/application-confirm-casting/application-confirm-casting.component';
import { ThankyouCastingComponent } from './casting/thankyou-casting/thankyou-casting.component';
import { MyApplicationComponent } from './my-application/my-application.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { MyCastingInnerComponent } from './my-application/my-casting-inner/my-casting-inner.component';
import { BtsVideosComponent } from './bts-videos/bts-videos.component';
import { BtsInnerComponent } from './bts-videos/bts-inner/bts-inner.component';
import { BtsVideoViewComponent } from './bts-videos/bts-video-view/bts-video-view.component';
import { SafePipe } from './_config/safe.pipe';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LeftSideMenuComponent } from './left-side-menu/left-side-menu.component';
import { StickyMenuComponent } from './sticky-menu/sticky-menu.component';
@NgModule({
  declarations: [
    AppComponent,
    LogoComponent,
    Splash1Component,
    Splash2Component,
    Splash3Component,
    WelcomeComponent,
    SigninComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    Signup1Component,
    Signup2Component,
    Signup3Component,
    Signup4Component,
    Signup5Component,
    Signup6Component,
    Signup7Component,
    Signup8Component,
    Signup9Component,
    Signup10Component,
    Signup11Component,
    HomeComponent,
    AutoFocus,
    ProfileFirstStepComponent,
    ProfileSecondStepComponent,
    ProfileFinalStepComponent,
    ThankyouComponent,
    AlertComponent,
    CastingInnerComponent,
    CastingAllComponent,
    ApplyCastingComponent,
    ApplicationConfirmCastingComponent,
    ThankyouCastingComponent,
    MyApplicationComponent,
    EditProfileComponent,
    MyCastingInnerComponent,
    BtsVideosComponent,
    BtsInnerComponent,
    BtsVideoViewComponent,
    SafePipe,
    HeaderComponent,
    FooterComponent,
    LeftSideMenuComponent,
    StickyMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NiceSelectModule,
    ImageCropperModule,
    NgHttpLoaderModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SlickCarouselModule,
    NgxSkeletonLoaderModule.forRoot()
  ],
  providers: [
    {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '522994670979-jpm3t03npd2b3qu65nnue9jg4moni22k.apps.googleusercontent.com'
          )
        },{
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider(
            '3009977702583838'
          )
          // provider: new FacebookLoginProvider(
          //   '132519988987129'
          // )
        }
      ]
    } as SocialAuthServiceConfig,
  },{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
