import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-state-master-dash',
  templateUrl: './state-master-dash.component.html',
  styleUrls: ['./state-master-dash.component.css'],
})
export class StateMasterDashComponent implements OnInit {
  term: any;
  leavelist: any;
  CountryID: any;
  p: any = 1;
  leavelistCopy: any;
  count1: any = 10;
  leavelist1: any;
  result: any;
  currentUrl: any;

  constructor(public DigipayrollserviceService: DigipayrollserviceService) {}
  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.CountryID = '';
    this.GetStateType();
    this.GetCountryType();
  }

  public GetStateType() {
    debugger;
    this.DigipayrollserviceService.GetStateType().subscribe((data) => {
      debugger;
      this.leavelist = data;
      this.leavelistCopy = this.leavelist;
    });
  }

  public GetCountryType() {
    debugger;
    this.DigipayrollserviceService.GetCountryType().subscribe((data) => {
      debugger;
      this.leavelist1 = data;
    });
  }

  public GetFilteredStatesByCountry() {
    debugger;
    this.DigipayrollserviceService.GetStateType().subscribe((data) => {
      debugger;
      this.leavelist = data.filter((x) => x.countryID == this.CountryID);
    });
  }

  public Filterstate() {
    debugger;
    let searchCopy = this.term.toLowerCase();
    this.leavelist = this.leavelistCopy.filter((x: { short: string }) =>
      x.short.toLowerCase().includes(searchCopy)
    );
  }

  // public DeleteStateType(ID:any) {
  //   debugger
  //   this.DigipayrollserviceService.DeleteStateType(ID).subscribe(data => {
  //     debugger
  //    Swal.fire('Deleted Successfully')
  //    location.reload();
  //   })
  // }

  // public DeleteStateType(ID: any) {
  //   this.DigipayrollserviceService.DeleteStateType(ID).subscribe(
  //     data => {
  //       location.reload()
  //     })
  //   Swal.fire('Deleted Successfully...!')
  //   location.reload();
  // }

  public DeleteStateType(ID: any) {
    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: 'You Want to delete it.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        this.DigipayrollserviceService.DeleteStateType(ID).subscribe(
          (data: any) => {
            debugger;
            Swal.fire('Deleted Successfully');
            this.ngOnInit();
          }
        );
      }
    });
  }
}
