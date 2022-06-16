import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-m1-mcrfreport',
  templateUrl: './m1-mcrfreport.component.html',
  styleUrls: ['./m1-mcrfreport.component.css']
})
export class M1MCRFReportComponent implements OnInit {

  showleaseforprint:any;
  loader:any;
  constructor(public DigiofficeService: DigipayrollserviceService) { }
  employeelist:any
  month:any;
  year:any;
  department1:any;
  myDate:any;
  ngOnInit(): void {
    this.month="";
    this.year="";
    this.sign="";
    this.showleaseforprint = 0;
    this.loader=false;
    this.myDate = new Date();
 

  }


  sign:any;
  department:any;
  signname:any;
  stafflist1:any;
  Signature:any;
 public getsign(){
    this.DigiofficeService.GetCompanyAddressDetails().subscribe(data => {
      debugger
      this.stafflist1 = data;
      this.signname = this.stafflist1[0].hR_AuthorisedPerson
      this.Signature = this.stafflist1[0].hR_AuthorisedPerson_Signature
    });
  }

  uniquelist:any;
  pagibiger:any;
  sum:any;
  pagibig:any;
  companylist:any;
  companyid:any;
  companyname:any;
  Address:any;
  Phone:any;
  uniquelistchnuk:any;
  public showpdf(){
      this.pagibiger=0
      this.pagibig=0
    this.DigiofficeService.GetEmployeeSalaryMonthly().subscribe(data => {
      debugger
      this.employeelist = data.filter(x=>x.employeeMonth==this.month && String(x.emplyeeYear==this.year));
      const key = 'monthstaffid'

      this.uniquelist  = [...new Map(this.employeelist.map((item: { [x: string]: any; }) =>
        [(item[key]), item])).values()]


        this.uniquelistchnuk = this.uniquelist.reduce((resultArray: any[][], item: any, index: number) => {
          const chunkIndex = Math.floor(index / 10)
  
          if (!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = [] // start a new chunk
          }
  
          resultArray[chunkIndex].push(item)
  
          return resultArray
        }, [])




        for (let i = 0; i <  this.uniquelist.length; i++) {
          this.pagibiger += this.employeelist[i].monthlyPagibigRate/2;
        }

        
        for (let i = 0; i <  this.uniquelist.length; i++) {
          this.pagibig += this.employeelist[i].monthlyPagibigRate;
        }


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
   
    });
    this.showleaseforprint = 1;
  }

  email:any;
  zipcode:any;
  tin:any;
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
      doc.save('MCRF Report.pdf');
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