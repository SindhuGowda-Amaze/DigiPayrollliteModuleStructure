import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shift-master-dash',
  templateUrl: './shift-master-dash.component.html',
  styleUrls: ['./shift-master-dash.component.css']
})
export class ShiftMasterDashComponent implements OnInit {
  currentUrl: any;

  constructor(public DigiofficeService: DigipayrollserviceService) { }

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.GetShiftMaster();
  }

  shiftmasterlist: any
  public GetShiftMaster() {
    debugger
    this.DigiofficeService.GetShiftMaster().subscribe({
      next: data => {
        debugger
        this.shiftmasterlist = data
      }, error: (err) => {
        Swal.fire('Issue in Getting Shift Master');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    })
  }

  public delete(id: any) {
    debugger
    this.DigiofficeService.DeleteShiftMaster(id).subscribe(data => {
      debugger
      Swal.fire('Deleted Successfully');
      this.ngOnInit();
    })

  }
}