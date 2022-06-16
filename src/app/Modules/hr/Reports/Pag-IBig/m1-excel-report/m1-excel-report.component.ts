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

  constructor(public DigiofficeService: DigipayrollserviceService) {
    this.minDate.setDate(this.minDate.getDate() - 1);
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }
  loader:any;
  stafflist: any;
  term: any;
  value: any;
  
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
  ngOnInit(): void {
    debugger
    this.month="";
    this.year="";

    this.DigiofficeService.GetEmployeeSalary().subscribe(data => {
      debugger
      this.employeelist = data;
    });


    this.DigiofficeService.GetCompanyAddressDetails().subscribe(data => {
      debugger
      this.companylist = data
      this.companyid = this.companylist[0].id,
      this.companyname = this.companylist[0].company_Name,
      this.Address = this.companylist[0].address1 + this.companylist[0].address2
      this.Phone = this.companylist[0].phone
      this.email= this.companylist[0].email
      this.zipcode = this.companylist[0].zipcode
      this.tin = this.companylist[0].tin



    })
  



  }
  enddate: any;
  public getdate(event: any) {
    debugger
    this.enddate = event.target.value;

  }

  uniquelist:any;
  month:any;
  year:any;
  companylist:any;
  companyname:any;
  Address:any;
  companyid:any;
  public showpdf(){
    this.loader=true;
    this.DigiofficeService.GetEmployeeSalaryMonthly().subscribe(data => {
      debugger
      this.employeelist = data.filter(x=>x.employeeMonth==this.month && String(x.emplyeeYear)==this.year);
      const key = 'monthstaffid'

      this.uniquelist  = [...new Map(this.employeelist.map((item: { [x: string]: any; }) =>
        [(item[key]), item])).values()]
   

   
        this.loader=false;

    });
  
  }





  result:any;
  public GetPayGroup() {
    debugger
    this.DigiofficeService.GetPayGroup().subscribe(
      data => {
        debugger
        this.result = data;
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

  selectone:any;
  selecallbtn:any;
  
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