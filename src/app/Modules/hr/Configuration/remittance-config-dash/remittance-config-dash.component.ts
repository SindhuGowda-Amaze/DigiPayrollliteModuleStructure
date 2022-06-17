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
  ngOnInit(): void {
    // this.loader=true;
    this.GetRemittanceCutOffDate();
  }
  loader:any;
  term: any;
  cutofflist: any
  public GetRemittanceCutOffDate() {
    debugger
    this.DigipayrollServiceService.GetRemittanceCutOffDate().subscribe((data: any) => {
      debugger
      this.cutofflist = data
      this.loader=false;
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
        this.DigipayrollServiceService.DeleteRemittanceCutOffDate(ID).subscribe((data: any) => {
          debugger
          Swal.fire('Deleted Successfully')
          this.ngOnInit();
        })
      }
    })

  }
}