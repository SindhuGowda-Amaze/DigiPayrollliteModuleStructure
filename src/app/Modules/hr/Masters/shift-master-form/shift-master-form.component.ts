import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-shift-master-form',
  templateUrl: './shift-master-form.component.html',
  styleUrls: ['./shift-master-form.component.css']
})

export class ShiftMasterFormComponent implements OnInit {

  constructor(public DigiofficeService: DigipayrollserviceService, private activatedroute: ActivatedRoute) { }
  currentUrl: any;
  ID: any;
  shiftmasterlist: any;
  Short: any;
  Description: any;
  ShiftTimeings: any;
  Grace: any;

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.GetShiftMaster();
    this.ActivatedRouteCall();
  }

  public ActivatedRouteCall() {
    this.activatedroute.params.subscribe(params => {
      debugger;
      this.ID = params['id'];
      if (this.ID == undefined) {
      }
      else {
        this.DigiofficeService.GetShiftMaster()
          .subscribe({
            next: data => {
              debugger
              this.shiftmasterlist = data;
              this.Short = this.shiftmasterlist[0].short;
              this.Description = this.shiftmasterlist[0].description;
              this.ShiftTimeings = this.shiftmasterlist[0].shiftTimeings;
              this.Grace = this.shiftmasterlist[0].grace;
            }, error: (err) => {
              Swal.fire('Issue in Getting Shift Master');
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
    })
  }

  public GetShiftMaster() {
    this.DigiofficeService.GetShiftMaster().subscribe({
      next: data => {
        debugger
        this.shiftmasterlist = data;
      }, error: (err) => {
        Swal.fire('Issue in Getting Shift Master');
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

  public InsertShiftMaster() {
    debugger;
    if (this.Description == undefined || this.Short == undefined || this.ShiftTimeings == undefined ||
      this.Grace == undefined) {
      Swal.fire('Please Fill All Fields');
    }
    var entity = {
      Short: this.Short,
      Description: this.Description,
      ShiftTimeings: this.ShiftTimeings,
      Grace: this.Grace
    }
    this.DigiofficeService.InsertShiftMaster(entity)
      .subscribe({
        next: data => {
          debugger
          if (data != 0) {
            Swal.fire("Saved Successfully");
            location.href = "#/hr/ShiftMasterDash";
          }
        }, error: (err) => {
          Swal.fire('Issue in Inserting Shift Master  ');
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

  public Cancel() {
    debugger
    location.href = "#/hr/ShiftMasterDash";
  }

  public UpdateShiftMaster() {
    debugger;
    var entity = {
      ID: this.ID,
      Short: this.Short,
      Description: this.Description,
      ShiftTimeings: this.ShiftTimeings,
      Grace: this.Grace
    }
    this.DigiofficeService.UpdateShiftMaster(entity)
      .subscribe({
        next: data => {
          debugger
          Swal.fire("Updated Successfully");
          location.href = "#/hr/ShiftMasterDash";
        }, error: (err) => {
          Swal.fire('Issue in Updating Shift Master');
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