import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ProductTableRow from "../ProductTableRow";
import { TablePagination, TableSortLabel } from "@mui/material";
import styles from "./index.module.scss";
import ProductPagingContext from "../../contexts/ProductPagingContext";
const ProductTable = ({ data }) => {
  const { pagingData, setPagingData } = React.useContext(ProductPagingContext);
  const handleChangePage = (event, newPage) => {
    setPagingData({
      ...pagingData,
      currentPage: newPage,
    });
  };
  return (
    <>
      <TableContainer component={Paper} className={styles.ProductTable}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className={styles.TableHeader}>
            <TableRow>
              <TableCell>
                <TableSortLabel active={true} direction={"asc"}>
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <ProductTableRow row={row} key={row.id} />
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10]}
          component="div"
          count={pagingData.total}
          rowsPerPage={pagingData.limit}
          page={pagingData.currentPage}
          onPageChange={handleChangePage}
        />
      </TableContainer>
    </>
  );
};
export default ProductTable;
