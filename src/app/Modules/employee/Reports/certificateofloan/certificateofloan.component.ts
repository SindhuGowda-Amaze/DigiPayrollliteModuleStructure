import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import Swal from 'sweetalert2';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-certificateofloan',
  templateUrl: './certificateofloan.component.html',
  styleUrls: ['./certificateofloan.component.css']
})
export class CertificateofloanComponent implements OnInit {

  showsalary:any
  showcalamity:any
  showhdmfsalary:any
  showhdmfcalamity:any
  myDate:any;
  stafflist:any;
  uniquelist:any;
  companylist:any;
  companyname:any;
  Address:any;
  staffid:any;
  roleid:any;
  p: any = 1;
  count1: any = 10;
  ssssalary:any;
  orgovtlist:any;
  oremployeelist:any;
  orresults:any;
  uniqueorlist:any;
  sign:any;
  department:any;
  signname:any;
  stafflist1:any;
  amount:any;
 employeelist: any;
 merged: any;
 results: any;
 govtlist:any;
 sssnumber:any;
 fullname:any;
 PhilHealth:any;
 hdmf:any;
 id:any;
 year:any;
 month:any;
 loantype:any;
 Month:any;
 Year:any;
 DatePaid:any;
 Amount:any;
 sssno:any;
 philhealthno:any;
 pagibigid:any;
 sssloantype:any;
 sssMonth:any;
 sssYear:any;
 sssDatePaid:any;
 sssAmount:any;
 loader:any;
 CalamityMonth:any;
 CalamityYear:any;
 CalamityDatePaid:any;
 calamityAmount:any;
 results1:any;
 results2:any;
 hdmfMonth:any;
 hdmfYear:any;
 hdmfDatePaid:any;
 hdmfAmount:any;
  constructor(public DigiofficeService: DigipayrollserviceService, private datePipe: DatePipe){}

  ngOnInit(): void {
    this.month="";
    this.year="";
    this.sign="";
    this.myDate = new Date();
    this.showsalary = 0;
    this.showcalamity=0;
    this.showhdmfsalary=0;
    this.showhdmfcalamity=0;
   

    this.staffid=sessionStorage.getItem('staffid')
    this.roleid = sessionStorage.getItem('roledid');
    debugger

  
    this.DigiofficeService.GetEmployeeLoans().subscribe(data => {
      debugger
      this.stafflist = data.filter(x=>x.staffID==this.staffid);
     
    });



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



  public getorrecords(){
    this.DigiofficeService.GetNewGovernmentRecords().subscribe(data => {
      debugger
      this.orgovtlist = data.filter(x => String(x.year) == this.year && String(x.month) == this.month );


  this.DigiofficeService.GetEmployeeSalaryMonthly().subscribe(data => {
    debugger
    this.oremployeelist = data.filter(x=> x.employeeMonth==this.month && x.emplyeeYear==this.year && x.monthlyAdjustment!=0);



    this.orresults = this.orgovtlist.map((val: { staffID: any; }) => {
      return Object.assign({}, val, this.oremployeelist.filter((v: { monthstaffid: any; }) => v.monthstaffid === val.staffID)[0]);

     
        

    });

    this.uniqueorlist = this.orresults.filter((x: { lastName: null; })=>x.lastName!=null)
    
   
    


  });

});

  }


 
public getsign(){
  this.DigiofficeService.GetMyDetails().subscribe(data => {
    debugger
    this.stafflist1 = data.filter(x => x.department_name == this.sign);
    this.signname = this.stafflist1[0].fullname
  });
}



public GetNewGovernmentRecords(id:any) {
  debugger
 this.id = id 
 this.ssssalary=true

}





  public showsalaryLoan(){

    this.DigiofficeService.GetNewGovernmentRecords().subscribe(data => {
      debugger
      this.govtlist = data.filter(x => String(x.year) == this.year && String(x.month) == this.month && x.staffID == this.id && x.ltype=="SSS Loan" );


      this.DigiofficeService.GetEmployeeSalaryMonthly().subscribe(data => {
        debugger
        this.employeelist = data.filter(x=>x.id==this.id);


        this.DigiofficeService.GetCompanyAddressDetails().subscribe(data => {
          debugger
          this.companylist = data
          this.companyname = this.companylist[0].company_Name,
          this.Address = this.companylist[0].address1 + this.companylist[0].address2
         
          this.results = this.govtlist.map((val: { staffID: any; }) => {
            return Object.assign({}, val, this.employeelist.filter((v: { id: any; }) => v.id === val.staffID)[0]);
           
              
      
          });

          
          if(this.results.length==0){
            Swal.fire('No Records Found')
          }
          else{
            const element1 = document.getElementById('myBtn2');
      
            if (element1 !== null) {
      
              element1.click();
              
      
            }
          }
         
          this.fullname = this.results[0].staffname + this.results[0].lastName
          this.sssno = this.results[0].sssno,
          this.philhealthno = this.results[0].pHILHEALTH_NO,
          this.pagibigid = this.results[0].pagiBig_ID,
          this.sssloantype =  this.results[0].type,
          this.sssMonth =  this.results[0].month,
          this.sssYear =  this.results[0].year,
          this.sssDatePaid = this.results[0].datePaid,
          this.sssAmount = this.results[0].amount
    
    
        })
    
      });
    });
   

    this.showsalary = 1;
    this.showcalamity = 0;
    this.showhdmfsalary=0;
    this.showhdmfcalamity=0;
    
  }


  public showcalamityLoan(){

      this.DigiofficeService.GetNewGovernmentRecords().subscribe(data => {
      debugger
      this.govtlist = data.filter(x => String(x.year) == this.year && x.month == this.month && x.staffID == this.id && x.ltype=="SSS Calamity Loan" );
     
      this.DigiofficeService.GetEmployeeSalary().subscribe(data => {
        debugger
        this.employeelist = data.filter(x=>x.id==this.id);
       
        this.DigiofficeService.GetCompanyAddressDetails().subscribe(data => {
          debugger
          this.companylist = data
          this.companyname = this.companylist[0].company_Name,
          this.Address = this.companylist[0].address1 + this.companylist[0].address2
        
          this.results1 = this.govtlist.map((val: { staffID: any; }) => {
            return Object.assign({}, val, this.employeelist.filter((v: { id: any; }) => v.id === val.staffID)[0]);
           
              
      
          });
    
         })
    
      });
    });
   
    if(this.results1.length==0){
      Swal.fire('No Records Found')
     
    }
    else{
      const element1 = document.getElementById('myBtn3');

      if (element1 !== null) {

        element1.click();
       
      }
     
    }

    this.fullname = this.results1[0].staffname + this.results1[0].lastName
    this.sssno = this.results1[0].sssno,
    this.philhealthno = this.results1[0].pHILHEALTH_NO,
    this.pagibigid = this.results1[0].pagiBig_ID
    this.loantype =  this.results1[0].type,
    this.CalamityMonth =  this.results1[0].month,
    this.CalamityYear =  this.results1[0].year,
    this.CalamityDatePaid = this.results1[0].datePaid,
    this.calamityAmount = this.results1[0].amount

    this.showsalary = 0;
    this.showcalamity = 1;
    this.showhdmfsalary=0;
    this.showhdmfcalamity=0;

  }

  public showhdmfsalaryLoan(){
   
    this.DigiofficeService.GetNewGovernmentRecords().subscribe(data => {
      debugger
      this.govtlist = data.filter(x => x.year == this.year && x.month == this.month && x.staffID == this.id && x.ltype=="HDMF Loan" );
     

      this.DigiofficeService.GetEmployeeSalary().subscribe(data => {
        debugger
        this.employeelist = data.filter(x=>x.monthstaffid==this.id);
      
         this.DigiofficeService.GetCompanyAddressDetails().subscribe(data => {
          debugger
          this.companylist = data
          this.companyname = this.companylist[0].company_Name,
          this.Address = this.companylist[0].address1 + this.companylist[0].address2
          
          
          this.results2 = this.govtlist.map((val: { staffID: any; }) => {
            return Object.assign({}, val, this.employeelist.filter((v: { id: any; }) => v.id === val.staffID)[0]);
           
              
      
          });
    
    
        })
    
      });
    });
  
    if(this.results2.length==0){
      Swal.fire('No Records Found')
     
    }
    else{
      const element1 = document.getElementById('myBtn5');

      if (element1 !== null) {

        element1.click();
       

      }
     
    }
   
    this.loantype =  this.results2[0].type,
    this.hdmfMonth =  this.results2[0].month,
    this.hdmfYear =  this.results2[0].year,
    this.hdmfDatePaid = this.results2[0].datePaid,
    this.hdmfAmount = this.results2[0].amount
    this.fullname = this.results2[0].staffname + this.results2[0].lastName
    this.sssno = this.results2[0].sssno,
    this.philhealthno = this.results2[0].pHILHEALTH_NO,
    this.pagibigid = this.results2[0].pagiBig_ID,
    this.showsalary = 0;
    this.showcalamity = 0;
    this.showhdmfsalary=1;
    this.showhdmfcalamity=0;


  }

  public showhdmfcalamityLoan(){
    this.DigiofficeService.GetNewGovernmentRecords().subscribe(data => {
      debugger
      this.govtlist = data.filter(x => x.year == this.year && x.month == this.month && x.staffID == this.id && x.type=="HDMF Calamity Loan" );
      this.loantype =  this.govtlist[0].type,
      this.Month =  this.govtlist[0].month,
      this.Year =  this.govtlist[0].year,
      this.DatePaid = this.govtlist[0].datePaid,
      this.Amount = this.govtlist[0].amount
      this.sssno = this.employeelist[0].sssno,
      this.philhealthno = this.employeelist[0].pHILHEALTH_NO,
      this.pagibigid = this.employeelist[0].pagiBig_ID,
      this.DigiofficeService.GetEmployeeSalary().subscribe(data => {
        debugger
        this.employeelist = data.filter(x=>x.monthstaffid==this.id);
        this.fullname = this.employeelist[0].staffname + this.employeelist[0].lastName
       
         this.DigiofficeService.GetCompanyDetails().subscribe(data => {
          debugger
          this.companylist = data
          this.companyname = this.companylist[0].companyName,
          this.Address = this.companylist[0].address
    
    
    
        })
    
      });
    });

    this.showsalary = 0;
    this.showcalamity = 0;
    this.showhdmfsalary=0;
    this.showhdmfcalamity=1;

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
      doc.save('Certificate of Loan.pdf');
      
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
