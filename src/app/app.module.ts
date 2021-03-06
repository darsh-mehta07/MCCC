import { NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DatePipe } from '@angular/common';

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
import { StickyMenuComponent } from './sticky-menu/sticky-menu.component';
import { RouteReuseStrategy } from '@angular/router';
import { CustomReuseStrategy } from './_service/custom_reuse_strategy';
import { WorkshopComponent } from './workshop/workshop.component';
import {ConnectionServiceModule} from 'ng-connection-service';
// import { EventModule } from './event/event.module';
import { EventComponent } from './event/event/event.component';
import { EventInnerComponent } from './event/event-inner/event-inner.component';
import { EventApplyComponent } from './event/event-apply/event-apply.component';
import { EventThankyouComponent } from './event/event-thankyou/event-thankyou.component';

import { WorkshopRegistrationComponent } from './workshop/workshop-registration/workshop-registration.component';
import { WorkshopRegistrationFormComponent } from './workshop/workshop-registration-form/workshop-registration-form.component';
import { ThankYouPageComponent } from './workshop/thank-you-page/thank-you-page.component';
import { NoInternetComponent } from './no-internet/no-internet.component';

import { AboutMcccComponent } from './common/about-mccc/about-mccc.component';
import { FaqsComponent } from './common/faqs/faqs.component';
import { HelpComponent } from './common/help/help.component';
import { FaqInnerComponent } from './common/faq-inner/faq-inner.component';
import { AnatomyComponent } from './common/anatomy/anatomy.component';
import { ContactDetailsComponent } from './common/contact-details/contact-details.component';
import { PersonalComponent } from './common/personal/personal.component';
import { ImagesComponent } from './common/images/images.component';
import { VideoComponent } from './common/video/video.component';
import { PreviousWorkComponent } from './common/previous-work/previous-work.component';
import { SkillComponent } from './common/skill/skill.component';
import { AnatomyInnerComponent } from './common/anatomy-inner/anatomy-inner.component';

import { NotificationComponent } from './notification/notification.component';
import { GamesComponent } from './games/games.component';
import { TermConditionComponent } from './term-condition/term-condition.component';
import { BookmarkComponent } from './bookmark/bookmark.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

import { DateFormatPipe } from 'src/app/_helpers/DateFormatPipe';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { PasswordComponent } from './password/password.component';
import { GameCardComponent } from './game-card/game-card.component';
import { RestartDialogComponent } from './restart-dialog/restart-dialog.component';
import { TooltipModule } from 'ng2-tooltip-directive';
import { CubicCardComponent } from './cubic-card/cubic-card.component';
import { GameComponent } from './game/game.component';
import { HeaderWithLogoComponent } from './header-with-logo/header-with-logo.component';
import {VgCoreModule} from '@videogular/ngx-videogular/core';
import {VgControlsModule} from '@videogular/ngx-videogular/controls';
import {VgOverlayPlayModule} from '@videogular/ngx-videogular/overlay-play';
import {VgBufferingModule} from '@videogular/ngx-videogular/buffering';
// import { CustomReuseStrategy, Routing } from './shared/routing';

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
    StickyMenuComponent,
    WorkshopComponent,

    EventComponent,
    EventInnerComponent,
    EventApplyComponent,
    EventThankyouComponent,

    WorkshopRegistrationComponent,
    WorkshopRegistrationFormComponent,
    ThankYouPageComponent,
    NoInternetComponent,

    AboutMcccComponent,
    FaqsComponent,
    HelpComponent,
    FaqInnerComponent,
    AnatomyComponent,
    ContactDetailsComponent,
    PersonalComponent,
    ImagesComponent,
    VideoComponent,
    PreviousWorkComponent,
    SkillComponent,
    AnatomyInnerComponent,

    NotificationComponent,
      GamesComponent,
      TermConditionComponent,
      BookmarkComponent,
      DateFormatPipe,
      PasswordComponent,
      GameCardComponent,
      RestartDialogComponent,
      CubicCardComponent,
      GameComponent,
      HeaderWithLogoComponent,

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
    NgxSkeletonLoaderModule.forRoot(), 
    ConnectionServiceModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    TooltipModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    // EventModule,
  ],
  providers: [ DatePipe,
    {
    provide: RouteReuseStrategy,
    useClass: CustomReuseStrategy
    },    
    {
      
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          // MCCC
          // Client ID : 727905192800-hp1qn4bal47d4243tibbq4ie4dnnf4ih.apps.googleusercontent.com

          //  MCCC LOCALHOST https://localhost:4200/
          //Client ID : 924038754600-c3g1f7vn84aipjnumsgs7uid0ovus5gr.apps.googleusercontent.com
          provider: new GoogleLoginProvider(
            '727905192800-hp1qn4bal47d4243tibbq4ie4dnnf4ih.apps.googleusercontent.com'
          )
        },{
          id: FacebookLoginProvider.PROVIDER_ID,
          // App Name : MCCCWD
          // App id : 629080598116548
          // this is the web platform App ID
          // Site url : https://mcccapp.in/


          // test app
          // App id : 908282646448240
          // App Name : MCCCWD-aws

          provider: new FacebookLoginProvider(
            '499325081131217'
          )          
        }
      ]
    } as SocialAuthServiceConfig,
  },{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
],
  bootstrap: [AppComponent]
})
export class AppModule implements OnInit {
  ngOnInit(): void {
    
  } 
  
}
