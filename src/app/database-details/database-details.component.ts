import { Component, OnInit } from '@angular/core';
import { MD5, MD5Calculation } from 'src/model/MD5';
import { DataService } from '../data.service';

@Component({
  selector: 'app-database-details',
  templateUrl: './database-details.component.html',
  styleUrls: ['./database-details.component.css']
})
export class DatabaseDetailsComponent implements OnInit {

  md5_db = new Array<MD5>();
  failed !: boolean;
  test !: any;
  mapTest = new Map();
  secondtest !: any;
  anothertest !: any;
  possAnswer !: any;
  composed !: any;
  testMD5 !: MD5;
  testAny !: any;
  calcTest !: MD5Calculation;
  // maybeMD5 = new MD5();
  splitIndex !: number;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getMD5().subscribe(
      next => {
        this.test = next; //this.md5_db = next;
        // console.log(next);
        this.secondtest = next;
        // console.log(this.secondtest);
        // console.log(JSON.stringify(this.secondtest))
        const result = Object.entries(next);
        // console.log(result);
        // console.log(result[0]);
        this.composed = result;
        this.anothertest = JSON.parse(JSON.stringify(this.secondtest));
        //        console.log(this.mapTest.keys);
        for (let [keys, values] of Object.entries(result)) {
          // Get category name
          console.log(Object.entries(result));
          let please = JSON.stringify(values);
          // console.log(please);
          let split = please.split("\"", 20);
          // console.log(split);
          // console.log(values[1]);
          for (let i = 0; i < split.length; i++) {
            let maybeMD5 = new MD5();
            if (i == 3) {
              maybeMD5.Date_Time = values[0];
              maybeMD5.Value = split[i];
              maybeMD5.Comparison = split[i + 4];
              maybeMD5.Hex_Digest = split[i + 8];
              maybeMD5.Recalculated_Hex_Digest = split[i + 12];
              maybeMD5.Session_File = split[i + 16];
              this.md5_db.push(maybeMD5);
            }
          }
        }
        console.log(this.md5_db);
      }
    );

  }

}
