import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resignation',
  templateUrl: './resignation.component.html',
  styleUrls: ['./resignation.component.css']
})
export class ResignationComponent implements OnInit {
  Employeelist: any;
  mangerid: any;
  Show: any;
  staffid: any;
  roleid: any;
  search: any;
  count: any;
  monthid: any;
  dummemplist: any;
  
   currentUrl: any;

  constructor(private DigiofficeService: DigipayrollserviceService) { }

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.mangerid = localStorage.getItem('ManagerID');
    this.staffid = sessionStorage.getItem('staffid');
    this.roleid = sessionStorage.getItem('roledid');
    this.GetEmployeeResignation();

  }

  add() {
    location.href = "/#/employee/EmployeeResignform";
  }




  public GetEmployeeResignation() {
  
      this.DigiofficeService.GetStaffExitFormality()

      .subscribe({
        next: data => {
          debugger
          this.Employeelist = data.filter(x => x.staffID == this.staffid);
          this.dummemplist = data;
          this.count = this.Employeelist.length;
        }, error: (err) => {
          Swal.fire('Issue in Getting StaffExitFormality');
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

  submit(id: any) {
    this.DigiofficeService.AcceptEmployeeResignation(id, 1)

    .subscribe({
      next: data => {
        debugger
        Swal.fire("Saved Successfully");
      this.GetEmployeeResignation()
      }, error: (err) => {
        Swal.fire('Issue in Getting EmployeeResignation');
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


  accept(id: any) {
    this.DigiofficeService.AcceptEmployeeResignation(id, 2)

    .subscribe({
      next: data => {
        debugger
        Swal.fire("Accepted Successfully");
        this.GetEmployeeResignation()
      }, error: (err) => {
        Swal.fire('Issue in Getting EmployeeResignation');
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

  reject(id: any) {
    this.DigiofficeService.AcceptEmployeeResignation(id, 3)

    .subscribe({
      next: data => {
        debugger
        Swal.fire("Reject Successfully");
        this.GetEmployeeResignation();
      }, error: (err) => {
        Swal.fire('Issue in Getting EmployeeResignation');
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


  HRAccept(id: any) {
    this.DigiofficeService.AcceptEmployeeResignation(id, 4)

    .subscribe({
      next: data => {
        debugger
        Swal.fire("HR Accepted");
        this.GetEmployeeResignation();
      }, error: (err) => {
        Swal.fire('Issue in Getting EmployeeResignation');
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



  HRReject(id: any) {
    this.DigiofficeService.AcceptEmployeeResignation(id, 5)

    .subscribe({
      next: data => {
        debugger
        Swal.fire("HR Rejected");
        this.GetEmployeeResignation();
      }, error: (err) => {
        Swal.fire('Issue in Getting EmployeeResignatione');
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


  getchangemonth(event: any) {
    this.monthid = event.target.value;
    if (this.monthid != 0) {
      this.DigiofficeService.GetStaffExitFormality()


        .subscribe({
          next: data => {
            debugger
            this.Employeelist = data.filter((x: { lastdateWorkigDateMonth: any; }) => x.lastdateWorkigDateMonth == this.monthid)
          }, error: (err) => {
            Swal.fire('Issue in Getting StaffExitFormality');
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
      this.GetEmployeeResignation();
    }

  }

  experience(experienceletter:any){
    debugger
    window.open(experienceletter, "_blank")
  }

  releaving(releavingletter:any){
    window.open(releavingletter, "_blank")
  }
}
