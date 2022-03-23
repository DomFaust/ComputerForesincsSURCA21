import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MD5, MD5Calculation } from 'src/model/MD5';
import { SHA, SHA_1, SHA_2 } from 'src/model/SHA';
import { DataService } from '../data.service';

@Component({
  selector: 'app-database-details',
  templateUrl: './database-details.component.html',
  styleUrls: ['./database-details.component.css']
})
export class DatabaseDetailsComponent implements OnInit {



  //Variables created for MD5
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


  //Variables created for SHA
  acquireSHA !: any;
  shaTest !: any;
  sha_db = new Array<SHA>();
  sha1_db = new Array<SHA_1>();
  sha2_db = new Array<SHA_2>();
  sha1_info !: any;
  sha2_info !: any;


  //Attempting to design db
  buttonStatus !: boolean;
  md5Clicked !: boolean;
  sha1Clicked !: boolean;
  sha2Clicked !: boolean;


  displayedColumns: string[] = ['date', 'value', 'comparison', 'digest', 'file'];
  tableList = new MatTableDataSource();

  constructor(private dataService: DataService,
    private el: ElementRef,
    private renderer: Renderer2) { }

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
        this.composed = result;
        this.anothertest = JSON.parse(JSON.stringify(this.secondtest));
        for (let [keys, values] of Object.entries(result)) {
          // Get category name
          // console.log(Object.entries(result));
          let keys_as_number !: number;
          let dailyEntries !: any;
          let md5_Entry = new MD5();
          keys_as_number = parseInt(keys);

          dailyEntries = Object.entries(result[keys_as_number][1]);
          // console.log(dailyEntries);
          md5_Entry.Date_Time = result[keys as any][0];

          // console.log(values[1]);
          let completeDayInfo = JSON.stringify(values[1]);
          // console.log(completeDayInfo);
          let infoSplit = completeDayInfo.split("\"");
          // console.log(infoSplit);

          infoSplit.forEach((y, i, fullArray) => {
            let copyIndex = i;
            let stored_Date: string;
            if (i == 0) {
              md5_Entry.ID = infoSplit[i + 1];
              md5_Entry.Comparison = infoSplit[i + 5];
              md5_Entry.Hex_Digest = infoSplit[i + 9];
              md5_Entry.Recalculated_Hex_Digest = infoSplit[i + 13];
              md5_Entry.Session_File = infoSplit[i + 17];
              this.md5_db.push(md5_Entry);
              stored_Date = md5_Entry.Date_Time;
              md5_Entry = new MD5();
              md5_Entry.Date_Time = stored_Date;
            }
            else if (y === "}," || y === "}}") {
              copyIndex = 0;
              if (copyIndex == 0 && infoSplit[i + 1] != null) {
                md5_Entry.ID = infoSplit[i + 1];
                md5_Entry.Comparison = infoSplit[i + 5];
                md5_Entry.Hex_Digest = infoSplit[i + 9];
                md5_Entry.Recalculated_Hex_Digest = infoSplit[i + 13];
                md5_Entry.Session_File = infoSplit[i + 17];
                this.md5_db.push(md5_Entry);
                stored_Date = md5_Entry.Date_Time;
                md5_Entry = new MD5();
                md5_Entry.Date_Time = stored_Date;
              }
            }
          });
        }
      }
    );

    this.dataService.getSHA().subscribe(
      next => {
        this.acquireSHA = next;
        const resultSHA = Object.entries(next);
        this.shaTest = JSON.parse(JSON.stringify(this.acquireSHA));
        // console.log(this.shaTest);
        for (let [keys, values] of Object.entries(resultSHA)) {

          if ((keys as any) % 2 == 0) {
            let work = JSON.stringify(values);
            // console.log(work);
            let splitSHA1 = work.split("\"");

            // console.log(splitSHA1);
            // this.sha1_info = splitSHA1;
            let sha1 = new SHA_1();

            splitSHA1.forEach((y, i, fullArray) => {
              let copyIndex = i;
              let stored_Date: string;
              if (i == 0) {
                splitSHA1[6] = splitSHA1[6].substring(1, splitSHA1[6].length - 1);
                splitSHA1[8] = splitSHA1[8].substring(1, splitSHA1[8].length - 1);
                sha1.Date = splitSHA1[1];
                sha1.ID = splitSHA1[3];
                sha1.Block_Size = splitSHA1[6];
                sha1.Digest_Size = splitSHA1[8]
                sha1.Hex_Digest = splitSHA1[11];
                sha1.Session_File = splitSHA1[15];
                this.sha1_db.push(sha1);
                stored_Date = sha1.Date;
                sha1 = new SHA_1();
                sha1.Date = stored_Date;
              }
              else if (y === "}," || y === "}}]") {
                copyIndex = 0;
                if (copyIndex == 0 && splitSHA1[i + 1] != null) {
                  splitSHA1[i + 4] = splitSHA1[i + 4].substring(1, splitSHA1[i + 4].length - 1);
                  splitSHA1[i + 6] = splitSHA1[i + 6].substring(1, splitSHA1[i + 6].length - 1);
                  sha1.ID = splitSHA1[i + 1];
                  sha1.Block_Size = splitSHA1[i + 4];
                  sha1.Digest_Size = splitSHA1[i + 6]
                  sha1.Hex_Digest = splitSHA1[i + 9];
                  sha1.Session_File = splitSHA1[i + 13];
                  this.sha1_db.push(sha1);
                  stored_Date = sha1.Date;
                  sha1 = new SHA_1();
                  sha1.Date = stored_Date;
                }
              }
            });

          }
          else {
            let work2 = JSON.stringify(values);
            let splitSHA2 = work2.split("\"");
            // console.log(splitSHA2);
            let sha2 = new SHA_2();

            splitSHA2.forEach((y, i, fullArray) => {
              let copyIndex = i;
              let stored_Date: string;
              if (i == 0) {
                splitSHA2[10] = splitSHA2[10].substring(1, splitSHA2[10].length - 1);
                splitSHA2[12] = splitSHA2[12].substring(1, splitSHA2[12].length - 1);
                splitSHA2[18] = splitSHA2[18].substring(1, splitSHA2[18].length - 1);
                splitSHA2[20] = splitSHA2[20].substring(1, splitSHA2[20].length - 1);
                splitSHA2[26] = splitSHA2[26].substring(1, splitSHA2[26].length - 1);
                splitSHA2[28] = splitSHA2[28].substring(1, splitSHA2[28].length - 1);
                splitSHA2[34] = splitSHA2[34].substring(1, splitSHA2[34].length - 1);
                splitSHA2[36] = splitSHA2[36].substring(1, splitSHA2[36].length - 1);
                sha2.Date = splitSHA2[1];
                sha2.ID = splitSHA2[3];
                sha2.Session_File = splitSHA2[7];
                sha2.Block_Size_224 = splitSHA2[10];
                sha2.Digest_Size_224 = splitSHA2[12];
                sha2.Hex_Digest_224 = splitSHA2[15];
                sha2.Block_Size_256 = splitSHA2[18];
                sha2.Digest_Size_256 = splitSHA2[20];
                sha2.Hex_Digest_256 = splitSHA2[23];
                sha2.Block_Size_384 = splitSHA2[26];
                sha2.Digest_Size_384 = splitSHA2[28];
                sha2.Hex_Digest_384 = splitSHA2[31];
                sha2.Block_Size_512 = splitSHA2[34];
                sha2.Digest_Size_512 = splitSHA2[36];
                sha2.Hex_Digest_512 = splitSHA2[39];
                this.sha2_db.push(sha2);
                stored_Date = sha2.Date;
                sha2 = new SHA_2();
                sha2.Date = stored_Date;
              }
              else if (y === "}," || y === "}}]") {
                copyIndex = 0;
                if (copyIndex == 0 && splitSHA2[i + 1] != null) {
                  splitSHA2[i + 8] = splitSHA2[i + 8].substring(1, splitSHA2[i + 8].length - 1);
                  splitSHA2[i + 10] = splitSHA2[i + 10].substring(1, splitSHA2[i + 10].length - 1);
                  splitSHA2[i + 16] = splitSHA2[i + 16].substring(1, splitSHA2[i + 16].length - 1);
                  splitSHA2[i + 18] = splitSHA2[i + 18].substring(1, splitSHA2[i + 18].length - 1);
                  splitSHA2[i + 24] = splitSHA2[i + 24].substring(1, splitSHA2[i + 24].length - 1);
                  splitSHA2[i + 26] = splitSHA2[i + 26].substring(1, splitSHA2[i + 26].length - 1);
                  splitSHA2[i + 32] = splitSHA2[i + 32].substring(1, splitSHA2[i + 32].length - 1);
                  splitSHA2[i + 34] = splitSHA2[i + 34].substring(1, splitSHA2[i + 34].length - 1);
                  sha2.ID = splitSHA2[i + 1];
                  sha2.Session_File = splitSHA2[i + 5];
                  sha2.Block_Size_224 = splitSHA2[i + 8];
                  sha2.Digest_Size_224 = splitSHA2[i + 10];
                  sha2.Hex_Digest_224 = splitSHA2[i + 13];
                  sha2.Block_Size_256 = splitSHA2[i + 16];
                  sha2.Digest_Size_256 = splitSHA2[i + 18];
                  sha2.Hex_Digest_256 = splitSHA2[i + 21];
                  sha2.Block_Size_384 = splitSHA2[i + 24];
                  sha2.Digest_Size_384 = splitSHA2[i + 26];
                  sha2.Hex_Digest_384 = splitSHA2[i + 29];
                  sha2.Block_Size_512 = splitSHA2[i + 32];
                  sha2.Digest_Size_512 = splitSHA2[i + 34];
                  sha2.Hex_Digest_512 = splitSHA2[i + 37];
                  this.sha2_db.push(sha2);
                  stored_Date = sha2.Date;
                  sha2 = new SHA_2();
                  sha2.Date = stored_Date;

                }
              }
            });

            this.sha2_info = splitSHA2;

          }

        }
      }
    );


    this.tableList.data = this.md5_db;
  }

  getAsDate(date: string) {
    let dateString : string;
    date = date.substring(0, 10);
    dateString = date.substring(0, 2) + "-" + date.substring(3, 5) + "-" + date.substring(6, 10);
    return new Date(dateString);
  }

  viewMD5() {
    this.buttonStatus = false;
    this.md5Clicked = true;
    this.sha1Clicked = false;
    this.sha2Clicked = false;
  }

  viewSHA1() {
    this.buttonStatus = false;
    this.md5Clicked = false;
    this.sha1Clicked = true;
    this.sha2Clicked = false;
  }


  viewSHA2() {
    this.buttonStatus = false;
    this.md5Clicked = false;
    this.sha1Clicked = false;
    this.sha2Clicked = true;
  }
}
