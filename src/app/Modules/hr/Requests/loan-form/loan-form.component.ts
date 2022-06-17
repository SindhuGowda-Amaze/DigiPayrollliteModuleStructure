import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-loan-form',
  templateUrl: './loan-form.component.html',
  styleUrls: ['./loan-form.component.css']
})
export class LoanFormComponent implements OnInit {

  constructor(public DigiofficeService: DigipayrollserviceService, public router: Router) { }

  EmployeeId: any;
  EmployeeName: any;
  FirstDoseDate: any;
  VaccinationName: any;
  SecondDoseDate: any;
  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings: any = {};
  Departmentlist: any;
  Managerlist: any;
  Comments: any;
  LoanType: any;
  LoanAmount: any;
  loanslist:any;
  roledid:any;
  ngOnInit(): void {
    this.LoanType="";
    this.roledid = sessionStorage.getItem('roledid');

    if(this.roledid==6){
      this.DigiofficeService.GetLoanConfiguration().subscribe((data: any) => {
        debugger
        this.loanslist = data.filter((x: { employeeApply: boolean; enable_Disable:boolean })=>x.employeeApply==true && x.enable_Disable==false)
      })
    }
  else{
    this.DigiofficeService.GetLoanConfiguration().subscribe((data: any) => {
      debugger
      this.loanslist = data.filter((x: { managerApply: boolean; enable_Disable:boolean})=>x.managerApply==true && x.enable_Disable==false)
  
    })
  }


  }

  Notes: any;
  Trasnferdate: any;
  newsupervisor: any;
  ToDepartment: any;
  oldsupervisor: any;
  FromDepartment: any;
  Tenure:any;
  public attachmentsurl: any = [];

  holidaylist:any;
  approval:any;
  
  public Save() {
    debugger
if(this.LoanType==" "||this.LoanAmount==" "||this.Comments==" "||this.LoanType==undefined||this.LoanAmount==undefined||this.Comments==undefined)
{
  Swal.fire('Please Fill All The Mandatory Fields')
}

  else{
    this.DigiofficeService.GetLoanConfiguration().subscribe((data: any) => {
      debugger
      this.holidaylist = data.filter((x: { type: any; })=>x.type==this.LoanType)
      this.approval =  this.holidaylist[0].approval
    
    if(this.approval=='Auto Approval'){

      var eb = {
        'StaffID': sessionStorage.getItem('staffid'),
        'LoanType': this.LoanType,
        'LoanAmount': this.LoanAmount,
        'Comments': this.Comments,
        'Status' : 'Manager Approved,HR Approved,Payroll Approved,Finance Approved',
        'period' : this.Tenure
      }

  
      this.DigiofficeService.InsertEmployeeLoans(eb).subscribe(
    
        data => {
          debugger
          Swal.fire('Saved Successfully.');
          this.router.navigate(['/Appliedloans']);
    
        },
      )
    
   
  }  
//   else if(this.approval=='Manager Approval'){
//     var eb = {
//       'StaffID': sessionStorage.getItem('staffid'),
//       'LoanType': this.LoanType,
//       'LoanAmount': this.LoanAmount,
//       'Comments': this.Comments,
//       'Status' : 'Manager Pending',
//       'period' : this.Tenure
//     }
    
//     this.DigiofficeService.InsertEmployeeLoans(eb).subscribe(
  
//       data => {
//         debugger
//         Swal.fire('Saved Successfully.');
//         this.router.navigate(['/Appliedloans']);
  
//       },
//     )
  
 
// }  
//  else if(this.approval=='HR Approval'){
//   var eb = {
//     'StaffID': sessionStorage.getItem('staffid'),
//     'LoanType': this.LoanType,
//     'LoanAmount': this.LoanAmount,
//     'Comments': this.Comments,
//     'Status' : 'HR Pending',
//     'period' : this.Tenure
//   }
  
//   this.DigiofficeService.InsertEmployeeLoans(eb).subscribe(

//     data => {
//       debugger
//       Swal.fire('Saved Successfully.');
//       this.router.navigate(['/Appliedloans']);

//     },
//   )


// }  
// else if(this.approval=='Payroll Approval'){
//   var eb = {
//     'StaffID': sessionStorage.getItem('staffid'),
//     'LoanType': this.LoanType,
//     'LoanAmount': this.LoanAmount,
//     'Comments': this.Comments,
//     'Status' : 'HR Pending',
//     'period' : this.Tenure,
//   }
 
//   this.DigiofficeService.InsertEmployeeLoans(eb).subscribe(

//     data => {
//       debugger
//       Swal.fire('Saved Successfully.');
//       this.router.navigate(['/Appliedloans']);

//     },
//   )


// } 
// else if(this.approval=='Finance Approval'){
//   var eb = {
//     'StaffID': sessionStorage.getItem('staffid'),
//     'LoanType': this.LoanType,
//     'LoanAmount': this.LoanAmount,
//     'Comments': this.Comments,
//     'Status' : 'Finance Pending',
//     'period' : this.Tenure,
//   }
  
//   this.DigiofficeService.InsertEmployeeLoans(eb).subscribe(

//     data => {
//       debugger
//       Swal.fire('Saved Successfully.');
//       this.router.navigate(['/Appliedloans']);

//     },
//   )


// } 
else if(this.approval=='4 Level Approval'){
  var eb = {
    'StaffID': sessionStorage.getItem('staffid'),
    'LoanType': this.LoanType,
    'LoanAmount': this.LoanAmount,
    'Comments': this.Comments,
    'Status' : 'Manager Pending,HR Pending,Payroll Pending,Finance Pending',
    'period' : this.Tenure,
  }
  
  this.DigiofficeService.InsertEmployeeLoans(eb).subscribe(

    data => {
      debugger
      Swal.fire('Saved Successfully.');
      this.router.navigate(['/Appliedloans']);

    },
  )


} 
     
  
})
  
}
    

  
  }

  public cancel() {
    debugger
    location.reload();

  }

}