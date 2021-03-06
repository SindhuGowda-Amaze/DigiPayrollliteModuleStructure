import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-leave-type-dashboard',
  templateUrl: './leave-type-dashboard.component.html',
  styleUrls: ['./leave-type-dashboard.component.css']
})

export class LeaveTypeDashboardComponent implements OnInit {

  constructor(public DigiofficeService: DigipayrollserviceService) { }
  currentUrl: any;
  loader: any;
  term: any;
  leavelist: any;
  ID: any;

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.currentUrl = window.location.href;
    this.loader = true;
    this.GetLeaveType();
  }

  public GetLeaveType() {
    debugger
    this.DigiofficeService.GetLeaveType()
      .subscribe({
        next: data => {
          debugger
          this.leavelist = data
          this.loader = false;
        }, error: (err) => {
          Swal.fire('Issue in Getting Leave Type');
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

  GetId(id: any) {
    this.ID = id
  }

  update() {
    debugger
    if (this.ID == null || this.ID == undefined) {
      Swal.fire('Please Select the Record to Modify');
    }
    else {
      location.href = "#/LeaveTypeForn/" + this.ID;
    }
  }

  public EnableDisableLeave(entity: any) {
    debugger
    var entity1 = {
      ID: entity.id,
      Status1: entity.active,
    }
    this.DigiofficeService.EnableDisableLeaveType(entity1)
      .subscribe({
        next: data => {
          debugger
          Swal.fire("Updated Successfully ");
          this.ngOnInit();
        }, error: (err) => {
          Swal.fire('Issue in Enable Disable Leave Type');
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

  delete(id: any) {
    Swal.fire({
      title: 'Are You Sure ',
      text: "Do you want to delete the Selected Record",
      icon: 'warning',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.isConfirmed) {
        debugger
        this.DigiofficeService.DeleteLeaveTypeMaster(id)
          .subscribe({
            next: data => {
              debugger
              location.reload()
            }, error: (err) => {
              Swal.fire('Issue in Deleting Leave Type Master');
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
        Swal.fire('Deleted Successfully...!')
        this.ngOnInit();
      }
    });
  }

}