import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(public router: Router) { }
  roleid: any;
  UserName: any;
  company_name: any;
  role: any;
  temp: any;
  show: any;
  ngOnInit(): void {
    this.active = 0
    this.temp = sessionStorage.getItem('temp')
    this.roleid = sessionStorage.getItem('roledid');
    this.company_name = sessionStorage.getItem("company_name");
    this.UserName = sessionStorage.getItem('UserName');
    this.role = sessionStorage.getItem('role')


  }


  public highlight(evt: any) {
    debugger
    var i, tablinks;
    //  localStorage.setItem("clickname",name)
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    evt.currentTarget.className += " active";
  }


  public Adminhelp() {
    localStorage.setItem('clickname', 'PROFILE')
    this.router.navigate(['#/shared/HelpMenu']);
    this.active = 'Admin';

    // location.href='https://digipayrolllite.amazeone.co/DigiPayrollliteapi/Images/ProjectAttachments/USER MANUAL-digiPayroll-Lite-Admin_V1.0_200322.docx'
  }



  active: any
  public Profile() {
    debugger
    localStorage.setItem('clickname', 'PROFILE')
    this.router.navigate(['/CompanyDashboard']);
    this.active = 1;
  }


  public ShiftMaster() {
    debugger
    this.active = 2;
    localStorage.setItem('clickname', 'Shift Master')
    this.router.navigate(['/Shiftmasterdash']);
  }

  public SeparationType() {
    debugger
    this.active = 2;
    localStorage.setItem('clickname', 'Separation Type')
    this.router.navigate(['/SeparationTypeDash']);
  }


  public REGULARIZATION(){
    debugger
    this.active = 'Regularize';
    localStorage.setItem('clickname', 'Regularize')
    this.router.navigate(['/RegularisationDetails']);
  }


  public Department() {
    debugger
    this.active = 2;
    localStorage.setItem('clickname', 'DEPARTMENT')
    this.router.navigate(['/Department']);
  }

  public ShiftDetails() {
    debugger
    this.active = 'weeklyshift';
    localStorage.setItem('clickname', 'DEPARTMENT')
    this.router.navigate(['/manager/WeeklyShift']);
  }
  public SUPPORT() {
    debugger
    this.active = 'SUPPORT';
    localStorage.setItem('clickname', 'SUPPORT')
    this.router.navigate(['#/shared/SupportTicketDashboard']);
  }



  public LoanMasterDash() {
    debugger
    this.active = 'LoanMasterDash';
    localStorage.setItem('clickname', 'LOAN MASTER')
    this.router.navigate(['/LoanMasterDash']);
  }
  public CheckList() {
    debugger
    this.active = 'Checklist';
    localStorage.setItem('clickname', 'Pre-Employment Check List')
    this.router.navigate(['/Onboardingchecklistmaster']);
  }
  public NewJoinees() {
    debugger
    this.active = 'NewJoinees';
    localStorage.setItem('clickname', 'New Joinees')
    this.router.navigate(['/Newjoineesforhr']);
  }
  public Orientaiondocumnets() {
    debugger
    this.active = 'Orientaiondocumnets';
    localStorage.setItem('clickname', 'New Joinees')
    this.router.navigate(['/Orientaiondocumnets']);
  }

  public Onboardingstatus() {
    debugger
    this.active = 'Orientaiondocumnets';
    localStorage.setItem('clickname', 'Onboarding Status')
    this.router.navigate(['/Onboardingstatus']);
  }

  public OrientationSession() {
    debugger
    this.active = 'OrientationSession';
    localStorage.setItem('clickname', 'Orientation Session')
    this.router.navigate(['/OrientationSessionPlanDash']);
  }



  public Teamleavedetails() {
    debugger
    this.active = 'Teamleavedetails';
    localStorage.setItem('clickname', 'Team Leave Details')
    this.router.navigate(['/teamleavedetails']);
  }
  public leaveelection() {
    debugger
    this.active = 'leaveelection';
    localStorage.setItem('clickname', 'Leave Election')
    this.router.navigate(['/leaveelection']);
  }


  public Bank() {
    debugger
    this.active = 3;
    localStorage.setItem('clickname', 'BANK')
    this.router.navigate(['/Bank']);
  }

  public PayGroup() {
    debugger
    this.active = 4;
    localStorage.setItem('clickname', 'PAYGROUP')
    this.router.navigate(['/PayGroup']);
  }
  public UploadLeaveDetails() {
    debugger
    this.active = 'UploadLeaveDetails';
    localStorage.setItem('clickname', 'Upload Leave Details')
    this.router.navigate(['/LeaveDetailsupload']);
  }

  public OtRates() {
    debugger
    localStorage.setItem('clickname', 'OT RATES')
    this.router.navigate(['/OtRates']);
  }
  public TaxTable() {
    debugger
    this.active = 6;
    localStorage.setItem('clickname', 'TAXTABLE')
    this.router.navigate(['/TaxTable']);
  }

  public BarangayMaster() {
    debugger
    this.active = 'BarangayMaster';
    localStorage.setItem('clickname', 'BARANGAY MASTER')
    this.router.navigate(['/BarangayDash']);

  }
  public AnnualTaxtable() {
    debugger
    this.active = 7;
    localStorage.setItem('clickname', 'ANNUAL TAXTABLE')
    this.router.navigate(['/TaxtableAnnual']);
  }
  public PhillHealth() {
    debugger
    this.active = 8;
    localStorage.setItem('clickname', 'PHILHEALTH')
    this.router.navigate(['/PhillHealth']);
  }
  public SSS() {
    debugger
    this.active = 9;
    localStorage.setItem('clickname', 'SSS')
    this.router.navigate(['/SSS']);
  }
  public EmployeeDashboard() {
    debugger
    this.active = 10;
    localStorage.setItem('clickname', 'EMPLOYEE')
    this.router.navigate(['/EmployeeDashboard']);
  }

  public LeaveTypeDashboard() {
    debugger
    this.active = 11;
    localStorage.setItem('clickname', 'LEAVE ENTITLEMENT ')
    this.router.navigate(['/LeaveTypeDashboard']);
  }
  public Salarydetailsdash() {
    debugger
    this.active = 12;
    localStorage.setItem('clickname', 'STAFF SALARY')
    this.router.navigate(['/Salarydetailsdash']);
  }
  public CountryMasterDash() {
    debugger
    this.active = 13;
    localStorage.setItem('clickname', 'COUNTRY MASTER')
    this.router.navigate(['/CountryMasterDash']);
  }
  public StateMasterDash() {
    debugger
    this.active = 14;
    localStorage.setItem('clickname', 'PROVINCE MASTER')
    this.router.navigate(['/StateMasterDash']);
  }
  public CityMasterDash() {
    debugger
    this.active = 15;
    localStorage.setItem('clickname', 'CITY MASTER')
    this.router.navigate(['/CityMasterDash']);
  }
  public BenefitDashboard() {
    debugger
    this.active = 16;
    localStorage.setItem('clickname', 'BENEFITS MASTER')
    this.router.navigate(['/Benfitsdashbord']);
  }
  public DeminimsDashboard() {
    debugger
    this.active = 17;
    localStorage.setItem('clickname', 'DEMINIMS MASTER')
    this.router.navigate(['/DeminimsDashboard']);
  }
  public EmployeeBenefits() {
    debugger
    this.active = 18;
    localStorage.setItem('clickname', 'EMPLOYEE BENEFITS')
    this.router.navigate(['/EmployeeBenefitDashboard']);
  }

  public Government() {
    debugger
    this.active = 25;
    localStorage.setItem('clickname', 'GOVT OR RECORDS')
    this.router.navigate(['/Government']);
  }



  // public Attendanceconfig() {
  //   debugger
  //   this.active = 91;
  //   localStorage.setItem('clickname', 'ATTENDENCE CONFIGURATION')
  //   this.router.navigate(['/AttendenceConfiguration']);
  // }

  public AssetTypeDashboard() {
    debugger
    this.active = 'AssetType';
    localStorage.setItem('clickname', 'ASSET TYPE')
    this.router.navigate(['/AssetTypeDashboard']);
  }

  public Orientation() {
    debugger
    this.active = 'Orientation';
    localStorage.setItem('clickname', 'ORIENTATION')
    this.router.navigate(['/OrientationPlanDash']);
  }



  public LeaveListDashboard() {
    debugger
    this.active = 26;
    localStorage.setItem('clickname', 'LEAVES')
    this.router.navigate(['/employee/leaves']);
  }

  // public Appliedloans() {
  //   debugger
  //   this.active = 'Appliedloans';
  //   localStorage.setItem('clickname', 'LOAN REQUEST')
  //   this.router.navigate(['/employee/loans']);
  // }

  public MyOverTimeDetails() {
    debugger
    this.active = 28;
    localStorage.setItem('clickname', 'OT Details')
    this.router.navigate(['/MyOverTimeDetails']);
  }

  public OverTimeConfig() {
    debugger
    this.active = 408;
    localStorage.setItem('clickname', 'OverTime Config')
    this.router.navigate(['/OTApprovalConfig']);
  }

  public Ammortization() {
    debugger
    this.active = 'Ammortization';
    localStorage.setItem('clickname', 'Ammortization')
    this.router.navigate(['/MonthlyAmmortizationReport']);
  }

  public LoanConfig() {
    debugger
    this.active = 'loanconfig';
    localStorage.setItem('clickname', 'Loan Config')
    this.router.navigate(['/LoanConfigurationDash']);
  }

  public PayRoll() {
    debugger
    this.active = 29;
    localStorage.setItem('clickname', 'PAYROLL RUNS')
    this.router.navigate(['/PayrollDashboard']);
  }
  public Employeetiledashboard() {
    debugger
    localStorage.setItem('clickname', 'DASHBOARD')
    this.router.navigate(['/Employeetiledashboard']);
  }
  public ManagerDashboard() {
    debugger
    this.active = 'DASHBOARD';
    localStorage.setItem('clickname', 'DASHBOARD')
    this.router.navigate(['#/manager/ManagerDashboard']);
  }
  public AttendenceDetails() {
    debugger
    this.active = 21;
    localStorage.setItem('clickname', 'ATTENDANCE')
    this.router.navigate(['/employee/attendence']);
  }
  public LeaveDashboard() {
    debugger
    this.active = 22;
    localStorage.setItem('clickname', 'LEAVE DASHBOARD')
    this.router.navigate(['/employee/leaves']);
  }

  public PayrollDashboard() {
    debugger
    this.active = 'PayrollDash';
    localStorage.setItem('clickname', 'PAYROLL DASHBOARD')
    this.router.navigate(['/PayRoll']);
  }
  public LOANS() {
    debugger
    this.active = 23;
    localStorage.setItem('clickname', 'LOANS')
    this.router.navigate(['/employee/loans']);
  }
  public OTREQUEST() {
    debugger
    this.active = 24;
    localStorage.setItem('clickname', 'OT REQUEST')
    this.router.navigate(['/employee/otrequest']);
  }


  public swal() {
    this.active = 44;
    Swal.fire({
      title: 'Access Salary',
      html: `<input type="text" id="login" class="swal2-input"  placeholder="Enter 4 Digit Pin">
    `,
      confirmButtonText: 'Submit',
      focusConfirm: false,
      preConfirm: () => {
        debugger
        const login: any = document.getElementById('login') as HTMLElement

        if (login.value == 4876) {
          location.href = '#/Salarydetailsdash';
          localStorage.setItem('clickname', 'Staff Salary')

        }
        else {
          Swal.showValidationMessage(`Please enter correct pin`)

        }
      }
    })
  }




  public openCity(evt: any) {
    var i, tablinks;

    tablinks = document.getElementsByClassName("nonactive");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    evt.currentTarget.className += " active";
  }


  public changeicon(evt: any) {
    var i, tablinks;

    tablinks = document.getElementsByClassName("icon28");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" iconblue", "");
    }

    evt.currentTarget.className += " iconblue";
  }

  public LOANSCalculator() {
    debugger
    this.active = 163;
    localStorage.setItem('clickname', 'LOAN CALCULATOR')
    this.router.navigate(['/LoanCalculator']);
  }

  public Bankadvicelist() {
    debugger
    this.active = 410;
    localStorage.setItem('clickname', 'BANK ADVICE')
    this.router.navigate(['/BankAdviceList']);
  }




  public PreliminaryReport() {
    debugger
    this.active = 'PRELIMINARY';
    localStorage.setItem('clickname', 'PRELIMINARY PAYROLL')
    this.router.navigate(['/PreliminaryReport']);
  }
  public PayrollSummaryReport() {
    debugger
    this.active = 41;
    localStorage.setItem('clickname', 'PAYROLL SUMMARY ')
    this.router.navigate(['/PayrollSummaryReport']);
  }
  public MonthlySummaryReport() {
    debugger
    this.active = 42;
    localStorage.setItem('clickname', 'MONTHLY SUMMARY')
    this.router.navigate(['/MonthlySummaryReport']);
  }
  public AdjustmentGenerateReport() {
    debugger
    this.active = 43;
    localStorage.setItem('clickname', 'ADJUSTMENT REPORT')
    this.router.navigate(['/AdjustmentGenerateReport']);
  }
  public PaySlipReport() {
    debugger
    this.active = 44;
    localStorage.setItem('clickname', 'PAYSLIP REPORT')
    this.router.navigate(['/PaySlipReport']);
  }
  public YTDReport() {
    debugger
    this.active = 45;
    localStorage.setItem('clickname', 'YTD REPORT')
    this.router.navigate(['/YTDReport']);
  }
  public YTDReportAdjustment() {
    debugger
    this.active = 'YTD';
    localStorage.setItem('clickname', 'YTD  ADJUSTMENT REPORT')
    this.router.navigate(['/YTDReportAdjustment']);
  }



  public Expenses() {
    debugger
    this.active = 1147;
    localStorage.setItem('clickname', 'Expenses')
    this.router.navigate(['/employee/expense']);
  }


  public R3Report() {
    debugger
    this.active = 'eee';
    localStorage.setItem('clickname', 'R3 REPORT')
    this.router.navigate(['/SSSR3Report']);
  }


  public Bir1603() {
    debugger
    this.active = '1603';
    localStorage.setItem('clickname', 'BIR 1603')
    this.router.navigate(['/Bir1603']);
  }


  public Bir1700() {
    debugger
    this.active = 'BIR1700';
    localStorage.setItem('clickname', 'BIR 1700')
    this.router.navigate(['/Bir1700']);
  }

  public Bir1604F() {
    debugger
    this.active = '1604F';
    localStorage.setItem('clickname', 'BIR 1604-F')
    this.router.navigate(['/Bir1604F']);
  }

  public SSSRL1Report1() {
    debugger
    this.active = 50;
    localStorage.setItem('clickname', 'R1-A REPORT')
    this.router.navigate(['/SSSRL1Report']);
  }


  // public SSSR3Report23() {
  //   debugger
  //   this.active = 648;
  //   localStorage.setItem('clickname', 'R3 REPORT')
  //   this.router.navigate(['/SSSR3Report']);
  // }
  public SSSR5Report() {
    debugger
    this.active = 48;
    localStorage.setItem('clickname', 'R5 REPORT')
    this.router.navigate(['/SSSR5Report']);
  }
  public sssbreakdown() {
    debugger
    this.active = 'sssbreakdown';
    localStorage.setItem('clickname', 'R5 REPORT')
    this.router.navigate(['/Sssbreakdown']);
  }
  public SSSML1Report() {
    debugger
    this.active = 49;
    localStorage.setItem('clickname', 'ML1 REPORT')
    this.router.navigate(['/SSSML1Report']);
  }
  public SSSRL1Report() {
    debugger
    this.active = 50;
    localStorage.setItem('clickname', 'R1-A REPORT')
    this.router.navigate(['/SSSRL1Report']);
  }

  public ER2() {
    debugger
    this.active = 53;
    localStorage.setItem('clickname', 'ER2 REPORT')
    this.router.navigate(['/ER2']);
  }
  public RFreport() {
    debugger
    this.active = 54;
    localStorage.setItem('clickname', 'RF-1 Data REPORT')
    this.router.navigate(['/RFreport']);
  }
  public RF1PDF() {
    debugger
    this.active = 55;
    localStorage.setItem('clickname', 'RF-1 PDF REPORT')
    this.router.navigate(['/RF1PDF']);
  }

  public M1mcrf() {
    debugger
    this.active = 56;
    localStorage.setItem('clickname', 'M1-1(MCRF)')
    this.router.navigate(['/M1mcrf']);
  }
  public M1excel() {
    debugger
    this.active = 57;
    localStorage.setItem('clickname', 'M1 - EXCEL')
    this.router.navigate(['/M1excel']);
  }
  public PagibigSTLRF() {
    debugger
    this.active = 58;
    localStorage.setItem('clickname', 'STLRF')
    this.router.navigate(['/PagibigSTLRF']);
  }
  public PagibigSTLRFExcel() {
    debugger
    this.active = 59;
    localStorage.setItem('clickname', 'STLRF - EXCEL')
    this.router.navigate(['/PagibigSTLRFExcel']);
  }

  public Bir1601C() {
    debugger
    this.active = 60;
    localStorage.setItem('clickname', '1601C')
    this.router.navigate(['/Bir1601C']);
  }
  public Bir1601EQ() {
    debugger
    this.active = 61;
    localStorage.setItem('clickname', '1601EQ')
    this.router.navigate(['/Bir1601EQ']);
  }
  public Bir1604C() {
    debugger
    this.active = 62;
    localStorage.setItem('clickname', '1604C')
    this.router.navigate(['/Bir1604C']);
  }
  public Bir1604CF() {
    debugger
    this.active = 63;
    localStorage.setItem('clickname', '1604CF')
    this.router.navigate(['/Bir1604CF']);
  }
  public Bir2316() {
    debugger
    this.active = 64;
    localStorage.setItem('clickname', '2316')
    this.router.navigate(['/Bir2316']);
  }

  public CertificateOfContribution() {
    debugger
    this.active = 30;
    localStorage.setItem('clickname', 'CERTIFICATE OF CONTRIBUTION')
    this.router.navigate(['/employee/contributioncertificate']);
  }
  public CertificateOfLoan() {
    debugger
    this.active = 31;
    localStorage.setItem('clickname', 'CERTIFICATION OF LOAN')
    this.router.navigate(['/employee/certificateofloan']);
  }


  public lookandfeel() {
    debugger
    this.active = 91;
    localStorage.setItem('clickname', 'LOOK AND FEEL')
    this.router.navigate(['/Lookandfeeldash']);
  }
  public SETUP() {
    debugger
    this.active = 'SETUP';
    localStorage.setItem('clickname', 'SETUP')

  }

  public Employee() {
    debugger
    this.active = 'Employee1';
    localStorage.setItem('clickname', 'Employee')

  }


  public attendance12() {
    debugger
    this.active = 'Attendance1';
    localStorage.setItem('clickname', 'Attendance')
  }
  COMPANY() {
    debugger
    this.active = 'COMPANY';
    localStorage.setItem('clickname', 'COMPANY')
  }

  public MASTER() {
    debugger
    this.active = 'MASTER';
    localStorage.setItem('clickname', 'MASTER')

  }

  CONFIGURATION() {
    debugger
    this.active = 'CONFIGURATION';
    localStorage.setItem('clickname', 'CONFIGURATION')
  }

  REQUESTS() {
    debugger
    this.active = 'REQUESTS';
    localStorage.setItem('clickname', 'REQUESTS')
  }

  public REPORTS() {
    debugger
    this.active = 'REPORTS';
    localStorage.setItem('clickname', 'REPORTS')

  }

  public PAYROLL() {
    debugger
    this.active = 'PAYROLL';
    localStorage.setItem('clickname', 'PAYROLL')

  }

  public SSSREPORT() {
    debugger
    this.active = 'SSS';
    localStorage.setItem('clickname', 'SSS')

  }


  public PHILHEALTH() {
    debugger
    this.active = 'PHILHEALTH';
    localStorage.setItem('clickname', 'PHILHEALTH')

  }

  public PAG_IBIG() {
    debugger
    this.active = 'PAG-IBIG';
    localStorage.setItem('clickname', 'PAG-IBIG')

  }

  public BIR() {
    debugger
    this.active = 'BIR';
    localStorage.setItem('clickname', 'BIR')

  }


  OTRATES() {
    debugger
    this.active = 'OTRATES';
    localStorage.setItem('clickname', 'OT RATES')
    this.router.navigate(['/OtRates']);
  }

  REFERENCES() {
    debugger
    this.active = 'REFERENCES';
    localStorage.setItem('clickname', 'REFERENCES')
  }


  public vaccinationdash() {
    debugger
    this.active = 'vaccinationdash';
    localStorage.setItem('clickname', 'VACCINATION DETAILS')
    this.router.navigate(['#/manager/Vaccinedashboard']);
  }

  public Leaveconfig() {
    debugger
    this.active = 92;
    localStorage.setItem('clickname', 'LEAVES CONFIGURATION')
    this.router.navigate(['/Leaveconfigurationdash']);
  }

  public Attendenceconfig() {
    debugger
    this.active = 93;
    localStorage.setItem('clickname', 'ATTENDANCE CONFIG')
    this.router.navigate(['/Attendenceconfigdash']);
  }

  public UploadAttendence() {
    debugger
    this.active = 94;
    localStorage.setItem('clickname', 'UPLOAD ATTENDANCE')
    this.router.navigate(['#/manager/UploadAttendence']);
  }

  public EmployeeJobHistory() {
    this.active = 216;
    localStorage.setItem('clickname', 'JOB HISTORY')
    this.router.navigate(['/EmploymentJobHistory']);

  }

  public EmployeePayslip() {
    this.active = 230;
    localStorage.setItem('clickname', 'PAYSLIP')
    this.router.navigate(['/employee/payslip']);

  }

  public EmployeeCertificate() {
    this.active = 'Employment';
    localStorage.setItem('clickname', 'EMPLOYMENT CERTIFICATE')
    this.router.navigate(['/employee/employmentcertificate']);

  }

  public Holidays() {
    this.active = 404;
    localStorage.setItem('clickname', 'HOLIDAYS')
    this.router.navigate(['/HolidayDashboard']);

  }

  public ServiceAward() {
    debugger
    this.active = 'service';
    localStorage.setItem('clickname', 'Service Awards')
    this.router.navigate(['/ServiceAwardDashboard']);
  }

  public Exitformality() {
    debugger
    this.active = 'exitformality';
    localStorage.setItem('clickname', 'EXIT FORMALITY')
    this.router.navigate(['/Exitformalityformdash']);
  }

  public BirAlphalist() {
    debugger
    this.active = 'alphalist';
    localStorage.setItem('clickname', 'ALPHALIST 7')
    this.router.navigate(['/Biralphalist7']);
  }

  public grievance() {
    debugger
    this.active = 18
    localStorage.setItem('clickname', 'Grievance Request')
    this.router.navigate(['/Grievancedash']);

  }
  public Helpdeskdash() {
    debugger
    this.active = 19;
    localStorage.setItem('clickname', 'Helpdesk Request')
    this.router.navigate(['/Helpdeskdash']);

  }

  public Positionmasterdash() {
    debugger
    this.active = 19;
    localStorage.setItem('clickname', 'Positionmasterdash')
    this.router.navigate(['/PositionDash']);

  }


  public deptmasterdash() {
    debugger
    this.active = 19;
    localStorage.setItem('clickname', 'deptmasterdash')
    this.router.navigate(['/Department']);

  }

  public expensereport() {
    debugger
    this.active = 19;
    localStorage.setItem('clickname', 'ExpenseReport')
    this.router.navigate(['/ExpenseReport']);

  }


  public ServiceAwardList() {
    debugger
    this.active = 'service';
    localStorage.setItem('clickname', 'Service Awards')
    this.router.navigate(['/ServiceAwardList']);
  }


  SERVICE() {
    debugger
    this.active = 'SERVICE';
    localStorage.setItem('clickname', '/ServiceAward')
  }

  public CUTOFFconfig() {
    debugger
    this.active = 'service';
    localStorage.setItem('clickname', 'CUTOFF CONFIG')
    this.router.navigate(['/PayrollCutOffDates']);
  }

  public Remittance() {
    debugger
    this.active = 'service';
    localStorage.setItem('clickname', 'REMITTANCE CONFIG')
    this.router.navigate(['/RemittanceConfigurationDash']);
  }

  public TAXTABLE() {
    debugger
    this.active = 'TaxTable';
    localStorage.setItem('clickname', 'ANNUAL TAX TABLE')
    this.router.navigate(['/TaxtableAnnual']);
  }

  public Overtimesummaryperemployee() {
    debugger
    this.active = 'Overtimesummaryperemployee';
    localStorage.setItem('clickname', 'OVERTIME SUMMARY')
    this.router.navigate(['/OverTimeSummaryPerEmployee']);
  }
  public Overtimesummary() {
    debugger
    this.active = 'overtimesummary';
    localStorage.setItem('clickname', 'OVERTIME SUMMARY')
    this.router.navigate(['/OvertimeSummaryreport']);
  }

  public ModifiedAttendance() {
    debugger
    this.active = 'ModifiedAttendance';
    localStorage.setItem('clickname', 'OVERTIME SUMMARY')
    this.router.navigate(['/ModifiedAttendanceReport']);
  }


  public Generalledger() {
    debugger
    this.active = 'Generalledger';
    localStorage.setItem('clickname', 'GENERAL LEDGER')
    this.router.navigate(['/GenralLedgerReport']);
  }


  public EmployeeTransition() {
    debugger
    this.active = 'transition';
    localStorage.setItem('clickname', 'EMPLOYEE TRANSITION')
    this.router.navigate(['/Employeetransitiondash']);
  }

  public salaryadjustment() {
    debugger
    this.active = 'Adjustment';
    localStorage.setItem('clickname', 'SALARY ADJUSTMENT')
    this.router.navigate(['/employee/salaryadjustment']);

  }
  

  public EmployeeResignation() {
    this.active = 'Resignation';
    localStorage.setItem('clickname', 'Employee Resignation')
    this.router.navigate(['/employee/resignation']);

  }

  public Announcement() {
    this.active = 'Announcement';
    localStorage.setItem('clickname', 'Announcement')
    this.router.navigate(['/AnnouncementDashboard']);

  }

  


}
