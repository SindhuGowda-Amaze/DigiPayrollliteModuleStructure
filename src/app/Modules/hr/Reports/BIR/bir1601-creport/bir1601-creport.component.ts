import { Component, OnInit } from '@angular/core';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';

@Component({
  selector: 'app-bir1601-creport',
  templateUrl: './bir1601-creport.component.html',
  styleUrls: ['./bir1601-creport.component.css']
})
export class BIR1601CReportComponent implements OnInit {

  constructor(public DigipayrollServiceService: DigipayrollserviceService) { }
  showleaseforprint:any;
  month:any;
  companylist:any;
  companyname:any;
  Address:any;
  companyid:any;
  year:any;
  ss_er:any;
  numWords:any;
  amountInWords:any;
  Phone:any;
  email:any;
  zipcode:any;
  tin:any;
  ngOnInit(): void {
    this.Year="";
    this.sign="";
    this.showleaseforprint = 0;
    const d = new Date();
  this.month = d.getMonth()+1;


  
  }


  
  fullname:any;
  sign:any;
  department:any;
  signname:any;
  stafflist1:any;
  Signature:any;
  public getsign(){
    this.DigipayrollServiceService.GetMyDetails().subscribe(data => {
      debugger
      this.stafflist1 = data.filter(x => x.department_name == this.sign);
      this.signname = this.stafflist1[0].fullname
      this.Signature = this.stafflist1[0].signature
    });
  }

  employeelist:any;
  uniquelist:any;
  uniquelist1:any;
  ssstotal:any;
  sum:any;
  sssec:any;;
  total:any;
  netMonthSalary:any;
  deductions:any;
  Month:any;
  tax:any;
  Year:any;
  nontax:any;
  income:any;
  nontaxableamount:any;
  semiotamount:any;
  benefits:any;
    public showpdf(){
    this.DigipayrollServiceService.GetEmployeeSalary().subscribe(data => {
      debugger
      this.employeelist = data.filter(x=>x.month==this.month && String(x.endyear)==this.Year);
      
      this.sum = 0;
      this.netMonthSalary = 0;
      this.tax = 0;
      this.nontax=0;
      this.semiotamount=0;
      this.benefits=0;

      const key = 'staffname';
      const key1 = 'id'

      this.uniquelist  = [...new Map(this.employeelist.map((item: { [x: string]: any; }) =>
        [(item[key]), item])).values()]
 

      for (let i = 0; i < this.uniquelist.length; i++) {
        this.sum += parseFloat(this.uniquelist[i].grossSalary);
      }


      for (let i = 0; i < this.uniquelist.length; i++) {
        this.nontax += parseFloat(this.uniquelist[i].nontax);
      }

      for (let i = 0; i < this.uniquelist.length; i++) {
        this.semiotamount += parseFloat(this.uniquelist[i].semiotamount);
      }
     
      for (let i = 0; i < this.uniquelist.length; i++) {
        this.benefits += parseFloat(this.uniquelist[i].benefits);
      }

      this.nontaxableamount = this.nontax + this.semiotamount +  this.benefits 
     
      
      this.income=parseFloat(this.sum)-parseFloat(this.nontax)


      for (let i = 0; i < this.employeelist.length; i++) {
        this.netMonthSalary += parseFloat(this.employeelist[i].netMonthSalary);
      }
      for (let i = 0; i < this.employeelist.length; i++) {
        this.tax += parseFloat(this.employeelist[i].tax);
      }

     
      this.DigipayrollServiceService.GetCompanyProfile().subscribe(data => {
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
      
   
     
      // this.ssstotal = SUM(this.employeelist.contribution)

    //   this.uniquelist  = [...new Map(this.employeelist.map((item: { [x: string]: any; }) =>
    //     [(item[key]), item])).values()]
    // this.uniquelist1 =  this.uniquelist.filter((x: { month: any; })=>x.month==this.Month)
      //  this.uniquelist = [...new Set(data.map(item => item))];
     
  
    });
    this.showleaseforprint = 1;
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
      doc.save('1601-C Report.pdf');
      
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