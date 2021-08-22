import React, { useEffect, useState } from 'react';
import { Box, Drawer, Fab, Tooltip } from '@material-ui/core';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import L from 'leaflet';
import styled from 'styled-components';
import './map.css';
import CitySearch from './CitySearch';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';

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


function Map() {
    const[open, setOpen] = useState(false);
    const[pos, setPos] = useState([10,10]);
    const[map, setMap] = useState(null);



    const updateRegion = () => {
        setPos([10,105]);
        const test = map;
        test.flyTo(pos);
    }

    const options = (
        <List>
            <ListItem button key="Home">
                <CitySearch />
            </ListItem>
        </List>
    );

    return (
        <MapBox>
            <Drawer open={open} onClose={() => setOpen(false)} anchor="right">
                    {options}
                </Drawer>
                <DrawerButtonBox>
                    <Tooltip title="Show/Hide List" placement="left">
                        <Fab color="secondary" size="small" onClick={() => setOpen(true)} onKeyDown={() => setOpen(true)}>
                            <SearchIcon />

                        </Fab>
                    </Tooltip>
                </DrawerButtonBox>
            <MapContainer
                center={{ lat: 51.505, lng: -0.09 }}
                zoom={13}
                scrollWheelZoom={true}
                whenCreated={map => setMap({ map })}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        </MapBox>

    )
}



export default Map;