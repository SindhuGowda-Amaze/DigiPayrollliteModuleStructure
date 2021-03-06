import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-separation-type-form',
  templateUrl: './separation-type-form.component.html',
  styleUrls: ['./separation-type-form.component.css']
})

export class SeparationTypeFormComponent implements OnInit {

  constructor(public DigiofficeService: DigipayrollserviceService, private activatedroute: ActivatedRoute) { }
  currentUrl: any
  ID: any;
  shiftmasterlist: any;
  Short: any;
  Description: any;
  ShiftTimeings: any
  Grace: any
  separationTypelist: any;

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.Short = "";
    this.GetSeparationType();
    this.ActivatedRouteCall();
  }

  public ActivatedRouteCall() {
    this.activatedroute.params.subscribe(params => {
      debugger;
      this.ID = params['id'];
      if (this.ID == undefined) {
      }
      else {
        this.DigiofficeService.GetSeparationType()
          .subscribe({
            next: data => {
              debugger
              this.separationTypelist = data.filter(x => x.id == this.ID);
              this.Short = this.separationTypelist[0].short;
              this.Description = this.separationTypelist[0].description;
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
    })
  }

  public GetSeparationType() {
    this.DigiofficeService.GetSeparationType()
      .subscribe({
        next: data => {
          debugger
          this.separationTypelist = data;
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

  public InsertSeparationType() {
    debugger;
    if (this.Description == undefined || this.Short == undefined) {
      Swal.fire('Please Fill All Fields');
    }
    var entity = {
      Short: this.Short,
      Description: this.Description,
    }
    this.DigiofficeService.InsertSeparationType(entity)
      .subscribe({
        next: data => {
          debugger
          if (data != 0) {
            Swal.fire("Saved Successfully");
            location.href = "#/SeparationTypeDash";
          }
        }, error: (err) => {
          Swal.fire('Issue in Inserting Separation Type');
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
    location.href = "#/hr/SeparationTypeDash";
  }

  public UpdateSeparationType() {
    debugger;
    var entity = {
      ID: this.ID,
      Short: this.Short,
      Description: this.Description,
    }
    this.DigiofficeService.UpdateSeparationType(entity)
      .subscribe({
        next: data => {
          debugger
          Swal.fire("Updated Successfully");
          location.href = "#/SeparationTypeDash";
        }, error: (err) => {
          Swal.fire('Issue in Updating Separation Type');
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