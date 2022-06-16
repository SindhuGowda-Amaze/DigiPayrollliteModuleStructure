import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import * as XLSX from 'xlsx';
@Component({
  selector: 'app-payslip',
  templateUrl: './payslip.component.html',
  styleUrls: ['./payslip.component.css']
})
export class PayslipComponent implements OnInit {
  result:any;
  Company_logo:any;
  employeelist:any;
  uniquelist:any;
  employeelist2:any;
  staffid:any;
  roleid:any;
  Company_Name:any;
  company_logo:any;
  Company_logo1:any;
  employeelist1:any;
  payrolltype:any;
  fullname:any;
  payrolldate:any;
  datecovered:any;
  department:any;
  role:any;
  tin:any;
  PhilHealth:any;
  SSS:any;
  hdmf:any;
  deminimisamount:any;
  BaseSalary:any;
  lopamount:any;
  sssamount:any;
  philHealthContribution:any;
  pagBig:any;
  tax:any;
  netMonthSalary:any;
  deductions:any;
  startdate:any;
  GrossSalary:any;
  enddate:any;
  semimonthly:any;
  basicday:any;
  basichour:any;
  loanpayout:any;
  nontax:any;
  deniminimis_amount:any;
  Benefits:any;
  OT:any;
  noofhours:any;
  type:any;
  sumsalry:any;
  rounoff:any;
  yearGrossSal:any;
  yearlydeminims:any;
  yearSSSRate:any;
  yeartax:any;
  yearPhilihealth:any;
  yearPagibigRate:any;
  semiadjustment:any;
  monthlysalaryperperiod:any;
  Year:any;
  OtHours:any;
  NightOtAmount:any;
  NightOtHours:any;
  regularothours:any;
  regularotamount:any;
  noofdaysinperiod:any;
  month:any;
  LoanType:any;
  Compensation:any;
  semideductions:any;
  yeargrosspaysalary:any;
    
 OTRegularExc8Hrs :any; 
 RegularNightOTExc8Hrs :any; 
 SpecialOTRegularHrs :any; 
 SpecialRegularNightOTHrs :any;
  SpecialOTRegularExc8Hrs :any; 
 SpecialRegularNightOTExc8Hrs :any;
  LegalOTRegularHrs :any;
  LegalRegularNightOTHrs :any;
  LegalOTRegularExc8Hrs :any;
  LegalRegularNightOTExc8Hrs :any;
  RestOTRegularHrs :any;
  RestRegularNightOTHrs :any;
  RestOTRegularExc8Hrs :any; 
 RestRegularNightOTExc8Hrs :any;
  LegalRestOTRegularHrs :any;
  LegalRestRegularNightOTHrs :any;
  LegalRestOTRegularExc8Hrs :any; 
 LegalRestRegularNightOTExc8Hrs :any;
  SpecialRestOTRegularHrs :any; 
 SpecialRestRegularNightOTHrs :any;
  SpecialRestOTRegularExc8Hrs :any; 
 SpecialRestRegularNightOTExc8Hrs :any;
  OTRegularExc8Amt :any;
  RegularNightOTExc8Amt :any; 
 SpecialOTRegularAmt :any; 
 SpecialRegularNightOTAmt :any; 
 SpecialOTRegularExc8Amt :any;
  SpecialRegularNightOTExc8Amt :any;
  LegalOTRegularAmt :any;
  LegalRestRegularNightOTAmt :any;
  LegalOTRegularExc8Amt :any;
  LegalRegularNightOTExc8Amt :any;
  RestOTRegularAmt :any; 
 RestRegularNightOTAmt :any; 
 RestOTRegularExc8Amt :any;
  RestRegularNightOTExc8Amt :any;
  SpecialRestOTRegularAmt :any;
  SpecialRestRegularNightOTAmt :any;
  SpecialRestOTRegularExc8Amt :any;
  SpecialRestRegularNightOTExc8Amt :any;
  LegalRegularNightOTAmt :any;
  LegalRestOTRegularAmt :any;
  LegalRestOTRegularExc8Amt :any;
  christmasbonus:any;
  salarydispute:any;
  undertimeamount:any;
  lateamount:any;
  LegalRestRegularNightOTExc8Amt : any;
  SSSSalaryLoan:any;
  SSSSalaryLoanAdjustment:any;
  PagiBigMultiPurposeLoanPayout:any;
  PagiBigMultiPurposeLoanAdjustment:any;
  PagiBigCalamityLoanPayout:any;
  PagiBigCalamityLoanAdjustment:any;
  PagiBigHouseLoanPayout:any;
  PagiBigHouseLoanAdjustment:any;
  RedundancyPay:any;
  RetranchmentPay:any;
  undertimehours:any;
  tomail:any;
  subject:any;
  message:any;
 
  constructor(private DigipayrollServiceService: DigipayrollserviceService) { }


  ngOnInit(): void {
    this.Year="";
    this.month="";
    this.payrolltype="";
    this.staffid=sessionStorage.getItem('staffid')
    this.roleid = sessionStorage.getItem('roledid');
    this.GetPayGroup();


    this.DigipayrollServiceService.GetCompanyAddressDetails().subscribe(
      data => {
        debugger
        this.result = data;
        this.Company_Name=this.result[0].company_Name
        this.company_logo = this.result[0].company_logo
      })


    
  
      this.DigipayrollServiceService.GetEmployeeSalary().subscribe(data => {
        debugger
        this.employeelist = data.filter(x=>x.id == this.staffid);
        const key = 'startdate';
  
        this.uniquelist  = [...new Map(this.employeelist.map((item: { [x: string]: any; }) =>
          [item[key], item])).values()];
        //  this.uniquelist = [...new Set(data.map(item => item))];
       
      });
   
    



  
   



  }


  public getemployeelist(startdate:any,enddate:any,payrolltype:any){
    this.DigipayrollServiceService.GetEmployeeSalary().subscribe(data => {
      debugger
      this.employeelist2 = data.filter(x=>x.startdate==startdate && x.enddate==enddate && x.payrolltype == payrolltype );
      this.payrolltype=payrolltype
    }
   
    )
  }

  public getpayslip(year:any,month:any,payrolltype:any){
    this.sumsalry=0;
    this.DigipayrollServiceService.GetEmployeeSalary().subscribe(data => {
      debugger
      this.employeelist1 = data.filter(x=>x.id==this.staffid && x.payrolltype== payrolltype && x.month==month && x.endyear==year);
      if(this.employeelist1.length==0)
      {
        Swal.fire('Details Not Found')
      }
      else
      {
        this.monthlysalaryperperiod = this.employeelist1[0].monthlysalaryperperiod,
        this.LoanType = this.employeelist1[0].loanType,
        this.christmasbonus = this.employeelist1[0].christmasbonus,
        this.fullname = this.employeelist1[0].staffname + this.employeelist1[0].lastName,
          this.payrolldate = this.employeelist1[0].enddate,
          this.OtHours = this.employeelist1[0].otHours,
          this.NightOtAmount = this.employeelist1[0].nightOtAmount,
          this.NightOtHours = this.employeelist1[0].nightOtHours,
          this.regularothours = this.employeelist1[0].regularothours,
          this.regularotamount = this.employeelist1[0].regularotamount,
          this.noofdaysinperiod = this.employeelist1[0].noofdaysinperiod,
          this.startdate = this.employeelist1[0].startdate;
        this.enddate = this.employeelist1[0].enddate,
        this.department = this.employeelist1[0].department_name,
        this.role = this.employeelist1[0].role,
        this.tin = this.employeelist1[0].employeE_TIN,
        this.SSS = this.employeelist1[0].sssno,
        this.PhilHealth = this.employeelist1[0].philhealtH_NO,
        this.hdmf = this.employeelist1[0].pagiBigAccountNo,
        this.BaseSalary = this.employeelist1[0].baseSalary, 
        this.deniminimis_amount = this.employeelist1[0].deniminimis_amount
        this.deminimisamount = this.employeelist1[0].deMINIMIS, 
        this.lopamount = this.employeelist1[0].lopamount,
        this.sssamount = this.employeelist1[0].contribution,
        this.philHealthContribution = this.employeelist1[0].philHealthContribution,
        this.pagBig = this.employeelist1[0].pagBig,
        this.tax = this.employeelist1[0].tax,
        this.netMonthSalary =  this.employeelist1[0].netMonthSalary ,
       
     
        this.salarydispute = this.employeelist1[0].salaryDisputeAmount,
        this.undertimeamount = this.employeelist1[0].undertimeamount,
        this.lateamount = this.employeelist1[0].latepunchinamt,
        this.loanpayout = this.employeelist1[0].loanpayout,
        this.GrossSalary = this.employeelist1[0].grossSalary,
        this.semimonthly = Number((this.BaseSalary/2)+this.deniminimis_amount-this.lopamount),
        this.deductions = this.semimonthly-(this.sssamount+this.philHealthContribution+this.pagBig+this.tax),
        this.nontax = (this.sssamount+this.philHealthContribution+this.pagBig+this.tax),
        this.basicday = (this.employeelist1[0].grossSalary)/30,
        this.basichour = (this.basicday)/8,
        this.Benefits = this.employeelist1[0].benefits,
        this.OT =  this.employeelist1[0].otamount,
        this.noofhours = this.employeelist1[0].noofhours,
        this.type =  this.employeelist1[0].type,
        this.sumsalry=(this.BaseSalary/31).toFixed(2),
        this.rounoff= this.monthlysalaryperperiod+this.deniminimis_amount,
        this.yearGrossSal = this.employeelist1[0].yearGrossSal,
        this.yearlydeminims = this.employeelist1[0].yearlydeminims,
        this.yearSSSRate = this.employeelist1[0].yearSSSRate,
        this.yeartax = this.employeelist1[0].yeartax,
        this.yearPhilihealth = this.employeelist1[0].yearPhilihealth,
        this.yearPagibigRate = this.employeelist1[0].yearPagibigRate,
        this.semiadjustment=  this.employeelist1[0].semiadjustment,
        this.Compensation = this.employeelist1[0].compensation,
        this.semideductions = this.employeelist1[0].deductions,
        this.yeargrosspaysalary = this.employeelist1[0].yearGrossSal.
       this.OTRegularExc8Hrs = this.employeelist1[0].otRegularExc8Hrs, 
       this.SSSSalaryLoan = this.employeelist1[0].sssSalaryLoan,
       this.SSSSalaryLoanAdjustment = this.employeelist1[0].sssSalaryLoanAdjustment,
       this.PagiBigMultiPurposeLoanPayout = this.employeelist1[0].pagiBigMultiPurposeLoanPayout,
       this.PagiBigMultiPurposeLoanAdjustment=this.employeelist1[0].pagiBigMultiPurposeLoanAdjustment,
       this.PagiBigCalamityLoanPayout = this.employeelist1[0].pagiBigCalamityLoanPayout,
       this.PagiBigCalamityLoanAdjustment = this.employeelist1[0].pagiBigCalamityLoanAdjustment,
       this.PagiBigHouseLoanPayout = this.employeelist1[0].pagiBigHouseLoanPayout,
       this.PagiBigHouseLoanAdjustment = this.employeelist1[0].pagiBigHouseLoanAdjustment,
       this.RedundancyPay = this.employeelist1[0].redundancyPay,
       this.RetranchmentPay=this.employeelist1[0].retranchmentPay,
       this.undertimehours = this.employeelist1[0].undertimehours
       this.RegularNightOTExc8Hrs=this.employeelist1[0].regularNightOTExc8Hrs, 
       this.SpecialOTRegularHrs=this.employeelist1[0].specialOTRegularHrs, 
       this.SpecialRegularNightOTHrs=this.employeelist1[0].specialRegularNightOTHrs,
       this.SpecialOTRegularExc8Hrs=this.employeelist1[0].specialOTRegularExc8Hrs, 
       this.SpecialRegularNightOTExc8Hrs=this.employeelist1[0].specialRegularNightOTExc8Hrs,
       this.LegalOTRegularHrs=this.employeelist1[0].legalOTRegularHrs,
       this.LegalRegularNightOTHrs=this.employeelist1[0].legalRegularNightOTHrs,
       this.LegalOTRegularExc8Hrs=this.employeelist1[0].legalOTRegularExc8Hrs,
       this.LegalRegularNightOTExc8Hrs=this.employeelist1[0].legalRegularNightOTExc8Hrs,
       this.RestOTRegularHrs=this.employeelist1[0].restOTRegularHrs,
       this.RestRegularNightOTHrs=this.employeelist1[0].restRegularNightOTHrs,
       this.RestOTRegularExc8Hrs=this.employeelist1[0].restOTRegularExc8Hrs, 
       this.RestRegularNightOTExc8Hrs=this.employeelist1[0].restRegularNightOTExc8Hrs,
       this.LegalRestOTRegularHrs=this.employeelist1[0].legalRestOTRegularHrs,
       this.LegalRestRegularNightOTHrs=this.employeelist1[0].legalRestRegularNightOTHrs,
       this.LegalRestOTRegularExc8Hrs=this.employeelist1[0].legalRestOTRegularExc8Hrs, 
       this.LegalRestRegularNightOTExc8Hrs=this.employeelist1[0].legalRestRegularNightOTExc8Hrs,
       this.SpecialRestOTRegularHrs=this.employeelist1[0].specialRestOTRegularHrs, 
       this.SpecialRestRegularNightOTHrs=this.employeelist1[0].specialRestRegularNightOTHrs,
       this.SpecialRestOTRegularExc8Hrs=this.employeelist1[0].specialRestOTRegularExc8Hrs, 
       this.SpecialRestRegularNightOTExc8Hrs=this.employeelist1[0].specialRestRegularNightOTExc8Hrs,
       this.OTRegularExc8Amt=this.employeelist1[0].otRegularExc8Amt,
       this.RegularNightOTExc8Amt=this.employeelist1[0].regularNightOTExc8Amt, 
       this.SpecialOTRegularAmt=this.employeelist1[0].specialOTRegularAmt, 
       this.SpecialRegularNightOTAmt=this.employeelist1[0].specialRegularNightOTAmt, 
       this.SpecialOTRegularExc8Amt=this.employeelist1[0].specialOTRegularExc8Amt,
       this.SpecialRegularNightOTExc8Amt=this.employeelist1[0].specialRegularNightOTExc8Amt,
       this.LegalOTRegularAmt=this.employeelist1[0].legalOTRegularAmt,
       this.LegalRestRegularNightOTAmt=this.employeelist1[0].legalRestRegularNightOTAmt,
       this.LegalOTRegularExc8Amt=this.employeelist1[0].legalOTRegularExc8Amt,
       this.LegalRegularNightOTExc8Amt=this.employeelist1[0].legalRegularNightOTExc8Amt,
       this.RestOTRegularAmt=this.employeelist1[0].restOTRegularAmt, 
       this.RestRegularNightOTAmt=this.employeelist1[0].restRegularNightOTAmt, 
       this.RestOTRegularExc8Amt=this.employeelist1[0].restOTRegularExc8Amt,
       this.RestRegularNightOTExc8Amt=this.employeelist1[0].restRegularNightOTExc8Amt,
       this.SpecialRestOTRegularAmt=this.employeelist1[0].specialRestOTRegularAmt,
       this.SpecialRestRegularNightOTAmt=this.employeelist1[0].specialRestRegularNightOTAmt,
       this.SpecialRestOTRegularExc8Amt=this.employeelist1[0].specialRestOTRegularExc8Amt,
       this.SpecialRestRegularNightOTExc8Amt=this.employeelist1[0].specialRestRegularNightOTExc8Amt,
       this.LegalRegularNightOTAmt=this.employeelist1[0].legalRegularNightOTAmt,
       this.LegalRestOTRegularAmt=this.employeelist1[0].legalRestOTRegularAmt,
       this.LegalRestOTRegularExc8Amt=this.employeelist1[0].legalRestOTRegularExc8Amt,
       this.LegalRestRegularNightOTExc8Amt=this.employeelist1[0].legalRestRegularNightOTExc8Amt
      }
      


    }
    )
  }

  public GetPayGroup() {
    debugger
    this.DigipayrollServiceService.GetPayGroup().subscribe(
      data => {
        debugger
        this.result = data;
      })
  }


  

  public attachments2: any = [];
  public attachments2url: any = [];

  onSelect2(event: any) {
    debugger
    console.log(event);
    this.attachments2.push(...event.addedFiles);

    this.DigipayrollServiceService.ProjectAttachments(this.attachments2).subscribe(res => {
      debugger
      this.attachments2url.push(res);
     
      debugger
    })

  }
  onRemove2(event: any) {
    debugger
    console.log(event);
    this.attachments2.splice(this.attachments2.indexOf(event), 1);
  }



  public sendmail() {
    if (this.attachments2url.length == 0) {
      this.attachments2url[0] = 'abcd';
    }
    var sm = {
      'emailto': this.tomail,
      'emailsubject': this.subject,
      'emailbody': this.message,
      'attachmenturl': this.attachments2url
    }
    this.DigipayrollServiceService.sendemail(this.tomail,this.subject,this.message).subscribe(res => {
      debugger
      
      Swal.fire('Mail Sent Successfully')
    })

 
  }


  fileName = 'Approved Applicants Reports.xlsx';
  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('downloadaplication');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }

  public convetToPDF1() {
    debugger
   
    var data: any = document.getElementById('downloadaplication1');
    html2canvas(data).then(canvas => {
   
      var margin = 5;
      var imgWidth = 208
      // var pageHeight = 295 - 10 * margin;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      var doc = new jsPDF('p', 'mm');
      var position = 0;
      while (heightLeft > 0) {

        const contentDataURL = canvas.toDataURL('image/png')
        position = heightLeft - imgHeight;

        doc.addPage();


        doc.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      
        heightLeft -= pageHeight;

      }
      doc.deletePage(1)
      doc.save('Payslip.pdf');
      
      var pdf1 = doc.output('blob');
      var file = new File([pdf1], "Application.pdf");
      this.files.push(file);
      this.DigipayrollServiceService.AttachmentsUpload(this.files).subscribe(res => {
        debugger
        this.Company_logo1 = res;
        this.InsertPayslip();
        alert("ATTACHMENT UPLOADED");
      
      })
      let body = new FormData();
      debugger
      body.append('Dan', file);
      console.log('pdf', pdf1)
    


    }).then(() => {
     
    });;
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
    this.DigipayrollServiceService.AttachmentsUpload(this.files).subscribe(res => {
      debugger
      this.InsertPayslip();
      this.Company_logo = res;
      alert("ATTACHMENT UPLOADED");
    
    })
  }



  public InsertPayslip() {
    debugger;


    var entity = {
      'Payslip': this.Company_logo,
      'StaffID': this.staffid,
      'Date': this.startdate

    }
    this.DigipayrollServiceService.InsertPayslip(entity).subscribe(data => {
      if (data != 0) {


      }

    })

  }





}
