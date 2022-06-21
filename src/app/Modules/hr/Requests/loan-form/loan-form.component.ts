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
  password1: any;
  supervisoremail: any;
  employeename: any;
  EMIAmount: any
  Denominator: any;
  Numerator: any;
  totalamount: any;
  interestAmount: any;
  Reason: any;
  SemiemiAmount: any;
  holidaylist: any;
  approval: any;
  finalnetsalary: any;
  percDiff: any;
  currentUrl: any
  Notes: any;
  Trasnferdate: any;
  newsupervisor: any;
  ToDepartment: any;
  oldsupervisor: any;
  FromDepartment: any;
  Tenure: any;
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
  Netsalary: any;
  staffID: any;
  res: any;
  public Attactments = [];
  public attachmentsurl: any = [];

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.LoanType = "";
    this.roledid = sessionStorage.getItem('roledid');
    this.staffID = sessionStorage.getItem('staffid')
    this.GetLoanConfiguration();
    this.DigiofficeService.Get_Salary_For_Loans(this.staffID).subscribe({
      next: data => {
        debugger
        this.Netsalary = data[0].grossSalary;
      }, error: (err) => {
        Swal.fire('Issue in Getting Salary For Loans');
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

  public GetLoanConfiguration() {
    if (this.roledid == 6) {
      this.DigiofficeService.GetLoanConfiguration()
        .subscribe({
          next: data => {
            debugger
            this.loanslist = data.filter((x: { employeeApply: boolean; enable_Disable: boolean }) => x.employeeApply == true && x.enable_Disable == false)
          }, error: (err) => {
            Swal.fire('Issue in Getting Loan Configuration');
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
    else {
      this.DigiofficeService.GetLoanConfiguration()
        .subscribe({
          next: data => {
            debugger
            this.loanslist = data.filter((x: { managerApply: boolean; enable_Disable: boolean }) => x.managerApply == true && x.enable_Disable == false)
          }, error: (err) => {
            Swal.fire('Issue in Getting Loan Configuration');
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

  public Save() {
    debugger
    if (this.LoanType == " " || this.LoanAmount == " " || this.Comments == " " || this.LoanType == undefined || this.LoanAmount == undefined || this.Comments == undefined) {
      Swal.fire('Please Fill All The Mandatory Fields')
    }
    else {
      this.finalnetsalary = this.Netsalary - this.EMIAmount
      this.percDiff = ((this.Netsalary / this.finalnetsalary) * 100);
      if (Number(this.percDiff) < 20) {
        Swal.fire({
          title: 'Sorry!',
          text: 'You Are Not Eligible To Apply The Loan Because Your Take Home NetSalary Will Be Lesser Than 20% Threshold ',
        })
      }
      else {
        var eb = {
          'StaffID': sessionStorage.getItem('staffid'),
          'LoanType': this.LoanType,
          'LoanAmount': this.LoanAmount,
          'Comments': this.Comments,
          'Status': 'HR Pending',
          'period': this.Tenure
        }
        this.DigiofficeService.InsertEmployeeLoans(eb)
          .subscribe({
            next: data => {
              debugger
              Swal.fire('Saved Successfully.');
              this.getpassword();
              this.router.navigate(['/employee/loans']);
            }, error: (err) => {
              Swal.fire('Issue in Inserting Employee Loans');
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
  }

  public TenureCalculate() {
    debugger;
    if (this.Tenure != "") {
      this.EMIAmount = (this.LoanAmount / this.Tenure).toFixed(2)
    }
  }

  getpassword() {
    this.DigiofficeService.GetMyDetails()
      .subscribe({
        next: data => {
          debugger
          let temp: any = data.filter(x => x.loginTypeID == 9);
          let temp1: any = data.filter(x => x.id == sessionStorage.getItem('staffid'));
          if (temp.length != 0) {
            this.supervisoremail = temp[0].emailID;
            this.employeename = temp1[0].name
            this.sendemail();
          }
          this.sendemail();
        }, error: (err) => {
          Swal.fire('Issue in Getting MyDetails');
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

  public sendemail() {
    var entity1 = {
      'emailto': this.supervisoremail,
      'emailsubject': 'Loan Application',
      'emailbody': 'Hi , <br> ' + this.employeename + ' has submitted the Loan request Please  login into DigiOffice To Approve Or Reject It.<br> Thanks <br> Team Digi-Office',
      'attachmenturl': this.Attactments,
      'cclist': this.supervisoremail,
      'bcclist': this.supervisoremail,
    }
    this.DigiofficeService.sendemail1(entity1)
      .subscribe({
        next: data => {
          debugger
          this.Attactments = [];
        }, error: (err) => {
          Swal.fire('Issue in Send Email');
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

  public cancel() {
    debugger
    location.reload();
  }

}