import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { GetdataService } from "./getdata.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demo3';
  data:any;
  formVisibility = false;
  tabVisibility = false;
  artistName:any;
  trackName:any;
  artWorkUrl:any;
  artistData:any;
  artistForm: FormGroup;
  submitted = false;
  constructor(private formBuilder : FormBuilder,private getdataService:GetdataService) { }

  ngOnInit(): void {
    this.artistForm = this.formBuilder.group({
      name : ['', Validators.required],
      track : ['', Validators.required],
    })
  }

  // convenience getter for easy access to form fields
  get f() { return this.artistForm.controls; }

  searchArtist(){
    this.formVisibility = true;
  }

  onSubmit(){
    this.submitted = true;
    if(this.artistForm.invalid)
    return;
    let obj=this.artistForm.value;
    if(obj.name == "jack" && obj.track == 4){
      this.getdataService.getapidata();
      this.getdataService.data.subscribe((response)=>{
        this.data=response;
        if(this.data){
          this.data=this.data.results;
          this.getdataService.specificArtistData(this.data[0].artistName);

          this.getdataService.artistData.subscribe(res=>{
            this.artistData=res;
            if(this.artistData){
              this.artistData=this.artistData.results;
              this.artistName=this.artistData[0].artistName;
              this.trackName=this.artistData[0].trackName;
              this.artWorkUrl=this.artistData[0].artworkUrl30;
            }
          })

          
        }
      })
      this.tabVisibility = true;
    } else {
      alert("Please check artist name and limit..")
    }
  }

  showArtistInfo(obj){
    this.getdataService.specificArtistData(obj.artistName);
    this.getdataService.artistData.subscribe(res=>{
    
    this.artistData=res;
      if(this.artistData){
        this.artistData=this.artistData.results;
        for(let i=0;i<this.artistData.length;i++){
          if(this.artistData[i].artistName == obj.artistName){
            this.artistName=this.artistData[i].artistName;
            this.trackName=this.artistData[i].trackName;
            this.artWorkUrl=this.artistData[i].artworkUrl30;
          }
        }
         
      }
    })
    
  }
}
