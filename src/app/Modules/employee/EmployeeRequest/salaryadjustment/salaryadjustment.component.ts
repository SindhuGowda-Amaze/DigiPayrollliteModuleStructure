import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-salaryadjustment',
  templateUrl: './salaryadjustment.component.html',
  styleUrls: ['./salaryadjustment.component.css']
})
export class SalaryadjustmentComponent implements OnInit {
  currentUrl: any;
  roleid: any;
  staffID: any;
  viewMode = 'tab1';
  p: any = 1;
  count1: any = 10;
  projectlist: any;
  search: any
  projectlist1:any;
  date: any;
  medicalUrl: any
  count:any;
  projectlist23:any;
  projectlist14:any;
  constructor(public DigiofficeService: DigipayrollserviceService) { }
 
  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.roleid = sessionStorage.getItem('roledid');
    this.GetSalaryAdjustmentType();
    this.staffID = sessionStorage.getItem('staffid');
  }

  public GetSalaryAdjustmentType() {

    debugger
    this.DigiofficeService.GetSalaryAdjustmentType()

    .subscribe({
      next: data => {
        debugger
        this.projectlist = data.filter(x => x.staffID ==this.staffID && ( x.status=='Manager Approved Hr Approved' || x.status=='Manager Approved HR Approved')  )
     
        this.projectlist1 = data.filter(x => x.staffID ==this.staffID && x.status=='Manager Pending Hr Pending' )
      }, error: (err) => {
        Swal.fire('Issue in Getting City Type');
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

  public getdate(event: any) {
    debugger
    this.date = event.target.value;

    this.DigiofficeService.GetExpensesListweb()

    .subscribe({
      next: data => {
        debugger
        this.projectlist1 = data.filter(x => x.userID == this.staffID && x.filterdate == this.date && x.approvalStatus=='Manager Pending')
      }, error: (err) => {
        Swal.fire('Issue in Getting City Type');
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

  public getmedicalUrl(medicalUrl: any) {
    debugger
    this.medicalUrl = medicalUrl
  }

  public CancelLeave(list: any) {
    debugger
    Swal.fire({
      title: 'Are you sure?',
      text: 'You Want to cancel it.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Cancel it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.DigiofficeService.CancelExpenseRequest(list.id).subscribe((data: any) => {
          debugger
          Swal.fire('Cancelled Successfully')
          this.ngOnInit();
        })
      }
    })



  }


  public Approve(){
    this.DigiofficeService.GetSalaryAdjustmentType()

    .subscribe({
      next: data => {
        debugger
        this.projectlist23 = data.filter(x => x.userID == this.staffID && x.approvalStatus!='Manager Pending' )
     this.count=this.projectlist23.length
      }, error: (err) => {
        Swal.fire('Issue in Getting City Type');
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

  public Pending(){
    this.DigiofficeService.GetSalaryAdjustmentType()

    .subscribe({
      next: data => {
        debugger
        this.projectlist14 = data.filter(x => x.userID == this.staffID && x.approvalStatus=='Manager Pending' )
        this.count=this.projectlist14.length
      }, error: (err) => {
        Swal.fire('Issue in Getting City Type');
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

