import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import Swal from 'sweetalert2';
import { DigipayrollserviceService } from '../../Services/digipayrollservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  
  company_name: any;
  temp: any
  roleid: any;
  role: any;
  UserName: any;
  officelogo: any;
  page: any;
  time: any;
  hh: any;
  mm: any;
  ampm: any;
  staffID: any;
  initail: any;
  Companylogo: any;
  CompanyConfiguration: any;
  constructor(public DigipayrollServiceService: DigipayrollserviceService,public router: Router) {

  }

  ngOnInit(): void {
    this.page = "Dashboard";
    this.staffID = sessionStorage.getItem('staffid');
    this.initail = 'A';
    this.Companylogo = sessionStorage.getItem('Companylogo');
    setInterval(() => {
      var time = new Date();
      this.time = time.toLocaleString('en-US', { hour: '2-digit', minute: 'numeric', hour12: true });
      let temp: any = this.time.split(':');
      this.hh = temp[0];
      let temp1: any = this.time.split(':')[1].split(" ");
      this.mm = temp1[0];
      this.ampm = temp1[1];
    }, 1000);

    interval(1000).subscribe((x => {

      this.page = localStorage.getItem('clickname')
    }));


    this.DigipayrollServiceService.GetCompanyConfiguration().subscribe((data: any) => {

      this.CompanyConfiguration = data;
      let header = document.getElementById('dynamiccss') as HTMLElement;
      header.style.backgroundColor = this.CompanyConfiguration[0].headerColor;
      this.officelogo = this.CompanyConfiguration[0].companyLogo;
      let button = document.getElementsByTagName('button') as unknown as HTMLElement;
      button.style.backgroundColor = this.CompanyConfiguration[0].buttonColor;

    })
    this.temp = sessionStorage.getItem('temp')
    this.roleid = sessionStorage.getItem('roledid');
    this.company_name = sessionStorage.getItem("company_name");
    this.UserName = sessionStorage.getItem('UserName');
    this.role = sessionStorage.getItem('role')
    this.GetNotification();
  }
  notificationslist: any;
  public GetNotification() {
    debugger

    this.DigipayrollServiceService.GetNotification(this.staffID).subscribe(data => {
      debugger
      this.notificationslist = data.filter(x => x.notificationTypeID == 16);
    })
  }

  public ClearNotification() {
    debugger
    this.DigipayrollServiceService.ClearNotificationByID(Number(this.staffID)).subscribe(data => {
      debugger

    })

    Swal.fire('Cleared Successfully');
    this.GetNotification();

  }


  logout() {
    sessionStorage.clear();
    location.href = "#/Login";
    location.reload();

  }

  public accountsetting() {
    debugger
    this.router.navigate(['/AccountSettingsModify']);
  }


}
