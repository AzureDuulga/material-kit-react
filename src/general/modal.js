import * as React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';

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

export default function BasicModal({
  testModal,
  setTestModal,
  isNew,
  selectedCategory,
  onChangeInput,
  updateCategory,
  loadCategories,
}) {
  const [newCategory, setNewCategory] = React.useState({
    title: '',
    categoryImg: '',
    description: '',
    categoryRate: '',
  });
  const onChangeAdd = (e) => {
    setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
  };
  const addCategory = () => {
    console.log('newshit====>', newCategory);
    axios
      .post(`http://localhost:8000/category`, newCategory)
      .then((res) => {
        console.log('New category===>', newCategory);
        loadCategories();
      })
      .catch((err) => {
        console.log('New ERROR==>', err);
      });
  };

  return (
    <Modal
      open={testModal}
      onClose={() => {
        setTestModal(!testModal);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography component="h1" variant="h5">
          Категори {isNew ? 'үүсгэх ' : 'шинэчилэх'}
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Нэр"
          name="title"
          onChange={isNew ? onChangeAdd : onChangeInput}
          value={isNew && selectedCategory?.title}
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="description"
          label="Тайлбар"
          type="text"
          value={isNew && selectedCategory?.description}
          autoFocus
          onChange={isNew ? onChangeAdd : onChangeInput}
        />
        <TextField
          margin="normal"
          // required
          fullWidth
          name="categoryImg"
          label="Зураг"
          value={isNew && selectedCategory?.categoryImg}
          onChange={isNew ? onChangeAdd : onChangeInput}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="categoryRate"
          label="Үнэлгээ"
          type="number"
          onChange={isNew ? onChangeAdd : onChangeInput}
          value={isNew && selectedCategory?.categoryRate}
        />
        <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={isNew ? addCategory : updateCategory}>
          Submit
        </Button>
      </Box>
    </Modal>
  );
}
