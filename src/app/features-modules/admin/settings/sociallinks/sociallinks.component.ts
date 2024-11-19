import { Component, OnInit } from '@angular/core';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import { apiResultFormat, socialLink } from 'src/app/core/models/models';
@Component({
  selector: 'app-sociallinks',
  templateUrl: './sociallinks.component.html',
  styleUrls: ['./sociallinks.component.scss']
})
export class SociallinksComponent implements OnInit {
  public routes = routes;
  myObjArray = [
    {id: 0, name: "facebook" },
    {id: 1, name: "twitter" },
    {id: 2, name: "youtube" },
    {id: 3, name: "linkedin" }
  ];
  SocialLink: Array<socialLink> = [];
  public totalData = 0;
  public serviceArray: Array<number> = [];
  removeIcon = true;
  removeIcon2 = true;
  removeIcon3 = true;
  removeIcon4 = true;
  constructor(private data: ShareDataService) { }
  public addService():void {
    this.serviceArray.push(1)
  }
  public deleteService(index: number):void {
    this.serviceArray.splice(index, 1)
  }
  private SocialLinks(): void {
    this.SocialLink = [];

    this.data.socialLink().subscribe((res: apiResultFormat) => {
      this.totalData = res.totalData;
      res.data.map((res: socialLink) => {
        this.SocialLink.push(res);
      });
    });

 
  }
  ngOnInit(): void {
    this.SocialLinks();
  }

}
