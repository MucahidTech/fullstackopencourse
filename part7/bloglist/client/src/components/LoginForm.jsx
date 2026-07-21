import { TextField, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useField, useFieldProps } from "../hooks";
import { useNotifyControls } from "../stores/notifiyStore";
import { useUserControls } from "../stores/userStore";

const LoginForm = () => {
  const username = useField("text");
  const password = useField("password");

  const navigate = useNavigate();
  const { show } = useNotifyControls();
  const { login } = useUserControls();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await login(username.value, password.value);
      show(`Login Successful`);
      navigate("/");
      username.reset();
      password.reset();
    } catch {
      show(`Wrong username or password`, "error");
    }
  };

  return (
    <>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <Stack spacing={2} sx={{ width: 300 }}>
          <TextField
            variant="standard"
            label="username"
            {...useFieldProps(username)}
          />
          <TextField
            variant="standard"
            label="password"
            {...useFieldProps(password)}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ alignSelf: "flex-start" }}
          >
            login
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default LoginForm;
