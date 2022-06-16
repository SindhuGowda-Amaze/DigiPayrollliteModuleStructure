import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-role-type-form',
  templateUrl: './role-type-form.component.html',
  styleUrls: ['./role-type-form.component.css']
})
export class RoleTypeFormComponent implements OnInit {

  constructor(public DigipayrollserviceService: DigipayrollserviceService, private activatedroute: ActivatedRoute) { }
   ID: any;
   shiftmasterlist: any;
   Short: any;
   Description: any;
   roleList: any
   Grace: any
   loader: any;
 
 
   ngOnInit(): void {
     // this.Grace="";
     // this.Short="";
     this.GetRoleType();
     this.activatedroute.params.subscribe(params => {
       debugger;
       this.ID = params['id'];
       if (this.ID == undefined) {
 
       }
       else {
 
         this.DigipayrollserviceService.GetRoleType().subscribe(
           data => {
             debugger
 
             this.roleList = data.filter(x=>x.id==this.ID);
             this.Short = this.roleList[0].short;
             this.Description = this.roleList[0].description;
           
           },
         );
       }
     }
     )
   }
 public GetRoleType(){
   this.DigipayrollserviceService.GetRoleType().subscribe(
     data => {
       debugger
       this.roleList = data;
       this.loader = false
     });
 }
 
   
   public InsertRoleType() {
     debugger;
     this.loader = true
     if (this.Description == undefined ||this.Description == null || this.Description == "" ||
       this.Short == undefined || this.Short == null || this.Short == ""  ) {
         this.loader = false
       Swal.fire('Please Fill All Fields');
     }
 else{
     var entity = {
 
       Short: this.Short,
       Description: this.Description,
 
 
     }
     this.DigipayrollserviceService.InsertRoleType(entity).subscribe(data => {
       if (data != 0) {
         Swal.fire("Saved Successfully");
         location.href = "#/admin/PositionDash";
        
 
       }
      
     })
     this.loader = false
   }
   }
 
 
   public Cancel() {
     debugger
     location.href = "#/admin/PositionDash";
   }
 
   public UpdateRoleType() {
     debugger;
 
     this.loader = true
     var entity = {
 
       ID: this.ID,
       Short: this.Short,
       Description: this.Description,
      
 
     }
     this.DigipayrollserviceService.UpdateRoleType(entity).subscribe(data => {
 
       Swal.fire("Updated Successfully");
       location.href = "#/admin/PositionDash";
 
 
 
       this.loader = false
     })
 
   }
 
 }
 