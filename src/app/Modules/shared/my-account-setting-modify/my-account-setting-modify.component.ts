import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-account-setting-modify',
  templateUrl: './my-account-setting-modify.component.html',
  styleUrls: ['./my-account-setting-modify.component.css']
})
export class MyAccountSettingModifyComponent implements OnInit {

  constructor(public DigiofficeService: DigipayrollserviceService, public router: Router) { }
  confirmpassword: any;
  newpassword: any;
  Currentpassword: any;
  loader: any;
  passvaild: any;

  ngOnInit(): void {
    this.passvaild = true;
    this.loader = true;
    this.GetMyDetailsByStaffID();
  }

  public GetMyDetailsByStaffID() {
    this.DigiofficeService.GetMyDetailsByStaffID(localStorage.getItem('staffid')).subscribe(data => {
      debugger
      let temp: any = data;
      this.Currentpassword = temp[0].password;
      this.loader=false;
    });
  }

  public checkpassword(event: any) {
    debugger
    this.confirmpassword = event.target.value;
    if (this.newpassword === this.confirmpassword) {
      this.passvaild = true;
    } else {
      this.passvaild = false;
    }
  }

  public Updatepassword() {
    debugger
    if (this.newpassword == undefined || this.newpassword == null || this.newpassword == '' || this.confirmpassword == undefined || this.confirmpassword == null || this.confirmpassword == '') {
      Swal.fire("Please fill Mandatory Fields");
      this.loader=false;
    } else {
      var entity = {
        ID: localStorage.getItem('staffid'),
        Password: this.confirmpassword,
      }
      this.DigiofficeService.UpdatePassword(entity).subscribe(data => {
        Swal.fire("Updated Successfully");
        this.newpassword = '';
        this.confirmpassword = ''
        this.ngOnInit();
        this.loader=false;
      })
    }



  }

  public Cancel() {
    debugger
    location.href = "#/shared/MyAccountSetting";
    this.loader=false;
  }

}