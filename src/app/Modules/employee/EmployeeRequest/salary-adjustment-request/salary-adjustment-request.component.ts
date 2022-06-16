import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-salary-adjustment-request',
  templateUrl: './salary-adjustment-request.component.html',
  styleUrls: ['./salary-adjustment-request.component.css']
})
export class SalaryAdjustmentRequestComponent implements OnInit {

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
  loanslist: any;
  roledid: any;
  Netsalary:any;
  staffID:any;
  Month : any;
  Period:any;

  Type: any

  ngOnInit(): void {

    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true,

    };

    this.LoanType = "";
    this.roledid = sessionStorage.getItem('roledid');
    this.staffID = sessionStorage.getItem('staffid')

    
    this.DigiofficeService.GetMyDetails().subscribe(data => {
      debugger
      this.dropdownList = data;
    })

    if (this.roledid == 6) {
      this.DigiofficeService.GetLoanConfiguration().subscribe((data: any) => {
        debugger
        this.loanslist = data.filter((x: { employeeApply: boolean; enable_Disable: boolean }) => x.employeeApply == true && x.enable_Disable == false)
      })
    }
    else {
      this.DigiofficeService.GetLoanConfiguration().subscribe((data: any) => {
        debugger
        this.loanslist = data.filter((x: { managerApply: boolean; enable_Disable: boolean }) => x.managerApply == true && x.enable_Disable == false)

      })
    }


    
    this.DigiofficeService.Get_Salary_For_Loans(this.staffID).subscribe(
      res => {
        debugger;
        this.Netsalary = res[0].grossSalary;
       
      }
    )




  }

  Notes: any;
  Trasnferdate: any;
  newsupervisor: any;
  ToDepartment: any;
  oldsupervisor: any;
  FromDepartment: any;
  Tenure: any;
  public attachmentsurl: any = [];

  holidaylist: any;
  approval: any;
  finalnetsalary:any;
  percDiff:any;
  salaryAdjustmentType:any;

  onItemSelect(item: any) {
    debugger
    console.log(item);
    this.staffID = item.id;

  }
  public Save() {
    debugger
    if (this.salaryAdjustmentType == " " || this.Month == " " || this.Period == " " || this.Comments==" "|| this.salaryAdjustmentType == undefined || this.Month == undefined || this.Period == undefined || this.Comments==undefined ) {
      Swal.fire('Please Fill All The Mandatory Fields')
    }
    else {
   
      var eb = {
        'StaffID': this.staffID,
        'salaryAdjustmentType':this.salaryAdjustmentType,
        'month': this.Month,
        'payPeriod': this.Period,
        'comments': this.Comments,
        'Status': 'Manager Pending Hr Pending'
       
      }


      this.DigiofficeService.InsertSalaryAdjustmentType(eb).subscribe(

        data => {
          debugger
          Swal.fire('Saved Successfully.');
          this.getpassword();
          this.router.navigate(['/employee/salaryadjustment']);

        },
      )
      
    }
   
  }


  


  password1: any;
  supervisoremail:any;
  employeename:any;
  getpassword() {
    this.DigiofficeService.GetMyDetails().subscribe(data => {
      let temp: any = data.filter(x => x.loginTypeID == 9);
      let temp1: any = data.filter(x => x.id ==  sessionStorage.getItem('staffid'));
      if (temp.length != 0) {
        this.supervisoremail = temp[0].emailID;
        this.employeename= temp1[0].name
        
        this.sendemail();
      }

    })
  }
  
  public Attactments = [];
  public sendemail() {
    var entity1 = {
      'emailto': this.supervisoremail,
      'emailsubject': 'Salary Dispute Application',
      'emailbody': 'Hi , <br> ' + this.employeename + ' has submitted the Salary Dispute request Please  login into DigiOffice To Approve Or Reject It.<br> Thanks <br> Team Digi-Office',
      'attachmenturl': this.Attactments,
      'cclist': this.supervisoremail,
      'bcclist': this.supervisoremail,
    }
    this.DigiofficeService.sendemail1(entity1).subscribe(res => {
      debugger;
      this.Attactments = [];

     
    })

  }
 
  public cancel() {
    debugger
    location.reload();

  }


}
