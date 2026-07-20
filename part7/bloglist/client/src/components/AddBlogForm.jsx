import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Stack } from "@mui/material";

const AddBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    createBlog({ title, author, url });
    setTitle("");
    setAuthor("");
    setUrl("");
    navigate("/");
  };
  return (
    <>
      <h2>Create New Blog</h2>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2} sx={{ width: 300 }}>
          <TextField
            size="small"
            label="Title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />

          <TextField
            size="small"
            label="Author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
          <TextField
            size="small"
            label="URL"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />

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
