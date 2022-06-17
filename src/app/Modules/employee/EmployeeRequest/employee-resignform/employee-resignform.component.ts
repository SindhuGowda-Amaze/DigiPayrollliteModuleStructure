import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-resignform',
  templateUrl: './employee-resignform.component.html',
  styleUrls: ['./employee-resignform.component.css']
})
export class EmployeeResignformComponent implements OnInit {
  employeeid: any;
  employeelist: any;
  date: any;
  comments: any;
  reason: any;
  mindate:any;
  currentUrl: any;

  constructor(private DigiofficeService: DigipayrollserviceService) { }

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.employeeid = sessionStorage.getItem('staffid');
    this.mindate = new Date().toISOString().split("T")[0];
    this.GetMyDetails();
  }


  // getemployee(event:any){
  //   this.employeeid=event.target.value
  // }

  public GetMyDetails() {
    this.DigiofficeService.GetMyDetails()

    .subscribe({
      next: data => {
        debugger
        this.employeelist = data;
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



  save() {
    debugger
    if(this.reason==""||this.date==""||this.reason==undefined||this.date==undefined||this.comments==""||this.comments==undefined){
      Swal.fire('Please Fill All The Mandatory Fields')
    }
    else{
      var entity = {
        "StaffID": this.employeeid,
        "Notes": this.reason,
        "lastworkingdate": this.date,
        "type1": 10
      }
      this.DigiofficeService.InsertStaffExitFormality(entity)

      .subscribe({
        next: data => {
          debugger
          Swal.fire("Saved Successfully");
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
    
  }

  cancel() {
    location.href = "/employee/resignation";
  }


}
