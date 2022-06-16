import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-country-master',
  templateUrl: './country-master.component.html',
  styleUrls: ['./country-master.component.css']
})
export class CountryMasterComponent implements OnInit {

  constructor(private ActivatedRoute: ActivatedRoute, private DigipayrollserviceService: DigipayrollserviceService) { }
  ID: any;
  leavelist: any;
  Short: any;
  Description: any;
  ngOnInit(): void {
    this.ActivatedRoute.params.subscribe(params => {
      debugger;
      this.ID = params['id'];
      if (this.ID == undefined) {
        this.Short = "",
          this.Description = ""

      }
      else {

        this.DigipayrollserviceService.GetCountryType().subscribe(
          data => {
            debugger

            this.leavelist = data.filter(x => x.id == this.ID);

            this.Short = this.leavelist[0].short
            this.Description = this.leavelist[0].description

          },
        );
      }
    }
    )
  }



  public InsertCountryType() {
    debugger;

    if (this.Short == "" || this.Description == "") {
      Swal.fire('Please Fill All Fields');
    }
    else {
      var entity = {
        Short: this.Short,
        Description: this.Description

      }
      this.DigipayrollserviceService.InsertCountryType(entity).subscribe(data => {
        if (data != 0) {
          Swal.fire("Saved Successfully");
          location.href = "#/admin/CountryMasterDash";
        }

      })
    }

  }


  public UpdateCountryType() {
    debugger;


    var entity = {

      ID: this.ID,
      Short: this.Short,
      Description: this.Description

    }
    this.DigipayrollserviceService.UpdateCountryType(entity).subscribe(data => {

      Swal.fire("Updated Successfully");
      location.href = "#/CountryMasterDash";




    })

  }
}
