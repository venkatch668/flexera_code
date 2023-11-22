import React, { useEffect, useState } from 'react';
import './App.css';
import CardItem from './CardItem';
import TablePagination from '@mui/material/TablePagination';
import CircularProgress from '@mui/material/CircularProgress';

function App() {
  const [repositories, setRepositories] = useState<any>({});
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loader, setLoader] = useState(false);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    getRepositories(rowsPerPage, newPage)
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    getRepositories(parseInt(event.target.value, 10), page)
  };

  useEffect(() => {
    getRepositories(rowsPerPage, page)
  }, [])

  const getRepositories = async (perPage: number, page: number) => {
    setLoader(true);
    let headers = new Headers({
      "Accept": "application/json",
      "Content-Type": "application/json",
      "User-Agent": "MY-UA-STRING"
    });
    const data = await fetch(
      `https://api.github.com/search/repositories?sort=stars&q=javascript&per_page=${perPage}&page=${page}`, {
      headers: headers
    }).then((res) => res.json());
    setLoader(false);
    setRepositories(data);
  }
  return (
    <div className="App">
      <TablePagination
        component="div"
        count={repositories?.total_count}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <div className='app-item'>
        {loader && <div className='spinner'><CircularProgress /></div>}
        {!loader && repositories?.items?.map((e: any) => <CardItem item={e} />)}
      </div>
    </div>
  );
}

export default App;
