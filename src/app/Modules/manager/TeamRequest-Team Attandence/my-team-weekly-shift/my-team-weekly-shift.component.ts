import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-my-team-weekly-shift',
  templateUrl: './my-team-weekly-shift.component.html',
  styleUrls: ['./my-team-weekly-shift.component.css']
})
export class MyTeamWeeklyShiftComponent implements OnInit {

  constructor(public DigiofficeService: DigipayrollserviceService) { }
  date: any;
  edate:any;
  roleid: any;
  todaydate: any;
  staffid:any;
  firstdayofcurrentweek: any;
  lastdayofcurrentweek: any;
  ngOnInit(): void {
    this.roleid = sessionStorage.getItem('roledid');
    this.staffid= sessionStorage.getItem('staffid');
    this.GetAnnouncements();
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    var curr = new Date;
    this.todaydate = formatDate(myDate, format, locale);
    var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6

    this.firstdayofcurrentweek = new Date(curr.setDate(first)).toUTCString();
    this.lastdayofcurrentweek = new Date(curr.setDate(last)).toUTCString();


    this.firstdayofcurrentweek = formatDate(this.firstdayofcurrentweek, format, locale);
    this.lastdayofcurrentweek = formatDate(this.lastdayofcurrentweek, format, locale);
  }
  term: any;
  workplaceList: any;
  public filterdate() {
    debugger
    this.DigiofficeService.GetStaffShiftDetails().subscribe(data => {
      debugger
     // this.workplaceList = data.filter(x => (x.filterdate >= this.firstdayofcurrentweek && x.filterdate <= this.lastdayofcurrentweek));
     if(this.roleid==2){
      this.workplaceList = data.filter(x=>x.supervisor==this.staffid && (x.filterdate >= this.date && x.filterdate <= this.edate));
     }
     else{
      this.workplaceList = data.filter(x=> (x.filterdate >= this.date && x.filterdate <= this.edate))
     }
     
    })


  }

  public GetAnnouncements(){
    this.DigiofficeService.GetStaffShiftDetails().subscribe(data => {
      debugger
     // this.workplaceList = data.filter(x => (x.filterdate >= this.firstdayofcurrentweek && x.filterdate <= this.lastdayofcurrentweek));
     if(this.roleid==2){
      this.workplaceList = data.filter(x=>x.supervisor==this.staffid );
     }
     else{
      this.workplaceList = data
     }
     
    })
  }

}