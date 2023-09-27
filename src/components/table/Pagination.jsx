import React from 'react';
import { TablePagination } from '@mui/material';

const Pagination = ({ page, onPageChange, pageSize, onPageSizeChange, totalItems }) => {
  return (
    <TablePagination
      component="div"
      count={totalItems}
      page={page}
      onPageChange={onPageChange}
      rowsPerPage={pageSize}
      onRowsPerPageChange={onPageSizeChange}
    />
  );
};

export default Pagination;
