import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-city-master',
  templateUrl: './city-master.component.html',
  styleUrls: ['./city-master.component.css'],
})
export class CityMasterComponent implements OnInit {
  ID: any;
  leavelist: any;
  Short: any;
  Description: any;
  leavelist1: any;
  term: any;
  StateID: any;
  CountryID: any;
  currentUrl:any;
  constructor(
    private ActivatedRoute: ActivatedRoute,
    private DigipayrollserviceService: DigipayrollserviceService
  ) {}

  ngOnInit(): void {
    // this.CountryID="";
    // this.StateID="";
    this.currentUrl = window.location.href;
    this.GetCountryType();
    this.GetStateType();
    this.ActivatedRoute.params.subscribe((params) => {
      debugger;
      this.ID = params['id'];
      if (this.ID == undefined) {
        (this.Short = ''), (this.Description = '');
        this.StateID = '';
        this.CountryID = '';
      } else {
        this.DigipayrollserviceService.GetCityType()
        
        .subscribe({
          next: data => {
            this.leavelist = data.filter((x) => x.id == this.ID);
            this.CountryID = this.leavelist[0].countryID;
            this.GetCountryType1(this.CountryID);
            this.StateID = this.leavelist[0].stateID;
            this.GetStateType1(this.StateID);
            this.Short = this.leavelist[0].short;
            this.Description = this.leavelist[0].description;
          }, error: (err) => {
            Swal.fire('Issue in Getting CityType');
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
    });
  }

  public GetCountryType() {
    debugger;
    this.DigipayrollserviceService.GetCountryType()
    
    .subscribe({
      next: data => {
        debugger
        this.leavelist1 = data;
      }, error: (err) => {
        Swal.fire('Issue in Getting CountryType');
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

  public GetCountryType1(id: any) {
    debugger;
    this.DigipayrollserviceService.GetCountryType()
    
    .subscribe({
      next: data => {
        debugger
        this.leavelist1 = data.filter((x) => x.id == id);
      }, error: (err) => {
        Swal.fire('Issue in Getting CountryType');
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
    debugger;
    this.DigipayrollserviceService.GetStateType()
    
    .subscribe({
      next: data => {
        debugger
        this.leavelist = data.filter((x) => x.countryID == this.CountryID);
      }, error: (err) => {
        Swal.fire('Issue in Getting StateType');
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

  public GetStateType1(countryid: any) {
    debugger;
    this.DigipayrollserviceService.GetStateType()
    
    .subscribe({
      next: data => {
        debugger
        this.leavelist = data.filter((x) => x.id == countryid);
      }, error: (err) => {
        Swal.fire('Issue in Getting StateType');
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

  public InsertCityType() {
    debugger;
    if (
      this.CountryID == '' ||
      this.StateID == '' ||
      this.Short == '' ||
      this.Description == '' ||
      this.CountryID == undefined ||
      this.StateID == undefined ||
      this.Short == undefined ||
      this.Description == undefined
    ) {
      Swal.fire('Please Fill All The Mandatory Fields');
    } else {
      var entity = {
        CountryID: this.CountryID,
        StateID: this.StateID,
        Short: this.Short,
        Description: this.Description,
      };
      this.DigipayrollserviceService.InsertCityType(entity)
      
      .subscribe({
        next: data => {
          debugger
          if (data != 0) {
            Swal.fire('Saved Successfully');
            location.href = '#/admin/CityMasterDash';
          }
        }, error: (err) => {
          Swal.fire('Issue in Inserting CityMaster');
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

  public UpdateCityType() {
    debugger;

    var entity = {
      ID: this.ID,
      Short: this.Short,
      Description: this.Description,
    };
    this.DigipayrollserviceService.UpdateCityType(entity)
    
    .subscribe({
      next: data => {
        debugger
        Swal.fire('Updated Successfully');
        location.href = '#/CityMasterDash';
      }, error: (err) => {
        Swal.fire('Issue in Updating CityMaster');
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
