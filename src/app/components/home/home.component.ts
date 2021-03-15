import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GlobalDataSummary } from 'src/app/models/global-data';
//  import { GoogleCartInterface } from

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  globalData : GlobalDataSummary[];
  pieChart : GoogleCartInterface = {
    chartType: 'PieChart'
  }
  columnChart : GoogleCartInterface = {
    chartType: 'ColumnChart'
  }
    constructor(private dataService :DataServiceService) {  }


  // pieChart inicjalizacja poprzez stworzenie metody
    initChart(caseType : string){

      let datatable = [];
      datatable.push(["Country" , "Cases"])

      this.globalData.forEach(cs => {
        let value :number ;
        if (caseType == 'c')
          if (cs.confirmed > 1000000)
            value = cs.confirmed
        if (caseType == 'a')
          if (cs.active > 100000)
            value = cs.active
        if (caseType == 'd')
          if (cs.deaths > 10000)
            value = cs.deaths
        if (caseType == 'r')
          if (cs.recovered > 10000)
            value = cs.recovered


        datatable.push([
          cs.country , value
        ])
      })
      console.log(datatable);

          this.pieChart = {
      chartType: 'PieChart',
      dataTable: datatable,
      //firstRowIsData: true,
      options: {
        height: 400
        },
      };
      this.columnChart = {
      chartType: 'ColumnChart',
      dataTable: datatable,
      //firstRowIsData: true,
      options: {
        height: 400
        },
      };
    }

  //ngOnInit pobiera date z repository i wyświetla za pomoca consol.log //
    ngOnInit(): void {

      this.dataService.getGlobalData()
      .subscribe(
        {
          next: (result) =>{
            console.log(result);
            this.globalData = result;
              result.forEach(cs=>{
              if(!Number.isNaN(cs.confirmed)){
              this.totalActive+=cs.active
              this.totalConfirmed+=cs.confirmed
              this.totalDeaths+=cs.deaths
              this.totalRecovered+=cs.active
            }
            })

            this.initChart('c');
          }
        }
      )
    }
 updateChart(input: HTMLInputElement){
   console.log(input.value);
   this.initChart(input.value)
 }
}
