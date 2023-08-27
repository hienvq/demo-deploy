import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ProductApi from "../../apis/ProductApi";
import EditIcon from "@mui/icons-material/Edit";
import * as React from "react";
import ProductModalContext from "../../contexts/ProductModalContext";
import { useNavigate } from "react-router-dom";
import { Button, SvgIcon } from "@mui/material";
import ProductPagingContext from "../../contexts/ProductPagingContext";

const ProductTableRow = ({ row }) => {
  const { isOpenModal, setIsOpenModal, initDataModal, setInitDataModal, handleSearch } =
    React.useContext(ProductModalContext);
  const { pagingData, setPagingData, refetch } = React.useContext(ProductPagingContext);
  const handleDeleteProduct = async () => {
    //call api delete
    await ProductApi.remove(row.id);
    if (pagingData.currentPage === 0) {
      refetch();
    } else {
      setPagingData({
        ...pagingData,
        currentPage: 0,
      });
    }
  };
  const handleEditProduct = () => {
    setInitDataModal(row);
    setIsOpenModal(true);
  };
  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell>{row.name}</TableCell>
      <TableCell>{row.price}</TableCell>
      <TableCell>{row.description}</TableCell>
      <TableCell align="right">
        <IconButton onClick={handleEditProduct}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => handleDeleteProduct()}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
export default ProductTableRow;
