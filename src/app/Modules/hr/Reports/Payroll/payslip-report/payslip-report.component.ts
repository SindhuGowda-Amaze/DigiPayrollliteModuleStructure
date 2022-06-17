import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payslip-report',
  templateUrl: './payslip-report.component.html',
  styleUrls: ['./payslip-report.component.css']
})
export class PayslipReportComponent implements OnInit {
  currentUrl: any;
  title:any;
  title1:any;
  stafflist1:any;
  signname:any;
  Signature:any;
  tomail:any;
  subject:any;
  message:any;
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
  noofdaysinperiod:any;
  OtHours:any;
  NightOtAmount:any;
  NightOtHours:any;
  regularothours:any;
  regularotamount:any;
  Compensation:any;
  semideductions:any;
  yeargrosspaysalary:any;
  LoanType:any;
  employeelist1:any;
  payrolltype:any;
  Department:any;
  RoleType:any;
  term:any;
  employeelist213:any;
  viewMode = 'tab1';
  result:any;
  showleaseforprint:any;
  Company_logo:any;
  employeelist:any;
  uniquelist:any;
  employeelist2:any;
  staffid:any;
  loader: any;
  roleid:any;
  Company_Name:any;
  company_logo:any;
  Company_logo1:any;
  employeelist13:any;
  uniquelist13:any;
  p: any = 1;
  count1: any = 10;
  result1:any;
  ComputationBasic:any;
  ComputationDeminimis:any;
  dollarUSLocale:any;
  Departmentlist:any;
  RoleTypeList:any;

  constructor(private DigipayrollServiceService: DigipayrollserviceService) { }
  
  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.staffid=sessionStorage.getItem('staffid')
    this.roleid = sessionStorage.getItem('roledid');
    this.getsign();
    this.GetPayGroup();
    this.dollarUSLocale = Intl.NumberFormat('en-US');

    
    this.DigipayrollServiceService.GetDepartment()
    .subscribe({
      next: data => {
        debugger
        this.Departmentlist = data;
      }, error: (err) => {
        Swal.fire('Issue in Getting Department');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    })

    
    

    this.DigipayrollServiceService.GetRoleType()
    .subscribe({
      next: data => {
        debugger
        this.RoleTypeList = data;
      }, error: (err) => {
        Swal.fire('Issue in Getting RoleType');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    })

    

    this.DigipayrollServiceService.GetCompany_PayrollComputation()
    .subscribe({
      next: data => {
        debugger
        this.result1 = data;
		
        this.ComputationBasic =this.result1[0].computationBasic ,
        this.ComputationDeminimis =this.result1[0].computationDeminimis 
      }, error: (err) => {
        Swal.fire('Issue in Getting Company_PayrollComputation');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    })

    


    this.DigipayrollServiceService.GetCompanyAddressDetails()
    .subscribe({
      next: data => {
        debugger
        this.result = data;
        this.Company_Name=this.result[0].company_Name
        this.company_logo = this.result[0].company_logo
      }, error: (err) => {
        Swal.fire('Issue in Getting City Type');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    })

    


    
    if(this.roleid=='6')
    {

      this.DigipayrollServiceService.GetEmployeeSalary().subscribe(data => {
        debugger
        this.employeelist = data.filter(x=>x.id == this.staffid);
        const key = 'startdate';
  
        this.uniquelist  = [...new Map(this.employeelist.map((item: { [x: string]: any; }) =>
          [item[key], item])).values()];
        //  this.uniquelist = [...new Set(data.map(item => item))];
       
      });
   
    }
    else{

      
    this.DigipayrollServiceService.GetEmployeeSalary().subscribe(data => {
      debugger
      this.employeelist = data;
      const key = 'startdate';

      this.uniquelist  = [...new Map(this.employeelist.map((item: { [x: string]: any; }) =>
        [item[key], item])).values()];
      //  this.uniquelist = [...new Set(data.map(item => item))];
     
    });

    this.DigipayrollServiceService.GetThirteenthMonthSalary().subscribe(data => {
      debugger
      this.employeelist13 = data;
      const key = 'year';

      this.uniquelist13  = [...new Map(this.employeelist13.map((item: { [x: string]: any; }) =>
        [item[key], item])).values()];
      //  this.uniquelist = [...new Set(data.map(item => item))];
     
    });



  
    }



  
   



  }


 

  public get13themployeelist(Year:any){
    this.DigipayrollServiceService.GetThirteenthMonthSalary().subscribe(data => {
      debugger
      this.employeelist213 = data.filter(x=>x.year==Year);
     
    }
   
    )
  }

 

 
public FilterRoleType() {
  debugger
  this.DigipayrollServiceService.GetEmployeeSalary().subscribe(data => {
    debugger
    this.employeelist2 = data.filter(x=>x.startdate==this.startdate && x.enddate==this.enddate && x.role==this.RoleType );
    
  }
 
  )
 
   
  

}


public filterByDepartment() {
  debugger
  this.DigipayrollServiceService.GetEmployeeSalary().subscribe(data => {
    debugger
    this.employeelist2 = data.filter(x=>x.startdate==this.startdate && x.enddate==this.enddate && x.department_name==this.Department );
    
  }
 
  )
  

  

}

 
  public getemployeelist(startdate:any,enddate:any,payrolltype:any){
    this.payrolltype=payrolltype
    this.startdate = startdate 
    this.enddate = enddate
    this.DigipayrollServiceService.GetEmployeeSalary().subscribe(data => {
      debugger
      this.employeelist2 = data.filter(x=>x.startdate==startdate && x.enddate==enddate );
      
    }
   
    )
  }

  // public show(){
  //   debugger;
  //   this.showleaseforprint = 1;
  //   this.convetToPDF1();
  // }


  
  public getpayslip(id:any,payrolltype:any,month:any){
    this.sumsalry=0;
    this.showleaseforprint=1;
    this.DigipayrollServiceService.GetEmployeeSalary()
    .subscribe({
      next: data => {
        debugger
        this.employeelist1 = data.filter(x=>x.id==id && x.payrolltype== payrolltype && x.month==month);
      this.monthlysalaryperperiod = this.employeelist1[0].monthlysalaryperperiod
      this.LoanType = this.employeelist1[0].loanType
      this.fullname =  this.employeelist1[0].staffname + this.employeelist1[0].lastName ,
      this.payrolldate = this.employeelist1[0].enddate,
      this.OtHours =   this.employeelist1[0].otHours,
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
     
   
      
      this.loanpayout = this.employeelist1[0].loanpayout,
      this.GrossSalary = this.employeelist1[0].grossSalary,
      this.semimonthly = Number((this.BaseSalary/2)+this.deniminimis_amount-this.lopamount)
      this.deductions = this.semimonthly-(this.sssamount+this.philHealthContribution+this.pagBig+this.tax)
      this.nontax = (this.sssamount+this.philHealthContribution+this.pagBig+this.tax)
      this.basicday = (this.employeelist1[0].grossSalary)/30,
      this.basichour = (this.basicday)/8,
      this.Benefits = this.employeelist1[0].benefits
      this.OT =  this.employeelist1[0].otamount
      this.noofhours = this.employeelist1[0].noofhours
      this.type =  this.employeelist1[0].type
      this.sumsalry=(this.BaseSalary/31).toFixed(2)
      this.rounoff= this.monthlysalaryperperiod+this.deniminimis_amount
      this.yearGrossSal = this.employeelist1[0].yearGrossSal
      this.yearlydeminims = this.employeelist1[0].yearlydeminims
      this.yearSSSRate = this.employeelist1[0].yearSSSRate
      this.yeartax = this.employeelist1[0].yeartax
      this.yearPhilihealth = this.employeelist1[0].yearPhilihealth
      this.yearPagibigRate = this.employeelist1[0].yearPagibigRate
      this.semiadjustment=  this.employeelist1[0].semiadjustment
      this.Compensation = this.employeelist1[0].compensation
      this.semideductions = this.employeelist1[0].deductions
      this.yeargrosspaysalary = this.employeelist1[0].yeargrosspaysalary

      }, error: (err) => {
        Swal.fire('Issue in Getting City Type');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    })

    
    
    
    
    
   
  }



  public getpayslip13(id:any){
    this.sumsalry=0;
    this.DigipayrollServiceService.GetThirteenthMonthSalary().subscribe(data => {
      debugger
      this.employeelist1 = data.filter(x=>x.staffID==id );
     
      this.fullname =  this.employeelist1[0].firstName + this.employeelist1[0].lastName ,
     
      this.department = this.employeelist1[0].department_name,
      this.role = this.employeelist1[0].emprole,
      this.tin = this.employeelist1[0].employeE_TIN,
      this.SSS = this.employeelist1[0].sssno,
      this.PhilHealth = this.employeelist1[0].philhealtH_NO,
      this.hdmf = this.employeelist1[0].pagiBigAccountNo,
      this.BaseSalary = this.employeelist1[0].basicsalary, 
      this.deniminimis_amount = this.employeelist1[0].deminimsamount
   
      this.netMonthSalary =  this.employeelist1[0].monthlysalary 
     
   
      
     


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
    this.loader=true;
    debugger;
    
    var data: any = document.getElementById('downloadaplication');
    html2canvas(data,{useCORS: true}).then(canvas => {
   
      var margin = 5;
      var imgWidth = 208
      // var pageHeight = 295 - 10 * margin;
      var pageHeight = 900;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      var doc = new jsPDF('p', 'mm');
      var position = 0;
      while (heightLeft > 0) {

        const contentDataURL = canvas.toDataURL('image/png')
        position = heightLeft - imgHeight;

        doc.addPage();


        doc.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      
        heightLeft -= pageHeight;

      }
      doc.deletePage(1)
      doc.save('Payslip.pdf');
      this.showleaseforprint=0;
      this.loader=false;
      var pdf1 = doc.output('blob');
      var file = new File([pdf1], "Payslip.pdf");
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


  
public getsign(){
  this.DigipayrollServiceService.GetCompanyAddressDetails()
  .subscribe({
    next: data => {
      debugger
      this.stafflist1 = data;
    this.signname = this.stafflist1[0].hR_AuthorisedPerson;
    this.Signature = this.stafflist1[0].hR_AuthorisedPerson_Signature;
    this.title1 = this.stafflist1[0].hR_PositionTitle;
    }, error: (err) => {
      Swal.fire('Issue in Getting CompanyAddressDetails');
      // Insert error in Db Here//
      var obj = {
        'PageName': this.currentUrl,
        'ErrorMessage': err.error.message
      }
      this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
        data => {
          debugger
        },
      )
    }
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