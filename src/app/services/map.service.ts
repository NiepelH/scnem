
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Guid } from 'guid-typescript';
import { Site } from './../interfaces/interface.site';


@Injectable({
  providedIn: 'root'
})
export class MapService {
  public mapObjects: Site[];
  public mapObjectsChanged: Subject<any> = new Subject<any>();
  private stdMapObjects: Site[] = [
    { name: 'bgBTZ01', no: 1, guid: null, description: 'Betriebsgebäude Bautzen', lat: 51.21199, lng: 14.4699 },
    { name: 'bgLOH03', no: 3, guid: null, description: 'Betriebsgebäude Lohsa', lat: 51.3718, lng: 14.4034 },
    { name: 'bgHOY05', no: 5, guid: null, description: 'Betriebsgebäude Hoyerswerda', lat: 51.4277, lng: 14.2137 }

  ];

  constructor() {
    for (let obj of this.stdMapObjects) {
      obj.guid = Guid.create();
    }
    this.mapObjects = this.stdMapObjects;
   }


}
