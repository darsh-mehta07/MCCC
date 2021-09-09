import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../_service/authentication.service';
import { AlertService } from '../../_service/alert.service';
import { Config } from '../../_config/config';
import { UserService } from 'src/app/_service/user.service';
import { RegisterService } from 'src/app/_service/register.service';

@Component({
  selector: 'app-profile-final-step',
  templateUrl: './profile-final-step.component.html',
  styleUrls: ['./profile-final-step.component.css']
})
export class ProfileFinalStepComponent implements OnInit {

  submitted: boolean = false;
  form: FormGroup | any;
  experiences: FormArray | any;
  qualifs: FormArray | any;
  slinks: FormArray | any;
  loading = false;
  social_login = false;
  dataTrue = false;
  response: any;
  states: any;
  cities: any;
  languages: any;
  responseData: any;
  statesTrue = false;
  constructor(private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private route: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private userService: UserService,
    private registerService: RegisterService,
  ) {
    // redirect to home if already logged in
    if (sessionStorage.getItem('social_login') === 'true') {
      if (sessionStorage.getItem('profile_status') === 'true') {
        this.route.navigate([Config.AfterLogin]);
      }
    } else {
      if (this.authenticationService.currentUserValue) {
        if (sessionStorage.getItem('profile_status') === 'true') {
          this.route.navigate([Config.AfterLogin]);
        }
      } else {
        this.route.navigate(['/signin']);
      }
    }
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('social_login')) {
      this.social_login = true;
      this.form = this.formBuilder.group({
        phone: ['', Validators.required],
        dob: ['', Validators.required],
        gender: ['', Validators.required],
        state: ['', Validators.required],
        city: ['', Validators.required],
        tag_line: ['', Validators.required],
        short_bio: ['', Validators.required],
        work_experiences: this.formBuilder.array([this.createExperience()]),
        qualifications: this.formBuilder.array([this.createQualification()]),
        language_id: [''],
        social_links: this.formBuilder.array([this.createSocialLinks()]),
        skin_color:['',Validators.required],
        height:['',Validators.required]
      });
    } else {
      this.form = this.formBuilder.group({
        tag_line: ['', Validators.required],
        short_bio: ['', Validators.required],
        work_experiences: this.formBuilder.array([this.createExperience()]),
        qualifications: this.formBuilder.array([this.createQualification()]),
        language_id: [''],
        social_links: this.formBuilder.array([this.createSocialLinks()]),
        skin_color:['',Validators.required],
        height:['',Validators.required]
      });
    }
    if (sessionStorage.getItem('social_login')) {
      this.registerService.state().pipe(first()).subscribe(res => {
        this.response = res;
        if (this.response.data !== 'undefined' && this.response.data.length > 0) {
          this.dataTrue = true;
          this.states = this.response.data;
        } else {
          this.dataTrue = false;
        }
      }, error => {
        this.alertService.error(error);
        this.loading = false;
      });
    }
    this.registerService.languages().pipe(first()).subscribe(res => {
      this.response = res;
      if (this.response.data !== 'undefined' && this.response.data.length > 0) {
        this.dataTrue = true;
        this.languages = this.response.data;
      } else {
        this.dataTrue = false;
      }
    }, error => {
      this.alertService.error(error);
      this.loading = false;
    });
  }
  createExperience(): FormGroup {
    return this.formBuilder.group({
      experience: ['']
    });
  }
  addExperience(): void {
    this.experiences = this.form.get('work_experiences') as FormArray;
    this.experiences.push(this.createExperience());
  }
  removeExperience(i: number) {
    this.experiences.removeAt(i);
  }
  createQualification(): FormGroup {
    return this.formBuilder.group({
      qualification: ['']
    });
  }
  addQualification(): void {
    this.qualifs = this.form.get('qualifications') as FormArray;
    this.qualifs.push(this.createQualification());
  }
  removeQualification(i: number) {
    this.qualifs.removeAt(i);
  }

  createSocialLinks(): FormGroup {
    return this.formBuilder.group({
      social_link: ['']
    });
  }
  addSocialLinks(): void {
    this.slinks = this.form.get('social_links') as FormArray;
    this.slinks.push(this.createSocialLinks());
  }
  removeSocialLinks(i: number) {
    this.slinks.removeAt(i);
  }

  changeSuit(e: any) {
    if (e.target.value > 0) {
      this.statesTrue = true;
      this.registerService.cities({ state_id: e.target.value }).pipe(first()).subscribe(res => {
        this.response = res;
        if (this.response.data !== 'undefined' && this.response.data.length > 0) {
          this.dataTrue = true;
          this.cities = this.response.data;
        } else {
          this.dataTrue = false;
        }
      }, error => {
        this.alertService.error(error);
        this.loading = false;
      });
    }
  }
  get f() { return this.form?.controls; }

  onSubmit() {
    this.submitted = true;
    // reset alerts on submit
    this.alertService.clear();
    // stop here if form is invalid
    if (this.form?.invalid) {
      return;
    }
    this.loading = true;
    this.userService.profile_final_stap(this.form.value).pipe(first()).subscribe(
      data => {
        this.responseData = data;
        if (this.responseData.status == "true") {
          this.route.navigate(['/thankyou']);
        } else {
          this.alertService.success(this.responseData.data);
        }
      }, error => {
        this.alertService.error(error);
        this.loading = false;
      });
  }
}
