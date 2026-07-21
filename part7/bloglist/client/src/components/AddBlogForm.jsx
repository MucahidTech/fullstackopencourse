import { useNavigate } from "react-router-dom";
import { TextField, Button, Stack } from "@mui/material";
import { useField, useFieldProps } from "../hooks";
import { useNotifyControls } from "../stores/notifiyStore";
import { useBlogsControls } from "../stores/blogsStore";

const AddBlogForm = () => {
  const title = useField("text");
  const author = useField("text");
  const url = useField("text");

  const navigate = useNavigate();
  const { show } = useNotifyControls();
  const { add } = useBlogsControls();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const returnedBlog = await add({
        title: title.value,
        author: author.value,
        url: url.value,
      });

      show(`A new blog "${title.value}" by "${author.value}" added`);
      navigate("/");
      title.reset();
      author.reset();
      url.reset();
    } catch {
      show("Invalid blog data", "error");
    }
  };

  return (
    <>
      <h2>Create New Blog</h2>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2} sx={{ width: 300 }}>
          <TextField size="small" label="Title" {...useFieldProps(title)} />
          <TextField size="small" label="Author" {...useFieldProps(author)} />
          <TextField size="small" label="URL" {...useFieldProps(url)} />

          <Button
            type="submit"
            variant="contained"
            sx={{ alignSelf: "flex-start" }}
          >
            Create
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default AddBlogForm;
