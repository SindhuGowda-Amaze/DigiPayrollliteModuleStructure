import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-leave-type-form',
  templateUrl: './leave-type-form.component.html',
  styleUrls: ['./leave-type-form.component.css']
})
export class LeaveTypeFormComponent implements OnInit {
  constructor(public DigiofficeService: DigipayrollserviceService, private activatedroute: ActivatedRoute) { }
  ID: any;
  leavelist: any;
  Short: any;
  Description: any;
  currentUrl:any
  ngOnInit(): void {
    this.currentUrl = window.location.href;

    this.activatedroute.params.subscribe(params => {
      debugger;
      this.ID = params['id'];
      if (this.ID == undefined) {
        this.Short = "",
          this.Description = ""

      }
      else {

        this.DigiofficeService.GetLeaveType()
        .subscribe({
          next: data => {
            debugger
            this.leavelist = data.filter(x => x.id == this.ID);

            this.Short = this.leavelist[0].short
            this.Description = this.leavelist[0].description
            this.Entitlement_Per_Year = this.leavelist[0].entitlement_Per_Year
            this.carry_forward = this.leavelist[0].carry_forward
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
    }
    )
  }








  Entitlement_Per_Year: any;
  carry_forward: any;
  public InsertLeaveTypeMaster() {
    debugger;
    var entity = {
      Short: this.Short,
      Description: this.Description,
      Entitlement_Per_Year: 0,
      carry_forward: this.carry_forward

    }
    this.DigiofficeService.InsertLeaveTypeMaster(entity)

    .subscribe({
      next: data => {
        debugger
        if (data != 0) {
          Swal.fire("Saved Successfully");
          location.href = "#/LeaveTypeDashboard";
  
  
        }
      }, error: (err) => {
        Swal.fire('Issue in Inserting Leave Type Master');
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


  public UpdateLeaveType() {
    debugger;


    var entity = {

      ID: this.ID,
      Short: this.Short,
      Description: this.Description,
      Entitlement_Per_Year: this.Entitlement_Per_Year,
      carry_forward: this.carry_forward

    }
    this.DigiofficeService.UpdateLeaveType(entity).subscribe(data => {

      Swal.fire("Updated Successfully");
      location.href = "#/LeaveTypeDashboard";




    })

  }


}