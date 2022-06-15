import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';

@Component({
  selector: 'app-my-team-attendence',
  templateUrl: './my-team-attendence.component.html',
  styleUrls: ['./my-team-attendence.component.css']
})
export class MyTeamAttendenceComponent implements OnInit {

  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings: any = {};
  constructor(public DigiofficeService: DigipayrollserviceService) { }
  roleid: any
  staffID: any;
  p: any = 1;
  count1: any = 5;
  count:any;
  loader:any;
  attendancelistcopy:any;
  RoleType:any;
  Department:any;
  month:any;
  Departmentlist:any;
  RoleTypeList:any;

  ngOnInit(): void {
    this.loader=true;
    this.month=new Date().getMonth();
    this.roleid = sessionStorage.getItem('roledid');
    this.staffID = sessionStorage.getItem('staffid');

    this.RoleType="";
    this.Department="";

    this.DigiofficeService.GetDepartment().subscribe(data => {
      debugger
      this.Departmentlist = data;
    });

    this.DigiofficeService.GetRoleType().subscribe(data => {
      debugger
      this.RoleTypeList = data;
    });


    this.GetAttendance();
    this.DigiofficeService.GetMyDetails().subscribe((data: any) => {
      debugger
      this.dropdownList = data;
    })

    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true,

    };
  }


  employeeid: any
  onItemSelect(item: any) {
    debugger
    console.log(item);
    this.employeeid = item.id;
    this.DigiofficeService.GetAttendance().subscribe(data => {
      debugger
      this.attendancelist = data.filter(x => x.userID == this.employeeid && (x.filterdate >= this.startdate && x.filterdate <= this.enddate))

    })

  }
  attendancelistCopy:any;
  public Filterjobs() {
    debugger
    let searchCopy = this.selectedItems.toLowerCase();
    this.attendancelist = this.attendancelistCopy.filter((x: { userID: string}) => x.userID.toString().includes(searchCopy));
  }

  startdate: any;
  enddate: any;
  attendancelist: any;
  public getenddate(event: any) {
    debugger
    if(this.roleid==2){
      this.DigiofficeService.GetAttendance().subscribe(data => {
        debugger
        this.attendancelist = data.filter(x => x.supervisor == sessionStorage.getItem('staffid') && (x.filterdate >= this.startdate && x.filterdate <= this.enddate))
      })
    }
  else{
    this.DigiofficeService.GetAttendance().subscribe(data => {
      debugger
      this.attendancelist = data.filter(x =>  (x.filterdate >= this.startdate && x.filterdate <= this.enddate))
    })
  }
  }

  public getRoleType(event: any) {
    debugger
    this.RoleType = event.target.value;
  }

  public FilterRoleType() {
    debugger
    this.DigiofficeService.GetAttendance().subscribe(data => {
      debugger
      this.attendancelist = data.filter(x=>x.role==this.RoleType && x.supervisor == sessionStorage.getItem('staffid') && x.month==(this.month+1));
      this.count = this.attendancelist.length;
    });
 
  }

  public filterByDepartment(){
    debugger
    this.DigiofficeService.GetMyDetails().subscribe(data => {
      debugger
      this.attendancelist = data.filter(x=>x.department==this.Department);
      this.count = this.attendancelist.length;
    });
 
  }

  startingTime1: any;
  endTime1: any
  public GetAttendance() {
    debugger
    if (this.roleid == '2') {
      this.DigiofficeService.GetAttendance().subscribe(data => {
        debugger
        this.attendancelist = data.filter(x => x.supervisor == sessionStorage.getItem('staffid') && x.month==(this.month+1))
        this.count = this.attendancelist.length;
        this.loader=false;
      })
     
    }
    else {
      this.DigiofficeService.GetAttendance().subscribe(data => {
        debugger
        this.attendancelist = data.filter(x=>x.month==(this.month+1))
        this.count = this.attendancelist.length;
        this.attendancelistcopy=this.attendancelist
        this.loader=false;
      })
     
    }

    this.DigiofficeService.GetAttendanceConfiguration().subscribe(data => {
      debugger
      let temp: any = data;
      if (temp.length != 0) {
        this.startingTime1 = temp[0].startingTime;
        this.endTime1 = temp[0].endTime;
      } else {
        this.startingTime1 = '10:00';
        this.endTime1 = '19:00';
      }
     
    })
 
  }
  selecallbtn: any
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

Search:any;
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



}