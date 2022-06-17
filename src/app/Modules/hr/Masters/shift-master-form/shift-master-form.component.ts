import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shift-master-form',
  templateUrl: './shift-master-form.component.html',
  styleUrls: ['./shift-master-form.component.css']
})
export class ShiftMasterFormComponent implements OnInit {

  constructor(public DigiofficeService: DigipayrollserviceService, private activatedroute: ActivatedRoute) { }
  ID: any;
  shiftmasterlist: any;
  Short: any;
  Description: any;
  ShiftTimeings: any
  Grace: any



  ngOnInit(): void {
    // this.Grace="";
    // this.Short="";
    this.GetShiftMaster();
    this.activatedroute.params.subscribe(params => {
      debugger;
      this.ID = params['id'];
      if (this.ID == undefined) {

      }
      else {

        this.DigiofficeService.GetShiftMaster().subscribe(
          data => {
            debugger

            this.shiftmasterlist = data;
            this.Short = this.shiftmasterlist[0].short;
            this.Description = this.shiftmasterlist[0].description;
            this.ShiftTimeings = this.shiftmasterlist[0].shiftTimeings;
            this.Grace = this.shiftmasterlist[0].grace;
          },
        );
      }
    }
    )
  }
public GetShiftMaster(){
  this.DigiofficeService.GetShiftMaster().subscribe(
    data => {
      debugger
      this.shiftmasterlist = data;
    },
  );
}

  
  public InsertShiftMaster() {
    debugger;
    if (this.Description == undefined || this.Short == undefined || this.ShiftTimeings == undefined || 
      this.Grace == undefined ) {
      Swal.fire('Please Fill All Fields');
    }

    var entity = {

      Short: this.Short,
      Description: this.Description,
      ShiftTimeings : this.ShiftTimeings,
      Grace : this.Grace

    }
    this.DigiofficeService.InsertShiftMaster(entity).subscribe(data => {
      if (data != 0) {
        Swal.fire("Saved Successfully");
        location.href = "#/Shiftmasterdash";


      }

    })

  }


  

  public Cancel() {
    debugger
    location.href = "#/hr/ShiftMasterDash";
  }

  public UpdateShiftMaster() {
    debugger;


    var entity = {

      ID: this.ID,
      Short: this.Short,
      Description: this.Description,
      ShiftTimeings : this.ShiftTimeings,
      Grace : this.Grace

    }
    this.DigiofficeService.UpdateShiftMaster(entity).subscribe(data => {

      Swal.fire("Updated Successfully");
      location.href = "#/Shiftmasterdash";




    })

  }


}