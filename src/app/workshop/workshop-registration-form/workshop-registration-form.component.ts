import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap,Router } from '@angular/router';
import { Config } from '../../_config/config';
import {WorkshopService} from '../../_service/workshop.service';
import { Location } from '@angular/common';
import { AuthenticationService } from '../../_service/authentication.service';
import { DashboardService } from '../../_service/dashboard.service';
import { User } from '../../_models/user';

import { AbstractControl, FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
@Component({
  selector: 'app-workshop-registration-form',
  templateUrl: './workshop-registration-form.component.html',
  styleUrls: ['./workshop-registration-form.component.css']
})
export class WorkshopRegistrationFormComponent implements OnInit {
  id: any;
  bgImage: any;
  workshopData: any;
  currentUser: User;
  images: string[] = [];
  images2: string[] = [];
  userId: any;
  userData: any;
  url: any;
  form: FormGroup | any;
  submitted = false;
  constructor(private location: Location,private workshopService: WorkshopService,
    private route:Router,
    private actRoute:ActivatedRoute,
    private authenticationService: AuthenticationService,
    private dashboardService: DashboardService,
    private formBuilder:FormBuilder) { 
      this.currentUser = this.authenticationService.currentUserValue;
      this.userId = this.currentUser.userDetails.id;
      console.log(this.currentUser);
    }

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe((params: ParamMap) => {                 
      this.id = params.get('id');
    });

    this.dashboardService.userDetails({casting_id:''}).subscribe(
      data => { 
        this.userData = data;
        console.log(data);
    });

    this.workshopService.get_each_workshop_data({'id': this.id}).subscribe(
      data => { 
        this.workshopData = data.data[0];
        console.log(this.workshopData);
    });

    this.form = this.formBuilder.group({
      
      name : [this.currentUser.userDetails.name,Validators.required],
      age : [null,Validators.required],
      phone : [this.currentUser.userDetails.phone],
      sos_phone : [null,Validators.required],
      edu_details: [null,Validators.required],
      gender: [this.currentUser.userDetails.gender,Validators.required],
      dob: [this.currentUser.userDetails.dob,Validators.required],
      email: [this.currentUser.userDetails.email,Validators.required],
      address: [null,Validators.required],
      city_name: [null,Validators.required],
      aadhar_file: ['',Validators.required],
      pan_file: ['',Validators.required],
      about_workshop: ['',Validators.required],
      fileSource : [''],
      aadharfileSource : [''],
      user_id:[this.currentUser.userDetails.id,''],
      workshop_id:[this.workshopData.id,'']
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  } 
  submit(){
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.invalid) {
      return;
    }else{
      var data = this.form.value;
      this.workshopService.user_apply_for_workshop(data).subscribe(
        data => { 
          console.log(data);
          this.route.navigate(['/thank-you-workshop']);
      });
      
    }
  }
  back(): void {
    this.location.back()
  } 
  // onFileChange(event: any) {
  //   this.images.push(event.target.files[0]);
  //   this.form.value.append = event.target.files[0];
  //     this.form.patchValue({
  //       fileSource: event.target.files[0]
  //     });
  // }

  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files && event.target.files[0];
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        
        reader.onload = (event: any) => {
          this.url = (<FileReader>event.target).result;
          this.images.push(event.target.result);
          this.form.patchValue({
            fileSource: this.images
          });
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  onFileChange2(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files && event.target.files[0];
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        
        reader.onload = (event: any) => {
          this.url = (<FileReader>event.target).result;
          this.images.push(event.target.result);
          this.form.patchValue({
            aadharfileSource: this.images
          });
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

}
