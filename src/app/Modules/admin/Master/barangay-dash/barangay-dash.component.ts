import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-barangay-dash',
  templateUrl: './barangay-dash.component.html',
  styleUrls: ['./barangay-dash.component.css']
})
export class BarangayDashComponent implements OnInit {
  term: any;
  leavelist: any
  stateID: any;
  leavelist1: any;
  p: any = 1;
  count1: any = 10;
  leavelistCopy:any;
  currentUrl: any;
  
  constructor(public DigipayrollserviceService: DigipayrollserviceService) { }
  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.GetBarangayMaster();
    this.GetStateType();
    this.stateID = "Select"
  }
  
  public GetBarangayMaster() {
    debugger
    this.DigipayrollserviceService.GetBarangayMaster().subscribe(data => {
      debugger
      this.leavelist = data
      this.leavelistCopy= this.leavelist;
    })
  }

  public FilterBarabgay() {
    debugger
    let searchCopy = this.term.toLowerCase();
    this.leavelist = this.leavelistCopy.filter((x: {name: string; }) => x.name.toLowerCase().includes(searchCopy));
  }



  public GetStateType() {
    debugger
    this.DigipayrollserviceService.GetStateType().subscribe(data => {
      debugger
      this.leavelist1 = data
    })
  }


  public DeleteCityType(ID: any) {
    debugger
    this.DigipayrollserviceService.DeleteBarangayMaster(ID).subscribe(data => {
      debugger
      Swal.fire('Deleted SuccessFully');
      this.ngOnInit();
    })
  }

  public GetFilteredCitiesBystateID() {
    this.DigipayrollserviceService.GetCityType().subscribe(data => {
      debugger
      this.leavelist = data.filter(x => x.stateID == this.stateID)
    })
  }

}

