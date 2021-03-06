import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-city-master-dash',
  templateUrl: './city-master-dash.component.html',
  styleUrls: ['./city-master-dash.component.css']
})
export class CityMasterDashComponent implements OnInit {
  p: any = 1;
  count1: any = 10;
  leavelistCopy:any;
  term: any;
  StateID:any;
  leavelist: any;
  leavelist1: any;
  
  leavelist2:any;
  CountryID:any;
  currentUrl: any;

  constructor(public DigipayrollserviceService: DigipayrollserviceService) { }
  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.GetCityType();
    this.GetStateType();
    this.GetCountryType();
    this.CountryID="Select",
    this.StateID="Select"

  }
  
 
  public GetCityType() {
    debugger
    this.DigipayrollserviceService.GetCityType()
    
    .subscribe({
      next: data => {
        debugger
        this.leavelist = data
      this.leavelistCopy=this.leavelist ;
      }, error: (err) => {
        Swal.fire('Issue in Deleting Hoilday');
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
  
    
  public Filtercity() {
    debugger
    let searchCopy = this.term.toLowerCase();
    this.leavelist = this.leavelistCopy.filter((x: {short: string; }) => x.short.toLowerCase().includes(searchCopy));
  }


  public GetCityTypeByfilter() {
    debugger
    this.DigipayrollserviceService.GetCityType()
    
    .subscribe({
      next: data => {
        debugger
        this.leavelist = data.filter(x=>x.stateID==this.StateID)
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

  public GetCityTypeByfilterByCountry() {
    debugger
    this.DigipayrollserviceService.GetCityType()
    .subscribe({
      next: data => {
        debugger
        this.leavelist = data.filter(x=>x.countryID==this.CountryID)
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



 
  public GetCountryType() {
    debugger
    this.DigipayrollserviceService.GetCountryType()
    
    .subscribe({
      next: data => {
        debugger
        this.leavelist1 = data
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



  public GetStateType() {
    debugger
    this.DigipayrollserviceService.GetStateType()
    .subscribe({
      next: data => {
        debugger
        this.leavelist2 = data.filter(x=>x.countryID==this.CountryID)
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


  


  



  // public DeleteCityType(ID: any) {
  //   debugger
  //   this.DigipayrollserviceService.DeleteCityType(ID).subscribe(data => {
  //     debugger
  //     Swal.fire('Deleted SuccessFully');
  //     this.ngOnInit();
  //   })
  // }

  

  public DeleteCityType(ID: any) {
  Swal.fire({
    title: 'Are You Sure ',
    text: "Do you want to delete the Selected Record",
    icon: 'warning',
    // icon: 'success',
    showCloseButton: true,
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'OK'
  }).then((result) => {

    if (result.isConfirmed) {
      debugger
      this.DigipayrollserviceService.DeleteCityType(ID)
      .subscribe({
        next: data => {
          debugger
          Swal.fire('Deleted Successfully...!')   
      this.ngOnInit();
        }, error: (err) => {
          Swal.fire('Issue in DeleteCityType');
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
}

