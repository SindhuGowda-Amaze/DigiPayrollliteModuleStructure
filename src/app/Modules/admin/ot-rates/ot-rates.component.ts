import { Component, OnInit } from '@angular/core'
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service'
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-ot-rates',
  templateUrl: './ot-rates.component.html',
  styleUrls: ['./ot-rates.component.css']
})
export class OtRatesComponent implements OnInit {
  Otlist:any;
  ID:any;
  currentUrl: any;
  loader: any;
  constructor(private DigipayrollServiceService: DigipayrollserviceService, private ActivatedRoute:ActivatedRoute) { }
  ngOnInit(): void {
    debugger
    this.currentUrl = window.location.href
    this.GetOTRates();
  }
  public GetOTRates(
  ) {
    debugger
    this.DigipayrollServiceService.GetOTRates()
   
    .subscribe({
      next: data => {
        debugger
        this.Otlist=data ;
        this.loader=false;
      }, error: (err) => {
        Swal.fire('Issue in Getting City Type');
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

delete(id:any) {
  Swal.fire({
    title: 'Are You Sure ',
    text: "Do you want to delete the Selected Record",
    icon: 'warning',
    // icon: 'success',
    showCloseButton: true,
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'OK'
  }).then((result) => {

    if (result.isConfirmed) {
      debugger
      this.DigipayrollServiceService.DeleteOTRates(id) 
      .subscribe({
        next: data => {
          debugger
          location.reload() 
        }, error: (err) => {
          Swal.fire('Issue in deleted otrates');
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
      Swal.fire('Deleted Successfully...!')   
      this.GetOTRates();
    }
  });
}

  GetId(id: any) {
    this.ID = id
  }

  update() {
    debugger
    if (this.ID== null || this.ID==undefined) {
      Swal.fire('Please Select the Record to Modify');
    }
    else {
      location.href="#/OtRatesForm/"+ this.ID;
    }
  }

}
