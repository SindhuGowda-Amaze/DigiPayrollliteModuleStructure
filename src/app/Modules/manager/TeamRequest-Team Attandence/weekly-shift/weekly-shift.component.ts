import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-weekly-shift',
  templateUrl: './weekly-shift.component.html',
  styleUrls: ['./weekly-shift.component.css']
})
export class WeeklyShiftComponent implements OnInit {
  constructor(public DigiofficeService: DigipayrollserviceService) { }
  roleid: any;
  firstdayofcurrentweek: any;
  lastdayofcurrentweek: any;
  todaydate: any;
  ngOnInit(): void {
    this.GetAnnouncements();
    this.roleid = sessionStorage.getItem('roledid');
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
  public GetAnnouncements() {
    debugger
    this.DigiofficeService.GetStaffShiftDetails().subscribe(data => {
      debugger
      this.workplaceList = data.filter(x => x.staffID == sessionStorage.getItem('staffid') )
    })

  }
  sdate: any;
  edate: any

  public Getdate() {
    debugger
    this.DigiofficeService.GetStaffShiftDetails().subscribe(data => {
      debugger
      this.workplaceList = data.filter(x => (x.filterdate >= this.sdate && x.filterdate <= this.edate))
    })

  }
}
