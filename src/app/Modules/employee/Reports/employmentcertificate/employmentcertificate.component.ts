import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-employmentcertificate',
  templateUrl: './employmentcertificate.component.html',
  styleUrls: ['./employmentcertificate.component.css']
})
export class EmploymentcertificateComponent implements OnInit {
  showsss:any;
  showPhilhealth:any;
  showPagibig:any;
  search:any;
  stafflist: any;
  term: any;
  value: any;
  staffid:any;
  employeelist:any;
  stafflist12:any;
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  minDate = new Date();
  roleid:any;
  uniquelist:any;


  year:any;
  month:any;
  sssrate:any;
  ss_ec:any;
  ss_er:any;
  startmonth:any;
  endmonth:any;
  startyear:any;
  endyear:any;
  myDate:any;
  companylist:any;
  companyname:any;
  Address:any;
  fullname:any;
  paginigec:any;
  dob:any;
  PhilHealthEC:any;
  joiningdate:any;
  PhilHealth:any;
  employeemonth:any;
  emplyeeYear:any;
  sssno:any;
  philhealthno:any;
  pagibigid:any;
  govtlist:any;
  results:any;
  receiptnumber:any;
  datepaid123:any;

  companyid:any;

  numWords:any;
  amountInWords:any;
  Phone:any;
  email:any;
  zipcode:any;
  tin:any;
  govtlist1:any;
  employeelist1:any;
  results1:any;
  pagidatepaid123:any;
  pagireceiptnumber:any;
  logo:any;
  SSN_No:any;
  HDMFNumber:any;
  govtlist2:any;
  employeelist2:any;
  results2:any;
  philreceiptnumber:any;
  phildatepaid123:any;
  compphil:any;
  showss:any;
  
  p: any = 1;
  count1: any = 10;

  orgovtlist:any;
  oremployeelist:any;
  orresults:any;
  role:any;

  sign:any;
  department:any;
  signname:any;
  stafflist1:any;
  Signature:any;
  title:any;
  title1:any;

  constructor(public DigiofficeService: DigipayrollserviceService, private datePipe: DatePipe) {
    this.minDate.setDate(this.minDate.getDate() - 1);
    this.myDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }
  
  ngOnInit(): void {
    this.month="";
    this.year="";

    this.showsss = 0;
    this.showPhilhealth=0;
    this.showPagibig=0;
    this.staffid=sessionStorage.getItem('staffid')
    this.roleid = sessionStorage.getItem('roledid');
    debugger

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
      this.logo= this.companylist[0].company_logo
      this.SSN_No= this.companylist[0].ssN_No
      this.HDMFNumber = this.companylist[0].hdmfNumber
      this.compphil = this.companylist[0].philHealthNumber
    
    
    
    })

    if(this.roleid=='6')
    {

      this.DigiofficeService.GetMyDetails().subscribe(data => {
        debugger
        this.stafflist = data.filter(x => x.deniminimis != null && x.id == this.staffid);
  
        const key="id"
  
        this.uniquelist  = [...new Map(this.stafflist.map((item: { [x: string]: any; }) =>
        [(item[key]), item])).values()]
      });

     
   
    }
    else{

      this.DigiofficeService.GetMyDetails().subscribe(data => {
        debugger
        this.stafflist = data.filter(x => x.deniminimis != null);
  
        const key="id"
  
        this.uniquelist  = [...new Map(this.stafflist.map((item: { [x: string]: any; }) =>
        [(item[key]), item])).values()]
      });


      
  
    }

  






  }
  enddate: any;
  public getdate(event: any) {
    debugger
    this.enddate = event.target.value;

  }

 
  public getorrecords(){

    this.DigiofficeService.GetMyDetails().subscribe(data => {
      debugger
      this.stafflist = data.filter(x => x.id == this.staffid);

      const key="id"

      this.uniquelist  = [...new Map(this.stafflist.map((item: { [x: string]: any; }) =>
      [(item[key]), item])).values()]
    });
     this.role = this.uniquelist[0].role
     this.fullname =  this.uniquelist[0].name
     this.joiningdate = this.uniquelist[0].filterdate
     this.title = this.uniquelist[0].gender

  }


public getsign(){
  this.DigiofficeService.GetCompanyAddressDetails().subscribe(data => {
    debugger
    this.stafflist1 = data;
    this.signname = this.stafflist1[0].hR_AuthorisedPerson;
    this.Signature = this.stafflist1[0].hR_AuthorisedPerson_Signature;
    this.title1 = this.stafflist1[0].hR_PositionTitle;
  });
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
      doc.save('CertificateOfContribution.pdf');
      
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

