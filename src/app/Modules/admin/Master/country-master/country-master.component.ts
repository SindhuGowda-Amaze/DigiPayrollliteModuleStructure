import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-country-master',
  templateUrl: './country-master.component.html',
  styleUrls: ['./country-master.component.css'],
})
export class CountryMasterComponent implements OnInit {
  ID: any;
  leavelist: any;
  Short: any;
  Description: any;
  currentUrl: any;

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private DigipayrollserviceService: DigipayrollserviceService
  ) {}

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.ActivatedRoute.params.subscribe((params) => {
      debugger;
      this.ID = params['id'];
      if (this.ID == undefined) {
        (this.Short = ''), (this.Description = '');
      } else {
        this.DigipayrollserviceService.GetCountryType()
        
        .subscribe({
          next: data => {
            debugger
            this.leavelist = data.filter((x) => x.id == this.ID);

          this.Short = this.leavelist[0].short;
          this.Description = this.leavelist[0].description;
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
    });
  }

  public InsertCountryType() {
    debugger;

    if (this.Short == '' || this.Description == '') {
      Swal.fire('Please Fill All Fields');
    } else {
      var entity = {
        Short: this.Short,
        Description: this.Description,
      };
      this.DigipayrollserviceService.InsertCountryType(entity)
      
      
      .subscribe({
        next: data => {
          debugger
          if (data != 0) {
            Swal.fire('Saved Successfully');
            location.href = '#/admin/CountryMasterDash';
          }
        }, error: (err) => {
          Swal.fire('Issue in InsertCountryType');
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

  public UpdateCountryType() {
    debugger;

    var entity = {
      ID: this.ID,
      Short: this.Short,
      Description: this.Description,
    };
    this.DigipayrollserviceService.UpdateCountryType(entity)
    
    .subscribe({
      next: data => {
        debugger
        Swal.fire('Updated Successfully');
        location.href = '#/CountryMasterDash';
      }, error: (err) => {
        Swal.fire('Issue in UpdateCountryType');
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
