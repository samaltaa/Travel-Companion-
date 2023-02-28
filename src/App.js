import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline, Grid } from '@material-ui/core';
import PlaceDetails from './components/PlaceDetails/PlaceDetails';
import { getPlacesData} from './API';

//components
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';





const App = () => {
    const [places, setPlaces] = useState([]);
    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState(null);

    useEffect(()=> {
        navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
            setCoordinates({lat: latitude, lng: longitude});
        })
    },[])

    useEffect(() => {
        console.log(coordinates, bounds);
        getPlacesData()
        .then((data) => {
            console.log(data);

            setPlaces(data);
        });
    }, [coordinates, bounds]);
    return (
        <div>
            <CssBaseline />
                <Header />
            <Grid container spacing={3} style={{ width: '100%' }}>
                <Grid item xs={12} md={4}>
                    <List />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map 
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        />
                </Grid>
            </Grid>
        </div>
        
        
    );
}

export default App;