import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-remittance-config-form',
  templateUrl: './remittance-config-form.component.html',
  styleUrls: ['./remittance-config-form.component.css']
})

export class RemittanceConfigFormComponent implements OnInit {

  constructor(private ActivatedRoute: ActivatedRoute, private DigipayrollServiceService: DigipayrollserviceService) { }
  AutoApproval: any;
  roleid: any
  staffID: any;
  ID: any;
  loader: any;
  ManualApply: any;
  result: any;
  CutOffDate: any;
  Comments: any;
  payrolltype: any;
  leavelist: any;
  currentUrl: any;

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.loader = true;
    this.roleid = sessionStorage.getItem('roledid');
    this.staffID = sessionStorage.getItem('staffid');
    this.ActivatedRouteCall();
  }

  public ActivatedRouteCall() {
    this.ActivatedRoute.params.subscribe(params => {
      debugger;
      this.ID = params['id'];
      if (this.ID == undefined) {
        this.payrolltype = "",
          this.CutOffDate = ""
        this.Comments = ""
      }
      else {
        this.DigipayrollServiceService.GetRemittanceCutOffDate()
          .subscribe({
            next: data => {
              debugger
              this.leavelist = data.filter(x => x.id == this.ID);
              this.payrolltype = this.leavelist[0].payperiod
              this.CutOffDate = this.leavelist[0].filterdate
              this.Comments = this.leavelist[0].comments
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
    })
  }

  public InsertRemittanceCutOffDate() {
    debugger;
    var entity = {
      Payperiod: this.payrolltype,
      CutOffDate: this.CutOffDate,
      Comments: this.Comments
    }
    this.DigipayrollServiceService.InsertRemittanceCutOffDate(entity)
      .subscribe({
        next: data => {
          debugger
          Swal.fire("Saved Successfully");
          location.reload();
          this.loader = false;
        }, error: (err) => {
          Swal.fire('Issue in Inserting Remittance Cutoff Date');
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

  public UpdateRemittanceCutOffDate() {
    debugger;
    var entity = {
      ID: this.ID,
      Payperiod: this.payrolltype,
      CutOffDate: this.CutOffDate,
      Comments: this.Comments
    }
    this.DigipayrollServiceService.UpdateRemittanceCutOffDate(entity)
      .subscribe({
        next: data => {
          debugger
          Swal.fire("Updated Successfully");
          location.reload();
          this.loader = false;
        }, error: (err) => {
          Swal.fire('Issue in Updating Remittance Cutoff Date');
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

  reload() {
    location.reload();
  }

}