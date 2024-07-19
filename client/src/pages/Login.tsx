import {
  Button,
  Container,
  Stack,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import axios from "axios";
import { ValidationErrors } from "final-form";
import { Field, Form } from "react-final-form";
import { Link, useNavigate } from "react-router-dom";
import { InputText } from "src/components/elements/InputText";
import { MIN_PASSWORD } from "src/consts";
import isEmail from "validator/lib/isEmail";

type LoginFormParams = {
  email: string;
  password: string;
};

const Login = () => {
  const nav = useNavigate();
  const validate = (values: LoginFormParams) => {
    const { email, password } = values;
    const errors: ValidationErrors = {};
    if (!email) errors.email = "Vui lòng nhập email";
    if (email && !isEmail(email)) errors.email = "Email không đúng định dạng";
    if (!password) errors.password = "Vui lòng nhập mật khẩu";
    if (password && password.length < MIN_PASSWORD)
      errors.password = `Mật khẩu phải có tối thiểu ${MIN_PASSWORD} ký tự`;
    return errors;
  };

  const onSubmit = async (values: LoginFormParams) => {
    try {
      const { data } = await axios.post("/auth/login", values);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user)); // lưu object
      if (confirm("Đăng nhập thành công")) {
        nav("/register");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" textAlign="center" mb={2}>
            Đăng nhập
          </Typography>
          <Form
            onSubmit={onSubmit}
            validate={validate}
            render={({ handleSubmit }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <Stack spacing={3}>
                    <Field
                      name="email"
                      render={({ input, meta }) => (
                        <InputText
                          input={input}
                          label="Email"
                          messageError={meta.touched && meta.error}
                        />
                      )}
                    />
                    <Field
                      name="password"
                      render={({ input, meta }) => (
                        <InputText
                          input={input}
                          label="Mật khẩu"
                          messageError={meta.touched && meta.error}
                          type="password"
                        />
                      )}
                    />
                    <Link to="/register">Đăng ký</Link>
                    <Button variant="contained" color="primary" type="submit">
                      Đăng nhập
                    </Button>
                  </Stack>
                </form>
              );
            }}
          />
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
