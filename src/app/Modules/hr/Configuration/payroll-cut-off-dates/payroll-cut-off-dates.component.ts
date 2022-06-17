import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-payroll-cut-off-dates',
  templateUrl: './payroll-cut-off-dates.component.html',
  styleUrls: ['./payroll-cut-off-dates.component.css']
})

export class PayrollCutOffDatesComponent implements OnInit {

  constructor(public DigipayrollServiceService: DigipayrollserviceService) { }
  loader:any;
  term: any;
  cutofflist: any;
  currentUrl:any;

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.loader=true;
    this.GetPayrollCutOffDate();
  }
 
  public GetPayrollCutOffDate() {
    debugger
    this.DigipayrollServiceService.GetPayrollCutOffDate()
    .subscribe({
      next: data => {
        debugger
        this.cutofflist = data;
        this.loader=false;
      }, error: (err) => {
        Swal.fire('Issue in Getting Payroll Cutoff Date');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    })
  }

  public DeletePayrollCutOffDate(ID: any) {
    debugger
    Swal.fire({
      title: 'Are you sure?',
      text: 'You Want to delete it.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.DigipayrollServiceService.DeletePayrollCutOffDate(ID)
        .subscribe({
          next: data => {
            debugger
            Swal.fire('Deleted Successfully')
            this.ngOnInit();
          }, error: (err) => {
            Swal.fire('Issue in Deleting Payroll Cutoff Date');
            // Insert error in Db Here//
            var obj = {
              'PageName': this.currentUrl,
              'ErrorMessage': err.error.message
            }
            this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
              data => {
                debugger
              },
            )
          }
        })
      }
    })
  }

}