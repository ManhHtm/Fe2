import { Container, Stack, styled, Typography } from "@mui/material";
import Banner from "src/components/Banner";
import DeleteIcon from "@mui/icons-material/Delete";

const labels = ["Product", "Price", "Quantity", "Subtotal", ""];
function Cart() {
  return (
    <>
      <Banner />

      <Container>
        <Wrapper>
          <LabelWrapper
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-around"}
          >
            {labels.map((label, index) => (
              <Typography fontWeight={500} key={index}>
                {label}
              </Typography>
            ))}
          </LabelWrapper>

          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Stack direction={"row"} alignItems={"center"} gap={4}>
              <img src="./product.png" />
              <Typography fontWeight={500}>Asgaard sofa</Typography>
            </Stack>

            <Typography fontWeight={500}>25.000.000đ</Typography>
            <Typography fontWeight={500}>1</Typography>
            <Typography fontWeight={500}>25.000.000đ</Typography>
            <DeleteIcon />
          </Stack>
        </Wrapper>
      </Container>
    </>
  );
}

export default Cart;

const Wrapper = styled(Stack)({
  paddingTop: 72,
});

const LabelWrapper = styled(Stack)(({ theme }) => ({
  background: theme.palette.primary.main,
  height: 55,
}));
