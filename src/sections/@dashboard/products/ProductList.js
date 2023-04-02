import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import axios from 'axios';
// @mui
import { Grid } from '@mui/material';
import ShopProductCard from './ProductCard';

// ----------------------------------------------------------------------

// ProductList.propTypes = {
//   products: PropTypes.array.isRequired,
// };

export default function ProductList({ open, setIsNew, setOpen, ...other }) {
  const [travels, setTravels] = useState();
  const loadTravels = () => {
    axios
      .get('http://localhost:8000/travel/')
      .then((res) => {
        console.log('RESPONSE====>', res.data);
        setTravels(res.data.travels);
      })
      .catch((err) => {
        console.log('Err', err);
      });
  };
  useEffect(() => {
    loadTravels();
  }, []);
  return (
    <Grid container spacing={3} {...other}>
      {' '}
      {travels?.map((travels) => (
        <Grid key={travels._id} item xs={12} sm={6} md={3}>
          <ShopProductCard
            travels={travels}
            open={open}
            setOpen={setOpen}
            setIsNew={setIsNew}
            loadTravels={loadTravels}
          />
        </Grid>
      ))}
    </Grid>
  );
}
