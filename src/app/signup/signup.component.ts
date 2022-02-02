import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  currentStep = 1;
  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  goNext(step) {
    this.currentStep = step;
  }

  onSingup() {
   this.router.navigate(['/login'])
  }

}
