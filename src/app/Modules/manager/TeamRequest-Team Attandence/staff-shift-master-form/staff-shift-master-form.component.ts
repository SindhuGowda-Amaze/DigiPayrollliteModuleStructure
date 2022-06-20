import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-staff-shift-master-form',
  templateUrl: './staff-shift-master-form.component.html',
  styleUrls: ['./staff-shift-master-form.component.css']
})
export class StaffShiftMasterFormComponent implements OnInit {

  constructor(public DigiofficeService: DigipayrollserviceService) { }
  ExpenseId: any;
  staffID: any;
  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings: any = {};

  StaffID: any;
  ShiftName: any;
  Staffid1: any;
  startdate: any;
  enddate: any;
  ngOnInit(): void {
    this.GetShiftMaster();
    this.GetStaff();

    this.ShiftName = "";
    this.Staffid1 = "";
    this.StaffID = sessionStorage.getItem('staffid');
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true,

    };



  }
  public selectedstaff: any = [];
  onItemSelect(item: any) {
    debugger
    console.log(item);
    this.selectedstaff.push(item.id);

  }

  ShiftDate: any;
  StartTime: any;
  Staffid: any;
  Stafflist: any;
  EndTime: any;
  public GetStaff() {
    debugger

    this.DigiofficeService.GetMyDetails().subscribe(data => {
      debugger
      this.Stafflist = data.filter(x => x.supervisor == this.StaffID);
    });
  }

  leavelist: any
  public GetShiftMaster() {
    debugger
    this.DigiofficeService.GetShiftMaster().subscribe(data => {
      debugger
      this.leavelist = data
    })
  }

  alldates: any
  public getDatesBetweenDates = (startDate: string | number | Date, endDate: string | number | Date) => {
    let dates: any = []
    //to avoid modifying the original date
    const theDate = new Date(startDate)
    while (theDate < new Date(endDate)) {
      dates = [...dates, new Date(theDate)]
      theDate.setDate(theDate.getDate() + 1)
    }
    dates = [...dates, new Date(endDate)]
    this.alldates = dates;
    return dates

  }
  public formatDate(date: any) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  leavelist12:any;
  ShiftID:any;
  public ChangeShiftMaster() {
    debugger
    this.DigiofficeService.GetShiftMaster().subscribe(data => {
      debugger
      this.leavelist12 = data.filter(x=>x.shiftTimeings==this.ShiftName)
      this.StartTime = this.leavelist12[0].starttime,
      this.EndTime =  this.leavelist12[0].endtime,
      this.ShiftID = this.leavelist12[0].id

    })
  }

  public save() {
    debugger
    // this.getDatesBetweenDates(this.startdate, this.enddate);
    for (let i = 0; i <= this.selectedstaff.length; i++) {
     
        var eb = {
          'ShiftDate': this.startdate,
          'ShiftName': this.ShiftName,
           'StartTime': '2022-04-30 10:00:00.000',
          'EndTime': '2022-04-30 10:00:00.000',
          'StaffID1': this.selectedstaff[i],
          'EndDate': this.enddate


        }


        
  
        
        this.DigiofficeService.InsertStaffShiftDetails(eb).subscribe(

          data => {
            debugger
            Swal.fire("Saved Successfully")
            location.href = "#/manager/MyTeamWeeklyShift"
           
          },
        )
        
      
      // var entity = {

      //   ID: this.ID,
      //   ShiftID: this.ShiftID,
      
  
      // }
      // this.DigiofficeService.UpdateCityType(entity).subscribe(data => {

      //   Swal.fire("Updated Successfully");
      //   location.href = "#/CityMasterDash";
  
  
  
  
      // })
    }
   
    this.UpdateStaffShift();
  }


  public UpdateStaffShift() {
    debugger;

    for (let i = 0; i <= this.selectedstaff.length; i++) {
    var entity = {

      ID: this.selectedstaff[i],
      ShiftID: this.ShiftID,
    

    }
    this.DigiofficeService.UpdateStaffShift(entity).subscribe(data => {
     

    })
  }
  }


 public Cancel() {
    debugger
    location.href = "#/manager/MyTeamWeeklyShift"
 }
}