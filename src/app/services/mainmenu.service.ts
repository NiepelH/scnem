import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { LoggingService, Logger } from 'ionic-logging-service';

@Injectable({
  providedIn: 'root'
})
export class MainmenuService {
  private log: Logger;
  public title: string;
  public titleChange: Subject<string> = new Subject<string>();
  public items: any;
  public itemsChanged: Subject<any> = new Subject<any>();
  private stdTitle = 'Navigation';
  private stdItems = [
    { name: 'Dashboard', path: '/home', symbol: 'home-outline' },
    { name: 'Map', path: '/map', symbol: 'map-outline' },
    { name: 'Photo', path: '/photo', symbol: 'camera-outline' }
  ];
  constructor(ls: LoggingService) {
    this.title = this.stdTitle;
    this.items = this.stdItems;
  }
}
