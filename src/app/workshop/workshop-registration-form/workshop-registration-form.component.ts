import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap,Router } from '@angular/router';
import { Config } from '../../_config/config';
import {WorkshopService} from '../../_service/workshop.service';
import { Location } from '@angular/common';
import { AuthenticationService } from '../../_service/authentication.service';
import { DashboardService } from '../../_service/dashboard.service';
import { User } from '../../_models/user';
import { NotificationService } from 'src/app/_service/notification.service';
import { AbstractControl, FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
@Component({
  selector: 'app-workshop-registration-form',
  templateUrl: './workshop-registration-form.component.html',
  styleUrls: ['./workshop-registration-form.component.css']
})
export class WorkshopRegistrationFormComponent implements OnInit {
  pageName = "Workshop";
  id: any;
  type:any;
  bgImage: any;
  workshopData: any;
  eventData: any;
  currentUser: User;
  images: string[] = [];
  images2: string[] = [];
  userId: any;
  userData: any;
  url: any;
  form: FormGroup | any;
  loading: boolean = false;
  submitted = false;
  aadharfileChoosen : boolean = false;
  aadharfileName : any;
  panfileChoosen : boolean = false;
  panfileName : any;
  constructor(private location: Location,private workshopService: WorkshopService,
    private route:Router,
    private actRoute:ActivatedRoute,
    private authenticationService: AuthenticationService,
    private dashboardService: DashboardService,
    private formBuilder:FormBuilder,
    private notification:NotificationService) { 
      this.currentUser = this.authenticationService.currentUserValue;
      this.userId = this.currentUser.userDetails.id;
      console.log(this.currentUser);
    }

  ngOnInit(): void {

    this.actRoute.paramMap.subscribe((params: ParamMap) => {                 
      this.id = params.get('id');
      this.type = params.get('type');
      console.log(this.type);
    });

    this.dashboardService.userDetails({casting_id:''}).subscribe(
      data => { 
        this.userData = data;
        console.log(data);
    });

    if(this.type == 1){
      this.dashboardService.innerEvents({'id': this.id}).subscribe(
        data => { 
          this.eventData = data;
          this.workshopData = this.eventData.data;
          console.log(this.workshopData);
      });
    }

    if(this.type == 2){
      this.workshopService.get_each_workshop_data({'id': this.id}).subscribe(
        data => { 
          this.workshopData = data.data[0];
          console.log(this.workshopData);
      });
    }

    this.form = this.formBuilder.group({
      
      sos_phone : [null,Validators.required],
      edu_details: [null,Validators.required],
      address: [null,Validators.required],
      aadhar_file: ['',Validators.required],
      pan_file: ['',Validators.required],
      about_workshop: ['',Validators.required],
      fileSource : [''],
      aadharfileSource : [''],
      workshop_id:[this.id,''],
    });
    this.loading = true;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  } 
  submit(){
    
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }else{
      this.loading = false;
      var data = this.form.value;
      console.log(this.form.value);
      if(this.type == 2){
          this.workshopService.user_apply_for_workshop(data).subscribe(
            data => { 
              console.log(data);
              this.loading = true;
              this.notification.showSuccess('Thank You.','');
              this.route.navigate(['/thank-you-workshop/',this.workshopData.title]);
          });
      }
      if(this.type == 1){
        
        this.dashboardService.user_apply_for_events(data).subscribe(
          data => { 
            console.log(data);
            this.loading = true;
            this.notification.showSuccess('Thank You.','');
            this.route.navigate(['/thank-you-workshop',this.workshopData.title]);
        });
    }
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
      this.panfileChoosen = true;
      this.panfileName = event.target.files[0].name; 
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
      this.aadharfileChoosen = true;
      this.aadharfileName = event.target.files[0].name;      
      const file = event.target.files && event.target.files[0];
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        
        reader.onload = (event: any) => {
          this.url = (<FileReader>event.target).result;
          
          this.images2.push(event.target.result);
          this.form.patchValue({
            aadharfileSource: this.images2
          });
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

}
