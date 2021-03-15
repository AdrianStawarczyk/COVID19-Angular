import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})

export class DataServiceService {

  private globalDataUrl =  'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/12-31-2020.csv';
  constructor( private http : HttpClient) { }
  getGlobalData(){
  return this.http.get(this.globalDataUrl, {responseType: 'text'}).pipe(
    map(result =>{
      //coś tu robimy
          let data: GlobalDataSummary[]=[];

          let raw = {}   //margining all data object

      let rows = result.split('\n');
      rows.splice(0,1); //usuwa index header ktory mowi nazwy column 0 do 1 w naszej bd
      //console.log(rows);
       rows.forEach (row =>{
        let cols = row.split(/,(?=\S)/) //regular expression <daje kolumny po przecinkach omijając przecinki w nazwach własnych danego wiersza bd << regexr.com

          let cs = {
            country : cols[3],
            confirmed : +cols[7],
            deaths : +cols[8],
            recovered : +cols[9],
            active : +cols[10],
          };
          let temp : GlobalDataSummary = raw[cs.country];
            if(temp){
              temp.active = cs.active + temp.active
              temp.confirmed = cs.confirmed + temp.confirmed
              temp.deaths = cs.deaths + temp.deaths
              temp.recovered = cs.recovered + temp.recovered

              raw [cs.country] = temp;

            }else{
              raw[cs.country] = cs;
            }

      })


      return <GlobalDataSummary[]>Object.values(raw); //zwraca same wartości bez nazw w tablicy bd
      })
    )
  }
}
