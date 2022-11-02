import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getListCar } from '../../actions/carAction'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

function ListCar() {

    const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    }));

    const { getListCarResult, getListCarLoading, getListCarError } = useSelector((state) => state.carReducer);
    const dispatch = useDispatch()

    useEffect(() => {
        //get carAction
        console.log('1. use effect component did mount')
        dispatch(getListCar());
    }, [dispatch])

    return(
        <div style={{padding : 20}}>
            
            <h2>List Car</h2>
            <hr/>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={4}>
            {getListCarResult ? (getListCarResult.map((car) => {
                    return(
                            <Grid item xs={12} sm={6} md={4} lg={3} key={car.id}>
                                <Item elevation={3}>
                                    <Card>
                                        <CardMedia
                                                component="img"
                                                height="220"
                                                image={`https://raw.githubusercontent.com/fnurhidayat/probable-garbanzo/main/public/images/${car.image.split('/')[2]}`}
                                                alt="green iguana"
                                            />
                                        <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                <p>{car.manufacture} {car.model}</p>
                                                </Typography>
                                                <Typography gutterBottom variant="h6" component="div">
                                                <p>{car.type}</p>
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                {car.description}
                                                </Typography>
                                        </CardContent>
                                            <CardActions>
                                                <Button size="small">Share</Button>
                                                <Button size="small">Learn More</Button>
                                            </CardActions>
                                        </Card>
                                </Item>
                            </Grid>
                        // <p key={car.id}>{car.manufacture} - {car.rentPerDay}</p>
                    )
                })) : getListCarLoading ? (
                    <p>Loading . .</p>
                ) : (
                    <p>{getListCarError ? getListCarError : "Data Kosong"}</p>
                )}
                </Grid>
            </Box>
        </div>
    )
}

export default ListCar