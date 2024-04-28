import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';


import { CsvData, CsvGrape, CsvContent} from 'csv-grape';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  event!:Event ;
  data!: CsvData;
  csvJson:string = '';
  csvMetaData:string = '';
  csvJsonAndMetaData!:CsvContent;
  meanValue : number =0;
  medianValue : number =0;
  moreValue : number =0;
  moreCount : number =0;
  isUnique: string = "";
  isLoading: boolean = true;
  selectedColumn : string ='';

  DataSource : any;
  @ViewChild(MatPaginator) paginator! : MatPaginator;
  constructor(){
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading=false;
      }, 20);
  }
  onFileSelected(event:Event) {
    this.event = event;
  }
  loadData(){
    this.isLoading=true;
    setTimeout(() => {
      CsvGrape.getCsvWithMetaData(this.event,-1).then((_response)=>{
        this.csvJsonAndMetaData=_response;
        this.DataSource= new MatTableDataSource<any>(_response.Data.Content);
        this.isLoading=false;
        setTimeout(() => {
        this.DataSource.paginator = this.paginator;
        }, 10);
      },(reject)=>{
        console.log(reject);
        this.isLoading=false;
      });
      }, 20);

  }
  calculateMMM(column:string){
    this.selectedColumn = column;
    let columnArr = this.getSortedArrayByColumn(column);
    let mean= this.calculateMean(columnArr);
    let median= this.calculateMedian(columnArr);
    let more = this.calculateMore(columnArr);
    this.meanValue = mean;
    this.medianValue = median;
    this.moreValue = more.value;
    this.moreCount = more.count;
    this.isUnique = (more.count ==1)?"yes": "no";
  }
  calculateMean(columnArr:number[]){
    let total = columnArr.reduce(function(a, b) { return a + b; }, 0);
    return (total / columnArr.length);
  }
  calculateMore(columnArr:number[]){
    let count= 1;
    let maxCount= 0;
    let i=0;
    let val=0;
    while(i<columnArr.length-1){
      if(columnArr[i]==columnArr[i+1]){
        count++;
      }
      else{
        if(maxCount<count){
          val=columnArr[i];
          maxCount = count;
        }
        count = 1;
      }
      i++;
    }
    return {value:val,count: maxCount};
  }
  calculateMedian(columnArr:number[]){
    let median =0;
    let midIndex= Math.ceil(columnArr.length/2);
    if((columnArr.length%2)==0){
      let x= columnArr[midIndex -1];
      let y= columnArr[midIndex];
      median = (x+y) /2;
    }
    else{
      median = columnArr[midIndex];
    }
    return median;
  }
  getSortedArrayByColumn(column:string){
    let tempArr= this.csvJsonAndMetaData.Data.Content.map((c:any)=> Number(c[column]));
    return tempArr.sort(function(a:number, b:number) { return a - b;});
  }
}
