import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import { jsPDF } from "jspdf";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-stlrfexcel-report',
  templateUrl: './stlrfexcel-report.component.html',
  styleUrls: ['./stlrfexcel-report.component.css']
})
export class STLRFExcelReportComponent implements OnInit {
  Month:any;
  Year:any;
  Loan:any;
  Person:any;
  p: any = 1;
  count1: any = 10;
  showleaseforprint:any;
  employeelist:any;
  uniquelist:any;
  MonthlyAdjustment:any;
  RemainingAmount:any;
  paidamount:any;
  Month_Name:any;
  EmplyeeYear:any;
  LoanType:any;
  companylist:any;
  companyname:any;
  Address:any;
  companyid:any;
  MobileNumber:any;
  sign:any;
  stafflist:any;
  pagibigno:any;
  results:any;
  Province:any;
  Barangay:any;
  cityname:any;
  Zipcode:any;
  stafflist2:any;
  fullname:any;
  department:any;
  signname:any;
  stafflist1:any;
  selectone:any;
  selecallbtn:any;
  result:any;
  currentUrl: any;
  constructor(private DigipayrollserviceService: DigipayrollserviceService) { }
  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.Loan="";
    this.Month="";
    this.Year="";
    this.sign="";
    this.showleaseforprint = 0;
    this.GetPayGroup();
  }

 
  public GetPayGroup() {
    debugger
    this.DigipayrollserviceService.GetPayGroup()
    
    .subscribe({
      next: data => {
        debugger
        this.result = data;
      }, error: (err) => {
        Swal.fire('Issue in GetPayGroup');
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



 public showpdf(){

   
  this.DigipayrollserviceService.GetEmployeeSalaryMonthly()
  
  .subscribe({
    next: data => {
      debugger
      this.stafflist = data.filter(x => x.emplyeeYear==this.Year && x.monthlyAdjustment!=0 && x.employeeMonth==this.Month);
  
       
  if(this.stafflist.length!=0){
    const key = 'id'
    this.DigipayrollserviceService.GetEmployeeLoans()
    
    .subscribe({
      next: data => {
        debugger
      this.stafflist2 = data.filter(x => x.loanType==this.Loan );
  
      this.results = this.stafflist2.map((val: { staffID: any; }) => {
        return Object.assign({}, val, this.stafflist.filter((v: { monthstaffid: any; }) => v.monthstaffid === val.staffID)[0]);
      
      })
      if (this.results.length!=0){
        this.showleaseforprint = 1;
      }
  
      else{
        Swal.fire('No Records Found')
      }
      
     
      this.MonthlyAdjustment = 0;
      this.MonthlyAdjustment= this.results[0].monthlyAdjustment;
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
  else{
    Swal.fire('No Records Found')
  }
    }, error: (err) => {
      Swal.fire('Issue in GetEmployeeSalaryMonthly');
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




  this.DigipayrollserviceService.GetCompanyAddressDetails()
  
  .subscribe({
    next: data => {
      debugger
      this.companylist = data
      this.companyid = this.companylist[0].id,
      this.companyname = this.companylist[0].company_Name,
      this.Address = this.companylist[0].address1
     this.MobileNumber = this.companylist[0].phone
     this.pagibigno = this.companylist[0].hdmfNumber
     this.Province = this.companylist[0].province
     this.Barangay = this.companylist[0].barangay
     this.cityname = this.companylist[0].cityname
     this.Zipcode = this.companylist[0].zipcode
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

  
  // if( this.employeelist.length==0){
  //   Swal.fire('No Records Found')
  // }
  // else{
  
  

}


  

  public getsign(){
    this.DigipayrollserviceService.GetMyDetails()
    
    .subscribe({
      next: data => {
        debugger
      this.stafflist1 = data.filter(x => x.department_name == this.sign);
      this.signname = this.stafflist1[0].fullname
      }, error: (err) => {
        Swal.fire('Issue in GetMyDetails');
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


  fileName = 'STLRF Report.xlsx';
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


  
  selectALL(checked: boolean) { // pass true or false to check or uncheck all
    this.selecallbtn = true;
    this.selectone = false;
    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].type == "checkbox") {
        inputs[i].checked = checked;
        // This way it won't flip flop them and will set them all to the same value which is passed into the function
      }
    }
  }

}