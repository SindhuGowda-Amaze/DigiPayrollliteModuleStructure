import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  shiftdetails: any;
  data: any;
  loader:any;





  constructor(public DigiofficeService: DigipayrollserviceService) { }
  roleid: any
  staffID: any;
  ngOnInit(): void {
    this.loader=true;
    this.roleid = sessionStorage.getItem('roledid');
    this.staffID = sessionStorage.getItem('staffid');
    this.GetAttendance();
  }
  startingTime1: any;
  endTime1: any;
  attendancelist: any;
  public GetAttendance() {
    debugger
    this.DigiofficeService.GetAttendance().subscribe(data => {
      debugger
  
        this.attendancelist = data.filter(x => x.userID == this.staffID)
        this.loader=false;
    
      
        

    })
    this.DigiofficeService.GetAttendanceConfiguration().subscribe(data => {
      debugger
      let temp: any = data;
      if (temp.length != 0) {
        this.startingTime1 = temp[0].startingTime;
        this.endTime1 = temp[0].endTime;
      } else {
        this.startingTime1 = '10:00';
        this.endTime1 = '19:00';
      }

    })
  
  }

  startdate: any;
  enddate: any
  public getenddate(event: any) {
    debugger
    if (this.roleid == 1) {
      this.DigiofficeService.GetAttendance().subscribe(data => {
        debugger
        this.attendancelist = data.filter(x => x.userID == this.staffID && (x.filterdate >= this.startdate && x.filterdate <= this.enddate))
      })
    }
    else {
      this.DigiofficeService.GetAttendance().subscribe(data => {
        debugger
        this.attendancelist = data.filter(x => x.userID == this.staffID && (x.filterdate >= this.startdate && x.filterdate <= this.enddate))
      })
    }

  }





}

