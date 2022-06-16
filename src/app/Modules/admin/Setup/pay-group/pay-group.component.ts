import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-pay-group',
  templateUrl: './pay-group.component.html',
  styleUrls: ['./pay-group.component.css']
})
export class PayGroupComponent implements OnInit {
  SelectedData: any;
  id: any;
  result: any;
  constructor(private ActivatedRoute: ActivatedRoute, private DigipayrollserviceService: DigipayrollserviceService) { }

  ngOnInit(): void {
    this.GetPayGroup();
    this.ActivatedRoute.params.subscribe(params => {
      debugger
      this.id = params["id"];
      if (this.id != null && this.id != undefined) {
        this.GetPayGroup();
      }
    })
  }
  public GetPayGroup() {
    debugger
    this.DigipayrollserviceService.GetPayGroup().subscribe(
      data => {
        debugger
        this.result = data;
      })
  }

  // public Ondelete(id: any) {
  //   this.DigipayrollserviceService.DeletePayGroup(id).subscribe(
  //     data => {
  //       debugger
  //       this.GetPayGroup();
  //       Swal.fire('Deleted');
  //     }
  //   )
  // }

  

  Ondelete(id:any) {
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
      this.DigipayrollserviceService.DeletePayGroup(id).subscribe(
        data => {
        
         location.reload() 
      })
      Swal.fire('Deleted Successfully...!')   
      this.GetPayGroup();
    }
  });
}

  GetId(id: any) {
    this.id = id
  }

  update() {
    debugger
    if (this.id== null || this.id==undefined) {
      Swal.fire('Please Select the Record to Modify');
      // location.href = "/PayGroup"
    }

    else {
      location.href = "#/PayGroupForm/" + this.id;
    }
  }
}

