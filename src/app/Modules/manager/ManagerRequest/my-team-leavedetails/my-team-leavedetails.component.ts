import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-my-team-leavedetails',
  templateUrl: './my-team-leavedetails.component.html',
  styleUrls: ['./my-team-leavedetails.component.css']
})
export class MyTeamLeavedetailsComponent implements OnInit {

  term: any;
  Staffleaveenitilment: any;
  constructor(public DigiofficeService: DigipayrollserviceService, public router: Router) { }

  ngOnInit(): void {

    this.DigiofficeService.GetMyDetails().subscribe(data => {
      debugger
      this.Staffleaveenitilment = data.filter(x => x.supervisor == sessionStorage.getItem('staffid'));

    });
  }
  fileName = 'STLRF Report.xlsx';
  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('downloadaplication');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }

}
