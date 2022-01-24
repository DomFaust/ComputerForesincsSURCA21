import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css']
})
export class DatabaseComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  databaseDetails(){
    this.router.navigate(['database']);
  }
}
