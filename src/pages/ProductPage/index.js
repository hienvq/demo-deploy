import ProductApi from "../../apis/ProductApi";
import ProductTable from "../../components/ProductTable";
import * as React from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

import { Button, IconButton, InputBase, Paper } from "@mui/material";
import ProductModalContext from "../../contexts/ProductModalContext";
import ProductModal from "../../components/ProductModal";
import { useNavigate } from "react-router-dom";
import ProductPagingContext from "../../contexts/ProductPagingContext";
/*
phan trang
- get total item
- current page, total, limit , search
=> dung context 
khi them, sua xoa, tim kiem thi phai refetch
*/
const ProductPage = (props) => {
  const [listProduct, setListProduct] = React.useState([]);
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [initDataModal, setInitDataModal] = React.useState({});
  const [pagingData, setPagingData] = React.useState({
    currentPage: 0,
    total: 0,
    limit: 2,
    search: "",
  });
  const ref = React.useRef(null);

  const getPagingProduct = async () => {
    const response = await ProductApi.getPaging(
      pagingData.limit,
      pagingData.currentPage + 1,
      ref.current.value?.trim() && { name: ref.current.value?.trim() }
    );
    // set total, set listproduct
    const { data, headers } = response;

    setPagingData({
      ...pagingData,
      total: Number(headers["X-Total-Count"] ?? headers["x-total-count"]),
    });
    setListProduct(data);
  };
  const handleSearch = async () => {
    if (pagingData.currentPage !== 0) {
      setPagingData({
        ...pagingData,
        currentPage: 0,
        search: ref.current.value?.trim(),
      });
    } else {
      await getPagingProduct();
    }
  };
  React.useEffect(() => {
    getPagingProduct();
  }, [pagingData.currentPage]);

  const handleAddButton = () => {
    setInitDataModal({});
    setIsOpenModal(true);
  };
  return (
    <ProductPagingContext.Provider value={{ pagingData, setPagingData, refetch: getPagingProduct }}>
      <ProductModalContext.Provider
        value={{ isOpenModal, setIsOpenModal, initDataModal, setInitDataModal, handleSearch }}
      >
        <ProductModal />
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
          <Paper component="form" sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}>
            <InputBase
              inputRef={ref}
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
              inputProps={{ "aria-label": "Search" }}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search" onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          </Paper>
          <Button variant="contained" onClick={handleAddButton}>
            <AddIcon />
          </Button>
        </div>
        <ProductTable data={listProduct} />
      </ProductModalContext.Provider>
    </ProductPagingContext.Provider>
  );
};
export default ProductPage;
