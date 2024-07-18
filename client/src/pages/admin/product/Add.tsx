import { Container, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProductForm from "src/components/ProductForm";
import { useLoading } from "src/contexts/loading";
import { ProductFormParams } from "src/types/Product";

function AdminProductAdd() {
  const nav = useNavigate();
  const { setLoading } = useLoading();

  const onSubmit = async (values: ProductFormParams) => {
    try {
      setLoading(true);
      await axios.post("/products", values);
      nav("/admin/product/list");
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Container className="main">
        <Stack gap={2}>
          <Typography variant="h4">Thêm sản phẩm</Typography>
          <ProductForm onSubmit={onSubmit} initialValues={{ isShow: true }} />
        </Stack>
      </Container>
    </>
  );
}

export default AdminProductAdd;
