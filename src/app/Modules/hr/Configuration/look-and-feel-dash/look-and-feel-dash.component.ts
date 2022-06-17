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
  loader: any;
  term: any;
  holidaylist: any;
  currentUrl: any;
  file: any;

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.loader = true;
    this.GetHolidays();
  }

  public GetHolidays() {
    debugger
    this.DigipayrollServiceService.GetCompanyConfiguration()
      .subscribe({
        next: data => {
          debugger
          this.holidaylist = data;
          this.loader = false;
        }, error: (err) => {
          Swal.fire('Issue in Getting Company Configuration');
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
        this.DigipayrollServiceService.DeleteCompanyConfiguration(ID)
          .subscribe({
            next: data => {
              debugger
              Swal.fire('Deleted Successfully')
              this.ngOnInit();
            }, error: (err) => {
              Swal.fire('Issue in Deleting Company Configuration');
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

  Default(id: any) {
    debugger
    Swal.fire('Default Configuration set Successfully')
  }

  public getmedicalUrl(file: any) {
    debugger
    this.file = file;
  }

}