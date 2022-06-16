import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-barangay-master',
  templateUrl: './barangay-master.component.html',
  styleUrls: ['./barangay-master.component.css']
})
export class BarangayMasterComponent implements OnInit {


 
  constructor(private ActivatedRoute: ActivatedRoute, private DigipayrollserviceService: DigipayrollserviceService) { }
  ID: any;
  leavelist: any;
  Short: any;
  Description: any;
  Countrylist: any;
  ngOnInit(): void {
      // this.StateID = "";
      // this.CountryID="";
      // this.CityID="";
    this.DigipayrollserviceService.GetCountryType().subscribe(data => {
      debugger
      this.Countrylist = data
    })
    this.GetStateType();
    this.ActivatedRoute.params.subscribe(params => {
      debugger;
      this.ID = params['id'];
      if (this.ID == undefined) {


      }
      else {

        this.DigipayrollserviceService.GetBarangayMaster().subscribe(
          data => {
            debugger

            this.leavelist = data.filter(x => x.id == this.ID);
            this.CountryID = this.leavelist[0].countryID
            this.StateID = this.leavelist[0].provinceID
            this.GetStateID1( this.StateID)
            this.CityID = this.leavelist[0].cityID
            this.Name = this.leavelist[0].name
          },
        );
      }
    }
    )
  }
  Citylist: any;
  public GetStateID(evene: any) {
    debugger
    this.DigipayrollserviceService.GetCityType().subscribe(data => {
      debugger
      this.Citylist = data.filter(x => x.stateID == evene.target.value)
    })
  }

  
  public GetStateID1(stateid: any) {
    debugger
    this.DigipayrollserviceService.GetCityType().subscribe(data => {
      debugger
      this.Citylist = data.filter(x => x.stateID == stateid)
    })
  }

  term: any;
  CountryID: any;
  CityID: any;
  public GetStateType() {
    debugger
    this.DigipayrollserviceService.GetStateType().subscribe(data => {
      debugger
      this.leavelist = data
    })
  }


  public Cancel() {
    debugger
    location.href = "#/BarangayDash";
  }


  StateID: any;
  Name: any;
  public InsertCityType() {
    debugger;
    if (this.StateID == undefined || this.Name == undefined || this.CityID == undefined) {
      Swal.fire('Please Fill All Fields');
    } else {
      var entity = {
        'Name': this.Name,
        'CountryID': this.CountryID,
        'ProvinceID': this.StateID,
        'CityID': this.CityID,
        'Description': this.Name

      }
      this.DigipayrollserviceService.InsertBarangayMaster(entity).subscribe(data => {
        if (data != 0) {
          Swal.fire("Saved Successfully");
          location.href = "#/BarangayDash";
        }

      })
    }
  }


  public UpdateCityType() {
    debugger;
    var entity = {
      ID: this.ID,
      'Name': this.Name,
      'CountryID': this.CountryID,
      'ProvinceID': this.StateID,
      'CityID': this.CityID,
      'Description': this.Name

    }
    this.DigipayrollserviceService.UpdateBarangayMaster(entity).subscribe(data => {
      Swal.fire("Updated Successfully");
      location.href = "#/Barangaymaster";

    })

  }
}