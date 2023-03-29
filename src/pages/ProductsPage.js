import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import { Container, Stack, Typography, Button } from '@mui/material';
// components
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
import ProductModal from '../general/productModal';
import Iconify from '../components/iconify';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [openFilter, setOpenFilter] = useState(false);
  const [open, setOpen] = useState(false);
  const [isNew, setIsNew] = useState(true);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <>
      <Helmet>
        <title> Azure Travel </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Travels
        </Typography>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>
        <Button
          variant="contained"
          onClick={() => {
            setOpen(!open);
            setIsNew(true);
          }}
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          Шинэ аялал үүсгэх
        </Button>
        <br />
        <br />
        <br />
        <ProductList open={open} setOpen={setOpen} setIsNew={setIsNew} />
        <ProductCartWidget />
      </Container>
      <ProductModal open={open} setOpen={setOpen} isNew={isNew} />
    </>
  );
}
