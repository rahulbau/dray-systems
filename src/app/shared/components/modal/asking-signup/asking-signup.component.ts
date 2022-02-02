import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asking-signup',
  templateUrl: './asking-signup.component.html',
  styleUrls: ['./asking-signup.component.css']
})
export class AskingSignupComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, private  router: Router) {}

  ngOnInit(): void {
  }


  joinAs(e) {
   this.router.navigate(['./signup']);
   this.activeModal.close();
  }

}
