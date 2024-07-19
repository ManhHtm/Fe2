import { Box, Stack, styled, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
type BannerProps = {
  page: string;
};

const Banner = () => {
  return (
    <>
      <BannerImage>
        <Stack justifyContent={"center"} alignItems={"center"} height={"100%"}>
          <img />
          <Typography fontSize={48}>Cart</Typography>
          <Stack direction={"row"}>
            <Typography fontWeight={500}>Home</Typography>
            <NavigateNextIcon />
            <Typography fontWeight={300}>Cart</Typography>
          </Stack>
        </Stack>
      </BannerImage>
    </>
  );
};

export default Banner;

const BannerImage = styled(Box)({
  backgroundImage: "url(./banner.png)",
  height: "316px",
});
