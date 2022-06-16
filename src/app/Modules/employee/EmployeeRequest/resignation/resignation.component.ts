import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resignation',
  templateUrl: './resignation.component.html',
  styleUrls: ['./resignation.component.css']
})
export class ResignationComponent implements OnInit {


  constructor(private DigiofficeService: DigipayrollserviceService) { }
  Employeelist: any;
  mangerid: any;
  Show: any;
  staffid: any;
  roleid: any;
  search: any;
  count: any;
  monthid: any;
  dummemplist: any;
  ngOnInit(): void {
    this.mangerid = localStorage.getItem('ManagerID');
    this.staffid = sessionStorage.getItem('staffid');
    this.roleid = sessionStorage.getItem('roledid');
    this.GetEmployeeResignation();

  }

  add() {
    location.href = "#/EmployeeResignform";
  }




  public GetEmployeeResignation() {
  
      this.DigiofficeService.GetStaffExitFormality().subscribe(
        data => {
          debugger
          this.Employeelist = data.filter(x => x.staffID == this.staffid);
          this.dummemplist = data;
          this.count = this.Employeelist.length;
        }
      )
    
   
  }

  submit(id: any) {
    this.DigiofficeService.AcceptEmployeeResignation(id, 1).subscribe(data => {
      Swal.fire("Saved Successfully");
      this.GetEmployeeResignation()
    })
  }


  accept(id: any) {
    this.DigiofficeService.AcceptEmployeeResignation(id, 2).subscribe(
      data => {
        Swal.fire("Accepted Successfully");
        this.GetEmployeeResignation()
      }

    )
  }

  reject(id: any) {
    this.DigiofficeService.AcceptEmployeeResignation(id, 3).subscribe(
      data => {
        Swal.fire("Reject Successfully");
        this.GetEmployeeResignation();
      }
    )
  }


  HRAccept(id: any) {
    this.DigiofficeService.AcceptEmployeeResignation(id, 4).subscribe(
      data => {
        Swal.fire("HR Accepted");
        this.GetEmployeeResignation();
      }
    )
  }



  HRReject(id: any) {
    this.DigiofficeService.AcceptEmployeeResignation(id, 5).subscribe(
      data => {
        Swal.fire("HR Rejected");
        this.GetEmployeeResignation();
      }
    )
  }


  getchangemonth(event: any) {
    this.monthid = event.target.value;
    if (this.monthid != 0) {
      this.DigiofficeService.GetStaffExitFormality().subscribe(
        data => {
          debugger
      this.Employeelist = data.filter((x: { lastdateWorkigDateMonth: any; }) => x.lastdateWorkigDateMonth == this.monthid)
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
