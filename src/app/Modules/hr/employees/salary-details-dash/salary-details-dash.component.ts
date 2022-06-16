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
  RoleType:any;
  count:any;
  Department:any;
  Departmentlist:any;
  RoleTypeList:any;
  term: any;
  leavelist: any
  ngOnInit(): void {
    // this.loader=true;
    this.RoleType="";
    this.Department="";
    this.GetMyDetails();

    this.DigiofficeService.GetDepartment().subscribe(data => {
      debugger
      this.Departmentlist = data;
    });

    this.DigiofficeService.GetRoleType().subscribe(data => {
      debugger
      this.RoleTypeList = data;
    });
  }

  loader:any;
  public GetMyDetails() {
    debugger
    this.DigiofficeService.GetMyDetails().subscribe(data => {
      debugger
      this.leavelist = data.filter(x => x.deniminimis != null)
      this.count = this.leavelist.length;
      this.leavelistCopy = this.leavelist;
      this.loader=false
    })
  }

  public getRoleType(event: any) {
    debugger
    this.RoleType = event.target.value;
  }

  public FilterRoleType() {
    debugger
    this.DigiofficeService.GetMyDetails().subscribe(data => {
      debugger
      this.leavelist = data.filter(x=>x.roleType==this.RoleType);
      this.count = this.leavelist.length;
    });
 
  }

  public filterByDepartment(){
    debugger
    this.DigiofficeService.GetMyDetails().subscribe(data => {
      debugger
      this.leavelist = data.filter(x=>x.department==this.Department);
      this.count = this.leavelist.length;
    });
 
  }


  public Filterstaff() {
    debugger
    let searchCopy = this.term.toLowerCase();
    this.leavelist = this.leavelistCopy.filter((x: { name: string }) =>
      x.name.toLowerCase().includes(searchCopy));
  }

  public DeleteCountryType(ID: any) {
    debugger
    this.DigiofficeService.DeleteDe_minimis_Master(ID).subscribe(data => {
      debugger
      Swal.fire('Deleted SuccessFully')
      location.reload();
    })
  }

}