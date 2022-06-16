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
  ngOnInit(): void {
    this.loader=true;
    this.GetPayrollCutOffDate();
  }
  loader:any;
  term: any;
  cutofflist: any
  public GetPayrollCutOffDate() {
    debugger
    this.DigipayrollServiceService.GetPayrollCutOffDate().subscribe((data: any) => {
      debugger
      this.cutofflist = data
      this.loader=false;
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
        this.DigipayrollServiceService.DeletePayrollCutOffDate(ID).subscribe((data: any) => {
          debugger
          Swal.fire('Deleted Successfully')
          this.ngOnInit();
        })
      }
    })

  }


}