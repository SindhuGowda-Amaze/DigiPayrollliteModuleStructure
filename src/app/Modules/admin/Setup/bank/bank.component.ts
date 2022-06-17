import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css'],
})
export class BankComponent implements OnInit {
  SelectedData: any;
  id: any;
  result: any;
  currentUrl: any;
  constructor(
    private ActivatedRoute: ActivatedRoute,
    private DigipayrollserviceService: DigipayrollserviceService
  ) {}

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.GetBanks();
    this.ActivatedRoute.params.subscribe((params) => {
      debugger;
      this.id = params['id'];
      if (this.id != null && this.id != undefined) {
        this.GetBanks();
      }
    });
  }
  public GetBanks() {
    debugger;
    this.DigipayrollserviceService.GetBanks().subscribe((data) => {
      debugger;
      this.result = data;
    });
  }

  // public Ondelete(id:any) {
  //   this.DigipayrollServiceService.DeleteBanks(id).subscribe(
  //     data => {
  //       debugger
  //       Swal.fire('Deleted');
  //       this.GetBanks();
  //     }
  //   )
  // }

  Ondelete(id: any) {
    Swal.fire({
      title: 'Are You Sure ',
      text: 'Do you want to delete the Selected Record',
      icon: 'warning',
      // icon: 'success',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed) {
        debugger;
        this.DigipayrollserviceService.DeleteBanks(id).subscribe((data) => {
          location.reload();
        });
        Swal.fire('Deleted Successfully...!');
        this.GetBanks();
      }
    });
  }

  GetId(id: any) {
    this.id = id;
  }

  update() {
    debugger;
    if (this.id == null || this.id == undefined) {
      Swal.fire('Please Select the Record to Modify');
      // location.href = "/PayGroup"
    } else {
      location.href = '#/admin/BankForm/' + this.id;
    }
  }
}
