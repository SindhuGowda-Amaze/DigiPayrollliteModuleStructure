import { Component, OnInit } from '@angular/core';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sssrl1-report',
  templateUrl: './sssrl1-report.component.html',
  styleUrls: ['./sssrl1-report.component.css']
})
export class SSSRL1ReportComponent implements OnInit {
  currentUrl: any;
  Month: any;
  Year: any;
  Person: any;
  showleaseforprint: any;
  employeelist: any;
  uniquelist: any;
  uniquelist1: any;
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
  month: any;
  MobileNumber: any;
  emailaddress: any;
  count: any;
  province: any;
  cityname: any;
  emailid: any;
  EmployeeNo: any;
  PhilhealthNo: any;
  basesalary: any;
  dateofjoining: any;
  role: any;
  fullname: any;
  sign: any;
  department: any;
  signname: any;
  stafflist1: any;
  signature1: any;

  constructor(public DigipayrollServiceService: DigipayrollserviceService) { }

 
  ngOnInit(): void {
    this.currentUrl = window.location.href;

    this.showleaseforprint = 0;
    this.month = "";
    this.year = "";
    this.sign = "";
  }


  uniquelistchnuk: any;
  public showpdf() {

    this.DigipayrollServiceService.GetEmployeeSalaryMonthly()
    .subscribe({
      next: data => {
        debugger
        this.employeelist = data.filter(x => x.employeeMonth == this.month && String(x.emplyeeYear) == this.year);
      this.showleaseforprint = 1;
      const key = 'monthstaffid';

      // const node = document.getElementById("downloadaplication") as HTMLElement;
      // const clone = node.cloneNode(true);

      //node.appendChild(clone) as HTMLElement;

      this.uniquelist = [...new Map(this.employeelist.map((item: { [x: string]: any; }) =>
        [(item[key]), item])).values()]
      this.count = this.uniquelist.length;

      this.uniquelistchnuk = this.uniquelist.reduce((resultArray: any[][], item: any, index: number) => {
        const chunkIndex = Math.floor(index / 10)

        if (!resultArray[chunkIndex]) {
          resultArray[chunkIndex] = [] // start a new chunk
        }

        resultArray[chunkIndex].push(item)

        return resultArray
      }, [])

      console.log(this.uniquelistchnuk);
      }, error: (err) => {
        Swal.fire('Issue in EmployeeSalaryMonthly');
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
      this.DigipayrollServiceService.GetCompanyAddressDetails()
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
          this.province = this.companylist[0].province
          this.cityname = this.companylist[0].cityname
  
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
  public getsign(){
    this.DigipayrollServiceService.GetCompanyAddressDetails()
    .subscribe({
      next: data => {
        debugger
        this.stafflist1 = data;
      this.signname = this.stafflist1[0].hR_AuthorisedPerson
      this.signature1 = this.stafflist1[0].hR_AuthorisedPerson_Signature
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
  
  // public getsign() {
  //   this.DigipayrollServiceService.GetMyDetails().subscribe(data => {
  //     debugger
  //     this.stafflist1 = data.filter(x => x.department_name == this.sign);
  //     this.signname = this.stafflist1[0].fullname
  //     this.signature1 = this.stafflist1[0].signature
  //   });
  // }
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


        doc.addImage(contentDataURL, 'PNG', 0, position, imgWidth, 1500);

        heightLeft -= pageHeight;

      }
      doc.deletePage(1)
      doc.save('R1A Report.pdf');

      var pdf1 = doc.output('blob');
      var file = new File([pdf1], "R1-A Report.pdf");
      let body = new FormData();
      debugger
      body.append('Dan', file);
      console.log('pdf', pdf1)



    }).then(() => {

    });;
  }


}