import { Component, OnInit } from '@angular/core';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-er2',
  templateUrl: './er2.component.html',
  styleUrls: ['./er2.component.css']
})
export class ER2Component implements OnInit {
  stafflist:any;
  employeeid:any;
  uniquelist:any;
  dropdownSettings: any = {};
  showleaseforprint:any;
  staffID:any;
  Employee:any;
  emailid:any;
  EmployeeNo:any;
  PhilhealthNo:any;
  basesalary:any;
  dateofjoining:any;
  role:any;
  fullname:any;
  sign:any;
  department:any;
  signname:any;
  stafflist1:any;
  Signature:any;
  companylist:any;
  companyid:any;
  companyname:any;
  Address:any;
  currentUrl: any;

  constructor(public DigipayrollserviceService: DigipayrollserviceService) { }

  ngOnInit(): void {
    
   this.currentUrl = window.location.href;
    this.sign="";
    this.showleaseforprint = 0;
    this.GetEmployeeSalary();

  }

 public  GetEmployeeSalary(){
  this.DigipayrollserviceService.GetEmployeeSalary()
  
  
  .subscribe({
    next: data => {
      debugger
      this.stafflist = data;
  
  
      
    const key = 'staffID'
  
    this.uniquelist  = [...new Map(this.stafflist.map((item: { [x: string]: any; }) =>
      [(item[key]), item])).values()]
  
  
      this.dropdownSettings = {
        singleSelection: true,
        idField: 'staffID',
        textField: 'staffname',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: true
      };
  
    }, error: (err) => {
      Swal.fire('Issue in GetEmployeeSalary');
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


 
  onItemSelect(item: any) {
    debugger
    console.log(item);
    this.staffID = item.staffID
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
  


  public showpdf(){
    this.DigipayrollserviceService.GetMyDetails()
    
    .subscribe({
      next: data => {
        debugger
        this.stafflist = data.filter(x=>x.id==this.staffID);
        this.emailid = this.stafflist[0].emailID
        this.EmployeeNo = this.stafflist[0].id
        this.PhilhealthNo = this.stafflist[0].philhealtH_NO,
        this.role = this.stafflist[0].role,
        this.basesalary = this.stafflist[0].baseSal,
        this.dateofjoining = this.stafflist[0].joiningDate,
        this.fullname = this.stafflist[0].fullname,
        this.department = this.stafflist[0].role
        this.showleaseforprint = 1;
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
    

  
    this.DigipayrollserviceService.GetCompanyProfile()
    
    .subscribe({
      next: data => {
        debugger
        this.companylist = data
        this.companyid = this.companylist[0].id,
        this.companyname = this.companylist[0].company_Name,
        this.Address = this.companylist[0].address1 + this.companylist[0].address2
        // this.Phone = this.companylist[0].phone
        // this.email= this.companylist[0].email
        // this.zipcode = this.companylist[0].zipcode
        // this.tin = this.companylist[0].tin
  
      }, error: (err) => {
        Swal.fire('Issue in GetCompanyProfile');
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

 

  public showpdf1(){
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
      doc.save('ER-2 Report.pdf');
      
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