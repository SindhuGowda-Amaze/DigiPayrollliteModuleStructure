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
  staffID:any;
  roleID:any;
  loader:any;
  ngOnInit(): void {
this.loader=true;
    this.getDetails();
    this.staffID = sessionStorage.getItem('staffid')
    this.roleID = sessionStorage.getItem('roledid')
  }

  search: any;
  EmployeeVaccinationDetail: any;

  public getDetails() {
    debugger
  if(this.roleID!=1){
    this.DigipayrollServiceService.GetEmployeeVaccinationDetails().subscribe(data => {
      debugger
      this.EmployeeVaccinationDetail = data.filter(x=>x.employeeId==this.staffID);
      this.loader=false;
    })
  }
  else{
    this.DigipayrollServiceService.GetEmployeeVaccinationDetails().subscribe(data => {
      debugger
      this.EmployeeVaccinationDetail = data;
      this.loader=false;
    })
  }
    

  }
  date: any;
  public getdate(event: any) {
    debugger
    this.date = event.target.value;

    this.DigipayrollServiceService.GetEmployeeVaccinationDetails().subscribe(data => {
      debugger
      this.EmployeeVaccinationDetail = data.filter(x => x.filterdate == this.date);
    })

  }

}