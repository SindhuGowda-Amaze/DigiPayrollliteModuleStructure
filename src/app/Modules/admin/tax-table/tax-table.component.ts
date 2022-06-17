import { Component, OnInit } from '@angular/core'
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tax-table',
  templateUrl: './tax-table.component.html',
  styleUrls: ['./tax-table.component.css']
})
export class TaxTableComponent implements OnInit {
  taxdetails:any;
  currentUrl: string | undefined;
  constructor(private DigipayrollServiceService:DigipayrollserviceService,private ActivatedRoute:ActivatedRoute) { }
  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.GetTaxtableAnnual();
  }
  public GetTaxtableAnnual() {
    debugger
    this.DigipayrollServiceService.GetTaxtableAnnual()







    
    .subscribe(
      data => {
        debugger
        this.taxdetails = data;
      })
  }

}


