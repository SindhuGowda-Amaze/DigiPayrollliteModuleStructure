import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-state-master',
  templateUrl: './state-master.component.html',
  styleUrls: ['./state-master.component.css'],
})
export class StateMasterComponent implements OnInit {
  ID: any;
  leavelist: any;
  Short: any;
  Description: any;
  CountryID: any;
  leavelist1: any;
  currentUrl: any;

  constructor(
    public DigipayrollserviceService: DigipayrollserviceService,
    private activatedroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.GetCountryType();
    this.CountryID = '';
    this.activatedroute.params.subscribe((params) => {
      debugger;
      this.ID = params['id'];
      if (this.ID == undefined) {
        (this.Short = ''), (this.Description = '');
      } else {
        this.DigipayrollserviceService.GetStateType().subscribe((data) => {
          debugger;

          this.leavelist = data.filter((x) => x.id == this.ID);
          this.CountryID = this.leavelist[0].countryID;
          this.Short = this.leavelist[0].short;
          this.Description = this.leavelist[0].description;
        });
      }
    });
  }

  public GetCountryType() {
    debugger;
    this.DigipayrollserviceService.GetCountryType()
    
    .subscribe({
      next: data => {
        debugger
        debugger;
        this.leavelist1 = data;
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

  public InsertStateType() {
    debugger;

    if (
      this.CountryID == '' ||
      this.Short == '' ||
      this.Description == '' ||
      this.CountryID == undefined ||
      this.Short == undefined ||
      this.Description == undefined
    ) {
      Swal.fire('Please Fill All The Mandatory Fields');
    } else {
      var entity = {
        CountryID: this.CountryID,
        Short: this.Short,
        Description: this.Description,
      };
      this.DigipayrollserviceService.InsertStateType(entity)
      
      .subscribe({
        next: data => {
          debugger
          if (data != 0) {
            Swal.fire('Saved Successfully');
            location.href = '#/admin/StateMasterDash';
          }
        }, error: (err) => {
          Swal.fire('Issue in InsertStateType');
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

  public UpdateStateType() {
    debugger;

    var entity = {
      ID: this.ID,
      Short: this.Short,
      Description: this.Description,
    };
    this.DigipayrollserviceService.UpdateStateType(entity)
    
    .subscribe({
      next: data => {
        debugger
        Swal.fire('Updated Successfully');
      location.href = '#/admin/StateMasterDash';
      }, error: (err) => {
        Swal.fire('Issue in UpdateStateType');
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
