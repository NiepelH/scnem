import { Component, OnInit } from '@angular/core';
import { Map, tileLayer, marker } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  public address: string[];
  map: Map;
  newMarker: any;
  constructor() { }

  // Fired when the component routing to has finished animating.
  ionViewDidEnter() {
    this.loadMap();
  }
  ngOnInit() {
  }
  ionViewWillLeave() {
    this.map.remove();
  }

  // The below function is added
  loadMap() {
    this.map = new Map('mapId').setView([51.2141, 14.4545], 10);
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        // This line is added to add the Tile Layer to our map
        // tslint:disable-next-line:max-line-length
        // attribution: 'Map data © <a href="https://www.openstreetmap.org/" > OpenStreetMap < /a> contributors, < a href="https://creativecommons.org/licenses/by-sa/2.0/" > CC - BY -SA < /a>'
        attribution: ''
      }).addTo(this.map);
  }

  locatePosition() {
    this.map.locate({ setView: true }).on('locationfound', (e: any) => {
      this.newMarker = marker([e.latitude, e.longitude], {
        draggable:
          true
      }).addTo(this.map);
      // this.newMarker.bindPopup('You are located here!').openPopup();
      const lPos = this.newMarker.getLatLng();
      
      this.newMarker.bindPopup('Your position: ' + lPos.lat.toFixed(4) + ' / ' + lPos.lng.toFixed(4)).openPopup();

      this.newMarker.on('dragend', () => {
        const nPos = this.newMarker.getLatLng();
        this.newMarker.bindPopup('New position: ' + nPos.lat.toFixed(4) + ' / ' + nPos.lng.toFixed(4)).openPopup();
      });
    });
  }

  zoomIn() {
    this.map.setZoom((this.map.getZoom()) + 1);
  }

  zoomOut() {
    this.map.setZoom((this.map.getZoom()) - 1);
  }

  saveMarkers() {
  }


}
