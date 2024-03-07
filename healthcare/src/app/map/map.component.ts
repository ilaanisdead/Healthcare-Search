import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as mapboxgl from 'mapbox-gl';
import { MapboxResponse } from '../mapbox-response';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map: mapboxgl.Map | undefined;
  // latitude: number = 0;
  // longitude: number = 0;

  constructor(private http:HttpClient) { }

  ngOnInit(): void {

    (mapboxgl as typeof mapboxgl).accessToken = 'pk.eyJ1IjoiaWxhYW4iLCJhIjoiY2x0NGR4NWlwMDFqeDJrbWprZTdqZTViNCJ9.r0JPDSTtBJ55N1wdxFolEQ'
    this.map = new mapboxgl.Map({
      // accessToken:'sk.eyJ1IjoiaWxhYW4iLCJhIjoiY2x0NGc2a2JqMDJsbzJqbWpreXpuOXhsaSJ9.MpmGqBNPxqjqwaS49AyqoA',
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [32.2903,1.3733],
      zoom: 4
    });

    if (navigator.geolocation) {
      
      // Get the user's current position
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Extract latitude and longitude from the position object
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          
          const userMarker = new mapboxgl.Marker({ color: 'red' })
              .setLngLat([longitude, latitude])
              .addTo(this.map!);
          const userpopup = new mapboxgl.Popup({ offset: 25 })
              .setHTML(`<h4 class="text-bold" style="font-family: 
              'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
              ">You</h4>`)
              .setMaxWidth('300px');

          userMarker.setPopup(userpopup);

          console.log(longitude,latitude);  

          // const url =`https://api.mapbox.com/v4/mapbox.mapbox-streets-v8/tilequery/${longitude},${latitude}.json?radius=200&limit=50&dedupe&access_token=pk.eyJ1IjoiaWxhYW4iLCJhIjoiY2x0NGR4NWlwMDFqeDJrbWprZTdqZTViNCJ9.r0JPDSTtBJ55N1wdxFolEQ`;
      
          // this.http.get<MapboxResponse>(url).subscribe({
          //   next:(response: MapboxResponse)=>{
          //     console.log('Mapbox response:', response);
              
          //     const medicalareas = response.features.filter((val)=>{
          //       return val.properties.class =="medical";
          //     });
              
          //     // const medicalCoordinates: [number, number][] = []; // longitudes and latitudes of nearby health centers

          //     medicalareas.forEach(val=>{
          //       // medicalCoordinates.push([val.geometry.coordinates[0],val.geometry.coordinates[1]]);
                
          //       const marker = new mapboxgl.Marker({ color: 'yellow' })
          //         .setLngLat([val.geometry.coordinates[0], val.geometry.coordinates[1]])
          //         .addTo(this.map!);
                  
          //       const popup = new mapboxgl.Popup({ offset: 25 })
          //         .setHTML(`<h4 class="text-bold" style="font-family: 
          //         'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
          //         ">${val.properties.name}</h4>`)
          //         .setMaxWidth('300px');

          //       marker.setPopup(popup); //applying the popups to the markers 
          //     });
                           
          //   },
          //   error:(error) => {
          //     console.error('Error fetching nearby landmarks:', error);
          //   }
          // }
          // );
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    }
  }
}
