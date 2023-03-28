import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { filter } from 'lodash';
import { useEffect, useState } from 'react';
// @mui
import {
  Card,
  Box,
  Modal,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  TextField,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import BasicModal from '../general/modal';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';

const TABLE_HEAD = [
  { id: 'title', label: 'Нэр', alignRight: false },
  { id: 'description', label: 'Тайлбар', alignRight: false },
  { id: 'categoryImg', label: 'Зураг', alignRight: false },
  { id: 'categoryRating', label: 'Үнэлгээ', alignRight: false },
  { id: 'role', label: 'Actions', alignRight: false },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}
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

export default function UserPage() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [modalOpen, setModalOpen] = useState(false);
  const [isNew, setIsNew] = useState(true);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;
  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);
  const [fileteredCategory, setFilteredCategory] = useState([]);
  const isNotFound = !filteredUsers.length && !!filterName;

  const [selectedCategory, setSelectedCategory] = useState({});

  const deleteCategory = (e) => {
    console.log(e);
    axios
      .delete(`http://localhost:8000/category/${e}`)
      .then((res) => {
        console.log('Delete response===>', res);
      })
      .catch((err) => {
        console.log('Delete ERROR==>', err);
      });
    loadCategories();
  };
  const loadCategories = () => {
    axios
      .get('http://localhost:8000/category/')
      .then((res) => {
        setFilteredCategory(res.data.categories);
      })
      .catch((err) => {
        console.log('Err', err);
      });
  };

  const updateCategory = () => {
    const { _id } = selectedCategory;
    console.log('OURR new', selectedCategory);
    axios
      .put(`http://localhost:8000/category/${_id}`, selectedCategory)
      .then((res) => {
        console.log('Updated category===>', selectedCategory);
        loadCategories();
      })
      .catch((err) => {
        console.log('Update ERROR==>', err);
      });
    setTestModal(!testModal);
  };

  useEffect(() => {
    loadCategories();
  }, []);
  const onChangeInput = (e) => {
    const newItem = { ...selectedCategory, [e.target.name]: e.target.value };
    setSelectedCategory(newItem);
  };
  const [testModal, setTestModal] = useState(false);
  return (
    <>
      <Helmet>
        <title> Azure Категори</title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Категори
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              setTestModal(!testModal);
              setIsNew(true);
            }}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Шинэ Категори Үүсгэх
          </Button>
        </Stack>
        {!fileteredCategory.length && <h4>Хоосон байна</h4>}
        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {fileteredCategory?.map((row) => {
                    const { _id, title, description, categoryImg, categoryRate } = row;
                    return (
                      <TableRow hover key={_id} tabIndex={-1} role="checkbox">
                        <TableCell padding="checkbox">
                          <Checkbox checked={false} onChange={(event) => handleClick(event, title)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={title} src={categoryImg} />
                            <Typography variant="subtitle2" noWrap>
                              {title}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{description}</TableCell>
                        <TableCell align="left">url</TableCell>
                        <TableCell align="left">{categoryRate}</TableCell>
                        <TableCell>
                          <MenuItem
                            onClick={() => {
                              setSelectedCategory(row);
                              setIsNew(false);
                              setTestModal(!testModal);
                            }}
                          >
                            <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                            Засах
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              deleteCategory(_id);
                            }}
                            sx={{ color: 'error.main' }}
                          >
                            <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                            Устгах
                          </MenuItem>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            // rowsPerPageOptions={[3, 5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      <BasicModal
        testModal={testModal}
        setTestModal={setTestModal}
        isNew={isNew}
        selectedCategory={selectedCategory}
        onChangeInput={onChangeInput}
        updateCategory={updateCategory}
        loadCategories={loadCategories}
      />
    </>
  );
}
