import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DigipayrollserviceService } from '../Services/digipayrollservice.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(public DigiofficeService: DigipayrollserviceService, public router: Router) { }
  companycode: any;
  username: any;
  roledid: any;
  password: any;
  showpassword: any;
  UserName: any;
  Email: any;
  ngOnInit(): void {
    this.showpassword = 0;
  }
  public getroleid(event: any) {
    this.roledid = event.target.value;
    this.UserName = sessionStorage.getItem('UserName')

  }
  companyid: any;
  public getCompanyDetails(event: any) {
    debugger
    this.companyid = event.target.value;

    this.DigiofficeService.GetCompanyID(this.companyid).subscribe((data: any) => {
      debugger
      let temp: any = data;
      if (temp.length == 0) {
        Swal.fire('Invalid Compnay')
      }
      else {
        sessionStorage.setItem('digiofficeapiurl', temp.officeapiurl);
        sessionStorage.setItem('payrollapiurl', temp.payrollapiurl);
        sessionStorage.setItem('Companylogo', temp.companylogo);
        sessionStorage.setItem('companyid', this.companyid)
      }
    });

  }
  Showhidepassword() {
    debugger
    if (this.showpassword == 0) {
      this.showpassword = 1;
    }
    else {
      this.showpassword = 0;
    }
  }

  public getcompanycode() {
    debugger
    sessionStorage.setItem('companycode', this.companycode);
    if (this.companycode == 1001) {
      sessionStorage.setItem('apiurl', 'http://103.133.214.197/digiOfficeV4API');

    }
    else if (this.companycode == 1002) {
      sessionStorage.setItem('apiurl', 'http://103.133.214.197/Dynamic_NCNDAAPI');
    }
  }

  public login() {
    debugger

    if (this.roledid == 6) {
   

         
          
          this.DigiofficeService.GetMyDetails().subscribe((data: any) => {
            debugger
            let temp: any = data.filter((x: { official_Email: any; password: any; loginTypeID: any }) => x.official_Email.toUpperCase() === this.username.toUpperCase() && x.password == this.password && x.loginTypeID == 6);
            if (temp.length == 0) {
              Swal.fire('Incorrect Username Or Password')
            }
            else {
              sessionStorage.setItem('roledid', this.roledid);
              sessionStorage.setItem('staffid', temp[0].id);
              sessionStorage.setItem('UserName', temp[0].name);
              sessionStorage.setItem('email', temp[0].emailID);
              sessionStorage.setItem('temp', '1')
              localStorage.setItem('Pagename', 'Employee Dashboard')
              this.router.navigate(['/manager/ManagerDashboard']).then(() => {
                location.reload();
              });

            }
          });


          
      
    
    }

    else if (this.roledid == 2) {
      this.DigiofficeService.GetMyDetails().subscribe((data: any) => {
        debugger
        let temp: any = data.filter((x: { official_Email: any; password: any; loginTypeID: any }) => x.official_Email.toUpperCase() === this.username.toUpperCase() && x.password == this.password && x.loginTypeID == 2);
        if (temp.length == 0) {
          Swal.fire('Incorrect Username Or Password')
        }
        else {
          sessionStorage.setItem('roledid', this.roledid);
          sessionStorage.setItem('staffid', temp[0].id);
          sessionStorage.setItem('temp', '1')
          sessionStorage.setItem('UserName', temp[0].name);
          sessionStorage.setItem('email', temp[0].official_Email);
          localStorage.setItem('Pagename', 'Manager Dashboard')
          this.router.navigate(['/manager/ManagerDashboard']).then(() => {
            location.reload();
          });
        }


      });


    }
    else if (this.roledid == 1) {

      this.DigiofficeService.GetMyDetails().subscribe((data: any) => {
        debugger
        let temp: any = data.filter((x: { official_Email: any; password: any; loginTypeID: any; }) => x.official_Email.toUpperCase() === this.username.toUpperCase() && x.password == this.password && x.loginTypeID == 1);
        if (temp.length == 0) {
          Swal.fire('Incorrect Username Or Password')
        }
        else {

          sessionStorage.setItem('roledid', this.roledid);
          sessionStorage.setItem('staffid', temp[0].id);
          sessionStorage.setItem('UserName', temp[0].name);
          sessionStorage.setItem('email', temp[0].official_Email);
          sessionStorage.setItem('temp', '1')
          localStorage.setItem('Pagename', 'Company Dashboard')
          this.router.navigate(['/CompanyDashboard']).then(() => {
            location.reload();
          });
        }
      });
    }

    else if (this.roledid == 9) {
      // var entity = {
      //   'username': 'Amaze',
      //   'Password': 'P@ssw0rd',
      //   'RoleID': 1

      // }
      // this.DigiofficeService.Authenicate(entity).subscribe((data: any) => {
      //   debugger
      //   if (data['requestMessage'] != undefined || null) {
      //     localStorage.setItem('token', data['requestMessage'].headers[0].value[0]);
      //     debugger
      this.DigiofficeService.GetMyDetails().subscribe((data: any) => {
        debugger
        let temp: any = data.filter((x: { official_Email: any; password: any; loginTypeID: any; }) => x.official_Email.toUpperCase() === this.username.toUpperCase() && x.password == this.password && x.loginTypeID == 9);
        if (temp.length == 0) {
          Swal.fire('Incorrect Username Or Password')
        }
        else {

          sessionStorage.setItem('roledid', this.roledid);
          sessionStorage.setItem('staffid', temp[0].id);
          sessionStorage.setItem('UserName', temp[0].name);
          sessionStorage.setItem('email', temp[0].official_Email);
          sessionStorage.setItem('temp', '1')
          localStorage.setItem('Pagename', 'Dashboard')
          this.router.navigate(['/ManagerDashboard']).then(() => {
            location.reload();
          });

        }
      });


      
    // }
  // })
}

    else if (this.roledid == 8) {

      this.DigiofficeService.GetMyDetails().subscribe((data: any) => {
        debugger
        let temp: any = data.filter((x: { official_Email: any; password: any; loginTypeID: any; }) => x.official_Email.toUpperCase() === this.username.toUpperCase() && x.password == this.password && x.loginTypeID == 8);
        if (temp.length == 0) {
          Swal.fire('Incorrect Username Or Password')
        }
        else {

          sessionStorage.setItem('roledid', this.roledid);
          sessionStorage.setItem('staffid', temp[0].id);
          sessionStorage.setItem('temp', '1')
          sessionStorage.setItem('UserName', temp[0].name);
          sessionStorage.setItem('email', temp[0].official_Email);
          localStorage.setItem('Pagename', 'Dashboard')
          this.router.navigate(['/ManagerDashboard']).then(() => {
            location.reload();
          });
        }
      });
    }
    else if (this.roledid == 17) {

      this.DigiofficeService.GetMyDetails().subscribe((data: any) => {
        debugger
        let temp: any = data.filter((x: { official_Email: any; password: any; loginTypeID: any; }) => x.official_Email.toUpperCase() === this.username.toUpperCase() && x.password == this.password && x.loginTypeID == 17);
        if (temp.length == 0) {
          Swal.fire('Incorrect Username Or Password')
        }
        else {

          sessionStorage.setItem('roledid', this.roledid);
          sessionStorage.setItem('staffid', temp[0].id);
          sessionStorage.setItem('temp', '1')
          sessionStorage.setItem('UserName', temp[0].name);
          sessionStorage.setItem('email', temp[0].official_Email);
          localStorage.setItem('Pagename', 'Dashboard')
          this.router.navigate(['/ManagerDashboard']).then(() => {
            location.reload();
          });
        }
      });
    }
  }



  password1: any;
  getpassword() {
    this.DigiofficeService.GetMyDetails().subscribe(data => {
      let temp: any = data.filter(x => (x.official_Email === this.Email));
      if (temp.length != 0) {
        this.password1 = temp[0].password;
      }

    })
  }
  public Attactments = [];
  public Save() {
    var entity1 = {
      'emailto': this.Email,
      'emailsubject': 'Forgot Password',
      'emailbody': 'Hi , <br> ' + this.password1 + ' is your Password for login into DigiOffice.<br> Thanks <br> Team Digi-Office',
      'attachmenturl': this.Attactments,
      'cclist': this.Email,
      'bcclist': this.Email,
    }
    this.DigiofficeService.sendemail1(entity1).subscribe(res => {
      debugger;
      this.Attactments = [];

      Swal.fire('Password sent to your email.')
    })

  }
}

