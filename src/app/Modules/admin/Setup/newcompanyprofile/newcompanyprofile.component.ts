import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-newcompanyprofile',
  templateUrl: './newcompanyprofile.component.html',
  styleUrls: ['./newcompanyprofile.component.css']
})
export class NewcompanyprofileComponent implements OnInit {
  Countrylist:any;
  subsidiaryName:any;
  result: any;
  count: any;
  show: any;
  DOB: any;
  StateID: any;
  HRSignature:any;
  CityID: any;
  Citylist: any;
  Barangay: any;
  Provincelist: any;
    CountryID: any;
  Company_logo : any;
		  Company_Name : any;
		  Nature_Of_Business : any;
		  Address1 : any;
		  Address2: any;
		  Zipcode : any;
		  RDO : any;
		  Email : any;
		  Phone : any;
		  Password : any;
		  Fax : any;
		  Tin : any;
		  SSN_No : any;
		  PhilHealthNumber : any;
		  HDMFNumber : any;
		  Admin_AuthorisedPerson : any;
		  Admin_PositionTitle : any;
		  HR_AuthorisedPerson : any;
		  HR_PositionTitle : any;
		  Finance_AuthorisedPerson : any;
		  Finance_PositionTitle : any;
		  E_Signatory : any;
		  Work_Days_Per_Year : any;
		  Work_Days_Per_Day : any;
		  Work_Months_Per_Year : any;
		  Work_hour_Start : any;
		  Work_hour_End : any;
		  Break_Hours : any;
		  Periods_Per_Month : any;
		 
		  OverTime_Comeptition_OTRates : any;
		  RestDays : any;
		  thirteen_Month_Compuatation_Type : any;
		  thirteen_Month_Deduct_Absent : any;
		  thirteen_Month_Deduct_Late : any;
		
		  FinalPay_Deduct_Absent : any;
		  FinalPay_Deduct_Late : any;
		  Final_Pay_13th_Month : any;
		  NetPay_Threshold : any;
		  SSS_Coverage : any;
		 
		  PhilHealth_Coverage : any;
		
		  HDMF : any;
		  HDMF_Employer_Contribution : any;
		  PayRoll_Calender : any;
		  Tax_Table : any;
		  Tax_Table_Starts_on : any;
		  Tax_Table_Including_13thmonth : any;
		  Non_Tax_Essential_Sealing : any;
		  Deminimis_Exemption : any;

      OverTime_Comeptition_Optional: any
      OverTime_Comeptition_Optional_BasicSalary:any
      OverTime_Comeptition_Optional_Deminimis:any
      OverTime_Comeptition_Optional_ECOLA:any
      OverTime_Comeptition_Optional_Allowance:any
      OverTime_Comeptition_Optional_Reimbursement:any
     
      
      Late_Deduction : any
      Late_Deduction_BasicSalary:any
      Late_Deduction_Deminimis:any
      Late_Deduction_ECOLA:any
      Late_Deduction_Allowance:any
      Late_Deduction_Reimbursement:any
      Late_Deduction_bonus:any
     
      Absent_Deduction : any;
      Absent_Deduction_BasicSalary:any
      Absent_Deduction_Deminimis:any
      Absent_Deduction_ECOLA:any
      Absent_Deduction_Allowance:any
      Absent_Deduction_Reimbursement:any
      Absent_Deduction_bonus:any
     
      thirteen_Month_Optional : any;
      thirteen_Month_Optional_Basic:any
      thirteen_Month_Optional_BasicAdjustment:any
      thirteen_Month_Optional_OverTime:any
      thirteen_Month_Optional_Deminimis:any
      thirteen_Month_Optional_Bonus:any
      thirteen_Month_Optional_Commission:any
      thirteen_Month_Optional_ECOLA:any
      thirteen_Month_Optional_OtherTaxableIncome:any
      thirteen_Month_Optional_Allowance:any
      thirteen_Month_Optional_Reimbursement:any
      thirteen_Month_Optional_SalaryAdjustment:any
     
      SSS_Optional : any;
      SSS_Optional_BasicSalary:any
      SSS_Optional_OverTime:any
      SSS_Optional_ECOLA:any
      SSS_Optional_Deminimis:any
      SSS_Optional_Absent_late:any
      SSS_Optional_Allowance:any
      SSS_Optional_Bonuses:any
      SSS_Optional_SalaryAdjustment:any
      SSS_Optional_Reimbursement:any
      SSS_Optional_Commission:any
     
      PhilHealth_Optional : any;
      PhilHealth_Optional_BasicSalary:any
      PhilHealth_Optional_OverTime:any
      PhilHealth_Optional_ECOLA:any
      PhilHealth_Optional_Deminimis:any
      PhilHealth_Optional_Absent_late:any
      PhilHealth_Optional_Allowance:any
      PhilHealth_Optional_Bonuses:any
      PhilHealth_Optional_SalaryAdjustment:any
      PhilHealth_Optional_Reimbursement:any
      PhilHealth_Optional_Commission:any
		  id:any;
      OT_Rates_RD : any;
OT_Rates_SH : any;
OT_Rates_LH : any;
OT_Rates_SHRD : any;
OT_Rates_LHRD : any;
OT_Rates_DHRD : any;
OT_Rates_OrdOT : any;
OT_Rates_RDOT : any;
OT_Rates_SHOT : any;
OT_Rates_LHOT : any;
OT_Rates_SHRDOT : any;
OT_Rates_LHRDOT : any;
OT_Rates_DHOT : any;
OT_Rates_DHRDOT : any;
OT_Rates_OrdND : any;
OT_Rates_RDND : any;
OT_Rates_SHND : any;
OT_Rates_LHND : any;
OT_Rates_SHRDND : any;
OT_Rates_LHRDND : any;
OT_Rates_DHND : any;
OT_Rates_DHRDND : any;
OT_Rates_OrdNDOT : any;
OT_Rates_RDNDOT : any;
OT_Rates_SHNDOT : any;
OT_Rates_LHNDOT : any;
OT_Rates_SHRDNDOT : any;
OT_Rates_LHRDNDOT : any;
OT_Rates_DHNDOT : any;
OT_Rates_DHRDNDOT : any;
RestDaysMonday : any;
RestDaysTuesday : any;
RestDaysWednesday : any;
RestDaysThursday : any;
RestDaysFriday : any;
RestDaysSaturday : any;
RestDaysSunday : any;
NewHireProratedComputationBasicSalary : any;
NewHireProratedComputationDeminimis : any;
NewHireProratedComputationAllowance : any;
NewHireProratedComputationReimbursement : any;
NewHireProratedComputationECOLA : any;
ProratedDaily : any;
Proratedabsent : any;
MonthComputationAdvanced : any;
MonthComputationFullSalary : any;
ComputationBasic : any;
ComputationBasicAdjustment : any;
ComputationTaxable : any;
ComputationOverTime : any;
ComputationAllowance : any;
ComputationDeminimis : any;
ComputationReimbursable : any;
ComputationBonus : any;
ComputationSalary : any;
ComputationCommission : any;
OT_Rates_DH : any;
ComputationECOLA : any;

monday:any;
tuesday:any;
wednesday:any;
thursday:any;
friday:any;
saturday:any;
sunday:any;

ord_ot: any;
ord_nd: any;
ord_nd_ot: any;
rd: any;
rd_ot: any;
rd_nd: any;
rd_nd_ot: any;
sh: any;
sh_ot: any;
sh_nd: any;
sh_nd_ot: any;
lh: any;
lh_ot: any;
lh_nd: any;
lh_nd_ot: any;
sh_rd: any;
sh_rd_ot: any;
sh_rd_nd: any;
sh_rd_nd_ot: any;
lh_rd: any;
lh_rd_ot: any;
lh_rd_nd: any;
lh_rd_nd_ot: any;
dh: any;
dh_ot: any;
dh_nd: any;
dh_nd_ot: any;
dh_rd: any;
dh_rd_ot: any;
dh_rd_nd: any;
dh_rd_nd_ot: any;
Absent_Deduction_Bonus:any;
Late_Deduction_Basic_Salary:any;
Late_Deduction_Bonus:any;
CompanyId:any;
Basic_Salary:any;
companyid1:any;
AdminSignature:any;
  currentUrl: any;


  constructor(private ActivatedRoute: ActivatedRoute, private DigipayrollserviceService: DigipayrollserviceService) { }
 
  ngOnInit(): void {
    this.currentUrl = window.location.href;

    this.ActivatedRoute.params.subscribe(params=>{
      debugger
       this.id=params["id"];
       if(this.id!=null&&this.id!=undefined){  
         debugger
      this.GetCompanyProfile();
      this.GetCompany_PayrollComputation();
      this.GetCompanyWorkPolicy();
      this.GetCompanyTaxComputation();
      this.GetCompany_GovernmentComputation();
    
       }
      })


      this.DigipayrollserviceService.GetCountryType()
      
      .subscribe({
        next: data => {
          debugger
          debugger
        this.Countrylist = data
        }, error: (err) => {
          Swal.fire('Issue in GetCountryType');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigipayrollserviceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )}
      })
      
 
  }
  

  GetCompanyProfile() {
    debugger
    this.show=1;
    this.DigipayrollserviceService.GetCompanyAddressDetails()
    
    .subscribe({
      next: data => {
        debugger
        this.result = data;
        this.result=this.result.filter((x: { id: any; })=>x.id==Number(this.id));
        this.Company_logo=this.result[0].company_Logo;
        this.Company_Name=this.result[0].company_Name;
        this.Nature_Of_Business=this.result[0].nature_Of_Business;
        this.Address1=this.result[0].address1;
        this.Address2=this.result[0].address2;
        this.Zipcode=this.result[0].zipcode;
        this.RDO=this.result[0].rdo;
        this.Email=this.result[0].email;
        this.Phone=this.result[0].phone;
        this.Password=this.result[0].password;
        this.Fax=this.result[0].fax;
        this.Tin=this.result[0].tin;
        this.SSN_No=this.result[0].ssN_No;
        this.PhilHealthNumber=this.result[0].philHealthNumber;
        this.HDMFNumber=this.result[0].hdmfNumber;
        this.Admin_AuthorisedPerson=this.result[0].admin_AuthorisedPerson;
        this.Admin_PositionTitle=this.result[0].admin_PositionTitle;
        this.HR_AuthorisedPerson=this.result[0].hR_AuthorisedPerson;
        this.HR_PositionTitle=this.result[0].hR_PositionTitle;
        this.Finance_AuthorisedPerson=this.result[0].finance_AuthorisedPerson;
        this.Finance_PositionTitle=this.result[0].finance_PositionTitle;
        this.E_Signatory=this.result[0].e_Signatory;
        this.subsidiaryName=this.result[0].subsidiaryName;
        this.CountryID = this.result[0].countryID,
        this.StateID=this.result[0].stateID,
        this.CityID=this.result[0].cityID,
        this.Barangay = this.result[0].barangay,
        this.AdminSignature = this.result[0].finance_AuthorisedPerson_Signature,
        this.HRSignature = this.result[0].hR_AuthorisedPerson_Signature
        this.getstate();
        this.getcity();
      }, error: (err) => {
        Swal.fire('Issue in GetCompanyAddressDetails');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.DigipayrollserviceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )}
    })
    
  
 
  }

 public getstate()
  {
    this.DigipayrollserviceService.GetStateType()
    
    .subscribe({
      next: data => {
        debugger
        debugger
        this.Provincelist = data.filter(x => x.countryID == this.CountryID);
      }, error: (err) => {
        Swal.fire('Issue in GetStateType');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.DigipayrollserviceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )}
    })
    
    

  }

  public getcity(){
    this.DigipayrollserviceService.GetCityType()
    
    .subscribe({
      next: data => {
        debugger
        this.Citylist = data.filter(x => x.stateID == this.StateID);
      }, error: (err) => {
        Swal.fire('Issue in Deleting Hoilday');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.DigipayrollserviceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )}
    })
    
    
    

  }

  
  GetCompanyWorkPolicy() {
    this.DigipayrollserviceService.GetCompanyWorkPolicy()
    
    .subscribe({
      next: data => {
        debugger
        this.result = data;
        this.result=this.result.filter((x: { companyId: any; })=>x.companyId==Number(this.id));
        this.Work_Days_Per_Year=this.result[0].work_Days_Per_Year;
        this.Work_Days_Per_Day=this.result[0].work_Days_Per_Day;
        this.Work_Months_Per_Year=this.result[0].work_Months_Per_Year;
        this.Work_hour_Start=this.result[0].work_hour_Start;
        this.Work_hour_End=this.result[0].work_hour_End;
        this.Break_Hours = this.result[0].break_Hours;
      
      }, error: (err) => {
        Swal.fire('Issue in GetCompanyWorkPolicy');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.DigipayrollserviceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )}
    })
    
    
    
  }

  GetCompanyTaxComputation() {
    this.DigipayrollserviceService.GetCompanyTaxComputation()
    
    .subscribe({
      next: data => {
        debugger
        this.result = data;
		this.result=this.result.filter((x: { companyId: any; })=>x.companyId==Number(this.id));
		// this.Tax_Table=this.result[0].tax_Table;
		// this.Tax_Table_Starts_on=this.result[0].tax_Table_Starts_on;
		// this.Tax_Table_Including_13thmonth=this.result[0].tax_Table_Including_13thmonth;
		this.Non_Tax_Essential_Sealing=this.result[0].non_Tax_Essential_Sealing;
		this.Deminimis_Exemption=this.result[0].deminimis_Exemption;
    this.PayRoll_Calender=this.result[0].payRoll_Calender;
      }, error: (err) => {
        Swal.fire('Issue in GetCompanyTaxComputation');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.DigipayrollserviceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )}
    })
    
    
 
  }

  GetCompany_GovernmentComputation() {
    this.DigipayrollserviceService.GetCompany_GovernmentComputation()
    
    .subscribe({
      next: data => {
        debugger
        debugger
        this.result = data;
        this.result=this.result.filter((x: { companyId: any; })=>x.companyId==Number(this.id));
        this.SSS_Coverage=this.result[0].sss_Coverage;
        this.SSS_Optional=this.result[0].sss_Optional;
        this.PhilHealth_Coverage=this.result[0].philHealth_Coverage;
        this.PhilHealth_Optional=this.result[0].philHealth_Optional;
        this.HDMF=this.result[0].hdmf;
        this.HDMF_Employer_Contribution = this.result[0].hdmf_Employer_Contribution;
        // this.PayRoll_Calender = this.result[0].payRoll_Calender;
      }, error: (err) => {
        Swal.fire('Issue in GetCompany_GovernmentComputation');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.DigipayrollserviceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )}
    })
    

    
  }

  GetCompany_PayrollComputation() {
    this.DigipayrollserviceService.GetCompany_PayrollComputation()
    .subscribe({
      next: data => {
          debugger
      this.result = data;
      this.result=this.result.filter((x: { companyId: any; })=>x.companyId==Number(this.id));
  
  this.Absent_Deduction_BasicSalary =    this.result[0].absent_Deduction_BasicSalary ,
  this.Absent_Deduction_Deminimis =this.result[0].absent_Deduction_Deminimis ,
  this.Absent_Deduction_Allowance =this.result[0].absent_Deduction_Allowance ,
  this.Absent_Deduction_Reimbursement =this.result[0].absent_Deduction_Reimbursement ,
  this.Absent_Deduction_ECOLA =this.result[0].absent_Deduction_ECOLA ,
  this.Absent_Deduction_Bonus  =this.result[0].absent_Deduction_Bonus  ,
  this.Late_Deduction_Basic_Salary =this.result[0].late_Deduction_Basic_Salary ,
  this.Late_Deduction_Deminimis =this.result[0].late_Deduction_Deminimis ,
  this.Late_Deduction_Allowance =this.result[0].late_Deduction_Allowance ,
  this.Late_Deduction_Reimbursement =this.result[0].late_Deduction_Reimbursement ,
  this.Late_Deduction_ECOLA =this.result[0].late_Deduction_ECOLA ,
  this.Late_Deduction_Bonus =this.result[0].late_Deduction_Bonus ,
  this.Final_Pay_13th_Month=this.result[0].final_Pay_13th_Month,
  this.FinalPay_Deduct_Late=this.result[0].finalPay_Deduct_Late,
  this.FinalPay_Deduct_Absent=this.result[0].finalPay_Deduct_Absent,
  this.OT_Rates_RD =this.result[0].oT_Rates_RD ,
  this.OT_Rates_SH =this.result[0].oT_Rates_SH ,
  this.OT_Rates_LH =this.result[0].oT_Rates_LH ,
  this.OT_Rates_SHRD =this.result[0].oT_Rates_SHRD ,
  this.OT_Rates_LHRD =this.result[0].oT_Rates_LHRD ,
  this.OT_Rates_DHRD =this.result[0].oT_Rates_DHRD ,
  this.OT_Rates_OrdOT =this.result[0].oT_Rates_OrdOT ,
  this.OT_Rates_RDOT =this.result[0].oT_Rates_RDOT ,
  this.OT_Rates_SHOT =this.result[0].oT_Rates_SHOT ,
  this.OT_Rates_LHOT =this.result[0].oT_Rates_LHOT ,
  this.OT_Rates_SHRDOT =this.result[0].oT_Rates_SHRDOT ,
  this.OT_Rates_LHRDOT =this.result[0].oT_Rates_LHRDOT ,
  this.OT_Rates_DHOT =this.result[0].oT_Rates_DHOT ,
  this.OT_Rates_DHRDOT =this.result[0].oT_Rates_DHRDOT ,
  this.OT_Rates_OrdND =this.result[0].oT_Rates_OrdND ,
  this.OT_Rates_RDND =this.result[0].oT_Rates_RDND ,
  this.OT_Rates_SHND =this.result[0].oT_Rates_SHND ,
  this.OT_Rates_LHND =this.result[0].oT_Rates_LHND ,
  this.OT_Rates_SHRDND =this.result[0].oT_Rates_SHRDND ,
  this.OT_Rates_LHRDND =this.result[0].oT_Rates_LHRDND ,
  this.OT_Rates_DHND =this.result[0].oT_Rates_DHND ,
  this.OT_Rates_DHRDND =this.result[0].oT_Rates_DHRDND ,
  this.OT_Rates_OrdNDOT =this.result[0].oT_Rates_OrdNDOT ,
  this.OT_Rates_RDNDOT =this.result[0].oT_Rates_RDNDOT ,
  this.OT_Rates_SHNDOT =this.result[0].oT_Rates_SHNDOT ,
  this.OT_Rates_LHNDOT =this.result[0].oT_Rates_LHNDOT ,
  this.OT_Rates_SHRDNDOT =this.result[0].oT_Rates_SHRDNDOT ,
  this.OT_Rates_LHRDNDOT =this.result[0].oT_Rates_LHRDNDOT ,
  this.OT_Rates_DHNDOT =this.result[0].oT_Rates_DHNDOT ,
  this.OT_Rates_DHRDNDOT =this.result[0].oT_Rates_DHRDNDOT ,
  this.RestDaysMonday =this.result[0].restDaysMonday ,
  this.RestDaysTuesday =this.result[0].restDaysTuesday ,
  this.RestDaysWednesday =this.result[0].restDaysWednesday ,
  this.RestDaysThursday =this.result[0].restDaysThursday ,
  this.RestDaysFriday =this.result[0].restDaysFriday ,
  this.RestDaysSaturday =this.result[0].restDaysSaturday ,
  this.RestDaysSunday =this.result[0].restDaysSunday ,
  this.NewHireProratedComputationBasicSalary =this.result[0].newHireProratedComputationBasicSalary ,
  this.NewHireProratedComputationDeminimis =this.result[0].newHireProratedComputationDeminimis ,
  this.NewHireProratedComputationAllowance =this.result[0].newHireProratedComputationAllowance ,
  this.NewHireProratedComputationReimbursement =this.result[0].newHireProratedComputationReimbursement ,
  this.NewHireProratedComputationECOLA =this.result[0].newHireProratedComputationECOLA ,
  this.ProratedDaily =this.result[0].proratedDaily ,
  this.Proratedabsent =this.result[0].proratedabsent ,
  this.MonthComputationAdvanced =this.result[0].monthComputationAdvanced ,
  this.MonthComputationFullSalary =this.result[0].monthComputationFullSalary ,
  this.ComputationBasic =this.result[0].computationBasic ,
  this.ComputationBasicAdjustment =this.result[0].computationBasicAdjustment ,
  this.ComputationTaxable =this.result[0].computationTaxable ,
  this.ComputationOverTime =this.result[0].computationOverTime ,
  this.ComputationAllowance =this.result[0].computationAllowance ,
  this.ComputationDeminimis =this.result[0].computationDeminimis ,
  this.ComputationReimbursable =this.result[0].computationReimbursable ,
  this.ComputationBonus =this.result[0].computationBonus ,
  this.ComputationSalary =this.result[0].computationSalary ,
  this.ComputationCommission =this.result[0].computationCommission ,
  this.OT_Rates_DH =this.result[0].oT_Rates_DH ,
  this.ComputationECOLA = this.result[0].computationECOLA 
  this.thirteen_Month_Compuatation_Type = this.result[0].thirteen_Month_Compuatation_Type 
  this.thirteen_Month_Deduct_Late =  this.result[0].thirteen_Month_Deduct_Late 
  this.thirteen_Month_Deduct_Absent = this.result[0].thirteen_Month_Deduct_Absent
  this.Periods_Per_Month=this.result[0].periods_Per_Month
      
        
      }, error: (err) => {
        Swal.fire('Issue in GetCompany_PayrollComputation');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.DigipayrollserviceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )}
    })
    
  
  }



 
   onSave(){
    var json = {
     
       "company_Logo": this.Company_logo,
       "company_Name": this.Company_Name,
       "nature_Of_Business": this.Nature_Of_Business,
       "address1": this.Address1,
       "address2": this.Address2,
       "zipcode": this.Zipcode, 
       "rdo": this.RDO, 
       "email": this.Email, 
       "phone": this.Phone,
       "password": this.Password, 
       "fax": this.Fax, 
       "tin": this.Tin, 
       "ssN_No": this.SSN_No ,
       "philHealthNumber": this.PhilHealthNumber, 
       "hdmfNumber": this.HDMFNumber, 
       "admin_AuthorisedPerson": this.Admin_AuthorisedPerson, 
       "admin_PositionTitle": this.Admin_PositionTitle, 
       "hR_AuthorisedPerson": this.HR_AuthorisedPerson, 
       "hR_PositionTitle": this.HR_PositionTitle, 
       "finance_AuthorisedPerson": this.Finance_AuthorisedPerson,
       "finance_PositionTitle": this.Finance_PositionTitle, 
       "subsidiaryName":this.subsidiaryName,
       "e_Signatory":this.E_Signatory,
       "countryID":this.CountryID,
       "stateID":this.StateID,
       "cityID":this.CityID,
       "barangay":this.Barangay
      
     };
     this.DigipayrollserviceService.InsertCompany_AddressDetails(json)
     
     .subscribe({
      next: data => {
        debugger
        this.companyid1= data;
        Swal.fire("Successfully Saved!!");
      }, error: (err) => {
        Swal.fire('Issue in Deleting Hoilday');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.DigipayrollserviceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )}
    })
     
 
     
     
 
   }
 
 
   InsertCompany_WorkPolicy(){
     var json = {
       "CompanyId": this.companyid1,
      "work_Days_Per_Year": this.Work_Days_Per_Year, 
      "work_Days_Per_Day": this.Work_Days_Per_Day, 
      "work_Months_Per_Year": this.Work_Months_Per_Year, 
      "work_hour_Start": this.Work_hour_Start,
      "work_hour_End": this.Work_hour_End, 
      "break_Hours": this.Break_Hours,
     }
     this.DigipayrollserviceService.InsertCompany_WorkPolicy(json)
     
     .subscribe({
      next: data => {
        debugger
        let id = data;
        Swal.fire("Successfully Saved!!");
      }, error: (err) => {
        Swal.fire('Issue in Deleting Hoilday');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.DigipayrollserviceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )}
    })

   }

  
   InsertCompany_PayrollComputation(){
     var json={
      Periods_Per_Month:this.Periods_Per_Month,
      Absent_Deduction:this.Absent_Deduction,
      Late_Deduction:this.Late_Deduction,
      OverTime_Comeptition_Optional:this.OverTime_Comeptition_Optional,
      OverTime_Comeptition_OTRates:this.OverTime_Comeptition_OTRates,
      RestDays:this.RestDays,
      thirteen_Month_Compuatation_Type:this.thirteen_Month_Compuatation_Type,
      thirteen_Month_Deduct_Absent:this.thirteen_Month_Deduct_Absent,
      thirteen_Month_Deduct_Late:this.thirteen_Month_Deduct_Late,
      thirteen_Month_Optional:this.thirteen_Month_Optional,
      FinalPay_Deduct_Absent:this.FinalPay_Deduct_Absent,
      FinalPay_Deduct_Late:this.FinalPay_Deduct_Late,
      Final_Pay_13th_Month:this.Final_Pay_13th_Month,
      NetPay_Threshold:this.NetPay_Threshold,
      Absent_Deduction_BasicSalary:this.Absent_Deduction_BasicSalary ,
      Absent_Deduction_Deminimis:this.Absent_Deduction_Deminimis ,
      Absent_Deduction_Allowance:this.Absent_Deduction_Allowance ,
      Absent_Deduction_Reimbursement:this.Absent_Deduction_Reimbursement ,
      Absent_Deduction_ECOLA:this.Absent_Deduction_ECOLA ,
      Absent_Deduction_Bonus:this.Absent_Deduction_Bonus  ,
      Late_Deduction_Basic_Salary:this.Late_Deduction_Basic_Salary ,
      Late_Deduction_Deminimis:this.Late_Deduction_Deminimis ,
      Late_Deduction_Allowance:this.Late_Deduction_Allowance ,
      Late_Deduction_Reimbursement:this.Late_Deduction_Reimbursement ,
      Late_Deduction_ECOLA:this.Late_Deduction_ECOLA ,
      Late_Deduction_Bonus:this.Late_Deduction_Bonus ,
      OT_Rates_RD:this.OT_Rates_RD ,
      OT_Rates_SH:this.OT_Rates_SH ,
      OT_Rates_LH:this.OT_Rates_LH ,
      OT_Rates_SHRD:this.OT_Rates_SHRD ,
      OT_Rates_LHRD:this.OT_Rates_LHRD ,
      OT_Rates_DHRD:this.OT_Rates_DHRD ,
      OT_Rates_OrdOT:this.OT_Rates_OrdOT ,
      OT_Rates_RDOT:this.OT_Rates_RDOT ,
      OT_Rates_SHOT:this.OT_Rates_SHOT ,
      OT_Rates_LHOT:this.OT_Rates_LHOT ,
      OT_Rates_SHRDOT:this.OT_Rates_SHRDOT ,
      OT_Rates_LHRDOT:this.OT_Rates_LHRDOT ,
      OT_Rates_DHOT:this.OT_Rates_DHOT ,
      OT_Rates_DHRDOT:this.OT_Rates_DHRDOT ,
      OT_Rates_OrdND:this.OT_Rates_OrdND ,
      OT_Rates_RDND :this.OT_Rates_RDND ,
      OT_Rates_SHND:this.OT_Rates_SHND ,
      OT_Rates_LHND:this.OT_Rates_LHND ,
      OT_Rates_SHRDND:this.OT_Rates_SHRDND ,
      OT_Rates_LHRDND:this.OT_Rates_LHRDND ,
      OT_Rates_DHND:this.OT_Rates_DHND ,
      OT_Rates_DHRDND:this.OT_Rates_DHRDND ,
      OT_Rates_OrdNDOT:this.OT_Rates_OrdNDOT ,
      OT_Rates_RDNDOT:this.OT_Rates_RDNDOT ,
      OT_Rates_SHNDOT:this.OT_Rates_SHNDOT ,
      OT_Rates_LHNDOT:this.OT_Rates_LHNDOT ,
      OT_Rates_SHRDNDOT:this.OT_Rates_SHRDNDOT ,
      OT_Rates_LHRDNDOT:this.OT_Rates_LHRDNDOT ,
      OT_Rates_DHNDOT:this.OT_Rates_DHNDOT ,
      OT_Rates_DHRDNDOT:this.OT_Rates_DHRDNDOT ,
      RestDaysMonday:this.RestDaysMonday ,
      RestDaysTuesday:this.RestDaysTuesday ,
      RestDaysWednesday:this.RestDaysWednesday ,
      RestDaysThursday:this.RestDaysThursday ,
      RestDaysFriday:this.RestDaysFriday ,
      RestDaysSaturday:this.RestDaysSaturday ,
      RestDaysSunday:this.RestDaysSunday ,
      NewHireProratedComputationBasicSalary :this.NewHireProratedComputationBasicSalary ,
      NewHireProratedComputationDeminimis:this.NewHireProratedComputationDeminimis ,
      NewHireProratedComputationAllowance:this.NewHireProratedComputationAllowance ,
      NewHireProratedComputationReimbursement:this.NewHireProratedComputationReimbursement ,
      NewHireProratedComputationECOLA:this.NewHireProratedComputationECOLA ,
      ProratedDaily:this.ProratedDaily ,
      Proratedabsent:this.Proratedabsent ,
      MonthComputationAdvanced:this.MonthComputationAdvanced ,
      MonthComputationFullSalary:this.MonthComputationFullSalary ,
      ComputationBasic:this.ComputationBasic ,
      ComputationBasicAdjustment:this.ComputationBasicAdjustment ,
      ComputationTaxable:this.ComputationTaxable ,
      ComputationOverTime :this.ComputationOverTime ,
      ComputationAllowance:this.ComputationAllowance ,
      ComputationDeminimis:this.ComputationDeminimis ,
      ComputationReimbursable:this.ComputationReimbursable ,
      ComputationBonus:this.ComputationBonus ,
      ComputationSalary:this.ComputationSalary ,
      ComputationCommission:this.ComputationCommission ,
      OT_Rates_DH:this.OT_Rates_DH ,
      ComputationECOLA :this.ComputationECOLA ,
      CompanyId: this.companyid1
      
     }

     this.DigipayrollserviceService.InsertCompany_PayrollComputation(json)
     
     
     .subscribe({
      next: data => {
        debugger
        let id = data;
        Swal.fire("Successfully Saved!!");
      }, error: (err) => {
        Swal.fire('Issue in Deleting Hoilday');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.DigipayrollserviceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )}
    })
 
     
  
   }
  
   InsertCompany_TaxComputation (){
     var json = {
      // Tax_Table:this.Tax_Table,
      // Tax_Table_Starts_on:this.Tax_Table_Starts_on,
      // Tax_Table_Including_13thmonth:this.Tax_Table_Including_13thmonth,
      Non_Tax_Essential_Sealing:this.Non_Tax_Essential_Sealing,
      Deminimis_Exemption:this.Deminimis_Exemption,
      PayRoll_Calender:this.PayRoll_Calender,
      CompanyId: this.companyid1
     }
     this.DigipayrollserviceService.InsertCompany_TaxComputation(json)
     
     .subscribe({
      next: data => {
        debugger
        let id = data;
        Swal.fire("Successfully Saved!!");
      }, error: (err) => {
        Swal.fire('Issue in InsertCompany_TaxComputation');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.DigipayrollserviceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )}
    })
     
   
   }


   InsertCompanyGovernmentComputation(){
    var json = {
      "CompanyId": this.companyid1,
      "SSS_Coverage":this.SSS_Coverage,
      "SSS_Optional":this.SSS_Optional,
      "PhilHealth_Coverage":this.PhilHealth_Coverage,
      "PhilHealth_Optional":this.PhilHealth_Optional,
      "HDMF":this.HDMF,
      "HDMF_Employer_Contribution":this.HDMF_Employer_Contribution,
      // "PayRoll_Calender":this.PayRoll_Calender
    }
    this.DigipayrollserviceService.InsertCompanyGovernmentComputation(json)
    
    
    .subscribe({
      next: data => {
        debugger
        let id = data;
        Swal.fire("Successfully Saved!!");
      }, error: (err) => {
        Swal.fire('Issue in InsertCompanyGovernmentComputation');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.DigipayrollserviceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )}
    })
    
    
 
  }
  
  onUpdate(){   
    if(this.Tin==undefined || this.Tin=="" || this.SSN_No==undefined || this.SSN_No==""|| this.PhilHealthNumber==undefined || this.PhilHealthNumber==""||this.HDMFNumber==undefined || this.HDMFNumber==""  ){
      Swal.fire('Please Fill All The Mandatory Fields')
    }
    else{
      var json = {
        // "CompanyId":this.CompanyId,
         "ID":this.id,
        "company_Logo": this.Company_logo,
        "company_Name": this.Company_Name,
        "nature_Of_Business": this.Nature_Of_Business,
        "address1": this.Address1,
        "address2": this.Address2,
        "zipcode": this.Zipcode, 
        "rdo": this.RDO, 
        "email": this.Email, 
        "phone": this.Phone,
        "password": this.Password, 
        "fax": this.Fax, 
        "tin": this.Tin, 
         "ssN_No": this.SSN_No ,
        "philHealthNumber": this.PhilHealthNumber, 
        "hdmfNumber": this.HDMFNumber, 
        "admin_AuthorisedPerson": this.Admin_AuthorisedPerson, 
        "admin_PositionTitle": this.Admin_PositionTitle, 
        "hR_AuthorisedPerson": this.HR_AuthorisedPerson, 
        "hR_PositionTitle": this.HR_PositionTitle, 
        "finance_AuthorisedPerson": this.Finance_AuthorisedPerson,
        "finance_PositionTitle": this.Finance_PositionTitle, 
        "e_Signatory":this.E_Signatory,
        "subsidiaryName":this.subsidiaryName,
        "countryID":this.CountryID,
         "stateID":this.StateID,
         "cityID":this.CityID,
         "barangay":this.Barangay,
         "HR_AuthorisedPerson_Signature": this.HRSignature ,
         "Finance_AuthorisedPerson_Signature": this.AdminSignature
        
        };
      
        this.DigipayrollserviceService.UpdateCompanyAddressDetails(json)
        
        .subscribe({
          next: data => {
            debugger
          let result = data;
          Swal.fire("Updated Sucessfully");
        location.href="#/admin/CompanyDashboard";
          }, error: (err) => {
            Swal.fire('Issue in UpdateCompanyAddressDetails');
            // Insert error in Db Here//
            var obj = {
              'PageName': this.currentUrl,
              'ErrorMessage': err.error.message
            }
            this.DigipayrollserviceService.InsertExceptionLogs(obj).subscribe(
              data => {
                debugger
              },
            )}
        })
        
 
   
    }
   
    }


    UpdateCompany_WorkPolicy(){
     
      var json = {
        "CompanyId":this.id,
        "work_Days_Per_Year": this.Work_Days_Per_Year, 
        "work_Days_Per_Day": this.Work_Days_Per_Day, 
        "work_Months_Per_Year": this.Work_Months_Per_Year, 
        "work_hour_Start": this.Work_hour_Start,
        "work_hour_End": this.Work_hour_End, 
        "break_Hours": this.Break_Hours,
       
       };
     
       this.DigipayrollserviceService.UpdateCompanyWorkPolicy(json)
       
       .subscribe({
        next: data => {
          debugger
          let result = data;
          Swal.fire("Updated Sucessfully");
        location.href="#/admin/CompanyDashboard";
        }, error: (err) => {
          Swal.fire('Issue in UpdateCompanyWorkPolicyy');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigipayrollserviceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )}
      })
       

     }

  

     UpdateCompanyPayrollComputation(){
    
      var json = {
        Periods_Per_Month:this.Periods_Per_Month,
        Absent_Deduction:this.Absent_Deduction,
        Late_Deduction:this.Late_Deduction,
        OverTime_Comeptition_Optional:this.OverTime_Comeptition_Optional,
        OverTime_Comeptition_OTRates:this.OverTime_Comeptition_OTRates,
        RestDays:this.RestDays,
        thirteen_Month_Compuatation_Type:this.thirteen_Month_Compuatation_Type,
        thirteen_Month_Deduct_Absent:this.thirteen_Month_Deduct_Absent,
        thirteen_Month_Deduct_Late:this.thirteen_Month_Deduct_Late,
        thirteen_Month_Optional:this.thirteen_Month_Optional,
        FinalPay_Deduct_Absent:this.FinalPay_Deduct_Absent,
        FinalPay_Deduct_Late:this.FinalPay_Deduct_Late,
        Final_Pay_13th_Month:this.Final_Pay_13th_Month,
        NetPay_Threshold:this.NetPay_Threshold,
        Absent_Deduction_BasicSalary:this.Absent_Deduction_BasicSalary ,
        Absent_Deduction_Deminimis:this.Absent_Deduction_Deminimis ,
        Absent_Deduction_Allowance:this.Absent_Deduction_Allowance ,
        Absent_Deduction_Reimbursement:this.Absent_Deduction_Reimbursement ,
        Absent_Deduction_ECOLA:this.Absent_Deduction_ECOLA ,
        Absent_Deduction_Bonus:this.Absent_Deduction_Bonus  ,
        Late_Deduction_Basic_Salary:this.Late_Deduction_Basic_Salary ,
        Late_Deduction_Deminimis:this.Late_Deduction_Deminimis ,
        Late_Deduction_Allowance:this.Late_Deduction_Allowance ,
        Late_Deduction_Reimbursement:this.Late_Deduction_Reimbursement ,
        Late_Deduction_ECOLA:this.Late_Deduction_ECOLA ,
        Late_Deduction_Bonus:this.Late_Deduction_Bonus ,
        OT_Rates_RD:this.OT_Rates_RD ,
        OT_Rates_SH:this.OT_Rates_SH ,
        OT_Rates_LH:this.OT_Rates_LH ,
        OT_Rates_SHRD:this.OT_Rates_SHRD ,
        OT_Rates_LHRD:this.OT_Rates_LHRD ,
        OT_Rates_DHRD:this.OT_Rates_DHRD ,
        OT_Rates_OrdOT:this.OT_Rates_OrdOT ,
        OT_Rates_RDOT:this.OT_Rates_RDOT ,
        OT_Rates_SHOT:this.OT_Rates_SHOT ,
        OT_Rates_LHOT:this.OT_Rates_LHOT ,
        OT_Rates_SHRDOT:this.OT_Rates_SHRDOT ,
        OT_Rates_LHRDOT:this.OT_Rates_LHRDOT ,
        OT_Rates_DHOT:this.OT_Rates_DHOT ,
        OT_Rates_DHRDOT:this.OT_Rates_DHRDOT ,
        OT_Rates_OrdND:this.OT_Rates_OrdND ,
        OT_Rates_RDND :this.OT_Rates_RDND ,
        OT_Rates_SHND:this.OT_Rates_SHND ,
        OT_Rates_LHND:this.OT_Rates_LHND ,
        OT_Rates_SHRDND:this.OT_Rates_SHRDND ,
        OT_Rates_LHRDND:this.OT_Rates_LHRDND ,
        OT_Rates_DHND:this.OT_Rates_DHND ,
        OT_Rates_DHRDND:this.OT_Rates_DHRDND ,
        OT_Rates_OrdNDOT:this.OT_Rates_OrdNDOT ,
        OT_Rates_RDNDOT:this.OT_Rates_RDNDOT ,
        OT_Rates_SHNDOT:this.OT_Rates_SHNDOT ,
        OT_Rates_LHNDOT:this.OT_Rates_LHNDOT ,
        OT_Rates_SHRDNDOT:this.OT_Rates_SHRDNDOT ,
        OT_Rates_LHRDNDOT:this.OT_Rates_LHRDNDOT ,
        OT_Rates_DHNDOT:this.OT_Rates_DHNDOT ,
        OT_Rates_DHRDNDOT:this.OT_Rates_DHRDNDOT ,
        RestDaysMonday:this.RestDaysMonday ,
        RestDaysTuesday:this.RestDaysTuesday ,
        RestDaysWednesday:this.RestDaysWednesday ,
        RestDaysThursday:this.RestDaysThursday ,
        RestDaysFriday:this.RestDaysFriday ,
        RestDaysSaturday:this.RestDaysSaturday ,
        RestDaysSunday:this.RestDaysSunday ,
        NewHireProratedComputationBasicSalary :this.NewHireProratedComputationBasicSalary ,
        NewHireProratedComputationDeminimis:this.NewHireProratedComputationDeminimis ,
        NewHireProratedComputationAllowance:this.NewHireProratedComputationAllowance ,
        NewHireProratedComputationReimbursement:this.NewHireProratedComputationReimbursement ,
        NewHireProratedComputationECOLA:this.NewHireProratedComputationECOLA ,
        ProratedDaily:this.ProratedDaily ,
        Proratedabsent:this.Proratedabsent ,
        MonthComputationAdvanced:this.MonthComputationAdvanced ,
        MonthComputationFullSalary:this.MonthComputationFullSalary ,
        ComputationBasic:this.ComputationBasic ,
        ComputationBasicAdjustment:this.ComputationBasicAdjustment ,
        ComputationTaxable:this.ComputationTaxable ,
        ComputationOverTime :this.ComputationOverTime ,
        ComputationAllowance:this.ComputationAllowance ,
        ComputationDeminimis:this.ComputationDeminimis ,
        ComputationReimbursable:this.ComputationReimbursable ,
        ComputationBonus:this.ComputationBonus ,
        ComputationSalary:this.ComputationSalary ,
        ComputationCommission:this.ComputationCommission ,
        OT_Rates_DH:this.OT_Rates_DH ,
        ComputationECOLA :this.ComputationECOLA ,
        "CompanyId":this.id,
       
       };
     
       this.DigipayrollserviceService.UpdateCompanyPayrollComputation(json)
       
       .subscribe({
        next: data => {
          debugger
          let result = data;
          Swal.fire("Updated Sucessfully");
        location.href="#/admin/CompanyDashboard";
        }, error: (err) => {
          Swal.fire('Issue in UpdateCompanyPayrollComputation');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigipayrollserviceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )}
      })
       

     }

     UpdateCompanyGovtComputation(){

      var json = {
        "CompanyId":this.id,
      "SSS_Coverage":this.SSS_Coverage,
      "SSS_Optional":this.SSS_Optional,
      "PhilHealth_Coverage":this.PhilHealth_Coverage,
      "PhilHealth_Optional":this.PhilHealth_Optional,
      "HDMF":this.HDMF,
      "HDMF_Employer_Contribution":this.HDMF_Employer_Contribution,
     
       
       };
     
       this.DigipayrollserviceService.UpdateCompanyGovtComputation(json)
       
       .subscribe({
        next: data => {
          debugger
          let result = data;
          Swal.fire("Updated Sucessfully");
        location.href="#/admin/CompanyDashboard";
        }, error: (err) => {
          Swal.fire('Issue in UpdateCompanyGovtComputation');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigipayrollserviceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )}
      })
   
       
      
     }


     
     UpdateCompany_TaxComputation(){

      var json = {
        // Tax_Table:this.Tax_Table,
        // Tax_Table_Starts_on:this.Tax_Table_Starts_on,
        // Tax_Table_Including_13thmonth:this.Tax_Table_Including_13thmonth,
   
        "non_Tax_Essential_Sealing":this.Non_Tax_Essential_Sealing,
        "deminimis_Exemption":this.Deminimis_Exemption,
        "payrollCalendar":this.PayRoll_Calender,
        "companyId":this.id,
       
       };
     
       this.DigipayrollserviceService.UpdateCompany_TaxComputation(json)
       
       .subscribe({
        next: data => {
          debugger
          let result = data;
          Swal.fire("Updated Sucessfully");
        location.href="#/admin/CompanyDashboard";
        }, error: (err) => {
          Swal.fire('Issue in UpdateCompany_TaxComputation');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigipayrollserviceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )}
      })
     }


     




  

    files: File[] = [];
    onSelect(event: { addedFiles: any; }) {
      debugger
      console.log(event);
      this.files.push(event.addedFiles[0]);
      this.uploadattachments();
      console.log("content", this.files);
    }
  
   
    onRemove(event:any)
    {
  debugger
  console.log(event);
  this.files.splice(this.files.indexOf(event),1);
    }
  
    public uploadattachments() {
      debugger
      this.DigipayrollserviceService.ProjectAttachments(this.files)
      
      .subscribe({
        next: data => {
          debugger
          this.Company_logo = data;
        alert("ATTACHMENT UPLOADED");
        }, error: (err) => {
          Swal.fire('Issue in Deleting Hoilday');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigipayrollserviceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )}
      })
      

    }
  
    files2: File[] = [];
    onSelect2(event: { addedFiles: any; }) {
      debugger
      console.log(event);
      this.files2.push(event.addedFiles[0]);
      this.uploadattachments2();
      console.log("content", this.files2);
    }
  
    onRemove2(event:any)
    {
  debugger
  console.log(event);
  this.files3.splice(this.files2.indexOf(event),1);
    }
  
    public uploadattachments2() {
      debugger
      this.DigipayrollserviceService.ProjectAttachments(this.files2)
      
      .subscribe({
        next: data => {
          debugger
          this.E_Signatory = data;
        alert("ATTACHMENT UPLOADED");
        }, error: (err) => {
          Swal.fire('Issue in ProjectAttachments');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigipayrollserviceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )}
      })
      
  
      
     
    }

  
  
    files3: File[] = [];
    onSelect3(event: { addedFiles: any; }) {
      debugger
      console.log(event);
      this.files3.push(event.addedFiles[0]);
      this.uploadattachments3();
      console.log("content", this.files3);
    }
  
    onRemove3(event:any)
    {
  debugger
  console.log(event);
  this.files3.splice(this.files3.indexOf(event),1);
    }
  
    public uploadattachments3() {
      debugger
      this.DigipayrollserviceService.ProjectAttachments(this.files3)
      
      .subscribe({
        next: data => {
          debugger
          this.AdminSignature = data;
          alert("ATTACHMENT UPLOADED");
        }, error: (err) => {
          Swal.fire('Issue in ProjectAttachments');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigipayrollserviceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )}
      })
      
 
  
      

    }


    files4: File[] = [];
    onSelect4(event: { addedFiles: any; }) {
      debugger
      console.log(event);
      this.files4.push(event.addedFiles[0]);
      this.uploadattachments4();
      console.log("content", this.files4);
    }
  
    onRemove4(event:any)
    {
  debugger
  console.log(event);
  this.files4.splice(this.files4.indexOf(event),1);
    }
  
    public uploadattachments4() {
      debugger
      this.DigipayrollserviceService.ProjectAttachments(this.files4)
      
      .subscribe({
        next: data => {
          debugger
          this.HRSignature = data;
          alert("ATTACHMENT UPLOADED");
        }, error: (err) => {
          Swal.fire('Issue in ProjectAttachments');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigipayrollserviceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )}
      })
      
     

    }



    
    public GetCountryID(event: any) {
      this.CountryID = event.target.value;
      this.DigipayrollserviceService.GetStateType()
      
      
      .subscribe({
        next: data => {
          debugger
          this.Provincelist = data.filter(x => x.countryID == this.CountryID)
        }, error: (err) => {
          Swal.fire('Issue in GetStateType');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigipayrollserviceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )}
      })
      
      
      
      

    }
 
    public GetProvinceID(event: any) {
      this.StateID = event.target.value;
      this.DigipayrollserviceService.GetCityType()
      
      .subscribe({
        next: data => {
          debugger
          this.Citylist = data.filter(x => x.stateID == this.StateID)
        }, error: (err) => {
          Swal.fire('Issue in GetCityType');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigipayrollserviceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )}
      })
      
      

      
      

    }
   
  
    public GetCItyID(event: any) {
      debugger
      this.CityID = event.target.value;
      if (this.CityID == 103) {
        this.show = 1;
      } else {
        this.show = 2;
      }
    } 
}

