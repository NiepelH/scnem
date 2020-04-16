import { MapService } from './../../services/map.service';
import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { Map, tileLayer, marker, Marker, popup } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit, AfterViewInit {
  public address: string[];
  map: Map;
  newMarker: any;
  constructor(
    public ms: MapService,
    private elementRef: ElementRef) {

  }

  // Fired when the component routing to has finished animating.
  ionViewDidEnter() {
    this.loadMap();
    this.loadSavedMarkers();
  }

  ionViewDidLeave() {
    // this.loadSavedMarkers();
    console.log('ionViewDidLeave fired');
  }

  ngAfterViewInit() {

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

  loadSavedMarkers() {
    for (let m of this.ms.mapObjects) {
      console.log('marker: ' + m.name);
      this.newMarker = marker([m.lat, m.lng], {
        draggable:
          true
      }).addTo(this.map);

      let popupLink = '<ion-button class="object-link" object-id="'
              + m.guid
              + '"><ion-icon slot="start" name="arrow-redo-outline"></ion-icon>Select Object</ion-button>';

      let newPopup = popup({
        className: 'map-popup',
        minWidth: 200,
        closeButton: false
      }).setContent('<p>' + m.name + ' [' + m.no + ']<br />' + m.description + '</p><p>' + popupLink + '</p>');

      // this.newMarker.bindPopup('<p>' + m.name + ' [' + m.no + ']<br />' + m.description + '</p><p>' + popupLink + '</p>');
      this.newMarker.bindPopup(newPopup);

      let self = this;
      this.newMarker.on('popupopen', () => {

        // add event listener to newly added object-link element
        self.elementRef.nativeElement.querySelector(".object-link")
          .addEventListener('click', (e) => {
            // get id from attribute
            let objectId = e.target.getAttribute("object-id");
            self.navigateToObject(objectId);
          });
      });


    }
  }

  navigateToObject(objectId) {
    // this.navCtrl.push(MerchantPage, { merchantId: merchantId });
    console.log("going to object " + objectId);
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
