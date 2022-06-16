import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cut-off-configuration-form',
  templateUrl: './cut-off-configuration-form.component.html',
  styleUrls: ['./cut-off-configuration-form.component.css']
})
export class CutOffConfigurationFormComponent implements OnInit {

  constructor(private ActivatedRoute: ActivatedRoute, private DigipayrollServiceService: DigipayrollserviceService) { }
  AutoApproval: any;
  roleid: any
  staffID: any;
  ID:any;
  loader:any;
  ManualApply:any;
  result:any;
  CutOffDate:any;
  Comments:any;
  payrolltype:any;
  leavelist:any;
  ngOnInit(): void {
    // this.loader=true;
    this.roleid = sessionStorage.getItem('roledid');
    this.staffID = sessionStorage.getItem('staffid');
    this.ActivatedRoute.params.subscribe(params => {
      debugger;
      this.ID = params['id'];
      if (this.ID == undefined) {
        this.payrolltype = "",
        this.CutOffDate = ""
        this.Comments = ""
       
         
      }
      else {
        
        this.DigipayrollServiceService.GetPayrollCutOffDate().subscribe(
          data => {
            debugger
            
            this.leavelist = data.filter(x => x.id == this.ID);
            this.payrolltype = this.leavelist[0].payperiod
            this.CutOffDate = this.leavelist[0].filterdate
            this.Comments = this.leavelist[0].comments
          
           
          },
        );
      }
    })

  }
  public InsertPayrollCutOffDate() {
    debugger;
    // if (this.AutoApproval == undefined) {
    //   Swal.fire('Please fill all the fields')
    // }
    // else {

      var entity = {
       
        payperiod: this.payrolltype,
        CutOffDate: this.CutOffDate,
        Comments : this.Comments


      }
      this.DigipayrollServiceService.InsertPayrollCutOffDate(entity).subscribe(data => {
        
          Swal.fire("Saved Successfully");
          location.reload();
       

      })
    
  }

  public UpdatePayrollCutOffDate() {
    debugger;
    // if (this.AutoApproval == undefined) {
    //   Swal.fire('Please fill all the fields')
    // }
    // else {

      var entity = {
       ID: this.ID,
       payperiod: this.payrolltype,
        CutOffDate: this.CutOffDate,
        Comments : this.Comments


      }
      this.DigipayrollServiceService.UpdatePayrollCutOffDate(entity).subscribe(data => {
        
          Swal.fire("Saved Successfully");
          location.reload();
       

      })
    
  }

   reload(){
    location.reload();
  }

}