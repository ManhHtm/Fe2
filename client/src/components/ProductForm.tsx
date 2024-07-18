import { Button, Stack, Paper } from "@mui/material";
import { ValidationErrors } from "final-form";
import { Field, Form } from "react-final-form";
import { ProductFormParams } from "src/types/Product";
import { InputText } from "./elements/InputText";
import { useNavigate, useParams } from "react-router-dom";

type ProductFormProps = {
  onSubmit: (values: ProductFormParams) => void;
  initialValues?: ProductFormParams; // Chỉnh sửa để sử dụng kiểu dữ liệu tương thích với initialValues
};

function ProductForm({ onSubmit, initialValues }: ProductFormProps) {
  const { id } = useParams();
  const nav = useNavigate();

  const validate = (values: ProductFormParams) => {
    const { title, image, category, price } = values;
    const errors: ValidationErrors = {};
    if (!title) errors.title = "Nhập tên sản phẩm";
    if (title && title.length < 6)
      errors.title = "Tên sản phẩm phải có ít nhất 6 ký tự";
    if (!image) errors.image = "Nhập đường dẫn ảnh";
    if (!price) errors.price = "Nhập giá sản phẩm";
    return errors;
  };

  const handleSubmit = (values: ProductFormParams) => {
    onSubmit(values);
    if (!id) {
      confirm("Thêm thành công. Quay lại trang danh sách.");
      nav("/product/list");
    } else {
      confirm("Sửa thành công. Quay lại trang danh sách.");
      nav("/product/list");
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      validate={validate}
      initialValues={initialValues}
      render={({ handleSubmit, values }) => (
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              width: "100%",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
            }}
          >
            <Stack spacing={2} sx={{ width: "100%" }}>
              <Field
                name="title"
                render={({ input, meta }) => (
                  <InputText
                    input={input}
                    label={"Tên sản phẩm"}
                    messageError={meta.touched && meta.error}
                  />
                )}
              />
              <Field<number>
                name="price"
                render={({ input, meta }) => (
                  <InputText
                    input={input}
                    label={"Giá"}
                    messageError={meta.touched && meta.error}
                    type="number"
                  />
                )}
              />
              <Field
                name="image"
                render={({ input, meta }) => (
                  <InputText
                    input={input}
                    label={"Ảnh"}
                    messageError={meta.touched && meta.error}
                  />
                )}
              />
              <Field<string>
                name="description"
                render={({ input, meta }) => (
                  <InputText
                    input={input}
                    label={"Môt tả"}
                    messageError={meta.touched && meta.error}
                  />
                )}
              />

              <Button
                type="submit"
                variant="contained"
                disableElevation
                sx={{
                  width: "100%",
                  color: "white",
                  backgroundColor: "black",
                }}
              >
                Submit
              </Button>
            </Stack>
          </Paper>
        </form>
      )}
    />
  );
}

export default ProductForm;
