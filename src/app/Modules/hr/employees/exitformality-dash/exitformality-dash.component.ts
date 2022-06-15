import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';

@Component({
  selector: 'app-exitformality-dash',
  templateUrl: './exitformality-dash.component.html',
  styleUrls: ['./exitformality-dash.component.css']
})
export class ExitformalityDashComponent implements OnInit {

  constructor(public DigiofficeService: DigipayrollserviceService, public router: Router) { }
  annnounecemnetlist: any;
  roledid: any;
  ngOnInit(): void {
    debugger
    this.roledid = localStorage.getItem('roledid');

    this.DigiofficeService.GetStaffExitFormality().subscribe(data => {
      debugger
      if (this.roledid == 6) {
        this.annnounecemnetlist = data.filter(x => x.staffID == localStorage.getItem('staffid'))
      } else {
        this.annnounecemnetlist = data;
      }

    })
  }


  public delete(ID: any) {
    debugger
    Swal.fire({
      title: 'Are you sure?',
      text: 'You Want to delete it.',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value == true) {
        this.DigiofficeService.DeleteStaffExitFormality(ID.id).subscribe(data => {
          debugger
          Swal.fire('Deleted Successfully')
          this.ngOnInit();
        })
      }
    })
  }

  public HRClear(list: any) {
    debugger
    var entity = {
      'ID': list.id,
      'type': 'HRclearance'
    }
    this.DigiofficeService.ClearStaffExitFormality(entity).subscribe(data => {
      debugger
      Swal.fire('Updated Successfully');
      this.ngOnInit();
    })
  }
  public OwnClear(list: any) {
    debugger
    var entity = {
      'ID': list.id,
      'type': 'OwnClear'
    }
    this.DigiofficeService.ClearStaffExitFormality(entity).subscribe(data => {
      debugger
      Swal.fire('Updated Successfully');
      this.ngOnInit();
    })
  }
  public AdminClear(list: any) {
    debugger
    var entity = {
      'ID': list.id,
      'type': 'Adminclearance'
    }
    this.DigiofficeService.ClearStaffExitFormality(entity).subscribe(data => {
      debugger
      Swal.fire('Updated Successfully');
      this.ngOnInit();
    })
  }
  public FinanceClear(list: any) {
    debugger
    var entity = {
      'ID': list.id,
      'type': 'Financeclearance'
    }
    this.DigiofficeService.ClearStaffExitFormality(entity).subscribe(data => {
      debugger
      Swal.fire('Updated Successfully');
      this.ngOnInit();
    })
  }

}