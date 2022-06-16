import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-city-master',
  templateUrl: './city-master.component.html',
  styleUrls: ['./city-master.component.css']
})
export class CityMasterComponent implements OnInit {

  constructor(private ActivatedRoute: ActivatedRoute, private DigipayrollserviceService: DigipayrollserviceService) { }
  ID:any;
  leavelist:any;
  Short:any;
  Description:any;
  ngOnInit(): void {
    // this.CountryID="";
    // this.StateID="";
   
   
    this.GetCountryType();
    this.GetStateType();
    this.ActivatedRoute.params.subscribe(params => {
      debugger;
      this.ID = params['id'];
      if (this.ID == undefined) {
        this.Short = "",
        this.Description = ""
        this.StateID = ""
        this.CountryID = ""
         
      }
      else {

        this.DigipayrollserviceService.GetCityType().subscribe(
          data => {
            debugger
            
            this.leavelist = data.filter(x => x.id == this.ID);
            this.CountryID = this.leavelist[0].countryID
            this.GetCountryType1(this.CountryID)
            this.StateID = this.leavelist[0].stateID
            this.GetStateType1(this.StateID)
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

  public GetCountryType1(id:any) {
    debugger
    this.DigipayrollserviceService.GetCountryType().subscribe(data => {
      debugger
      this.leavelist1 = data.filter(x=>x.id==id)
    })
  }




  term:any;

  public GetStateType() {
    debugger
    this.DigipayrollserviceService.GetStateType().subscribe(data => {
      debugger
      this.leavelist = data.filter(x=>x.countryID==this.CountryID)
    })
  }


  public GetStateType1(countryid:any) {
    debugger
    this.DigipayrollserviceService.GetStateType().subscribe(data => {
      debugger
      this.leavelist = data.filter(x=>x.id==countryid)
    })
  }

  




 
  StateID:any;
  CountryID:any;
  
  public InsertCityType() {
    debugger;
    if(this.CountryID==""||this.StateID==""||this.Short==""||this.Description==""||this.CountryID==undefined||this.StateID==undefined||this.Short==undefined||this.Description==undefined){
      Swal.fire('Please Fill All The Mandatory Fields')
    }
    else{
      var entity = {
        'CountryID': this.CountryID,
        'StateID': this.StateID,
        'Short' : this.Short,
        'Description' : this.Description
      
      }
      this.DigipayrollserviceService.InsertCityType(entity).subscribe(data => {
        if (data != 0) {
          Swal.fire("Saved Successfully");
           location.href = "#/admin/CityMasterDash";
          
         
        }
  
      })
    }
  
   

  }


  public UpdateCityType() {
    debugger;
  
  
    var entity = {

      ID : this.ID,
      Short : this.Short,
      Description : this.Description
    
    }
    this.DigipayrollserviceService.UpdateCityType(entity).subscribe(data => {
    
        Swal.fire("Updated Successfully");
         location.href = "#/CityMasterDash";
        
       
     

    })

  }

}
