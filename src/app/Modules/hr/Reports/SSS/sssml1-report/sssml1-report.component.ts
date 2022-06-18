import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sssml1-report',
  templateUrl: './sssml1-report.component.html',
  styleUrls: ['./sssml1-report.component.css']
})
export class SSSML1ReportComponent implements OnInit {
  currentUrl: any;
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
  stafflist:any;
  companyid:any;
  stafflist2:any;
  year:any;
  results:any;
  sssNumber:any;
  Month:any;
  Year:any;
  Person:any;
  showleaseforprint:any;
  fullname:any;
  sign:any;
  department:any;
  signname:any;
  stafflist1:any;
  Signature:any;
  constructor(private DigipayrollServiceService: DigipayrollserviceService) { }
 
  ngOnInit(): void {
   this.currentUrl = window.location.href;
  this.Month="";
  this.Year="";
  this.sign="";
    this.showleaseforprint = 0;
  }
  
  public showpdf(){
    this.showleaseforprint = 1;
    this.DigipayrollServiceService.GetCompanyAddressDetails()
    .subscribe({
      next: data => {
        debugger
        this.companylist = data
      this.companyid = this.companylist[0].id,
      this.companyname = this.companylist[0].company_Name,
      this.Address = this.companylist[0].address1,
      this.sssNumber = this.companylist[0].ssN_No

      }, error: (err) => {
        Swal.fire('Issue in Getiing CompanyAddressDetails Type');
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
    this.DigipayrollServiceService.GetEmployeeSalaryMonthly()
    .subscribe({
      next: data => {
        debugger
        this.companylist = data
        this.companyid = this.companylist[0].id,
        this.companyname = this.companylist[0].company_Name,
        this.Address = this.companylist[0].address1,
        this.sssNumber = this.companylist[0].ssN_No     
      }, error: (err) => {
        Swal.fire('Issue in GetEmployeeSalaryMonthly Type');
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

  public getsign(){
    this.DigipayrollServiceService.GetMyDetails()
    .subscribe({
      next: data => {
        debugger
        this.stafflist1 = data.filter(x => x.department_name == this.sign);
        this.signname = this.stafflist1[0].fullname
        this.Signature = this.stafflist1[0].signature
      }, error: (err) => {
        Swal.fire('Issue in GetMyDetails Type');
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
      doc.save('ML1 Report.pdf');
      
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