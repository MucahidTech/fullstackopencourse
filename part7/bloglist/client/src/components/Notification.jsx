import { Alert } from "@mui/material";
import { useNotify, useNotifyType } from "../stores/notifiyStore";

const Notification = () => {
  const message = useNotify();
  const type = useNotifyType();

  if (message === null) {
    return null;
  }

  return (
    <Alert style={{ marginTop: 10, marginBottom: 10 }} severity={type}>
      {message}
    </Alert>
  );
};

export default Notification;
