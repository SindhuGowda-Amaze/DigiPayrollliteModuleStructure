import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-look-and-feel-dash',
  templateUrl: './look-and-feel-dash.component.html',
  styleUrls: ['./look-and-feel-dash.component.css']
})
export class LookAndFeelDashComponent implements OnInit {

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
    this.DigipayrollServiceService.GetCompanyConfiguration().subscribe((data: any) => {
      debugger
      this.holidaylist = data
      this.loader=false;
    })
  }

  // public DeleteHolidays(ID: any) {
  //   debugger
  //   this.DigipayrollServiceService.DeleteCompanyConfiguration(ID).subscribe((data: any) => {
  //     debugger
  //     Swal.fire('Deleted Successfully')
  //     this.ngOnInit();
  //   })
  // }

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
        this.DigipayrollServiceService.DeleteCompanyConfiguration(ID).subscribe((data: any) => {
          debugger
          Swal.fire('Deleted Successfully')
          this.ngOnInit();
        })
      }
    })
  }

  Default(id: any) {
    debugger
    Swal.fire('Default Configuration set Successfully')
  }





  file: any;
  public getmedicalUrl(file: any) {
    debugger
    this.file = file;
  }

}