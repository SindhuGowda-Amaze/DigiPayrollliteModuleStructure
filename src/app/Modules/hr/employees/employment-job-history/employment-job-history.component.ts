import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-employment-job-history',
  templateUrl: './employment-job-history.component.html',
  styleUrls: ['./employment-job-history.component.css']
})

export class EmploymentJobHistoryComponent implements OnInit {

  constructor(public DigiofficeService: DigipayrollserviceService, public router: Router) { }
  stafflist: any;
  term: any;
  p: any = 1;
  count1: any = 10;
  roledid: any;
  stafflistCopy: any;
  loader: any;
  currentUrl: any;
  stafflist1: any;

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.loader = true
    debugger
    this.roledid = sessionStorage.getItem('roledid');
    this.DigiofficeService.GetMyDetails()
      .subscribe({
        next: data => {
          debugger
          this.stafflist = data;
          this.stafflistCopy = this.stafflist;
          this.loader = false;
        }, error: (err) => {
          Swal.fire('Issue in Getting My Details');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })
  }

  public Filterstaff() {
    debugger
    let searchCopy = this.term.toLowerCase();
    this.stafflist = this.stafflistCopy.filter((x: { name: string }) =>
      x.name.toLowerCase().includes(searchCopy));
  }

  public GetStaffDetails(list: any) {
    debugger
    this.DigiofficeService.GetEmploymentDetails()
      .subscribe({
        next: data => {
          debugger
          this.stafflist1 = data.filter(x => x.staffId == list.id);
          this.loader = false;
        }, error: (err) => {
          Swal.fire('Issue in Getting Staff Details');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })
  }

  Addjobhistory() {
  }

}