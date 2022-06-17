import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-team-vaccination-details',
  templateUrl: './team-vaccination-details.component.html',
  styleUrls: ['./team-vaccination-details.component.css']
})
export class TeamVaccinationDetailsComponent implements OnInit {
  currentUrl: any;
  staffID: any;
  roleID: any;
  loader: any;
  search: any;
  date: any;

  constructor(public DigipayrollServiceService: DigipayrollserviceService, public router: Router) { }

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.loader = true;
    this.getDetails();
    this.staffID = sessionStorage.getItem('staffid')
    this.roleID = sessionStorage.getItem('roledid')
  }


  EmployeeVaccinationDetail: any;

  public getDetails() {
    debugger
    if (this.roleID == 2) {
      this.DigipayrollServiceService.GetEmployeeVaccinationDetails()
        .subscribe({
          next: data => {
            debugger
            this.EmployeeVaccinationDetail = data.filter(x => x.supervisor == this.staffID);
            this.loader = false;
          }, error: (err) => {
            Swal.fire('Issue in Getting EmployeeVaccinationDetails');
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
            Swal.fire('Issue in Getting EmployeeVaccinationDetails');
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
          Swal.fire('Issue in Getting EmployeeVaccinationDetails');
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
