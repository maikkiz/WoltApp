import React, {useState, useEffect} from 'react';
import './App.css';
import data from './restaurants.json';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Blurhash } from "react-blurhash";

//setting card styles
const useStyles = makeStyles({
  grid: {
    flexGrow: 1,
    marginTop: 20,
    marginLeft: 50,
    marginRight: 50,
  },
  card: {
    maxWidth: 350,
  },
  media: {
    height: 200,
  },
  text: {
    marginBottom: 10,
  }
});

const RestaurantList = () => {

  //setting up restaurant array with hooks
  const [restaurants, setRestaurants] = useState([]);
 
  //method for using the styles
  const classes = useStyles();

  //setting the restaurants data to the restaurants array with first rendering of the page
  useEffect(() => { 
    setRestaurants(data.restaurants);
  }, []);

  //method for sorting the restaurants alphabetically ascending
  //sets newly sorted array to the state --> page re-renders
  const ascending = () => {
    const restaurantsasc = [...restaurants];
    setRestaurants(restaurantsasc.sort((a, b) => (a.name > b.name) ? 1 : -1));  
    console.log(restaurants);
  }
  
  //method for sorting the restaurants alphabetically descending
  //sets newly sorted array to the state --> page re-renders
  const descending = () => {
    const restaurantsdesc = [...restaurants];
    setRestaurants(restaurantsdesc.sort((a, b) => (a.name < b.name) ? 1 : -1));
    console.log(restaurants);
  }

  return (
    <div className="App">
        
      <header className="App-header">
        <p>Wolt restaurants</p>
      </header>

      <div style={{marginTop: 20}}>
        <Button onClick={() => ascending()} variant="outlined" style={{marginRight:10}}>Sort restaurants from A to Z</Button>
        <Button onClick={() => descending()} variant="outlined"style={{marginLeft:10}}>Sort restaurants from Z to A</Button>
      </div>

      <Grid container spacing={3} className={classes.grid}>
        { //mapping through the restaurants array
          //and setting the information to the card
          restaurants.map((restaurant, i) => (
            <Grid 
              key={i} 
              item 
              xl={3} 
              lg={4} 
              sm={6} 
              xs={12}
            >
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image={restaurant.image}
                  title="Restaurant image"
                />
                <CardContent>   
                  <Typography gutterBottom variant="h5" component="h2">
                    {restaurant.name}
                  </Typography> 
                  <Typography component="p" className={classes.text}>
                    {restaurant.city}
                  </Typography>               
                  <Typography color="textSecondary" component="p" className={classes.text}>
                    {restaurant.description}
                  </Typography>     
                  <Blurhash
                    hash={restaurant.blurhash}
                    width={200}
                    height={100}
                    resolutionX={128}
                    resolutionY={128}
                    punch={200}
                  />                   
                </CardContent>              
              </Card>
            </Grid>
          ))
        }
      </Grid>
    </div>
  );
}


export default RestaurantList;
