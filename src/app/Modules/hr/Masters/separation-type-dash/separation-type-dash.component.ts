import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-separation-type-dash',
  templateUrl: './separation-type-dash.component.html',
  styleUrls: ['./separation-type-dash.component.css']
})
export class SeparationTypeDashComponent implements OnInit {
  constructor(public DigiofficeService: DigipayrollserviceService) { }
  currentUrl:any
  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.GetSeparationType();
  }
 
  sepateTypelist: any
  public GetSeparationType() {
    debugger
    this.DigiofficeService.GetSeparationType()
    .subscribe({
      next: data => {
        debugger
        this.sepateTypelist = data
      }, error: (err) => {
        Swal.fire('Issue in Getting Separation Type');
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

  public delete(id: any) {
    debugger
    this.DigiofficeService.DeleteSeparationType(id).subscribe(data => {
      debugger
      Swal.fire('Deleted Successfully');
      this.ngOnInit();
    })

  }
}