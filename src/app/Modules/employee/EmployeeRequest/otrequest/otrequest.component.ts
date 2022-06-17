import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-otrequest',
  templateUrl: './otrequest.component.html',
  styleUrls: ['./otrequest.component.css']
})
export class OTrequestComponent implements OnInit {
  
  currentUrl: any;
  roleid: any;
  locatorlist: any;
  term: any;
  staffid:any;
  loader:any;
  attendancelist: any;
  viewMode = 'tab1';
  date: any;
  edate: any;
  timedetails:any;
  count:any;
  constructor(public DigiofficeService: DigipayrollserviceService, public router: Router) { }

  ngOnInit(): void {
    
   this.currentUrl = window.location.href;
    this.loader=true;
    this.GetMyOverTimeDetails();
    this.roleid = sessionStorage.getItem('roledid');
    this.staffid = sessionStorage.getItem('staffid');
    this.DigiofficeService.GetAttendance().subscribe(data => {
      debugger
      this.attendancelist = data.filter(x => x.userID == sessionStorage.getItem('staffid') && x.ot > 0)
    })

    // this.DigiofficeService.GetStaffOverTimeDetails().subscribe(data => {
    //   debugger
    //   this.locatorlist = data.filter(x => x.staffID == sessionStorage.getItem('staffid'));
    // })
  }

  public getdate() {
    debugger
    this.DigiofficeService.GetStaffOverTimeDetails()

    .subscribe({
      next: data => {
        debugger
        this.attendancelist = data.filter(x => x.staffID == sessionStorage.getItem('staffid') && (x.filterdate >= this.date && x.filterdate1 <= this.edate));
      }, error: (err) => {
        Swal.fire('Issue in Getting StaffOverTimeDetails');
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


public getdate1(){
  this.DigiofficeService.GetStaffOverTimeDetails()
  .subscribe({
    next: data => {
      debugger
      this.timedetails=data.filter(x=>x.staffID==this.staffid && (x.filterdate >= this.date && x.filterdate <= this.edate) );
      this.count=this.timedetails.length
    }, error: (err) => {
      Swal.fire('Issue in Getting StaffOverTimeDetailse');
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
 
  public CancelLeave(list: any) {
    debugger
    this.DigiofficeService.DeleteStaffOverTimeDetails(list.id)

    .subscribe({
      next: data => {
        debugger
        Swal.fire('Cancelled Successfully');
      this.ngOnInit();
      }, error: (err) => {
        Swal.fire('Issue in Getting StaffOverTimeDetails');
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

  public GetMyOverTimeDetails()
  {
    debugger
   this.DigiofficeService.GetStaffOverTimeDetails()


    .subscribe({
      next: data => {
        debugger
        this.timedetails=data.filter(x=>x.staffID==this.staffid);
        this.count=this.timedetails.length
        this.loader=false;
      }, error: (err) => {
        Swal.fire('Issue in Getting StaffOverTimeDetails');
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

}


