import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-encryption',
  templateUrl: './encryption.component.html',
  styleUrls: ['./encryption.component.css']
})
export class EncryptionComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  encryptionDetails(){
    this.router.navigate(['encryption']);
  }
}
