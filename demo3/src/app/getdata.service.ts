import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetdataService {
  data = new BehaviorSubject(null);
  artistData = new BehaviorSubject(null);

  constructor(private httpClient:HttpClient) { }

  getapidata(){
    this.httpClient.get("http://itunes.apple.com/search?term=jack&limit=4").subscribe(data=>{
      this.data.next(data);
    })
  }

  specificArtistData(name){
    this.httpClient.get("http://itunes.apple.com/search?term="+ name +"&limit=1").subscribe(data=>{
      this.artistData.next(data);
    })
  }
}
