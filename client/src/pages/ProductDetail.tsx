import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "src/components/Loading";
import { useCart } from "src/contexts/cart";
import { CartItem, Product } from "src/types/Product";

function ProductDetail() {
  const { setCart } = useCart();
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<Product | undefined>();
  const [quantity, setQuantity] = useState<number>(0);

  const getProduct = async (id: string) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:3000/products/${id}`);
      setProduct(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    getProduct(id);
  }, [id]);

  const handleAddToCart = (product: Product) => {
    if (quantity <= 0) return;
    const cartStorage = localStorage.getItem("carts") || "[]";
    const carts = JSON.parse(cartStorage);

    const findItem = carts.find(
      (item: CartItem) => item.product._id === product._id
    );
    if (findItem) {
   //
    } else {
      carts.push({ product, quantity });
    }
    localStorage.setItem("carts", JSON.stringify(carts));
    setCart(carts.length);
  };

  return (
    <>
      <Loading isShow={loading} />
      <Container>
        {product && (
          <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <img src={product.image} alt="" width="100%" />
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={3}>
                  <Typography component="h1" variant="h4">
                    {product.title}
                  </Typography>
                  <Typography variant="h5" color="red">
                    ${product.price}
                  </Typography>
                  {/* <Typography variant="subtitle1">
                    Category: {product.category.name}
                  </Typography> */}
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography>Số lượng: </Typography>
                    <IconButton
                      onClick={() =>
                        setQuantity(quantity === 0 ? 0 : quantity - 1)
                      }
                    >
                      <RemoveIcon />
                    </IconButton>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      type="number"
                      value={quantity}
onChange={(e) => setQuantity(Number(e.target.value))}
                      sx={{ width: 80 }}
                    />
                    <IconButton onClick={() => setQuantity(quantity + 1)}>
                      <AddIcon />
                    </IconButton>
                  </Stack>
                  <Typography variant="body1">{product.description}</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAddToCart(product)}
                  >
                    Thêm vào giỏ hàng
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Paper>
        )}
      </Container>
    </>
  );
}

export default ProductDetail;