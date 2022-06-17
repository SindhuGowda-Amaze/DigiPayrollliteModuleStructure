import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import * as XLSX from 'xlsx'
@Component({
  selector: 'app-exitformality-dash',
  templateUrl: './exitformality-dash.component.html',
  styleUrls: ['./exitformality-dash.component.css']
})

export class ExitformalityDashComponent implements OnInit {

  constructor(public DigiofficeService: DigipayrollserviceService, public router: Router) { }
  annnounecemnetlist: any;
  roledid: any;
  currentUrl:any;
  Notes: any;
  enddate:any;
  startdate:any;
  employeeemail: any;
  employeename: any;
  id: any;
  hrupdateid: any;
  seprationtype:any;
  files: File[] = [];
  attachmentsurl: any;
  attachmentsurl1: any;
  files1: File[] = [];
  fileName = 'Exit Formality Report.xlsx';

  ngOnInit(): void {
    debugger
    this.currentUrl = window.location.href;
    this.roledid = sessionStorage.getItem('roledid');
    this.GetStaffExitFormality();
  }

  public GetStaffExitFormality(){
    this.DigiofficeService.GetStaffExitFormality()
    .subscribe({
      next: data => {
        debugger
        if (this.roledid == 6) {
          this.annnounecemnetlist = data.filter(x => x.staffID == sessionStorage.getItem('staffid'))
        } else if (this.roledid == 2) {
          this.annnounecemnetlist = data.filter(x => x.supervisor == sessionStorage.getItem('staffid'));
        }
        else {
          this.annnounecemnetlist = data;
        }
      }, error: (err) => {
        Swal.fire('Issue in Getting Staff Exit Formality');
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
        this.DigiofficeService.DeleteStaffExitFormality(ID.id)
        .subscribe({
          next: data => {
            debugger
            Swal.fire('Deleted Successfully')
            this.ngOnInit();
          }, error: (err) => {
            Swal.fire('Issue in Deleting Staff Exit Formality');
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

  public HRClear(list: any) {
    debugger
    var entity = {
      'ID': list.id,
      'type': 'HRclearance'
    }
    this.DigiofficeService.ClearStaffExitFormality(entity)
    .subscribe({
      next: data => {
        debugger
        Swal.fire('Updated Successfully');
      this.ngOnInit();
      }, error: (err) => {
        Swal.fire('Issue in Clearing Staff Exit Formality');
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
  
  public OwnClear(list: any) {
    this.employeeemail = list.official_Email;
    this.employeename = list.name;
    debugger
    var entity = {
      'ID': list.id,
      'type': 'ownclearance'
    }
    this.DigiofficeService.ClearStaffExitFormality(entity).subscribe(data => {
      debugger
      Swal.fire('Updated Successfully');
      if(this.seprationtype=='Resignation' ){
      this.sendemail();
      }
      this.ngOnInit();
    })
  }

  public Attactments = [];
  public sendemail() {
    if (this.roledid==2)  {
      var entity1 = {
        'emailto': this.employeeemail,
        'emailsubject': 'Exit Formality | Purego | Digioffice',
        'emailbody': 'Hi , <br> ' + this.employeename + ' your request of Resignation is Approved' + ' by your Manager , Please Login to Digioffice To View It.<br> Thanks <br> Team Digi-Office',
        'attachmenturl': this.Attactments,
        'cclist': this.employeeemail,
        'bcclist': this.employeeemail,
      }
    }
    else{
      var entity1 = {
        'emailto': this.employeeemail,
        'emailsubject': 'Exit Formality | Purego | Digioffice',
        'emailbody': 'Hi , <br> ' + this.employeename + ' your request of Resignation is Approved' + ' by your Hr , Please Login to Digioffice To View It.<br> Thanks <br> Team Digi-Office',
        'attachmenturl': this.Attactments,
        'cclist': this.employeeemail,
        'bcclist': this.employeeemail,
      }
    }
    this.DigiofficeService.sendemail1(entity1)
    .subscribe({
      next: data => {
        debugger
        this.Attactments = [];
      }, error: (err) => {
        Swal.fire('Issue in Sending Email');
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

  public AdminClear(list: any) {
    debugger
    var entity = {
      'ID': list.id,
      'type': 'Adminclearance'
    }
    this.DigiofficeService.ClearStaffExitFormality(entity)
    .subscribe({
      next: data => {
        debugger
        Swal.fire('Updated Successfully');
        this.ngOnInit();
      }, error: (err) => {
        Swal.fire('Issue in Clearing Staff Exit Formality');
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
  
  public RetainEmployeee1(list: any) {
    this.id = list.id;
  }

  public FinanceClear(list: any) {
    debugger
    var entity = {
      'ID': list.id,
      'type': 'Financeclearance'
    }
    this.DigiofficeService.ClearStaffExitFormality(entity)
    .subscribe({
      next: data => {
        debugger
        Swal.fire('Updated Successfully');
        this.ngOnInit();
      }, error: (err) => {
        Swal.fire('Issue in Clearing Staff Exit Formality');
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
  
  hrupdate(list: any) {
    this.hrupdateid = list.id;
    this.seprationtype = list.seprationtype;
    this.employeeemail = list.official_Email;
    this.employeename = list.name;
  }
  
  onSelect(event: any) {
    console.log(event);
    debugger
    this.files.push(...event.addedFiles);
    debugger
    this.DigiofficeService.ProjectAttachments(this.files)
    .subscribe({
      next: data => {
        debugger
        this.attachmentsurl = data;
      }, error: (err) => {
        Swal.fire('Issue in Inserting Project Attachments');
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

  public getenddate(event: any) {
    debugger
    if (this.roledid == 2) {
      this.DigiofficeService.GetStaffExitFormality()
      .subscribe({
        next: data => {
          debugger
          this.annnounecemnetlist = data.filter(x => x.supervisor == sessionStorage.getItem('staffid') && (x.filterdate >= this.startdate && x.filterdate <= this.enddate) );
        }, error: (err) => {
          Swal.fire('Issue in Getting Staff Exit Formality');
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
    else {
      this.DigiofficeService.GetStaffExitFormality()
      .subscribe({
        next: data => {
          debugger
          this.annnounecemnetlist = data.filter(x=> (x.filterdate >= this.startdate && x.filterdate <= this.enddate));
        }, error: (err) => {
          Swal.fire('Issue in Getting Staff Exit Formality');
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
 
  onSelect2(event: any) {
    console.log(event);
    debugger
    this.files1.push(...event.addedFiles);
    debugger
    this.DigiofficeService.ProjectAttachments(this.files1)
    .subscribe({
      next: data => {
        debugger
        this.attachmentsurl1 = data
      }, error: (err) => {
        Swal.fire('Issue in Inserting Project Attachments');
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

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('lvs');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

  public UploadAttachment() {
    debugger
    var entity = {
      "ID": this.hrupdateid,
      "ExperienceLetter": this.attachmentsurl,
      "ReleavingLetter": this.attachmentsurl1
    }
    this.DigiofficeService.UploadAttachment(entity)
    .subscribe({
      next: data => {
        debugger
        var entity = {
          'ID': this.hrupdateid,
          'type': 'HRclearance'
        }
        this.DigiofficeService.ClearStaffExitFormality(entity).subscribe(data => {
          debugger
          Swal.fire('Updated Successfully');
          if(this.seprationtype=='Resignation' ){
            this.sendemail();
            }
          this.ngOnInit();
        })
      }, error: (err) => {
        Swal.fire('Issue in Getting City Type');
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

  public RetainEmployeee() {
    debugger
    var entity = {
      'ID': this.id,
      'type': 'Retain'
    }
    this.DigiofficeService.RetainEmployeee(entity)
    .subscribe({
      next: data => {
        debugger
        Swal.fire('Updated Successfully');
        this.ngOnInit();
      }, error: (err) => {
        Swal.fire('Issue in Retaining Employee');
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

  experience(experienceletter: any) {
    debugger
    window.open(experienceletter, "_blank")
  }

  releaving(releavingletter: any) {
    window.open(releavingletter, "_blank")
  }

}