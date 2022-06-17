import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { DatePipe, formatDate } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bir1700-report',
  templateUrl: './bir1700-report.component.html',
  styleUrls: ['./bir1700-report.component.css']
})
export class BIR1700ReportComponent implements OnInit {
  showleaseforprint:any;
  stafflist:any;
  uniquelist1:any;
  myDate:any;
  mydate1:any;
  mydate2:any;
  mydate3:any;
  mydate4:any;
  mydate5:any;
  mydate6:any;
  mydate7:any;
  mydate8:any;
  currentDate:any;
  search:any;
  p: any = 1;
  count1: any = 10;
  uniquelist:any;
  employeelist:any;
  year:any;
  companylist:any;
  companyname:any;
  Address:any;
  grosssalary:any;
  yearlydeminims:any;
  yearsalary:any;
  yearlybasesalary:any;
  yeartax:any;
  totalsss:any;
  dob:any;
  dob1:any;
  dob2:any;
  dob3:any;
  dob4:any;
  dob5:any;
  dob6:any;
  dob7:any;
  dob8:any;
  year1:any;
  yearotamount:any;
  year01:any;
  year02:any;
  year03:any;
  year04:any;

  companyid:any;
 
  ss_er:any;
  numWords:any;
  amountInWords:any;
  Phone:any;
  email:any;
  zipcode:any;
  tin:any;
  empAddress:any;
  staffname:any;
  employeeaddress:any;
  SubDistrictPostcode:any;
  employeetin:any;
  tin1:any;
  tin2:any;
  tin3:any;
  tin4:any;
  tin5:any;
  tin6:any;
  tin7:any;
  tin8:any;
  tin9:any;
  tin10:any;
  tin11:any;
  tin12:any;
  empcontactno:any;
  previoussalary:any;
  previoustax:any;
  totalnontax:any;
  totalsalary:any;
  previouscompany:any;
  previousaddress:any;
  previoustin:any;
  previoustin1:any;
  previoustin2:any;
  previoustin3:any;
  previoustin4:any;
  previoustin5:any;
  previoustin6:any;
  previoustin7:any;
  previoustin8:any;
  empemailaddress:any;
  previoustin9:any; 
   previoustin10:any;
  previoustin11:any;
  previoustin12:any;
  previoustin13:any;
  previoustin14:any;
  previoustin15:any;
  previoustin16:any;
  fullname:any;
  sign:any;
  department:any;
  signname:any;
  stafflist1:any;
  currentUrl: any;

  constructor(public DigipayrollserviceService: DigipayrollserviceService,private datePipe: DatePipe){}

  ngOnInit(): void {
    this.year="";
    this.currentUrl = window.location.href;
    this.sign="";
    this.GetMyDetails();
    this.showleaseforprint = 0;
  }


public GetMyDetails(){

  this.DigipayrollserviceService.GetMyDetails()
  
  .subscribe({
    next: data => {
      debugger
      this.currentDate = new Date();
      this.myDate = formatDate(this.currentDate, 'yyyy-MM-dd', 'en-US');
      this.mydate1=String(this.myDate).charAt(0)
      this.mydate2=String(this.myDate).charAt(1)
      this.mydate3=String(this.myDate).charAt(2)
      this.mydate4=String(this.myDate).charAt(3)
      this.mydate5=String(this.myDate).charAt(5)
      this.mydate6=String(this.myDate).charAt(6)
      this.mydate7=String(this.myDate).charAt(8)
      this.mydate8=String(this.myDate).charAt(9)
      debugger;
      this.stafflist = data.filter(x => x.deniminimis != null);
  
      const key="id"
  
      this.uniquelist1  = [...new Map(this.stafflist.map((item: { [x: string]: any; }) =>
      [(item[key]), item])).values()]
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




  public showpdf(){
    this.showleaseforprint = 1;
  }

  public getempdetails(id:any){
    this.totalnontax=0;
  this.DigipayrollserviceService.GetEmployeeSalaryMonthly()
  
  
  .subscribe({
    next: data => {
      debugger
      this.employeelist = data.filter(x=>x.monthstaffid==id && String(x.emplyeeYear==this.year) );
      
      this.DigipayrollserviceService.GetCompanyAddressDetails().subscribe(data => {
        debugger
        this.companylist = data
        this.companyid = this.companylist[0].id,
        this.companyname = this.companylist[0].company_Name,
        this.Address = this.companylist[0].address1 
        this.Phone = this.companylist[0].phone
        this.email= this.companylist[0].email
        this.zipcode = this.companylist[0].zipcode
        this.tin = this.companylist[0].tin
  
  
  
      })
  
  
      const key = 'monthstaffid'
  
      this.uniquelist  = [...new Map(this.employeelist.map((item: { [x: string]: any; }) =>
        [(item[key]), item])).values()]
        this.SubDistrictPostcode = this.uniquelist[0].subDistrictPostcode,
       this.empAddress=this.uniquelist[0].addressLine1,
      this.grosssalary = this.uniquelist[0].yearGrossSal
      this.staffname = this.uniquelist[0].staffname
      this.empcontactno = this.uniquelist[0].phoneNo,
      this.empemailaddress = this.uniquelist[0].emailID,
      this.yearsalary = this.uniquelist[0].yearsalary
      this.yearlybasesalary = this.uniquelist[0].yearlybasesalary
      this.yeartax = this.uniquelist[0].yeartax
      this.totalsss = this.uniquelist[0].yearSSSRate+this.uniquelist[0].yearPagibigRate+this.uniquelist[0].yearPhilihealth
      this.yearlydeminims = this.uniquelist[0].yearlydeminims 
      this.employeeaddress = this.uniquelist[0].address 
      this.employeetin = this.uniquelist[0].employeE_TIN ,
      this.previousaddress = this.uniquelist[0].previousaddress,
      this.previouscompany = this.uniquelist[0].previouscompany,
     
      this.dob = this.uniquelist[0].birthday
      this.dob1 = this.dob.charAt(0)
      this.dob2 = this.dob.charAt(1)
      this.dob3 = this.dob.charAt(2)
      this.dob4 = this.dob.charAt(3)
      this.dob5 = this.dob.charAt(5)
      this.dob6 = this.dob.charAt(6)
      this.dob7 = this.dob.charAt(8)
      this.dob8 = this.dob.charAt(9)
      this.year1= String(this.year)
      this.year01 =  this.year1.charAt(0)
      this.year02 =  this.year1.charAt(1)
      this.year03 =  this.year1.charAt(2)
      this.year04 =  this.year1.charAt(3)
      this.previoussalary = this.uniquelist[0].prevoussalary
      this.previoustax = this.uniquelist[0].previoustax
      this.totalnontax = this.yearlydeminims+this.totalsss
      this.yearotamount = this.uniquelist[0].yearotamount.toFixed(2)
     this.totalsalary = parseFloat(this.yearotamount)+parseFloat(this.yearlybasesalary)
     this.previoustin = String(this.uniquelist[0].previousemployertin),
  
     this.previoustin1 = this.previoustin.charAt(0)
    this.previoustin2 = this.previoustin.charAt(1)
    this.previoustin3 = this.previoustin.charAt(2)
    this.previoustin4 = this.previoustin.charAt(3)
    this.previoustin5 = this.previoustin.charAt(4)
    this.previoustin6 = this.previoustin.charAt(5)
    this.previoustin7 = this.previoustin.charAt(6)
    this.previoustin8 = this.previoustin.charAt(7)
    this.previoustin9 = this.previoustin.charAt(8)
    this.previoustin10 = this.previoustin.charAt(9)
    this.previoustin11= this.previoustin.charAt(10)
    this.previoustin12 = this.previoustin.charAt(11)
    this.previoustin13 = this.previoustin.charAt(12)
    this.previoustin14 = this.previoustin.charAt(13)
  
  
    this.tin1 = this.employeetin.charAt(0)
    this.tin2 = this.employeetin.charAt(1)
    this.tin3 = this.employeetin.charAt(2)
    this.tin4 = this.employeetin.charAt(3)
    this.tin5 = this.employeetin.charAt(4)
    this.tin6 = this.employeetin.charAt(5)
    this.tin7 = this.employeetin.charAt(6)
    this.tin8 = this.employeetin.charAt(7)
    this.tin9 = this.employeetin.charAt(8)
    this.tin10 = this.employeetin.charAt(9)
    this.tin11 = this.employeetin.charAt(10)
    this.tin12 = this.employeetin.charAt(11)
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



  public convetToPDF1() {
    debugger
   
    var data: any = document.getElementById('downloadaplication');
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
      doc.save('2316 Report.pdf');
      
      var pdf1 = doc.output('blob');
      var file = new File([pdf1], "Application.pdf");
      let body = new FormData();
      debugger
      body.append('Dan', file);
      console.log('pdf', pdf1)
    


    }).then(() => {
     
    });;
  }

}