import {
  Typography,
  Button,
  TextField,
  Stack,
  Box,
  List,
  ListItemText,
  ListItem,
} from "@mui/material";
import { useField, useFieldProps } from "../hooks";
import { useNotifyControls } from "../stores/notifiyStore";
import { useBlogsControls } from "../stores/blogsStore";

const BlogComments = ({ blogId, comments }) => {
  const comment = useField("text");
  const { show } = useNotifyControls();
  const { addComment } = useBlogsControls();

  const handleComment = async (event) => {
    event.preventDefault();

    try {
      const newComment = await addComment(blogId, comment.value);
      show(`you commented: "${newComment.content}"`);
      comment.reset();
    } catch {
      show("something wrong happened! can't add comment", "error");
    }
  };

  return (
    <Box>
      <Typography gutterBottom sx={{ fontWeight: "bold", color: "#1976d2" }}>
        Comments
      </Typography>
      <form onSubmit={handleComment}>
        <Stack spacing={2} sx={{ width: 300 }}>
          <TextField
            variant="standard"
            label="add a comment"
            {...useFieldProps(comment)}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ alignSelf: "flex-start" }}
          >
            Add Comment
          </Button>
        </Stack>
      </form>
      {comments.length === 0 ? (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontStyle: "italic" }}
        >
          No comments yet
        </Typography>
      ) : (
        <List>
          {comments.map((comment) => (
            <ListItem key={comment.id}>
              <ListItemText primary={comment.content} />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default BlogComments;
