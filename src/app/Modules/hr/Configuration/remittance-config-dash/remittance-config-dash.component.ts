import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-remittance-config-dash',
  templateUrl: './remittance-config-dash.component.html',
  styleUrls: ['./remittance-config-dash.component.css']
})

export class RemittanceConfigDashComponent implements OnInit {

  constructor(public DigipayrollServiceService: DigipayrollserviceService) { }
  loader: any;
  term: any;
  cutofflist: any;
  currentUrl: any;

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.loader = true;
    this.GetRemittanceCutOffDate();
  }

  public GetRemittanceCutOffDate() {
    debugger
    this.DigipayrollServiceService.GetRemittanceCutOffDate()
      .subscribe({
        next: data => {
          debugger
          this.cutofflist = data;
          this.loader = false;
        }, error: (err) => {
          Swal.fire('Issue in Getting Remittance Cutoff Date');
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

  public DeleteRemittanceCutOffDate(ID: any) {
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
        this.DigipayrollServiceService.DeleteRemittanceCutOffDate(ID)
          .subscribe({
            next: data => {
              debugger
              Swal.fire('Deleted Successfully')
            this.ngOnInit();
            }, error: (err) => {
              Swal.fire('Issue in Deleting Remittance Cutoff Date');
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