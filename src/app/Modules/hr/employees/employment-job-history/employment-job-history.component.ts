import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employment-job-history',
  templateUrl: './employment-job-history.component.html',
  styleUrls: ['./employment-job-history.component.css']
})
export class EmploymentJobHistoryComponent implements OnInit {

  constructor(public DigiofficeService: DigipayrollserviceService, public router: Router) { }

  stafflist: any;
  term: any;
  p: any = 1;
  count1: any = 10;
  roledid:any;
  stafflistCopy:any;
  loader:any;
  ngOnInit(): void {
    this.loader=true
    debugger
    this.roledid = sessionStorage.getItem('roledid');
    this.DigiofficeService.GetMyDetails().subscribe(data => {
      debugger
      this.stafflist = data;
      this.stafflistCopy=this.stafflist;
      this.loader=false
    });


  }

  public Filterstaff() {
    debugger
    let searchCopy = this.term.toLowerCase();
    this.stafflist = this.stafflistCopy.filter((x: { name: string }) =>
      x.name.toLowerCase().includes(searchCopy));
  }


  stafflist1: any;
  public GetStaffDetails(list: any) {
    debugger

    this.DigiofficeService.GetEmploymentDetails().subscribe(data => {
      debugger
      this.stafflist1 = data.filter(x => x.staffId == list.id);
    });

  }
  Addjobhistory(){
  
  }
}