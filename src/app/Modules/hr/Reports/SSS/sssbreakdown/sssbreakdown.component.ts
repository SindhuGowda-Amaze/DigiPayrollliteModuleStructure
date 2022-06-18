import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sssbreakdown',
  templateUrl: './sssbreakdown.component.html',
  styleUrls: ['./sssbreakdown.component.css']
})
export class SSSBreakdownComponent implements OnInit {
  currentUrl: any;
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
  loader:any;
  count1:any;
  p:any;
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
  constructor(public DigipayrollserviceService: DigipayrollserviceService) { }
  ;
  ngOnInit(): void {
  
    this.Month="";
    this.Year="Select";
    this.sign="";
    this.showleaseforprint = 0;
  }

  public showpdf(){
    this.loader=true;
    this.DigipayrollserviceService.GetEmployeeSalaryMonthly()
    .subscribe({
      next: data => {
        debugger
        this.employeelist = data.filter(x=>x.employeeMonth==this.Month && String(x.emplyeeYear)==this.Year);
        const key = 'monthstaffid'
  
        this.uniquelist  = [...new Map(this.employeelist.map((item: { [x: string]: any; }) =>
          [(item[key]), item])).values()]
          this.loader=false;
          this.count1 = this.uniquelist.length
      }, error: (err) => {
        Swal.fire('Issue in GetEmployeeSalaryMonthly Type');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.DigipayrollserviceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    }) 
    // this.DigipayrollserviceService.GetEmployeeSalary().subscribe(data => {
    //   debugger
    //   this.employeelist = data.filter(x=>String(x.month)==this.Month && String(x.endyear)==this.Year);
     
    //   this.sum = 0;
    //   this.sssec = 0;
    //   this.ss_er = 0;
    //   for (let i = 0; i < this.employeelist.length; i++) {
    //     this.sum += parseFloat(this.employeelist[i].contribution);
    //   }
    //   for (let i = 0; i < this.employeelist.length; i++) {
    //     this.sssec += parseFloat(this.employeelist[i].ss_ec);
    //   }

    //   for (let i = 0; i < this.employeelist.length; i++) {
    //   this.ss_er += parseFloat(this.employeelist[i].ss_er);
    //   }

 




    //   this.total = this.sum+this.sssec
    //   this.year = this.employeelist[0].year

    
    //   this.DigipayrollserviceService.GetCompanyAddressDetails().subscribe(data => {
    //     debugger
    //     this.companylist = data
    //     this.companyid = this.companylist[0].id,
    //     this.companyname = this.companylist[0].company_Name,
    //     this.Address = this.companylist[0].address1 + this.companylist[0].address2
    //     this.Phone = this.companylist[0].phone
    //     this.email= this.companylist[0].email
    //     this.zipcode = this.companylist[0].zipcode
    //     this.tin = this.companylist[0].tin
  
  
  
    //   })

   
     
    //   // this.ssstotal = SUM(this.employeelist.contribution)

    // //   this.uniquelist  = [...new Map(this.employeelist.map((item: { [x: string]: any; }) =>
    // //     [(item[key]), item])).values()]
    // // this.uniquelist1 =  this.uniquelist.filter((x: { month: any; })=>x.month==this.Month)
    //   //  this.uniquelist = [...new Set(data.map(item => item))];
     
  
    // });
    this.showleaseforprint = 1;
  }



  public getsign(){
    this.DigipayrollserviceService.GetCompanyAddressDetails()
    .subscribe({
      next: data => {
        debugger
        this.stafflist1 = data;
      this.signname = this.stafflist1[0].hR_AuthorisedPerson
      this.Signature = this.stafflist1[0].hR_AuthorisedPerson_Signature
      }, error: (err) => {
        Swal.fire('Issue in GetCompanyAddressDetails Type');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.DigipayrollserviceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    })
  }

  fileName = 'SSS BREAKDOWN Report.xlsx';
  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('download');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

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