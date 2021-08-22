import React from 'react';
import { Box, Drawer, Fab, Tooltip } from '@material-ui/core';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import styled from 'styled-components';
import { MapContainer, TileLayer } from 'react-leaflet';
// import HeatMapLayer from 'react-leaflet-heatmap-layer';
import L, { map } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './map.css';
import DataHelper from '../Helpers/DataHelper.js';
import CitySearch from './CitySearch';

// import GeoSearch from './GeoSearch';

const MapBox = styled(Box)`
    display: block;
    position: absolute;
    height: 92.7%;
    width: 100%;
`;

const SearchBox = styled(Box)`
    position: absolute;
    left: 4%;
    top: 1.4%;
    z-index: 2;
`;

const DrawerButtonBox = styled(Box)`
    position: absolute;
    right: 1%;
    top: 1.4%;
    z-index: 2;
`;

class LeafletMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            long: -23.3200495,
            lat: 150.5276997
            // heatmapData: DataHelper.getLightData(),
            // heatmapData: heatmapData,
            // isLoaded: false
        }

        delete L.Icon.Default.prototype._getIconUrl;

        L.Icon.Default.mergeOptions({
            iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
            iconUrl: require('leaflet/dist/images/marker-icon.png'),
            shadowUrl: require('leaflet/dist/images/marker-shadow.png')
        });
    }

    componentDidMount() {
        const map = useMapEvents({
            click: () => {
                console.log("Clicked on map");
          },
            locationfound: (location) => {

            },
        })
    }


    updateRegion = event => {
        this.setState({
            long: event.long,
            lat: event.lat
        });
        console.log("Setting state");
        console.log(this.map);
        // map.flyTo([this.state.long, this.state.lat], 15);
    }

    toggleDrawer = (open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        this.setState({
            open: open
        });
    };

    render() {
        const position = [this.state.long, this.state.lat];

        const options = (
            <List>
                <ListItem button key="Home">
                    <CitySearch onValueChange={this.updateRegion} />
                </ListItem>
            </List>
        );

        return (
            <MapBox>
                <Drawer open={this.state.open} onClose={this.toggleDrawer(false)} anchor="right">
                    {options}
                </Drawer>
                <DrawerButtonBox>
                    <Tooltip title="Show/Hide List" placement="left">
                        <Fab color="secondary" size="small" onClick={this.toggleDrawer(true)} onKeyDown={this.toggleDrawer(true)}>
                            <SearchIcon />

                        </Fab>
                    </Tooltip>
                </DrawerButtonBox>
                <MapContainer
                    center={position}
                    zoom={15}
                    maxZoom={18}
                    attributionControl={true}
                    zoomControl={true}
                    doubleClickZoom={true}
                    scrollWheelZoom={true}
                    dragging={true}
                    animate={true}
                    easeLinearity={0.35}
                >



                    <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
                    {/* <Circle center={position} fillColor="blue" radius={200} /> */}

                </MapContainer>

            </MapBox>
        );
    }
}

export default LeafletMap