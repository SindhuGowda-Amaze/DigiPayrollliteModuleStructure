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
    this.GetShiftMaster();
  }

  shiftmasterlist: any
  public GetShiftMaster() {
    debugger
    this.DigiofficeService.GetShiftMaster().subscribe(data => {
      debugger
      this.shiftmasterlist = data
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