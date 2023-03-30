import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from 'axios';
// @mui
import { Box, Card, Link, Typography, Stack, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';
import { ColorPreview } from '../../../components/color-utils';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ travels, open, setOpen, setIsNew, loadTravels }) {
  const { _id, title, travelImg, description, location, price, day } = travels;
  const [selectedTravel, setSelectedTravel] = useState();
  const deleteTravel = (e) => {
    console.log(e);
    axios
      .delete(`http://localhost:8000/travel/${e}`)
      .then((res) => {
        console.log('Delete response===>', res);
        loadTravels();
      })
      .catch((err) => {
        console.log('Delete ERROR==>', err);
      });
  };
  const updateTravel = () => {
    const { _id } = selectedTravel;
    console.log('OURR new', selectedTravel);
    axios
      .put(`http://localhost:8000/travel/${_id}`, selectedTravel)
      .then((res) => {
        console.log('Updated travel===>', selectedTravel);
        loadTravels();
      })
      .catch((err) => {
        console.log('Update ERROR==>', err);
      });
    setOpen(!open);
  };

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <StyledProductImg alt={title} src={travelImg} />
      </Box>
      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap>
            {title}
          </Typography>
        </Link>
        <Box sx={{ display: 'flex ', justifyContent: 'space-between' }}>
          <Typography>{price} </Typography>
          <Box>
            <EditIcon
              onClick={() => {
                setOpen(!open);
                setIsNew(false);
              }}
              sx={{ color: 'black' }}
            />
            <DeleteIcon
              onClick={() => {
                deleteTravel(_id);
              }}
              sx={{ color: 'red' }}
            />
          </Box>
        </Box>
      </Stack>
    </Card>
  );
}
