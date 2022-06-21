import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-vaccine-dashboard',
  templateUrl: './vaccine-dashboard.component.html',
  styleUrls: ['./vaccine-dashboard.component.css']
})

export class VaccineDashboardComponent implements OnInit {

  constructor(public DigipayrollServiceService: DigipayrollserviceService, public router: Router) { }
  staffID: any;
  roleID: any;
  loader: any;
  currentUrl: any;
  search: any;
  date: any;
  EmployeeVaccinationDetail: any;

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.loader = true;
    this.getDetails();
    this.staffID = sessionStorage.getItem('staffid')
    this.roleID = sessionStorage.getItem('roledid')
  }

  public getDetails() {
    debugger
    if (this.roleID != 1) {
      this.DigipayrollServiceService.GetEmployeeVaccinationDetails()
      .subscribe({
        next: data => {
          debugger
          this.EmployeeVaccinationDetail = data.filter(x => x.employeeId == this.staffID);
          this.loader = false;
        }, error: (err) => {
          Swal.fire('Issue in Getting Employee Vaccination Details');
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
    else {
      this.DigipayrollServiceService.GetEmployeeVaccinationDetails()
      .subscribe({
        next: data => {
          debugger
          this.EmployeeVaccinationDetail = data;
          this.loader = false;
        }, error: (err) => {
          Swal.fire('Issue in Getting Employee Vaccination Details');
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
 
  public getdate(event: any) {
    debugger
    this.date = event.target.value;
    this.DigipayrollServiceService.GetEmployeeVaccinationDetails()
    .subscribe({
      next: data => {
        debugger
        this.EmployeeVaccinationDetail = data.filter(x => x.filterdate == this.date);
      }, error: (err) => {
        Swal.fire('Issue in Getting Employee Vaccination Details');
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