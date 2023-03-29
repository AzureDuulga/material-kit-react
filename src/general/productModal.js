import * as React from 'react';
import { Box, Typography, Modal, Button, TextField } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ProductModal({ open, setOpen, isNew }) {
  const [newUpdateTrave, setNewUpdateTrave] = React.useState('');

  return (
    <div>
      <Modal
        open={open}
        onClose={() => {
          setOpen(!open);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography component="h1" variant="h5">
            Аялал {isNew ? 'үүсгэх ' : 'шинэчилэх'}
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Нэр"
            name="title"
            //   onChange={isNew ? onChangeAdd : onChangeInput}
            //   value={isNew && selectedCategory?.title}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="description"
            label="Тайлбар"
            type="text"
            //   value={isNew && selectedCategory?.description}
            autoFocus
            // // //   onChange={isNew ? onChangeAdd : onChangeInput}
          />
          <TextField
            margin="normal"
            // required
            fullWidth
            name="travelImg"
            label="Зураг"
            //   value={isNew && selectedCategory?.categoryImg}
            // // //   onChange={isNew ? onChangeAdd : onChangeInput}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="location"
            label="Байршил"
            type="text"
            // // //   onChange={isNew ? onChangeAdd : onChangeInput}
            //   value={isNew && selectedCategory?.categoryRate}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="price"
            label="Үнэ"
            type="number"
            // // //   onChange={isNew ? onChangeAdd : onChangeInput}
            //   value={isNew && selectedCategory?.categoryRate}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="day"
            label="Хоног"
            type="number"
            // // //   onChange={isNew ? onChangeAdd : onChangeInput}
            //   value={isNew && selectedCategory?.categoryRate}
          />
          <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
