import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-leave-config-dash',
  templateUrl: './leave-config-dash.component.html',
  styleUrls: ['./leave-config-dash.component.css']
})
export class LeaveConfigDashComponent implements OnInit {

  constructor(public DigipayrollServiceService: DigipayrollserviceService) { }
  ngOnInit(): void {
    this.loader=true;
    this.GetHolidays();
  }
  loader:any;
  term: any;
  holidaylist: any
  public GetHolidays() {
    debugger
    this.DigipayrollServiceService.GetLeaveConfiguration().subscribe((data: any) => {
      debugger
      this.holidaylist = data
      this.loader=false;
    })
  }

  public DeleteHolidays(ID: any) {
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
        this.DigipayrollServiceService.DeleteLeaveConfiguration(ID).subscribe((data: any) => {
          debugger
          Swal.fire('Deleted Successfully')
          this.ngOnInit();
        })
      }
    })

  }
  file: any;
  public getmedicalUrl(file: any) {
    debugger
    this.file = file;
  }

}