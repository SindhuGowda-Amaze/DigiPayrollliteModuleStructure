import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-m1-excel-report',
  templateUrl: './m1-excel-report.component.html',
  styleUrls: ['./m1-excel-report.component.css']
})
export class M1ExcelReportComponent implements OnInit {
  loader:any;
  stafflist: any;
  term: any;
  value: any;
  enddate: any;
  uniquelist:any;
  month:any;
  year:any;
  companylist:any;
  companyname:any;
  Address:any;
  companyid:any;
  employeelist:any;
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  minDate = new Date();
  Phone:any;
  email:any;
  zipcode:any;
  tin:any;
  p: any = 1;
  count1: any = 10;
  result:any;
  selectone:any;
  selecallbtn:any;
  currentUrl:any;

  constructor(public DigipayrollserviceService: DigipayrollserviceService) {
    this.minDate.setDate(this.minDate.getDate() - 1);
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }
  
  ngOnInit(): void {
    debugger
    this.currentUrl = window.location.href;
    this.month="";
    this.year="";
   this.GetCompanyAddressDetails();
   this.GetEmployeeSalary();
  }

  public GetCompanyAddressDetails(){


    this.DigipayrollserviceService.GetCompanyAddressDetails()
    
    
.subscribe({
  next: data => {
    debugger
      this.companylist = data
      this.companyid = this.companylist[0].id,
      this.companyname = this.companylist[0].company_Name,
      this.Address = this.companylist[0].address1 + this.companylist[0].address2
      this.Phone = this.companylist[0].phone
      this.email= this.companylist[0].email
      this.zipcode = this.companylist[0].zipcode
      this.tin = this.companylist[0].tin
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

  public GetEmployeeSalary(){

    this.DigipayrollserviceService.GetEmployeeSalary()
    
    
.subscribe({
  next: data => {
    debugger
      this.employeelist = data;
  }, error: (err) => {
    Swal.fire('Issue in GetEmployeeSalary');
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



  
  public getdate(event: any) {
    debugger
    this.enddate = event.target.value;

  }

  public showpdf(){
    this.loader=true;
    this.DigipayrollserviceService.GetEmployeeSalaryMonthly()
    
    
    
.subscribe({
  next: data => {
    debugger
    this.employeelist = data.filter(x=>x.employeeMonth==this.month && String(x.emplyeeYear)==this.year);
    const key = 'monthstaffid'

    this.uniquelist  = [...new Map(this.employeelist.map((item: { [x: string]: any; }) =>
      [(item[key]), item])).values()]
 

 
      this.loader=false;
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

  fileName = 'M1 Excel Reports.xlsx';
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