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
    this.DigipayrollserviceService.GetBarangayMaster()
    
    
    .subscribe({
      next: data => {
        debugger
        this.leavelist = data
      this.leavelistCopy= this.leavelist;
      }, error: (err) => {
        Swal.fire('Issue in GetBarangayMaster');
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

  public FilterBarabgay() {
    debugger
    let searchCopy = this.term.toLowerCase();
    this.leavelist = this.leavelistCopy.filter((x: {name: string; }) => x.name.toLowerCase().includes(searchCopy));
  }



  public GetStateType() {
    debugger
    this.DigipayrollserviceService.GetStateType()
    .subscribe({
      next: data => {
        debugger
        this.leavelist1 = data
      }, error: (err) => {
        Swal.fire('Issue in GetStateType');
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


  public DeleteCityType(ID: any) {
    debugger
    this.DigipayrollserviceService.DeleteBarangayMaster(ID)
    
    
    .subscribe({
      next: data => {
        debugger
        Swal.fire('Deleted SuccessFully');
      this.ngOnInit();
      }, error: (err) => {
        Swal.fire('Issue in DeleteBarangayMaster');
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

  public GetFilteredCitiesBystateID() {
    this.DigipayrollserviceService.GetCityType()
    .subscribe({
      next: data => {
        debugger
        this.leavelist = data.filter(x => x.stateID == this.stateID)
      }, error: (err) => {
        Swal.fire('Issue in GetCityType');
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

}

