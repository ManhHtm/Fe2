import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLoading } from "src/contexts/loading";
import { Product } from "src/types/Product";
import { Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ConfirmDialog from "src/components/ConfirmDialog";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function AdminProductList() {
  const { setLoading } = useLoading();
  const [showFlash, setShowFlash] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [idDelete, setIdDelete] = useState<string | null>(null);

  const getAllProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/products");
      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  const handleConfirm = (id: string) => {
    setConfirm(true);
    setIdDelete(id);
  };

  const handleDelete = async () => {
    try {
      await axios.delete("/products/" + idDelete);
      setShowFlash(true);
      getAllProduct();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <TableContainer
        component={Paper}
        className="main"
        sx={{
          marginLeft: "50px",
          marginRight: "60px",
          marginTop: "100px",
        }}
      >
        <Typography variant="h4">Danh sách sản phẩm</Typography> <br />
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Tên</StyledTableCell>
              <StyledTableCell align="right">Giá</StyledTableCell>
              <StyledTableCell align="right">Mô tả</StyledTableCell>
              <StyledTableCell align="right">Ảnh</StyledTableCell>
              {/* <StyledTableCell align="right">Danh mục&nbsp;(g)</StyledTableCell> */}
              <StyledTableCell align="right">Hành động</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {product.title}
                </StyledTableCell>
                <StyledTableCell align="right">{product.price}</StyledTableCell>
                <StyledTableCell align="right">
                  {product.description}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <img src={product.image} alt="" style={{ width: "100px" }} />
                </StyledTableCell>
                {/* <StyledTableCell align="right">{product.category.name}</StyledTableCell> */}
                <StyledTableCell align="right">
                  <Link to={`/admin/product/edit/${product._id}`}>
                    <Button
                      variant="contained"
                      sx={{ bgcolor: "black", color: "white" }}
                    >
                      Sửa
                    </Button>
                  </Link>

                  <Button
                    variant="contained"
                    sx={{ bgcolor: "red", color: "white" }}
                    onClick={() => handleConfirm(product._id)}
                  >
                    Xóa
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        <ConfirmDialog
          confirm={confirm}
          onConfirm={setConfirm}
          onDelete={handleDelete}
        />
      </TableContainer>
    </>
  );
}
