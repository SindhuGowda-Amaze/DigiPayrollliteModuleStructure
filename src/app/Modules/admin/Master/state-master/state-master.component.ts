import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-state-master',
  templateUrl: './state-master.component.html',
  styleUrls: ['./state-master.component.css']
})
export class StateMasterComponent implements OnInit {

  constructor(public DigipayrollserviceService: DigipayrollserviceService,private activatedroute: ActivatedRoute) { }
  ID:any;
  leavelist:any;
  Short:any;
  Description:any;
  CountryID:any;

  

  ngOnInit(): void {
    this.GetCountryType();
    this.CountryID="";
    this.activatedroute.params.subscribe(params => {
      debugger;
      this.ID = params['id'];
      if (this.ID == undefined) {
        this.Short = "",
        this.Description = ""
         
      }
      else {

        this.DigipayrollserviceService.GetStateType().subscribe(
          data => {
            debugger
            
            this.leavelist = data.filter(x => x.id == this.ID);
            this.CountryID = this.leavelist[0].countryID
            this.Short = this.leavelist[0].short
            this.Description = this.leavelist[0].description
           
          },
        );
      }
    }
    )
  }


  leavelist1: any
  public GetCountryType() {
    debugger
    this.DigipayrollserviceService.GetCountryType().subscribe(data => {
      debugger
      this.leavelist1 = data
    })
  }
  
  
  public InsertStateType() {
    debugger;
  
  if(this.CountryID==""||this.Short==""||this.Description==""||this.CountryID==undefined||this.Short==undefined||this.Description==undefined){
    Swal.fire('Please Fill All The Mandatory Fields')
  }
  else{
    var entity = {

      'CountryID': this.CountryID,
      'Short' : this.Short,
      'Description' : this.Description
    
    }
    this.DigipayrollserviceService.InsertStateType(entity).subscribe(data => {
      if (data != 0) {
        Swal.fire("Saved Successfully");
        location.href = "#/admin/StateMasterDash";
        
       
      }

    })
  }
  

  }


  public UpdateStateType() {
    debugger;
  
  
    var entity = {

      ID : this.ID,
      Short : this.Short,
      Description : this.Description
    
    }
    this.DigipayrollserviceService.UpdateStateType(entity).subscribe(data => {
    
        Swal.fire("Updated Successfully");
        location.href = "#/admin/StateMasterDash";
        
       
     

    })

  }

}
