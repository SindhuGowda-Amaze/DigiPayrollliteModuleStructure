import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-government',
  templateUrl: './government.component.html',
  styleUrls: ['./government.component.css']
})
export class GovernmentComponent implements OnInit {

  govtattachment: any;
  Search:any;
  constructor(private DigipayrollServiceService: DigipayrollserviceService) { }
  govtlist: any;
  dropdownSettings: any = {};
  month: any
  type: any;
  p: any = 1;
  count1: any = 10;
  RoleType:any;
  count:any;
  Department:any;
  Departmentlist:any;
  RoleTypeList:any;
  loader:any;
  ngOnInit(): void {
    this.loader=true
    this.Type = "";
    this.RoleType = "";
    this.SBRORNumber = "";
    this.Amount = "";
    this.DatePaid = "";
    this.month = "";
    this.payrolltype="";
    this.RoleType="";
    this.Department="";
    this.Department1="";
    this.Month="";
    this.Year="";
    this.staffId = sessionStorage.getItem('staffid')
    this.GetNewGovernmentRecords();
   


    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'fullname',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.DigipayrollServiceService.GetDepartment().subscribe(data => {
      debugger
      this.Departmentlist = data;
    });

    this.DigipayrollServiceService.GetRoleType().subscribe(data => {
      debugger
      this.RoleTypeList = data;
    });
  }

  employeelist: any;
  staffID: any;
  merged: any;
  results: any;
  copygovtlist: any;
  name: any;
  public GetNewGovernmentRecords() {
    debugger
    this.DigipayrollServiceService.GetNewGovernmentRecords().subscribe(data => {
      debugger
      this.govtlist = data;
      this.count = this.govtlist.length;




      this.DigipayrollServiceService.GetMyDetails().subscribe(data => {
        debugger
        this.employeelist = data
        this.results = this.govtlist.map((val: { staffID: any; }) => {
          return Object.assign({}, val, this.employeelist.filter((v: { id: any; }) => v.id === val.staffID)[0]);

        
        });
      })
      this.loader=false
    });


    //  this.merged = [];

    // for(let i=0; i<this.govtlist.length; i++) {
    //   this.merged.push({
    //    ...this.govtlist[i], 
    //    ...(this.employeelist.find((itmInner:any) => itmInner.id === this.govtlist[i].staffID))}
    //   );
    // }
    // console.log('data', this.merged)
  }

  employeelist34:any;
  Department1:any;
  public changeDepartment(){
    this.DigipayrollServiceService.GetMyDetails().subscribe(data => {
      debugger
      this.employeelist34 = data.filter(x=>x.department==this.Department1)
    });
  }

  public getRoleType(event: any) {
    debugger
    this.RoleType = event.target.value;
  }

  public FilterRoleType(event: any) {
    debugger
    this.RoleType = event.target.value;
    this.DigipayrollServiceService.GetNewGovernmentRecords().subscribe(data => {
      debugger
      this.govtlist = data;
      this.count = this.govtlist.length;




      this.DigipayrollServiceService.GetMyDetails().subscribe(data => {
        debugger
        this.employeelist34 = data
        this.results1 = this.govtlist.map((val: { staffID: any; }) => {
          return Object.assign({}, val, this.employeelist34.filter((v: { id: any; }) => v.id === val.staffID)[0]);
        });

        this.results=this.results1.filter((x: { type: any; })=>x.type==this.RoleType)
      })
      
    });
 
  }
  department:any;
  results1:any;
  public filterByDepartment(event: any){
    debugger
   
    this.department = event.target.value;
    this.DigipayrollServiceService.GetNewGovernmentRecords().subscribe(data => {
      debugger
      this.govtlist = data;
      this.count = this.govtlist.length;




      this.DigipayrollServiceService.GetMyDetails().subscribe(data => {
        debugger
        this.employeelist = data
        this.results1 = this.govtlist.map((val: { staffID: any; }) => {
          return Object.assign({}, val, this.employeelist.filter((v: { id: any; }) => v.id === val.staffID)[0]);
        });
        if(this.RoleType==""){
          this.results=this.results1.filter((x: { department: any;})=>x.department==this.department )
        }
        else{
          this.results=this.results1.filter((x: { department: any; type:any; })=>x.department==this.department && x.type==this.RoleType )
        }
      
      })
      
    });
 
  }

  Employee: any
  onItemSelect(item: any) {
    debugger
    console.log(item);
    this.staffID1 = item.id
  }

  public GetOfferLetter(offer: any) {
    window.open(offer, "_blank")
  }



  staffID1: any;
  ssS_Number: any;
  ssS_DatePaid: any;
  sssLoan_Number: any;
  sssLoan_DatePaid: any;
  sssCalamityLoan_Number: any;
  sssCalamityLoan_DatePaid: any;
  philHealth_Number: any;
  philHealth_DatePaid: any;
  hdmF_Number: any;
  hdmF_DatePaid: any;
  hdmfLoan_Number: any;
  hdmfLoan_DatePaid: any;
  hdmpCalamityLoan_Number: any;
  hdmpCalamityLoan_DatePaid: any;
  payrolltype: any;

  Type: any
  SBRORNumber: any
  Amount: any;
  DatePaid: any;
  staffId: any;
  staffName: any;
  staffId1: any;
  save() {
    var json = {

      "type": this.Type,
      "sbrorNumber": this.SBRORNumber,
      "amount": this.Amount,
      "datePaid": this.DatePaid,
      "attachment": this.govtattachment,
      "staffId": this.staffID1,
      "month": this.month,
      "payrolltype": this.payrolltype

      // "ssS_Number": this.ssS_Number,
      // "ssS_DatePaid": this.ssS_DatePaid,
      // "sssLoan_Number": this.sssLoan_Number,
      // "sssLoan_DatePaid": this.sssLoan_DatePaid,
      // "sssCalamityLoan_Number": this.sssCalamityLoan_Number,
      // "sssCalamityLoan_DatePaid": this.sssCalamityLoan_DatePaid,
      // "philHealth_Number": this.philHealth_Number,
      // "philHealth_DatePaid": this.philHealth_DatePaid,
      // "hdmF_Number": this.hdmF_Number,
      // "hdmF_DatePaid": this.hdmF_DatePaid,
      // "hdmfLoan_Number": this.hdmfLoan_Number,
      // "hdmfLoan_DatePaid": this.hdmfLoan_DatePaid,
      // "hdmpCalamityLoan_Number": this.hdmpCalamityLoan_Number,
      // "hdmpCalamityLoan_DatePaid": this.hdmpCalamityLoan_DatePaid,

    };

    this.DigipayrollServiceService.InsertNewGovernmentRecords(json).subscribe(
      data => {
        debugger
        let result = data;
        Swal.fire("Saved Sucessfully....!");
        this.Type = "";
        this.SBRORNumber = "";
        this.Amount = "";
        this.DatePaid = "";
        this.month = "";
        this.onRemove(this.files)
        this.GetNewGovernmentRecords();
      })
  }

  delete(id: any) {
    debugger;
    this.DigipayrollServiceService.DeleteNewGovernmentRecords(id).subscribe(
      data => {
        Swal.fire('Deleted Successfully...!')
        this.GetNewGovernmentRecords();
      })
  }

  files: File[] = [];
  onSelect(event: { addedFiles: any; }) {
    debugger
    console.log(event);
    this.files.push(event.addedFiles[0]);
    this.uploadattachments();
    console.log("content", this.files);
  }


  onRemove(event: any) {
    debugger
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  public uploadattachments() {
    debugger
    this.DigipayrollServiceService.AttachmentsUpload(this.files).subscribe(res => {
      debugger
      this.govtattachment = res;
      alert("ATTACHMENT UPLOADED");
    })
  }

  Year:any;
  Month:any;
  public getyear() {
    debugger
    this.DigipayrollServiceService.GetNewGovernmentRecords().subscribe(data => {
      debugger
      this.govtlist = data;
      this.count = this.govtlist.length;




      this.DigipayrollServiceService.GetMyDetails().subscribe(data => {
        debugger
        this.employeelist = data
        this.results1 = this.govtlist.map((val: { staffID: any; }) => {
          return Object.assign({}, val, this.employeelist.filter((v: { id: any; }) => v.id === val.staffID)[0]);
        });

        if(this.Year==""){
          this.results=this.results1.filter((x: { year: any;})=>x.year==this.Year )
        }
        else{
          this.results=this.results1.filter((x: { month: any; year:any; })=>x.month==this.Month && x.year==this.Year )
        }
      })
      
    });


    //  this.merged = [];

    // for(let i=0; i<this.govtlist.length; i++) {
    //   this.merged.push({
    //    ...this.govtlist[i], 
    //    ...(this.employeelist.find((itmInner:any) => itmInner.id === this.govtlist[i].staffID))}
    //   );
    // }
    // console.log('data', this.merged)
  }

  public getmonth() {
    debugger
    this.DigipayrollServiceService.GetNewGovernmentRecords().subscribe(data => {
      debugger
      this.govtlist = data.filter(x=>x.month==this.Month);
      this.count = this.govtlist.length;




      this.DigipayrollServiceService.GetMyDetails().subscribe(data => {
        debugger
        this.employeelist = data
        this.results = this.govtlist.map((val: { staffID: any; }) => {
          return Object.assign({}, val, this.employeelist.filter((v: { id: any; }) => v.id === val.staffID)[0]);
        });
      })
      
    });
  }
}