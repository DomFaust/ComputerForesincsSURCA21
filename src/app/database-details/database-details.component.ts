import { AnimationStyleMetadata } from '@angular/animations';
import { INFERRED_TYPE } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BruteForce } from 'src/model/BruteForce';
import { MD5, MD5Calculation } from 'src/model/MD5';
import { PDF } from 'src/model/PDF';
import { Picture } from 'src/model/Picture';
import { SHA, SHA_1, SHA_2 } from 'src/model/SHA';
import { DataService } from '../data.service';

@Component({
  selector: 'app-database-details',
  templateUrl: './database-details.component.html',
  styleUrls: ['./database-details.component.css'],
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

  //Variables created for Brute Force
  test_b !: any;
  brute_db = new Array<BruteForce>();
  testBrute !: BruteForce;
  test_2b !: any;
  composed_bf !: any;
  another_b !: any;


  //Variables created for PDF Metadata
  test_pdf !: any;
  pdf_db = new Array<PDF>();
  pdf_obj !: PDF;
  test2_pdf !: any;
  composed_pdf !: any;
  another_pdf !: any;
  i_if_pdf: number = 1;


  // Variables created for Picture Metadata
  pic_test !: any;
  pic_db = new Array<Picture>();
  pic_obj !: Picture;
  pic_test2 !: any;
  compose_pic !: any;
  another_pic !: any;
  i_if_pic: number = 1;

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

    this.dataService.getBruteForce().subscribe(
      next => {
        this.test_b = next;
        this.test_2b = next;
        // console.log(JSON.stringify(this.test_2b));
        const result = Object.entries(next);
        this.composed_bf = result;
        this.another_b = JSON.parse(JSON.stringify(this.test_2b));
        for (let [keys, values] of Object.entries(result)) {
          let keys_as_number !: number;
          let dailyEntries !: any;
          let bf_Entry = new BruteForce();
          keys_as_number = parseInt(keys);

          dailyEntries = Object.entries(result[keys_as_number][1]);
          bf_Entry.Date_Time = result[keys as any][0];

          // console.log(values[1]);
          let completeDailyInfo = JSON.stringify(values[1]);
          // console.log(completeDailyInfo);
          let infoSplit = completeDailyInfo.split("\"");
          // console.log("This is the infoSplit:" + infoSplit);

          infoSplit.forEach((y, i, fullArray) => {
            let copyIndex = i;
            let stored_Date: string;
            if (i == 0) {
              bf_Entry.ID = infoSplit[i + 1];
              bf_Entry.Decode_Time = Math.round(parseFloat(infoSplit[i + 4].substring(1, infoSplit[i + 4].length - 1)) * 100) / 100;
              bf_Entry.File = infoSplit[i + 7];
              bf_Entry.Password = infoSplit[i + 11];
              bf_Entry.Wordlist = infoSplit[i + 15];
              this.brute_db.push(bf_Entry);
              stored_Date = bf_Entry.Date_Time;
              bf_Entry = new BruteForce();
              bf_Entry.Date_Time = stored_Date;
            }
            else if (y === "}," || y === "}}") {
              copyIndex = 0;
              if (copyIndex == 0 && infoSplit[i + 1] != null) {
                bf_Entry.ID = infoSplit[i + 1];
                bf_Entry.Decode_Time = Math.round(parseFloat(infoSplit[i + 4].substring(1, infoSplit[i + 4].length - 1)) * 100) / 100;
                bf_Entry.File = infoSplit[i + 7];
                bf_Entry.Password = infoSplit[i + 11];
                bf_Entry.Wordlist = infoSplit[i + 15];
                this.brute_db.push(bf_Entry);
                stored_Date = bf_Entry.Date_Time;
                bf_Entry = new BruteForce();
                bf_Entry.Date_Time = stored_Date;
              }
            }
          }
          );

        }
      }
    );



    this.dataService.getMD5().subscribe(
      next => {
        this.test = next; //this.md5_db = next;
        // console.log(next);
        this.secondtest = next;
        // console.log(this.secondtest);
        // console.log(JSON.stringify(this.secondtest));
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

    this.dataService.getPDF().subscribe(
      next => {
        this.test_pdf = next;
        this.test2_pdf = next;
        // console.log(JSON.stringify(this.test2_pdf));
        const result = Object.entries(next);
        this.composed_pdf = result;
        this.another_pdf = JSON.parse(JSON.stringify(this.test2_pdf));
        for (let [keys, values] of Object.entries(result)) {
          let keys_as_number !: number;
          let dailyEntries !: any;
          let pdf_Entry = new PDF();
          keys_as_number = parseInt(keys);

          dailyEntries = Object.entries(result[keys_as_number][1]);
          pdf_Entry.Date_Time = result[keys as any][0];

          // console.log(values[1]);
          let completeDailyInfo = JSON.stringify(values[1]);
          // console.log(completeDailyInfo);
          let pdfSplit = completeDailyInfo.split("\"");
          // console.log("This is the pdfSplit:" + pdfSplit);

          pdfSplit.forEach((y, i, fullArray) => {
            let stored_Date: string;
            let indexIf !: number;
            // console.log(this.i_if);
            indexIf = this.i_if_pdf;
            if (i == 0) {
              pdf_Entry.ID = pdfSplit[i + 1];
              this.i_if_pdf = -1;
            }
            else if (indexIf == 0) {
              pdf_Entry.ID = pdfSplit[i];
              this.i_if_pdf = -1;
            }
            else if (i != 0 && y !== "}," && y !== "}}") {
              switch (y.toString()) {
                case "CreationDate": {
                  pdf_Entry.CreationDate = pdfSplit[i + 2];
                  this.i_if_pdf = i;
                  break;
                }
                case "Author": {
                  pdf_Entry.Author = pdfSplit[i + 2];
                  this.i_if_pdf = i;
                  break;
                }
                case "Creator": {
                  pdf_Entry.Creator = pdfSplit[i + 2];
                  this.i_if_pdf = i;
                  break;
                }
                case "ModDate": {
                  pdf_Entry.ModDate = pdfSplit[i + 2];
                  this.i_if_pdf = i;
                  break;
                }
                case "Title": {
                  pdf_Entry.Title = pdfSplit[i + 2];
                  this.i_if_pdf = i;
                  break;
                }
                case "Producer": {
                  pdf_Entry.Producer = pdfSplit[i + 2];
                  this.i_if_pdf = i;
                  break;
                }
                case "{": {
                  this.i_if_pdf = 0;
                  break;
                }
                default: {
                  // console.log("Not a PDF attribute");
                  this.i_if_pdf = i;
                  break;
                }

              }

            }
            else if (y === "}," || y === "}}") {
              // console.log("end of an entry");
              this.i_if_pdf = 0;
              if (pdf_Entry.Author == null) {
                pdf_Entry.Author = "N/A";
              }
              if (pdf_Entry.CreationDate == null) {
                pdf_Entry.CreationDate = "N/A";
              }
              if (pdf_Entry.Creator == null) {
                pdf_Entry.Creator = "N/A";
              }
              if (pdf_Entry.ModDate == null) {
                pdf_Entry.ModDate = "N/A";
              }
              if (pdf_Entry.Producer == null) {
                pdf_Entry.Producer = "N/A";
              }
              if (pdf_Entry.Title == null) {
                pdf_Entry.Title = "N/A";
              }
              this.pdf_db.push(pdf_Entry);
              stored_Date = pdf_Entry.Date_Time;
              pdf_Entry = new PDF();
              pdf_Entry.Date_Time = stored_Date;
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


    this.dataService.getPicture().subscribe(
      next => {
        this.pic_test = next;
        this.pic_test2 = next;
        console.log(JSON.stringify(this.pic_test2));
        const result = Object.entries(next);
        this.compose_pic = result;
        this.another_pic = JSON.parse(JSON.stringify(this.pic_test2));
        for (let [keys, values] of Object.entries(result)) {
          let keys_as_number !: number;
          let dailyEntries !: any;
          let pic_Entry = new Picture();
          keys_as_number = parseInt(keys);

          dailyEntries = Object.entries(result[keys_as_number][1]);
          pic_Entry.Date_Time = result[keys as any][0];

          // console.log(values[1]);
          let completeDailyInfo = JSON.stringify(values[1]);
          // console.log(completeDailyInfo);
          let picSplit = completeDailyInfo.split("\"");
          // console.log("This is the pdfSplit:" + pdfSplit);

          picSplit.forEach((y, i, fullArray) => {
            let stored_Date: string;
            let indexIf !: number;
            // console.log(picSplit[i]);
            indexIf = this.i_if_pic;
            if (i == 0) {
              pic_Entry.ID = picSplit[i + 1];
              // console.log("if statement");
              this.i_if_pic = -1;
            }
            else if (indexIf == 0) {
              pic_Entry.ID = picSplit[i];
              // console.log("else if 1");
              this.i_if_pic = -1;
            }
            else if (i != 0) {
              // console.log("else if 2");
              switch (y.toString()) {
                case "altitude": {
                  if(y.slice(-2) === "}," || y.slice(-2) === "}}"){
                    pic_Entry.altitude = Math.round(parseFloat(picSplit[i + 1].substring(1, picSplit[i + 1].length - 2)) * 100) / 100;
                  }
                  else{
                    pic_Entry.altitude = Math.round(parseFloat(picSplit[i + 1].substring(1, picSplit[i + 1].length - 1)) * 100) / 100;
                  }
                  // pic_Entry.altitude = picSplit[i + 1];
                  this.i_if_pic = i;
                  break;
                }
                case "aperture_value": {
                  if(y.slice(-2) === "}," || y.slice(-2) === "}}"){
                    pic_Entry.aperture_value = Math.round(parseFloat(picSplit[i + 1].substring(1, picSplit[i + 1].length - 2)) * 100) / 100;
                  }
                  else{
                    pic_Entry.aperture_value = Math.round(parseFloat(picSplit[i + 1].substring(1, picSplit[i + 1].length - 1)) * 100) / 100;
                  }
                  this.i_if_pic = i;
                  break;
                }
                case "bits_per_pixel": {
                  if(y.slice(-2) === "}," || y.slice(-2) === "}}"){
                    pic_Entry.bits_per_px = Math.round(parseFloat(picSplit[i + 1].substring(1, picSplit[i + 1].length - 2)) * 100) / 100;
                  }
                  else{
                    pic_Entry.bits_per_px = Math.round(parseFloat(picSplit[i + 1].substring(1, picSplit[i + 1].length - 1)) * 100) / 100;
                  }
                  this.i_if_pic = i;
                  break;
                }
                case "camera_brightness": {
                  if(y.slice(-2) === "}," || y.slice(-2) === "}}"){
                    pic_Entry.cam_bright = Math.round(parseFloat(picSplit[i + 1].substring(1, picSplit[i + 1].length - 2)) * 100) / 100;
                  }
                  else{
                    pic_Entry.cam_bright = Math.round(parseFloat(picSplit[i + 1].substring(1, picSplit[i + 1].length - 1)) * 100) / 100;
                  }
                  this.i_if_pic = i;
                  break;
                }
                case "camera_exposure": {
                  if(y.slice(-2) === "}," || y.slice(-2) === "}}"){
                    pic_Entry.cam_exposure = Math.round(parseFloat(picSplit[i + 1].substring(1, picSplit[i + 1].length - 2)) * 10000) / 10000;
                  }
                  else{
                    pic_Entry.cam_exposure = Math.round(parseFloat(picSplit[i + 1].substring(1, picSplit[i + 1].length - 1)) * 10000) / 10000;
                  }
                  this.i_if_pic = i;
                  break;
                }
                case "camera_focal": {
                  if(y.slice(-2) === "}," || y.slice(-2) === "}}"){
                    pic_Entry.cam_focal = Math.round(parseFloat(picSplit[i + 1].substring(1, picSplit[i + 1].length - 2)) * 100) / 100;
                  }
                  else{
                    pic_Entry.cam_focal = Math.round(parseFloat(picSplit[i + 1].substring(1, picSplit[i + 1].length - 1)) * 100) / 100;
                  }
                  this.i_if_pic = i;
                  break;
                }
                case "camera_manufacturer": {
                  // if(y.slice(-2) === "}," || y.slice(-2) === "}}"){

                  // }
                  // else{

                  // }
                  pic_Entry.cam_manufacturer = picSplit[i + 2];
                  this.i_if_pic = i;
                  break;
                }
                case "camera_model": {
                  // if(y.slice(-2) === "}," || y.slice(-2) === "}}"){

                  // }
                  // else{

                  // }
                  pic_Entry.cam_model = picSplit[i + 2];
                  this.i_if_pic = i;
                  break;
                }
                case "comment": {
                  // if(y.slice(-2) === "}," || y.slice(-2) === "}}"){

                  // }
                  // else{

                  // }
                  pic_Entry.comment = picSplit[i + 2];
                  this.i_if_pic = i;
                  break;
                }
                case "compression": {
                  // if(y.slice(-2) === "}," || y.slice(-2) === "}}"){

                  // }
                  // else{

                  // }
                  pic_Entry.compression = picSplit[i + 2];
                  this.i_if_pic = i;
                  break;
                }
                case "copyright": {
                  // if(y.slice(-2) === "}," || y.slice(-2) === "}}"){

                  // }
                  // else{

                  // }
                  pic_Entry.copyright = picSplit[i + 2];
                  this.i_if_pic = i;
                  break;
                }
                case "creation_date": {
                  // if(y.slice(-2) === "}," || y.slice(-2) === "}}"){

                  // }
                  // else{

                  // }
                  pic_Entry.creation_date = picSplit[i + 2];
                  this.i_if_pic = i;
                  break;
                }
                case "date_time_digitized": {
                  // if(y.slice(-2) === "}," || y.slice(-2) === "}}"){

                  // }
                  // else{

                  // }
                  pic_Entry.date_time_dig = picSplit[i + 2];
                  this.i_if_pic = i;
                  break;
                }
                case "date_time_original": {
                  // if(y.slice(-2) === "}," || y.slice(-2) === "}}"){

                  // }
                  // else{

                  // }
                  pic_Entry.date_time_orig = picSplit[i + 2];
                  this.i_if_pic = i;
                  break;
                }
                case "endian": {
                  // if(y.slice(-2) === "}," || y.slice(-2) === "}}"){

                  // }
                  // else{

                  // }
                  pic_Entry.endian = picSplit[i + 2];
                  this.i_if_pic = i;
                  break;
                }
                case "exif_version": {
                  // if(y.slice(-2) === "}," || y.slice(-2) === "}}"){

                  // }
                  // else{

                  // }
                  pic_Entry.exif_ver = picSplit[i + 2];
                  this.i_if_pic = i;
                  break;
                }
                case "exposure_bias_value": {
                  if(y.slice(-2) === "}," || y.slice(-2) === "}}"){
                    pic_Entry.exposure_bias = Math.round(parseFloat(picSplit[i + 1].substring(1, picSplit[i + 1].length - 2)) * 100) / 100;
                  }
                  else{
                    pic_Entry.exposure_bias = Math.round(parseFloat(picSplit[i + 1].substring(1, picSplit[i + 1].length - 1)) * 100) / 100;
                  }
                  this.i_if_pic = i;
                  break;
                }
                case "flashpix_version": {
                  if(y.slice(-2) === "}," || y.slice(-2) === "}}"){

                  }
                  else{

                  }
                  pic_Entry.flashpix_ver = picSplit[i + 2];
                  this.i_if_pic = i;
                  break;
                }
                case "focal_length": {
                  if(y.slice(-2) === "}," || y.slice(-2) === "}}"){
                    pic_Entry.focal_length = Math.round(parseFloat(picSplit[i + 1].substring(1, picSplit[i + 1].length - 2)) * 100) / 100;
                  }
                  else{
                    pic_Entry.focal_length = Math.round(parseFloat(picSplit[i + 1].substring(1, picSplit[i + 1].length - 1)) * 100) / 100;
                  }
                  this.i_if_pic = i;
                  break;
                }
                case "focal_length_in_35mm_film": {
                  if(y.slice(-2) === "}," || y.slice(-2) === "}}"){
                    pic_Entry.focal_length_35mm = Math.round(parseFloat(picSplit[i + 1].substring(1, picSplit[i + 1].length - 2)) * 100) / 100;
                  }
                  else{
                    pic_Entry.focal_length_35mm = Math.round(parseFloat(picSplit[i + 1].substring(1, picSplit[i + 1].length - 1)) * 100) / 100;
                  }
                  this.i_if_pic = i;
                  break;
                }
                case "format_version": {
                  if(y.slice(-2) === "}," || y.slice(-2) === "}}"){

                  }
                  else{

                  }
                  pic_Entry.format_ver = picSplit[i + 2];
                  this.i_if_pic = i;
                  break;
                }
                case "height": {
                  if(y.slice(-2) === "}," || y.slice(-2) === "}}"){
                    pic_Entry.height = Math.round(parseFloat(picSplit[i + 1].substring(1, picSplit[i + 1].length - 2)) * 100) / 100;
                  }
                  else{
                    pic_Entry.height = Math.round(parseFloat(picSplit[i + 1].substring(1, picSplit[i + 1].length - 1)) * 100) / 100;
                  }
                  this.i_if_pic = i;
                  break;
                }
                case "height_dpi": {
                  if(y.slice(-2) === "}," || y.slice(-2) === "}}"){
                    pic_Entry.height_dpi = Math.round(parseFloat(picSplit[i + 1].substring(1, picSplit[i + 1].length - 2)) * 100) / 100;
                  }
                  else{
                    pic_Entry.height_dpi = Math.round(parseFloat(picSplit[i + 1].substring(1, picSplit[i + 1].length - 1)) * 100) / 100;
                  }
                  this.i_if_pic = i;
                  break;
                }
                case "image_orientation": {
                  if(y.slice(-2) === "}," || y.slice(-2) === "}}"){

                  }
                  else{

                  }
                  pic_Entry.img_orient = picSplit[i + 2];
                  this.i_if_pic = i;
                  break;
                }
                case "iso_speed_ratings": {
                  if(y.slice(-2) === "}," || y.slice(-2) === "}}"){
                    pic_Entry.iso_speed_ratings = Math.round(parseFloat(picSplit[i + 1].substring(1, picSplit[i + 1].length - 2)) * 100) / 100;
                  }
                  else{
                    pic_Entry.iso_speed_ratings = Math.round(parseFloat(picSplit[i + 1].substring(1, picSplit[i + 1].length - 1)) * 100) / 100;
                  }
                  this.i_if_pic = i;
                  break;
                }
                case "latitude": {
                  if(y.slice(-2) === "}," || y.slice(-2) === "}}"){
                    pic_Entry.latitude = Math.round(parseFloat(picSplit[i + 1].substring(1, picSplit[i + 1].length - 2)) * 100) / 100;
                  }
                  else{
                    pic_Entry.latitude = Math.round(parseFloat(picSplit[i + 1].substring(1, picSplit[i + 1].length - 1)) * 100) / 100;
                  }
                  this.i_if_pic = i;
                  break;
                }
                case "longitude": {
                  if(y.slice(-2) === "}," || y.slice(-2) === "}}"){
                    pic_Entry.longitude = Math.round(parseFloat(picSplit[i + 1].substring(1, picSplit[i + 1].length - 2)) * 100) / 100;
                  }
                  else{
                    pic_Entry.longitude = Math.round(parseFloat(picSplit[i + 1].substring(1, picSplit[i + 1].length - 1)) * 100) / 100;
                  }
                  this.i_if_pic = i;
                  break;
                }
                case "mime_type": {
                  if(y.slice(-2) === "}," || y.slice(-2) === "}}"){

                  }
                  else{

                  }
                  pic_Entry.mime_type = picSplit[i + 2];
                  this.i_if_pic = i;
                  break;
                }
                case "pixel_format": {
                  if(y.slice(-2) === "}," || y.slice(-2) === "}}"){

                  }
                  else{

                  }
                  pic_Entry.px_format = picSplit[i + 2];
                  this.i_if_pic = i;
                  break;
                }
                case "producer": {
                  if(y.slice(-2) === "}," || y.slice(-2) === "}}"){

                  }
                  else{

                  }
                  pic_Entry.producer = picSplit[i + 2];
                  this.i_if_pic = i;
                  break;
                }
                case "shutter_speed_value": {
                  if(y.slice(-2) === "}," || y.slice(-2) === "}}"){
                    pic_Entry.shutter_speed = Math.round(parseFloat(picSplit[i + 1].substring(1, picSplit[i + 1].length - 2)) * 100) / 100;
                  }
                  else{
                    pic_Entry.shutter_speed = Math.round(parseFloat(picSplit[i + 1].substring(1, picSplit[i + 1].length - 1)) * 100) / 100;
                  }
                  this.i_if_pic = i;
                  break;
                }
                case "thumbnail_size": {
                  if(y.slice(-2) === "}," || y.slice(-2) === "}}"){
                    pic_Entry.thumbnail_size = Math.round(parseFloat(picSplit[i + 1].substring(1, picSplit[i + 1].length - 2)) * 100) / 100;
                  }
                  else{
                    pic_Entry.thumbnail_size = Math.round(parseFloat(picSplit[i + 1].substring(1, picSplit[i + 1].length - 1)) * 100) / 100;
                  }
                  this.i_if_pic = i;
                  break;
                }
                case "width": {
                  if(y.slice(-2) === "}," || y.slice(-2) === "}}"){
                    pic_Entry.width = Math.round(parseFloat(picSplit[i + 1].substring(1, picSplit[i + 1].length - 2)) * 100) / 100;
                  }
                  else{
                    pic_Entry.width = Math.round(parseFloat(picSplit[i + 1].substring(1, picSplit[i + 1].length - 1)) * 100) / 100;
                  }
                  this.i_if_pic = i;
                  break;
                }
                case "width_dpi": {
                  if(y.slice(-2) === "}," || y.slice(-2) === "}}"){
                    pic_Entry.width_dpi = Math.round(parseFloat(picSplit[i + 1].substring(1, picSplit[i + 1].length - 2)) * 100) / 100;
                  }
                  else{
                    pic_Entry.width_dpi = Math.round(parseFloat(picSplit[i + 1].substring(1, picSplit[i + 1].length - 2)) * 100) / 100;
                  }
                  // console.log(picSplit[i+2]);
                  this.i_if_pic = i;
                  break;
                }
                case "{": {
                  this.i_if_pic = 0;
                  break;
                }
                default: {
                  // console.log("Not a PDF attribute");
                  this.i_if_pdf = i;
                  break;
                }

              }

            }
            if ((y.slice(-2) === "}," || y.slice(-2) === "}}") || (picSplit[i + 1] === "}," || picSplit[i + 1] === "}}")) {
              // console.log("else if 3");
              // console.log("end of an entry");
              this.i_if_pic = 0;
              if (pic_Entry.altitude == null) {
                pic_Entry.altitude = "N/A";
              }
              if (pic_Entry.aperture_value == null) {
                pic_Entry.aperture_value = "N/A";
              }
              if (pic_Entry.bits_per_px == null) {
                pic_Entry.bits_per_px = "N/A";
              }
              if (pic_Entry.cam_bright == null) {
                pic_Entry.cam_bright = "N/A";
              }
              if (pic_Entry.cam_exposure == null) {
                pic_Entry.cam_exposure = "N/A";
              }
              if (pic_Entry.cam_focal == null) {
                pic_Entry.cam_focal = "N/A";
              }
              if (pic_Entry.cam_manufacturer == null) {
                pic_Entry.cam_manufacturer = "N/A";
              }
              if (pic_Entry.cam_model == null) {
                pic_Entry.cam_model = "N/A";
              }
              if (pic_Entry.comment == null) {
                pic_Entry.comment = "N/A";
              }
              if (pic_Entry.compression == null) {
                pic_Entry.compression = "N/A";
              }
              if (pic_Entry.copyright == null) {
                pic_Entry.copyright = "N/A";
              }
              if (pic_Entry.creation_date == null) {
                pic_Entry.creation_date = "N/A";
              }
              if (pic_Entry.date_time_dig == null) {
                pic_Entry.date_time_dig = "N/A";
              }
              if (pic_Entry.date_time_orig == null) {
                pic_Entry.date_time_orig = "N/A";
              }
              if (pic_Entry.endian == null) {
                pic_Entry.endian = "N/A";
              }
              if (pic_Entry.exif_ver == null) {
                pic_Entry.exif_ver = "N/A";
              }
              if (pic_Entry.exposure_bias == null) {
                pic_Entry.exposure_bias = "N/A";
              }
              if (pic_Entry.flashpix_ver == null) {
                pic_Entry.flashpix_ver = "N/A";
              }
              if (pic_Entry.focal_length == null) {
                pic_Entry.focal_length = "N/A";
              }
              if (pic_Entry.focal_length_35mm == null) {
                pic_Entry.focal_length_35mm = "N/A";
              }
              if (pic_Entry.format_ver == null) {
                pic_Entry.format_ver = "N/A";
              }
              if (pic_Entry.height == null) {
                pic_Entry.height = "N/A";
              }
              if (pic_Entry.height_dpi == null) {
                pic_Entry.height_dpi = "N/A";
              }
              if (pic_Entry.img_orient == null) {
                pic_Entry.img_orient = "N/A";
              }
              if (pic_Entry.iso_speed_ratings == null) {
                pic_Entry.iso_speed_ratings = "N/A";
              }
              if (pic_Entry.latitude == null) {
                pic_Entry.latitude = "N/A";
              }
              if (pic_Entry.longitude == null) {
                pic_Entry.longitude = "N/A";
              }
              if (pic_Entry.mime_type == null) {
                pic_Entry.mime_type = "N/A";
              }
              if (pic_Entry.px_format == null) {
                pic_Entry.px_format = "N/A";
              }
              if (pic_Entry.producer == null) {
                pic_Entry.producer = "N/A";
              }
              if (pic_Entry.shutter_speed == null) {
                pic_Entry.shutter_speed = "N/A";
              }
              if (pic_Entry.thumbnail_size == null) {
                pic_Entry.thumbnail_size = "N/A";
              }
              if (pic_Entry.width == null) {
                pic_Entry.width = "N/A";
              }
              if (pic_Entry.width_dpi == null) {
                pic_Entry.width_dpi = "N/A";
              }

              console.log(pic_Entry);

              this.pic_db.push(pic_Entry);
              stored_Date = pic_Entry.Date_Time;
              pic_Entry = new Picture();
              pic_Entry.Date_Time = stored_Date;
            }
          });
        }
      }
    );



    this.tableList.data = this.md5_db;
  }

  getAsDate(date: string) {
    let dateString: string;
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
