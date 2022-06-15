import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import * as XLSX from  'xlsx';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-my-team-salary-adjustment',
  templateUrl: './my-team-salary-adjustment.component.html',
  styleUrls: ['./my-team-salary-adjustment.component.css']
})
export class MyTeamSalaryAdjustmentComponent implements OnInit {

  viewMode = 'tab1';
  constructor(public DigiofficeService: DigipayrollserviceService, public router: Router) { }
  selecallbtn: any;
  projectlist: any;
  attendancelist: any;
  RoleTypeList: any;
  Departmentlist: any;
  roleid: any;
  date: any;
  RoleType: any;
  Department: any;
  count: any;
  p: any = 1;
  count1: any = 10;
  TransportationType: any;
  Date: any;
  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings: any = {};
  StaffID: any;
  OTlist: any;
  Supervisor: any;
  Name: any;
  Project: any;
  Destination: any;
  Purpose: any;
  ContactPerson: any;
  ContactPhNo: any;
  TimeOfDeparture: any;
  TimeOfReturn: any;

  noofhours: any;
  Comments: any;
  type: any;
  day: any
  attendancelistcopy: any;
  timedetails: any;
  stafflist:any;
  ngOnInit(): void {
    this.Department = "";
    this.RoleType = "";
    this.roleid = sessionStorage.getItem('roledid');
   
    this.GetSalaryAdjustmentType();

    this.DigiofficeService.GetDepartment().subscribe(data => {
      debugger
      this.Departmentlist = data;
    });

    this.DigiofficeService.GetRoleType().subscribe(data => {
      debugger
      this.RoleTypeList = data;
    });

    this.StaffID = sessionStorage.getItem('staffid');
    this.DigiofficeService.GetOTRates().subscribe(data => {
      debugger
      this.OTlist = data
    })
    this.DigiofficeService.GetMyDetails().subscribe(data => {
      debugger
      this.stafflist = data;
      
    });
  }

  public GetSalaryAdjustmentType() {
    debugger
    this.DigiofficeService.GetSalaryAdjustmentType().subscribe(data => {
      debugger
      if(this.roleid==2){
        this.timedetails = data.filter(x=>x.supervisor==sessionStorage.getItem('staffid'));
        this.count = this.timedetails.length
      }
      else{
        this.timedetails = data;
        this.count = this.timedetails.length
      }
     
    },
    )
  }

  

 

  public getRoleType(event: any) {
    debugger
    this.RoleType = event.target.value;
  }


  public ManagerLeaveApprove(id: any) {
    debugger
    
      var entity = {
        'ID': id.id,
        'ApprovalStatus': 'Manager Approved',
        'UserID':  id.userID
        
  
      }
      this.DigiofficeService.ApproveOtRequest(entity).subscribe(data => {
     
          Swal.fire("Approved Successfully");
          this.getpassword('Manager Rejected',id.userID)
          this.ngOnInit();
  
        
  
      })
     
   
   


  }

  public ManagerReject(id: any) {
    debugger
    
      var entity = {
        'ID': id.id,
        'ApprovalStatus': 'Manager Rejected',
        'UserID':  id.userID
        
  
      }
      this.DigiofficeService.ApproveOtRequest(entity).subscribe(data => {
     
          Swal.fire("Rejected Successfully");
          this.getpassword('Manager Rejected',id.userID)
          this.ngOnInit();
  
        
  
      })
     
   
   


  }

  public ManagerLeaveReject(id: any) {
    debugger
    
      var entity = {
        'ID': id.id,
        'ApprovalStatus': 'Manager Rejected',
        'UserID':  id.userID
        
  
      }
      this.DigiofficeService.ApproveOtRequest(entity).subscribe(data => {
        
          Swal.fire("Rejected Successfully");
          this.getpassword('Manager Rejected',id.userID)
          this.ngOnInit();
  
        
  
      })
     
    
  
   


  }
  

  password1: any;
  supervisoremail:any;
  employeename:any;
  employeeemail:any;
  getpassword(status:any,staffid:any) {
    debugger;
    this.DigiofficeService.GetMyDetails().subscribe(data => {
      let temp: any = data.filter(x => x.id == staffid);
      if (temp.length != 0) {
        this.employeeemail = temp[0].emailID;
        this.employeename = temp[0].name;
        this.sendemail(status);
      }

    })
  }
  

  fileName = 'Salary Adjustment Report.xlsx';
  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('lvs');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }

  
  public Attactments = [];
  public sendemail(status:any) {
    if (this.roleid==2){
      var entity1 = {
        'emailto': this.employeeemail,
        'emailsubject': 'Salary Dispute Application',
        'emailbody': 'Hi , <br> ' + this.employeename + ' your Salary Dispute request is ' + 'Approved'  + ' by your Manager , Please Login to Digioffice To View It.<br> Thanks <br> Team Digi-Office',
        'attachmenturl': this.Attactments,
        'cclist': this.employeeemail,
        'bcclist': this.employeeemail,
      }
    }
  else{
    var entity1 = {
      'emailto': this.employeeemail,
      'emailsubject': 'Salary Dispute Application',
      'emailbody': 'Hi , <br> ' + this.employeename + ' your Salary Dispute request has been  ' + 'Approved' + ' by your HR , Please Login to Digioffice To View It.<br> Thanks <br> Team Digi-Office',
      'attachmenturl': this.Attactments,
      'cclist': this.employeeemail,
      'bcclist': this.employeeemail,
    }
  }  
   
    this.DigiofficeService.sendemail1(entity1).subscribe(res => {
      debugger;
      this.Attactments = [];

      
    })

  }


  public FilterRoleType() {
    debugger
    this.DigiofficeService.GetMyDetails().subscribe(data => {
      debugger
      this.attendancelist = data.filter(x => x.roleType == this.RoleType || (x.supervisor == sessionStorage.getItem('staffid') && x.ot > 0));
      this.count = this.attendancelist.length;
    });

  }

  public filterByDepartment() {
    debugger
    this.DigiofficeService.GetMyDetails().subscribe(data => {
      debugger
      this.attendancelist = data.filter(x => x.department == this.Department || (x.supervisor == sessionStorage.getItem('staffid') && x.ot > 0));
      this.count = this.attendancelist.length;
    });

  }


  edate: any;
  public getdate() {
    debugger
    this.DigiofficeService.GetSalaryAdjustmentType().subscribe(data => {
      debugger
      this.attendancelist = data.filter(x => x.supervisor == sessionStorage.getItem('staffid') && (x.filterdate >= this.date && x.filterdate1 <= this.edate))
    })
  }

  temp: any;
  public IntID: any = [];
  public ID: any = [];
  term: any
  public getCheckbocdetails(evn: any) {
    let temp: any = evn;
    this.temp = Object.entries(temp);
    debugger
    if (this.temp.every((val: { checked: boolean; }) => val.checked == true)) {
      this.IntID = false;
      this.ID = [];
      this.temp.forEach((val: { checked: boolean; }) => { val.checked = false });
      this.IntID = false;
    }
    else {
      debugger;
      this.selecallbtn = true;
      //  this.ID = [];
      debugger
      this.temp.forEach((val: { checked: boolean; }) => { val.checked = true });
      this.IntID = true;
      this.ID.push(evn.id);
    }
  }

  selectALL(checked: boolean) { // pass true or false to check or uncheck all
    this.selecallbtn = true;
    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].type == "checkbox") {
        inputs[i].checked = checked;
        // This way it won't flip flop them and will set them all to the same value which is passed into the function
      }
    }
  }
  public Approveall() {
    debugger
    this.selecallbtn = false;
    Swal.fire('Approved Successfully');
    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].type == "checkbox") {
        inputs[i].checked = false;
        // This way it won't flip flop them and will set them all to the same value which is passed into the function
      }
    }
  }
  Amount:any;
  Hours:any;
  salaryperhour:any;
  stafflistcopy:any;
 public getsalary(){
   debugger;
  this.stafflistcopy=this.stafflist.filter((x: { id: any; })=>x.id==this.staffid)
  if(this.salaryAdjustmentType=='Late Filing Of OT'){
    this.Amount = (this.Hours * this.stafflistcopy[0].salaryperhour*1.25).toFixed(2);
  }
  else{
    this.Amount = (this.Hours * this.stafflistcopy[0].salaryperhour).toFixed(2)
  }
 
 }

  id: any;

  sdte: any;
  Notes: any;
  public GetRejectID(list: any) {
    this.id = list.id;
    this.sdte = list.sdte;
    this.edate = list.edate;
  }

  public ManagerAdjustmentApprove(id: any) {
    debugger

      var entity = {
        'ID': id.id,
        'Status': 'Manager Approved Hr Pending',
        'amount' : this.Amount,
        'hours' : this.Hours


      }
      this.DigiofficeService.ManagerAdjustmentApprove(entity).subscribe(data => {

        Swal.fire("Approved Successfully");
        this.getpassword('Manager Approved',id.staffID)
        this.ngOnInit();



      })
    
  
   
    
  }

  HRComments:any;
  public HRAdjustmentApprove() {
    debugger

      var entity = {
        'ID': this.id1,
        'Status': 'Manager Approved Hr Approved',
        'amount' : this.Amount,
        'hours' : this.Hours,
        'HRComments' : this.HRComments


      }
      this.DigiofficeService.ManagerAdjustmentApprove(entity).subscribe(data => {

        Swal.fire("Approved Successfully");
        this.getpassword('Hr Approved',this.staffid)
        this.ngOnInit();



      })
    
  
   
    
  }
  id1:any;
  staffid:any;
  salaryAdjustmentType:any;
  public getid(item:any){
    this.id1=item.id,
    this.staffid = item.staffID,
    this.salaryAdjustmentType = item.salaryAdjustmentType
  }
  RejectReason:any;

  public ManagerAdjustmentReject(id: any) {
    debugger

      var entity = {
        'ID': id.id,
        'Status': 'Manager Rejected Hr Pending',
        'amount' : this.Amount,
        'hours' : this.Hours


      }
      this.DigiofficeService.ManagerAdjustmentApprove(entity).subscribe(data => {

        Swal.fire("Approved Successfully");
        this.getpassword('Manager Rejected Hr Pending',id.staffID)
        this.ngOnInit();



      })
    
  
   
    
  }
  public HRAdjustmentReject(id: any) {
    debugger

      var entity = {
        'ID': id.id,
        'Status': 'Manager Approved Hr Rejected',
        'amount' : this.Amount,
        'hours' : this.Hours


      }
      this.DigiofficeService.ManagerAdjustmentApprove(entity).subscribe(data => {

        Swal.fire("Approved Successfully");
        this.getpassword('Manager Approved Hr Rejected',id.staffID)
        this.ngOnInit();



      })
    
  
   
    
  }
  public ManagerOTReject() {
    debugger

      var entity = {
        'ID': this.id1,
        'Status': 'Manager Rejected',
        'RejectReason': this.RejectReason


      }
      this.DigiofficeService.UpdateOtFromManager(entity).subscribe(data => {

        Swal.fire("Rejected Successfully");
        this.getpassword('Manager Rejected',this.staffid)
        this.ngOnInit();



      })
    
  
   
    
  }

}
