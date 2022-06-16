import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-ytdreport',
  templateUrl: './ytdreport.component.html',
  styleUrls: ['./ytdreport.component.css']
})
export class YTDReportComponent implements OnInit {

  constructor(private DigipayrollServiceService: DigipayrollserviceService) { }
  result:any;
  term:any;
  stafflist:any;
  employeelist:any;
  uniquelist:any;
  RoleTypeList:any;
  companylist:any;
  companyid:any;
  companyname:any;
  Departmentlist:any;
  Address:any;
  MobileNumber:any;
  emailaddress:any;
  p: any = 1;
  loader:any;
  count1: any = 10;
  ngOnInit(): void {
    this.loader=true;
    this.paygroup="";
    this.GetPayGroup();
   
    this.DigipayrollServiceService.GetEmployeeSalaryMonthly().subscribe(data => {
      debugger
      this.employeelist = data
      const key = 'emplyeeYear'

      this.uniquelist  = [...new Map(this.employeelist.map((item: { [x: string]: any; }) =>
        [(item[key]), item])).values()]
   
        this.loader=false;
       

    });


    this.DigipayrollServiceService.GetCompanyAddressDetails().subscribe(data => {
      debugger
      this.companylist = data
      this.companyid = this.companylist[0].id,
      this.companyname = this.companylist[0].company_Name,
      this.Address = this.companylist[0].address1 + this.companylist[0].address2
      this.MobileNumber = this.companylist[0].phone
      this.emailaddress= this.companylist[0].email
     


    })

    this.DigipayrollServiceService.GetDepartment().subscribe(data => {
      debugger
      this.Departmentlist = data;
    });

    this.DigipayrollServiceService.GetRoleType().subscribe(data => {
      debugger
      this.RoleTypeList = data;
    });
  
   
  }
  paygroup:any;
  public GetPayGroup() {
    debugger
    this.DigipayrollServiceService.GetPayGroup().subscribe(
      data => {
        debugger
        this.result = data;
      })
  }


  show2div: any;
  public Getrankandfile(eve: any, year: any) {
    debugger
    this.paygroup =eve.currentTarget.checked;
    if (this.paygroup == true) {
      this.show2div = true;
      this.getemployee(year)
    } else {
      this.show2div = false;
    }


  }

  fileName = 'YTD Report.xlsx';
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

  Year:any;
  uniquelist1:any;
  Days:any;
public getemployee(Year:any){
  this.Year= Year
 
  this.DigipayrollServiceService.GetEmployeeSalaryMonthly().subscribe(data => {
    debugger
    this.stafflist = data.filter(x => x.emplyeeYear==Year );

    const key = 'id'
    
    this.uniquelist1  = [...new Map(this.stafflist.map((item: { [x: string]: any; }) =>
    [(item[key]), item])).values()]
  });
}
year1:any;
employeelist2:any= [];

uniquelist3:any;
uniquelistpayroll:any;
public getpaydetails(id:any,event:any,item:any){
  
  this.year1=String(this.Year)
  var date1 = new Date("01/01/" +   this.year1); 
  var date2 = new Date("31/12/" +   this.year1); 
  
    var Time = date2.getTime() - date1.getTime(); 
     this.Days = Time / (1000 * 3600 * 24);

    
    
  this.DigipayrollServiceService.GetEmployeeSalaryMonthly().subscribe(data => {
    debugger

    if (event.target.checked == true) {

     
 
    let temp: any = data.filter(x=>x.endyear==this.Year && x.id==id);
    Array.prototype.push.apply(this.employeelist2, temp);

    const key = 'id'
    
    this.uniquelistpayroll  = [...new Map(this.employeelist2.map((item: { [x: string]: any; }) =>
    [(item[key]), item])).values()]

    }

    else if (event.target.checked == false) {
      this.uniquelistpayroll.splice(this.uniquelistpayroll.indexOf(item), 1);
    } 
  });


  this.showtable=1
}
 
RoleType:any;
public FilterRoleType() {
  debugger
  this.DigipayrollServiceService.GetEmployeeSalaryMonthly().subscribe(data => {
    debugger
    this.stafflist = data.filter(x => x.emplyeeYear==this.Year && x.role==this.RoleType);

    const key = 'id'
    
    this.uniquelist1  = [...new Map(this.stafflist.map((item: { [x: string]: any; }) =>
    [(item[key]), item])).values()]
  });
   
  

}
Department:any;
public filterByDepartment() {
  debugger
  this.DigipayrollServiceService.GetEmployeeSalaryMonthly().subscribe(data => {
    debugger
    this.stafflist = data.filter(x => x.emplyeeYear==this.Year && x.department_name==this.Department);

    const key = 'id'
    
    this.uniquelist1  = [...new Map(this.stafflist.map((item: { [x: string]: any; }) =>
    [(item[key]), item])).values()]
  });
   

  

}

playslipid: any
selecallbtn: any;
employeelist1:any;
showtable:any;
uniquelist13:any;
showleaseforprint:any;
selectALL(checked: boolean) { // pass true or false to check or uncheck all
  this.selecallbtn = true;
  
    this.playslipid = true;
    if (this.uniquelist1.every((val: { checked: boolean; }) => val.checked == true)) {
      this.uniquelist1.forEach((val: { checked: boolean; }) => { val.checked = false });
      this.showtable=0
    }
    else {
      debugger
      this.uniquelist1.forEach((val: { checked: boolean; }) => { val.checked = true });
      this.showtable=2
    }
  
  
  
    this.DigipayrollServiceService.GetEmployeeSalaryMonthly().subscribe(data => {
      debugger
      this.employeelist2 = data.filter(x=>(x.endyear==this.Year ));
      
  
      const key = 'id'
      
      this.uniquelist3  = [...new Map(this.employeelist2.map((item: { [x: string]: any; }) =>
      [(item[key]), item])).values()]
    });
  
  
 
  



}




}