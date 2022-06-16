import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import { jsPDF } from "jspdf";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-stlrfreport',
  templateUrl: './stlrfreport.component.html',
  styleUrls: ['./stlrfreport.component.css']
})
export class STLRFReportComponent implements OnInit {

  constructor(private DigipayrollServiceService: DigipayrollserviceService, private ActivatedRoute: ActivatedRoute, private datePipe: DatePipe) { }

  Month:any;
  Year:any;
  Loan:any;
  Person:any;
  showleaseforprint:any;
  loader:any;
  myDate:any;
  ngOnInit(): void {
this.Loan="";
this.Month="";
this.Year="";
this.sign="";
    this.showleaseforprint = 0;
    this.loader=false;

    this.myDate = new Date();
  }


  fullname:any;
  sign:any;
  department:any;
  signname:any;
  stafflist1:any;
  public getsign(){
    this.DigipayrollServiceService.GetMyDetails().subscribe(data => {
      debugger
      this.stafflist1 = data.filter(x => x.department_name == this.sign);
      this.signname = this.stafflist1[0].fullname
    });
  }


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
  pagibigno:any;
  public showpdf(){
  
    this.DigipayrollServiceService.GetEmployeeLoans().subscribe(data => {
      debugger
      this.employeelist = data.filter(x=>x.employeeMonth==this.Month && String(x.emplyeeYear)==this.Year && x.loanType==this.Loan && x.paidamount!=0);
      const key = 'monthstaffid'
      if( this.employeelist.length==0){
        Swal.fire('No Records Found')
      }
      else{
        this.DigipayrollServiceService.GetCompanyAddressDetails().subscribe(data => {
          debugger
          this.companylist = data
          this.companyid = this.companylist[0].id,
          this.companyname = this.companylist[0].company_Name,
          this.Address = this.companylist[0].address
         this.MobileNumber = this.companylist[0].address
         this.pagibigno = this.companylist[0].hdmfNumber
    
    
        })

        this.showleaseforprint = 1;
        
        this.uniquelist  = [...new Map(this.employeelist.map((item: { [x: string]: any; }) =>
        [(item[key]), item])).values()]

        this.MonthlyAdjustment = 0;
        for (let i = 0; i < this.uniquelist.length; i++) {
          this.MonthlyAdjustment += this.uniquelist[i].monthlyAdjustment;
        }


        this.LoanType=this.uniquelist[0].loanType
      
       this.paidamount=this.uniquelist[0].paidamount,
        this.RemainingAmount=this.uniquelist[0].remainingAmount
       this.Month_Name==this.uniquelist[0].Month_Name,
       this.EmplyeeYear=this.uniquelist[0].EmplyeeYear
     

      }
      


      });
  }


  stafflist:any;
  uniquelist1:any;
 
  results:any;
  stafflist2:any;
  Province:any;
  Barangay:any;
  cityname:any;
  Zipcode:any;
public getemployee(){

   
  this.DigipayrollServiceService.GetEmployeeSalaryMonthly().subscribe(data => {
    debugger
    this.stafflist = data.filter(x => x.emplyeeYear==this.Year && x.monthlyAdjustment!=0 );
  });


  this.DigipayrollServiceService.GetCompanyAddressDetails().subscribe(data => {
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

  })

 
if(this.stafflist.length!=0){
  const key = 'id'
  this.DigipayrollServiceService.GetEmployeeLoans().subscribe(data => {
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
        for (let i = 0; i < this.results.length; i++) {
          this.MonthlyAdjustment += this.uniquelist[i].monthlyAdjustment;
        }
  
  });

}

    
  
  
  
  // if( this.employeelist.length==0){
  //   Swal.fire('No Records Found')
  // }
  // else{
  
  

}



  public convetToPDF1() {
    debugger
   this.loader=true
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
      doc.save('STLRF Report.pdf');
      this.loader=false
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