import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rf1-pdfreport',
  templateUrl: './rf1-pdfreport.component.html',
  styleUrls: ['./rf1-pdfreport.component.css']
})
export class RF1PDFReportComponent implements OnInit {

  showleaseforprint: any;
  loader: any;
  stafflist: any;
  companylist: any;
  companyname: any;
  Address: any;
  companyid: any;
  year: any;
  ss_er: any;
  numWords: any;
  amountInWords: any;
  Phone: any;
  email: any;
  zipcode: any;
  tin: any;
  PhilHealthNumber: any;
  PhilHealthNumber1: any;
  PhilHealthNumber2: any;
  PhilHealthNumber3: any;
  PhilHealthNumber4: any;
  PhilHealthNumber5: any;
  PhilHealthNumber6: any;
  PhilHealthNumber7: any;
  PhilHealthNumber8: any;
  PhilHealthNumber9: any;
  PhilHealthNumber10: any;
  PhilHealthNumber11: any;
  PhilHealthNumber12: any;
  tin1:any;
  tin2:any;
  tin3:any;
  tin4:any;
  tin5:any;
  tin6:any;
  tin7:any;
  tin8:any;
  tin9:any;
  E_Signatory:any;
  employeelist:any;
  uniquelist:any;
  MonthlyPhilihealth:any;
  sum:any;
  uniquelistchnuk:any;
  fullname: any;
  sign: any;
  department: any;
  signname: any;
  stafflist1: any;
  Year: any;
  month: any;
  Signature: any;
  ID:any;
  currentUrl: any;
  constructor(public DigipayrollserviceService: DigipayrollserviceService, public router: Router) { }
 
  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.month = "";
    this.Year = "";
    this.sign="";
    this.showleaseforprint = 0;
    this.loader = false
   this.GetCompanyAddressDetails();

  }

public GetCompanyAddressDetails(){
  this.DigipayrollserviceService.GetCompanyAddressDetails()
  
  .subscribe({
    next: data => {
      debugger
    this.companylist = data
    this.companyid = this.companylist[0].id,
      this.companyname = this.companylist[0].company_Name,
      this.Address = this.companylist[0].address1 + this.companylist[0].address2
    this.Phone = this.companylist[0].phone
    this.email = this.companylist[0].email
    this.zipcode = this.companylist[0].zipcode
    this.tin = this.companylist[0].tin
    this.tin1 = this.tin.charAt(0)
    this.tin2 = this.tin.charAt(1)
    this.tin3 = this.tin.charAt(2)
    this.tin4 = this.tin.charAt(3)
    this.tin5 = this.tin.charAt(4)
    this.tin6 = this.tin.charAt(5)
    this.tin7 = this.tin.charAt(6)
    this.tin8 = this.tin.charAt(7)
    this.tin9 = this.tin.charAt(8)

    this.PhilHealthNumber = this.companylist[0].philHealthNumber;
    this.PhilHealthNumber1 = this.PhilHealthNumber.charAt(0)
    this.PhilHealthNumber2 = this.PhilHealthNumber.charAt(1)
    this.PhilHealthNumber3 = this.PhilHealthNumber.charAt(2)
    this.PhilHealthNumber4 = this.PhilHealthNumber.charAt(3)
    this.PhilHealthNumber5 = this.PhilHealthNumber.charAt(4)
    this.PhilHealthNumber6 = this.PhilHealthNumber.charAt(5)
    this.PhilHealthNumber7 = this.PhilHealthNumber.charAt(6)
    this.PhilHealthNumber8 = this.PhilHealthNumber.charAt(7)
    this.PhilHealthNumber9 = this.PhilHealthNumber.charAt(8)
    this.PhilHealthNumber10 = this.PhilHealthNumber.charAt(9)
    this.PhilHealthNumber11 = this.PhilHealthNumber.charAt(10)
    this.PhilHealthNumber12 = this.PhilHealthNumber.charAt(11)

    }, error: (err) => {
      Swal.fire('Issue in GetCompanyAddressDetails');
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
       
    this.DigipayrollserviceService.GetEmployeeSalaryMonthly()
    
    
    .subscribe({
      next: data => {
        debugger
        this.employeelist = data.filter(x => x.employeeMonth == this.month && x.emplyeeYear == this.Year);
        const key = 'monthstaffid'
  
        this.uniquelist = [...new Map(this.employeelist.map((item: { [x: string]: any; }) =>
          [(item[key]), item])).values()]
  
          this.uniquelistchnuk = this.uniquelist.reduce((resultArray: any[][], item: any, index: number) => {
            const chunkIndex = Math.floor(index / 10)
    
            if (!resultArray[chunkIndex]) {
              resultArray[chunkIndex] = [] // start a new chunk
            }
    
            resultArray[chunkIndex].push(item)
    
            return resultArray
          }, [])
  
  
          this.sum = 0;
          for (let i = 0; i < this.uniquelist.length; i++) {
            this.sum += this.employeelist[i].monthlyPhilihealth;
          }
      }, error: (err) => {
        Swal.fire('Issue in GetEmployeeSalaryMonthly');
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
        Swal.fire('Issue in GetCompanyAddressDetails');
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
  // public getsign() {
  //   this.DigiofficeService.GetMyDetails().subscribe(data => {
  //     debugger
  //     this.stafflist1 = data.filter(x => x.department_name == this.sign);
  //     this.signname = this.stafflist1[0].name
  //     this.Signature = this.stafflist1[0].signature
  //   });
  // }




  public convetToPDF1() {
    debugger
    this.loader = true
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
      doc.save('RF-1.pdf');
      this.loader = false
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