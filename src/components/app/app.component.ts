import {Component, ViewChild, OnInit} from "@angular/core";
import {NavigatorComponent} from "../navigator/navigator.component";
import {MarkerComponent} from "../marker/marker.component";
import {MapService} from "../../services/map.service";
import {GeocodingService} from "../../services/geocoding.service";
import {Location} from "../../core/location.class";

@Component({
    selector: "app",
    templateUrl: "./src/components/app/app.component.html",
    styles: [("./app.component.less")
    ],
    providers: []
})
export class AppComponent implements OnInit  {

    @ViewChild(MarkerComponent) markerComponent: MarkerComponent;

    constructor(private mapService: MapService, private geocoder: GeocodingService) {
    }

    ngOnInit() {
        let map = L.map("map", {
            zoomControl: false,
            center: L.latLng(40.731253, -73.996139),
            zoom: 12,
            minZoom: 4,
            maxZoom: 19,
            layers: [this.mapService.baseMaps.OpenStreetMap]
        });

        L.control.zoom({ position: "topright" }).addTo(map);
        L.control.layers(this.mapService.baseMaps).addTo(map);
        L.control.scale().addTo(map);

        this.mapService.map = map;
        this.geocoder.getCurrentLocation()
            .subscribe(
                location => map.panTo([location.latitude, location.longitude]),
                err => console.error(err)
            );
    }

    ngAfterViewInit() {
        this.markerComponent.Initialize();
    }
}