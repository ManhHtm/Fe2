import { FC } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";
import { Product } from "src/types/Product";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";

type ProductCardProps = {
  product: Product;
};

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  return (
    <Card
      sx={{
        width: 250,
        height: 350,
        display: "flex",
        flexDirection: "column",
        border: "1px solid #ddd",
        borderRadius: "4px",
        marginTop: "50px",
      }}
    >
      <CardMedia
        component="img"
        alt={product.title}
        image={product.image}
        sx={{
          width: "100%",
          height: 200,
          objectFit: "contain",
        }}
      />
      <CardContent sx={{ flexGrow: 1, overflow: "hidden" }}>
        <Typography gutterBottom variant="h5" component="div" noWrap>
          {product.title}
        </Typography>
        <Typography variant="body2" color="red" fontSize={"25px"} noWrap>
          ${product.price}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between", padding: "8px" }}>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <Link to={`/product/${product._id}`} style={{ textDecoration: "none" }}>
          <Button size="medium" variant="contained">
            Detail
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
