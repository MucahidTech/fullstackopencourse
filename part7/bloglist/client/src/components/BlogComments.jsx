import {
  Typography,
  Button,
  TextField,
  Stack,
  Box,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Paper,
  Divider,
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
    <Box sx={{ marginTop: 3 }}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          color: "#1976d2",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        💬 Comments ({comments.length})
      </Typography>

      <Paper
        component="form"
        onSubmit={handleComment}
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          padding: 1,
          marginBottom: 2,
          backgroundColor: "#f5f5f5",
          borderRadius: 2,
        }}
      >
        <TextField
          size="small"
          fullWidth
          placeholder="Add a comment..."
          {...useFieldProps(comment)}
          sx={{ backgroundColor: "white", borderRadius: 1 }}
        />
        <Button
          type="submit"
          variant="contained"
          size="small"
          sx={{ borderRadius: 20, whiteSpace: "nowrap" }}
        >
          Add
        </Button>
      </Paper>

      {comments.length === 0 ? (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontStyle: "italic" }}
        >
          No comments yet. Be the first!
        </Typography>
      ) : (
        <List sx={{ padding: 0 }}>
          {comments.map((comment, index) => (
            <Box key={comment.id}>
              <ListItem sx={{ padding: "4px 0" }}>
                <Avatar
                  sx={{
                    bgcolor: "#57a8e1",
                    width: 28,
                    height: 28,
                    marginRight: 1,
                  }}
                >
                  {comment.content.charAt(0).toUpperCase()}
                </Avatar>
                <ListItemText
                  primary={comment.content}
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontSize: 14,
                      color: "#333",
                    },
                  }}
                />
              </ListItem>
              {index < comments.length - 1 && (
                <Divider sx={{ margin: "4px 0" }} />
              )}
            </Box>
          ))}
        </List>
      )}
    </Box>
  );
};

export default BlogComments;
