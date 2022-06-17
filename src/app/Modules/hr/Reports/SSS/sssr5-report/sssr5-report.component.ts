import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sssr5-report',
  templateUrl: './sssr5-report.component.html',
  styleUrls: ['./sssr5-report.component.css']
})
export class SSSR5ReportComponent implements OnInit {
  currentUrl: any;
  fullname:any;
  sign:any;
  department:any;
  signname:any;
  stafflist1:any;
  Signature:any;
  employeelist:any;
  uniquelist:any;
  uniquelist1:any;
  ssstotal:any;
  sum:any;
  sssec:any;;
  total:any;
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

  constructor(public DigipayrollServiceService: DigipayrollserviceService) { }
  Month:any;
  Year:any;
  Person:any;
  showleaseforprint:any;
  ngOnInit(): void {
  
    this.Month="";
    this.Year="Select";
    this.sign="";
    this.showleaseforprint = 0;
  }
  public showpdf(){
    this.DigipayrollServiceService.GetEmployeeSalary()
    .subscribe(data => {
      debugger
      this.employeelist = data.filter(x=>String(x.month)==this.Month && String(x.endyear)==this.Year);
     
      this.sum = 0;
      this.sssec = 0;
      this.ss_er = 0;
      for (let i = 0; i < this.employeelist.length; i++) {
        this.sum += parseFloat(this.employeelist[i].contribution);
      }
      for (let i = 0; i < this.employeelist.length; i++) {
        this.sssec += parseFloat(this.employeelist[i].ss_ec);
      }

      for (let i = 0; i < this.employeelist.length; i++) {
      this.ss_er += parseFloat(this.employeelist[i].ss_er);
      }
      this.total = this.sum+this.sssec
      this.year = this.employeelist[0].year

    
      this.DigipayrollServiceService.GetCompanyAddressDetails().subscribe(data => {
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
  public getsign(){
    this.DigipayrollServiceService.GetCompanyAddressDetails()
    .subscribe({
      next: data => {
        debugger
        this.stafflist1 = data;
      this.signname = this.stafflist1[0].hR_AuthorisedPerson
      this.Signature = this.stafflist1[0].hR_AuthorisedPerson_Signature
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
      doc.save('R5 Report.pdf');
      
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