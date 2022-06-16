import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';

@Component({
  selector: 'app-attendance-config-dash',
  templateUrl: './attendance-config-dash.component.html',
  styleUrls: ['./attendance-config-dash.component.css']
})
export class AttendanceConfigDashComponent implements OnInit {

  constructor(public DigipayrollServiceService: DigipayrollserviceService) { }

  ngOnInit(): void {
    this.loader=true;
    this.GetAttendanceConfiguration();
  }
  Search:any;
  loader:any;
  AttendConfiglist:any
  date:any;
  public GetAttendanceConfiguration() {
    debugger
    this.DigipayrollServiceService.GetAttendanceConfiguration().subscribe(data => {
      debugger
      this.AttendConfiglist = data
      this.loader=false;
    })
  }

 


  public DeleteAttendanceConfiguration(ID: any) {
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
        this.DigipayrollServiceService.DeleteAttendanceConfiguration(ID).subscribe(data => {
          debugger
         Swal.fire('Deleted Successfully...!')
         location.reload();
        })
      }
    })

  }

}