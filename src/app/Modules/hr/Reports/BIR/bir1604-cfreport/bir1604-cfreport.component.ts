import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bir1604-cfreport',
  templateUrl: './bir1604-cfreport.component.html',
  styleUrls: ['./bir1604-cfreport.component.css']
})
export class BIR1604CFReportComponent implements OnInit {
  showleaseforprint:any;
  year:any;
  companylist:any;
  companyname:any;
  Address:any;
  companyid:any;
 
  ss_er:any;
  numWords:any;
  amountInWords:any;
  Phone:any;
  email:any;
  zipcode:any;
  tin:any;
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
  sssec:any;
  currentUrl:any;

  total:any;
  netMonthSalary:any;
  deductions:any;
  jantax:any;
  employeelist1:any;
   employeelist2:any;
    employeelist3:any;

    employeelist4:any;
    employeelist5:any;
    employeelist6:any;
    employeelist7:any;
    employeelist8:any;
    employeelist9:any;
    employeelist10:any;
    employeelist11:any;
    employeelist12:any;
    employeelist13:any;
    febtax:any;
    martax:any;
    aprtax:any;
    maytax:any;
    juntax:any;
    jultax:any;
    augtax:any;
    septax:any;
    octtax:any;
    novtax:any;
    dectax:any;
  constructor(public DigipayrollServiceService: DigipayrollserviceService) { }
 
  ngOnInit(): void {
    this.sign="";
    
   this.currentUrl = window.location.href;
    this.getsign();
    this.showpdf();
    this.showleaseforprint = 0;
    const d = new Date();
    this.year = d.getFullYear();
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
        Swal.fire('Issue in GetMyDetails');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )}
    })

    
    
    
    
  }

 
  public showpdf(){
    this.DigipayrollServiceService.GetEmployeeSalary()
    
    .subscribe({
      next: data => {
        debugger

      this.DigipayrollServiceService.GetCompanyProfile()
      
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
          Swal.fire('Issue in GetCompanyProfile');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )}
      })

     

      this.employeelist = data.filter(x=>x.endyear==this.year && x.month==1 );
      this.employeelist1 = data.filter(x=>x.endyear==this.year && x.month==2 );
      this.employeelist2 = data.filter(x=>x.endyear==this.year && x.month==3 );
      this.employeelist3 = data.filter(x=>x.endyear==this.year && x.month==4 );
      this.employeelist4 = data.filter(x=>x.endyear==this.year && x.month==5 );
      this.employeelist5 = data.filter(x=>x.endyear==this.year && x.month==6 );
      this.employeelist6 = data.filter(x=>x.endyear==this.year && x.month==7 );
      this.employeelist7 = data.filter(x=>x.endyear==this.year && x.month==8 );
      this.employeelist8 = data.filter(x=>x.endyear==this.year && x.month==9 );
      this.employeelist9 = data.filter(x=>x.endyear==this.year && x.month==10 );
      this.employeelist10 = data.filter(x=>x.endyear==this.year && x.month==11 );
      this.employeelist11 = data.filter(x=>x.endyear==this.year && x.month==12 );
      this.jantax=0;
      this.febtax=0;
      this.martax=0;
      this.aprtax=0;
      this.maytax=0;
      this.juntax=0;
      this.jultax=0;
      this.augtax=0;
      this.septax=0;
      this.octtax=0;
      this.novtax=0;
      this.dectax=0;
     
      for (let i = 0; i < this.employeelist.length; i++) {
        this.jantax += this.employeelist[i].tax;
      }

      for (let i = 0; i < this.employeelist1.length; i++) {
        this.febtax += this.employeelist1[i].tax;
      }

      for (let i = 0; i < this.employeelist2.length; i++) {
        this.martax += this.employeelist2[i].tax;
      }

      for (let i = 0; i < this.employeelist3.length; i++) {
        this.aprtax += this.employeelist3[i].tax;
      }

      for (let i = 0; i < this.employeelist4.length; i++) {
        this.maytax += this.employeelist4[i].tax;
      }

      for (let i = 0; i < this.employeelist5.length; i++) {
        this.juntax += this.employeelist5[i].tax;
      }

      for (let i = 0; i < this.employeelist6.length; i++) {
        this.jultax += this.employeelist6[i].tax;
      }

      for (let i = 0; i < this.employeelist7.length; i++) {
        this.augtax += this.employeelist7[i].tax;
      }

      for (let i = 0; i < this.employeelist8.length; i++) {
        this.septax += this.employeelist8[i].tax;
      }

      for (let i = 0; i < this.employeelist9.length; i++) {
        this.octtax += this.employeelist9[i].tax;
      }

      for (let i = 0; i < this.employeelist10.length; i++) {
        this.novtax += this.employeelist10[i].tax;
      }

      
      for (let i = 0; i < this.employeelist11.length; i++) {
        this.dectax += this.employeelist11[i].tax;
      }

      this.total =  this.jantax+this.febtax+this.martax+ this.aprtax+ this.maytax+this.juntax+this.jultax+this.augtax+this.septax+this.octtax+ this.novtax+this.dectax
      
      
   
     
      // this.ssstotal = SUM(this.employeelist.contribution)

    //   this.uniquelist  = [...new Map(this.employeelist.map((item: { [x: string]: any; }) =>
    //     [(item[key]), item])).values()]
    // this.uniquelist1 =  this.uniquelist.filter((x: { month: any; })=>x.month==this.Month)
      //  this.uniquelist = [...new Set(data.map(item => item))];
     
  
      }, error: (err) => {
        Swal.fire('Issue in GetEmployeeSalary');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )}
    })

    
  
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
      doc.save('1601-CF Report.pdf');
      
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