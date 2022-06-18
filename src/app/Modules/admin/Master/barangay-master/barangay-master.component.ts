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
  ID: any;
  leavelist: any;
  Short: any;
  Description: any;
  Countrylist: any;
  Citylist: any;
  term: any;
  CountryID: any;
  CityID: any;
  StateID: any;
  Name: any;
  currentUrl: any;
  constructor(private ActivatedRoute: ActivatedRoute, private DigipayrollserviceService: DigipayrollserviceService) { }

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.GetBarangayMaster();
      // this.StateID = "";
      // this.CountryID="";
      // this.CityID="";
      this.GetCountryType()
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
 public GetBarangayMaster()
 {
  this.DigipayrollserviceService.GetBarangayMaster()

  .subscribe({
    next: data => {
      debugger
      this.leavelist = data.filter(x => x.id == this.ID);
      this.CountryID = this.leavelist[0].countryID
      this.StateID = this.leavelist[0].provinceID
      this.GetStateID1( this.StateID)
      this.CityID = this.leavelist[0].cityID
      this.Name = this.leavelist[0].name
    }, error: (err) => {
      Swal.fire('Issue in Getting City Type');
      // Insert error in Db Here//
      var obj = {
        'PageName': this.currentUrl,
        'ErrorMessage': err.error.message
      }
      this.DigipayrollserviceService.InsertExceptionLogs(obj).subscribe(
        data => {
          debugger
        },
      )
    }
  })



 }

  public GetCountryType()
  {
    this.DigipayrollserviceService.GetCountryType()
    
    .subscribe({
      next: data => {
        debugger
        this.Countrylist = data
      }, error: (err) => {
        Swal.fire('Issue in GetCountryType');
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


 
  public GetStateID(evene: any) {
    debugger
    this.DigipayrollserviceService.GetCityType()
    
    .subscribe({
      next: data => {
        debugger
        this.Citylist = data.filter(x => x.stateID == evene.target.value)
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

  
  public GetStateID1(stateid: any) {
    debugger
    this.DigipayrollserviceService.GetCityType()
    
    .subscribe({
      next: data => {
        debugger
        this.Citylist = data.filter(x => x.stateID == stateid)
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


  public GetStateType() {
    debugger
    this.DigipayrollserviceService.GetStateType()
    .subscribe({
      next: data => {
        debugger
        this.leavelist = data
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


  public Cancel() {
    debugger
    location.href = "#/admin/BarangayDash";
  }


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
      this.DigipayrollserviceService.InsertBarangayMaster(entity)
      .subscribe(data => {
        if (data != 0) {
          Swal.fire("Saved Successfully");
          location.href = "#/admin/BarangayDash";
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
    this.DigipayrollserviceService.UpdateBarangayMaster(entity)
    
    .subscribe({
      next: data => {
        debugger
        Swal.fire("Updated Successfully");
      location.href = "#/admin/Barangaymaster";
      }, error: (err) => {
        Swal.fire('Issue in UpdateBarangayMaster');
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