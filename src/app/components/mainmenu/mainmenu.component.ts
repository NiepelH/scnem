import { MainmenuService } from './../../services/mainmenu.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.scss'],
})
export class MainmenuComponent implements OnDestroy {

  public title: string;
  public items: any;
  constructor(ms: MainmenuService) {
    this.title = ms.title;
    this.items = ms.items;
   }
  ngOnDestroy(): void {
    
  }

  

}
