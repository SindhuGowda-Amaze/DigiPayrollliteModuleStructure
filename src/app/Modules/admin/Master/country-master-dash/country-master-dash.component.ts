import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-country-master-dash',
  templateUrl: './country-master-dash.component.html',
  styleUrls: ['./country-master-dash.component.css'],
})
export class CountryMasterDashComponent implements OnInit {
  term: any;
  leavelist: any;
  p: any = 1;
  count1: any = 10;
  jobListCopy: any;
  currentUrl: any;

  constructor(public DigipayrollserviceService: DigipayrollserviceService) {}
  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.GetCountryType();
  }

  public GetCountryType() {
    debugger;
    this.DigipayrollserviceService.GetCountryType()
    
    .subscribe({
      next: data => {
        debugger
        this.leavelist = data;
        this.jobListCopy = this.leavelist;
      }, error: (err) => {
        Swal.fire('Issue in GetCountryType');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.DigipayrollserviceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )}
    })
    
    

  }

  // public DeleteCountryType(ID:any) {
  //   debugger
  //   this.DigipayrollserviceService.DeleteCountryType(ID).subscribe(data => {
  //     debugger
  //    Swal.fire('Deleted SuccessFully')
  //    location.reload();
  //   })
  // }

  public FilterCountry() {
    debugger;
    let searchCopy = this.term.toLowerCase();
    this.leavelist = this.jobListCopy.filter((x: { short: string }) =>
      x.short.toLowerCase().includes(searchCopy)
    );
  }

  public DeleteCountryType(ID: any) {
    Swal.fire({
      title: 'Are You Sure ',
      text: 'Do you want to delete the Selected Record',
      icon: 'warning',
      // icon: 'success',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed) {
        debugger;
        this.DigipayrollserviceService.DeleteCountryType(ID)
        .subscribe({
          next: data => {
            debugger
            Swal.fire('Deleted Successfully...!');
        location.reload();
          }, error: (err) => {
            Swal.fire('Issue in DeleteCountryType ');
            // Insert error in Db Here//
            var obj = {
              'PageName': this.currentUrl,
              'ErrorMessage': err.error.message
            }
            this.DigipayrollserviceService.InsertExceptionLogs(obj).subscribe(
              data => {
                debugger
              },
            )}
        })
        

       
      }
    });
  }
}
