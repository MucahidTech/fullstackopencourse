import { TextField, Button, Stack } from "@mui/material";

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <>
      <h2>Log in to application</h2>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2} sx={{ width: 300 }}>
          <TextField
            variant="standard"
            label="username"
            value={username}
            onChange={handleUsernameChange}
          />
          <TextField
            variant="standard"
            label="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
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
