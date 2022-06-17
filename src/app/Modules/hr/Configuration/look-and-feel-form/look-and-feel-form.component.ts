import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-look-and-feel-form',
  templateUrl: './look-and-feel-form.component.html',
  styleUrls: ['./look-and-feel-form.component.css']
})

export class LookAndFeelFormComponent implements OnInit {

  constructor(public DigipayrollServiceService: DigipayrollserviceService, private activatedroute: ActivatedRoute, private datepipe: DatePipe) { }
  ID: any;
  leavelist: any;
  Short: any;
  Description: any;
  currentUrl: any;
  Holiday: any
  HolidayDescription: any;
  HolidayDate: any;
  Attachment: any;
  ButtonColor: any;
  HeaderColor: any;
  FontName: any
  public attachments21: any = [];
  public attachments: any = [];
  public attachmentsurl: any = [];

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.ActivatedRouteCall();
  }

  public ActivatedRouteCall() {
    this.activatedroute.params.subscribe(params => {
      debugger;
      this.ID = params['id'];
      if (this.ID == undefined) {
        this.Holiday = '',
          this.HolidayDescription = ''
      }
      else {
        this.DigipayrollServiceService.GetCompanyConfiguration()
          .subscribe({
            next: data => {
              debugger
              this.leavelist = data.filter(x => x.id == this.ID);
              this.ButtonColor = this.leavelist[0].buttonColor
              this.HeaderColor = this.leavelist[0].headerColor;
              this.FontName = this.leavelist[0].fontName
            }, error: (err) => {
              Swal.fire('Issue in Getting Company Configuration');
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
    }
    )
  }

  onRemove21(event: any) {
    debugger
    console.log(event);
    this.attachments21.splice(this.attachments.indexOf(event), 1);
  }

  onSelect21(event: any) {
    debugger
    console.log(event);
    this.attachments21.push(...event.addedFiles);
    Swal.fire('Attachment Added Successfully');
  }

  public Save() {
    debugger
    this.DigipayrollServiceService.ProjectAttachments(this.attachments21)
      .subscribe({
        next: res => {
          debugger
          this.attachmentsurl.push(res);
          this.attachments.length = 0;
          this.InsertHolidays();
        }, error: (err) => {
          Swal.fire('Issue in Inserting Project Attachments');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
            res => {
              debugger
            },
          )
        }
      })
  }

  public Save2() {
    debugger
    this.DigipayrollServiceService.ProjectAttachments(this.attachments21)
      .subscribe({
        next: res => {
          debugger
          this.attachmentsurl.push(res);
          this.attachments.length = 0;
          this.UpdateHolidays();
        }, error: (err) => {
          Swal.fire('Issue in Inserting Project Attachments');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
            res => {
              debugger
            },
          )
        }
      })
  }

  public InsertHolidays() {
    debugger;
    var entity = {
      CompanyLogo: this.attachmentsurl[0],
      HeaderColor: this.HeaderColor,
      ButtonColor: this.ButtonColor,
      FontName: this.FontName,
    }
    this.DigipayrollServiceService.InsertCompanyConfiguration(entity)
      .subscribe({
        next: data => {
          debugger
          if (data != 0) {
            Swal.fire("Saved Successfully");
            location.href = "#/Lookandfeeldash";
          }
        }, error: (err) => {
          Swal.fire('Issue in Inserting Company Configuration');
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

  public UpdateHolidays() {
    debugger;
    var entity = {
      ID: this.ID,
      CompanyLogo: this.attachmentsurl[0],
      HeaderColor: this.HeaderColor,
      ButtonColor: this.ButtonColor,
      FontName: this.FontName,
    }
    this.DigipayrollServiceService.UpdateCompanyConfiguration(entity)
      .subscribe({
        next: data => {
          debugger
          Swal.fire("Updated Successfully");
          location.href = "#/Lookandfeeldash";
        }, error: (err) => {
          Swal.fire('Issue in Updating Company Configuration');
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

}