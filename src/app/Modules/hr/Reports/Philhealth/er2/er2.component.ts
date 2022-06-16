import { Component, OnInit } from '@angular/core';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';

@Component({
  selector: 'app-er2',
  templateUrl: './er2.component.html',
  styleUrls: ['./er2.component.css']
})
export class ER2Component implements OnInit {

  showleaseforprint:any;
  constructor(public DigipayrollServiceService: DigipayrollserviceService) { }
  stafflist:any;
  employeeid:any;
  uniquelist:any;
  dropdownSettings: any = {};
  ngOnInit(): void {
    this.sign="";
    this.showleaseforprint = 0;
    
    this.DigipayrollServiceService.GetEmployeeSalary().subscribe(data => {
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


    });


 


   
 


    
    
  


  }

  staffID:any;

  Employee:any
  onItemSelect(item: any) {
    debugger
    console.log(item);
    this.staffID = item.staffID
  }



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
  public getsign(){
    this.DigipayrollServiceService.GetCompanyAddressDetails().subscribe(data => {
      debugger
      this.stafflist1 = data;
      this.signname = this.stafflist1[0].hR_AuthorisedPerson
      this.Signature = this.stafflist1[0].hR_AuthorisedPerson_Signature
    });
  }
  


  public showpdf(){
    this.DigipayrollServiceService.GetMyDetails().subscribe(data => {
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
    });
  
    this.DigipayrollServiceService.GetCompanyProfile().subscribe(data => {
      debugger
      this.companylist = data
      this.companyid = this.companylist[0].id,
      this.companyname = this.companylist[0].company_Name,
      this.Address = this.companylist[0].address1 + this.companylist[0].address2
      // this.Phone = this.companylist[0].phone
      // this.email= this.companylist[0].email
      // this.zipcode = this.companylist[0].zipcode
      // this.tin = this.companylist[0].tin



    })


  
   

  }

  companylist:any;
  companyid:any;
  companyname:any;
  Address:any;

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