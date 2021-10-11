import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crack-password',
  templateUrl: './crack-password.component.html',
  styleUrls: ['./crack-password.component.css']
})
export class CrackPasswordComponent implements OnInit {


  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  crackPasswordDetails(){
    this.router.navigate(['password-cracking']);
  }
}
