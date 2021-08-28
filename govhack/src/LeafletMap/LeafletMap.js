import React from 'react';
import { Box, Drawer, Fab, Tooltip, Button } from '@material-ui/core';
import { List, ListItem } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import styled from 'styled-components';

import { MapContainer } from 'react-leaflet';
import { GeoJSON } from 'react-leaflet';
import { TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import './map.css';

import CitySearch from './CitySearch';
import AgeSearch from './AgeSearch';
import FamilySearch from './FamilySearch';

import DataHelper from '../Helpers/DataHelper';

const MapBox = styled(Box)`
    display: block;
    position: absolute;
    height: 92.7%;
    width: 100%;
`;

const DrawerButtonBox = styled(Box)`
    position: absolute;
    right: 1%;
    top: 1.4%;
    z-index: 1;
`;

class LeafletMap extends React.Component {
    constructor(props) {
        super(props);
        this.geoRef = React.createRef();
        this.state = {
            open: false,
            long: -23.3200495,
            lat: 150.5276997,
            position: [150.5276997, -23.3200495],
            map: null,
            isLoaded: false,
            bounds: {},
            boundsKey: '',
            geo: null
        }

    }

    componentDidMount() {
    }

    updateRegion = event => {

        this.setState({
            isLoaded: false,
            bounds: null
        })

        this.setState({ position: [event.lat, event.long] });
        const { map } = this.state;
        if (map) map.flyTo([event.lat, event.long]);

        DataHelper.getSA2Bounds().then(
            (result) => {
                // Copy the object otherwise the original 'result' will be modified. Javascript objects hold reference
                var newResult = Object.assign({}, result);

                // Filter to only SA2 regions with the same GCC_CODE16
                newResult.features = newResult.features.filter(code => code.properties['GCC_CODE16'] === event.value);

                // Set the state to cause a rerender. Give the GeoJSON object a new key because it is immutable. Needs to completely rerender.
                this.setState({ bounds: newResult, isLoaded: true, boundsKey: DataHelper.getNewId(5) });
            },
            //TODO implement error handling
            (error) => {

            });
    }


    clickBounds = (feature, layer) => {
        layer.on("click", function () {
            // console.log(layer);
        });

        if (layer !== undefined){
            layer.on({
                'mouseover': (e) => {
                    layer.setStyle(this.setHighlight());
                },
                'mouseout': (e) => {
                    layer.setStyle(this.style());
                }
            });
        }
    }
    
    setHighlight(e) {
        return {
            // the fillColor is adapted from a property which can be changed by the user (segment)
            // fillColor: 'red',
            weight: 3,
            color: 'blue',
            dashArray: '2',
            fillOpacity: 0.2
        };
    }

    style(feature) {
        return {
            // the fillColor is adapted from a property which can be changed by the user (segment)
            // fillColor: 'red',
            weight: 1,
            color: 'gray',
            dashArray: '1',
            fillOpacity: 0.0
        };
    };

    updateAge = event => {

    }

    updateFamily = event => {

    }

    toggleDrawer = (open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        this.setState({
            open: open
        });
    };

    searchLocations = event => {
        // Perhaps create a feature to select the 100 closest SA2 areas based on current map position. Then dynamically load them into state variable as promises resolve.
        DataHelper.getErpBySa2(this.state.bounds);
    }



    render() {
        const position = [this.state.long, this.state.lat];

        const options = (
            <List>
                <ListItem><b>Region</b></ListItem>
                <ListItem><CitySearch onValueChange={this.updateRegion} /> </ListItem>
                <ListItem><b>Age Range</b></ListItem>
                <ListItem><AgeSearch onValueChange={this.updateAge} /></ListItem>
                <ListItem><b>Family Status</b></ListItem>
                <ListItem><FamilySearch onValueChange={this.updateFamily} /></ListItem>
                <ListItem><Button onClick={this.searchLocations}>Search</Button></ListItem>
            </List>
        );

        return (
            <MapBox>
                <MapContainer
                    center={position}
                    zoom={10}
                    maxZoom={18}
                    attributionControl={true}
                    zoomControl={true}
                    doubleClickZoom={true}
                    scrollWheelZoom={true}
                    dragging={true}
                    animate={true}
                    easeLinearity={0.35}
                    whenCreated={map => this.setState({ map })}
                >
                    <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
                    {this.state.isLoaded ? <GeoJSON class='geojson' onEachFeature={this.clickBounds} data={this.state.bounds} ref={this.geoRef} style={this.style} /> : null}

                </MapContainer>
                <Drawer open={this.state.open} onClose={this.toggleDrawer(false)} anchor="right">
                    {options}
                </Drawer>
                <DrawerButtonBox>
                    <Tooltip title="Show/Hide Filters" placement="left">
                        <Fab color="secondary" size="small" onClick={this.toggleDrawer(true)} onKeyDown={this.toggleDrawer(true)}>
                            <SearchIcon />

                        </Fab>
                    </Tooltip>
                </DrawerButtonBox>
            </MapBox>
        );
    }
}

export default LeafletMap