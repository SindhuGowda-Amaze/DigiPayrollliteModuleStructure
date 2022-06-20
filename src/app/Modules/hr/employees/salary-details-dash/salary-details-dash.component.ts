import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-salary-details-dash',
  templateUrl: './salary-details-dash.component.html',
  styleUrls: ['./salary-details-dash.component.css']
})

export class SalaryDetailsDashComponent implements OnInit {

  constructor(public DigiofficeService: DigipayrollserviceService) { }
  p: any = 1;
  count1: any = 10;
  leavelistCopy: any;
  RoleType: any;
  count: any;
  Department: any;
  Departmentlist: any;
  RoleTypeList: any;
  term: any;
  leavelist: any;
  currentUrl: any;
  loader: any;

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.loader = true;
    this.RoleType = "";
    this.Department = "";
    this.GetMyDetails();
    this.GetDepartment();
  }

  public GetDepartment() {
    this.DigiofficeService.GetDepartment()
      .subscribe({
        next: data => {
          debugger
          this.Departmentlist = data;
          this.loader = false;
        }, error: (err) => {
          Swal.fire('Issue in Getting Department');
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

  public GetRoleType() {
    this.DigiofficeService.GetRoleType()
      .subscribe({
        next: data => {
          debugger
          this.RoleTypeList = data;
          this.loader = false;
        }, error: (err) => {
          Swal.fire('Issue in Getting Role Type');
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

  public GetMyDetails() {
    debugger
    this.DigiofficeService.GetMyDetails()
      .subscribe({
        next: data => {
          debugger
          this.leavelist = data.filter(x => x.deniminimis != null)
          this.count = this.leavelist.length;
          this.leavelistCopy = this.leavelist;
          this.loader = false;
        }, error: (err) => {
          Swal.fire('Issue in Getting My Details');
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

  public getRoleType(event: any) {
    debugger
    this.RoleType = event.target.value;
  }

  public FilterRoleType() {
    debugger
    this.DigiofficeService.GetMyDetails()
      .subscribe({
        next: data => {
          debugger
          this.leavelist = data.filter(x => x.roleType == this.RoleType);
          this.count = this.leavelist.length;
          this.loader = false;
        }, error: (err) => {
          Swal.fire('Issue in Getting My Details');
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

  public filterByDepartment() {
    debugger
    this.DigiofficeService.GetMyDetails()
      .subscribe({
        next: data => {
          debugger
          this.leavelist = data.filter(x => x.department == this.Department);
          this.count = this.leavelist.length;
          this.loader = false;
        }, error: (err) => {
          Swal.fire('Issue in Getting My Details');
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

  public Filterstaff() {
    debugger
    let searchCopy = this.term.toLowerCase();
    this.leavelist = this.leavelistCopy.filter((x: { name: string }) =>
      x.name.toLowerCase().includes(searchCopy));
  }

  public DeleteCountryType(ID: any) {
    debugger
    this.DigiofficeService.DeleteDe_minimis_Master(ID)
      .subscribe({
        next: data => {
          debugger
          Swal.fire('Deleted SuccessFully')
          location.reload();
        }, error: (err) => {
          Swal.fire('Issue in Deleting DeMinimis Master');
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