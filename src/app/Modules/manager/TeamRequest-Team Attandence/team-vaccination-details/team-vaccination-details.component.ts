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
 if(this.roleID==2){
  this.DigipayrollServiceService.GetEmployeeVaccinationDetails().subscribe(data => {
    debugger
    this.EmployeeVaccinationDetail = data.filter(x=>x.supervisor==this.staffID);
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
