import { Component, OnInit } from '@angular/core'
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tax-table',
  templateUrl: './tax-table.component.html',
  styleUrls: ['./tax-table.component.css']
})
export class TaxTableComponent implements OnInit {
  taxdetails:any;
  currentUrl: string | undefined;
  loader: any;
  constructor(private DigipayrollServiceService:DigipayrollserviceService,private ActivatedRoute:ActivatedRoute) { }
  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.GetTaxtableAnnual();
  }
  public GetTaxtableAnnual() {
    debugger
    this.DigipayrollServiceService.GetTaxtableAnnual()
    .subscribe({
      next: data => {
        debugger
        this.taxdetails = data;
        this.loader=false;
      }, error: (err) => {
        Swal.fire('Issue in Tax Table Type');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.DigipayrollServiceService.InsertExceptionLogs(obj)
        .subscribe({
          next: data => {
            debugger
            this.taxdetails = data;
            this.loader=false;
          }, error: (err) => {
            Swal.fire('Issue in InsertExceptionLogs Type');
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


