import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Divider,
  IconButton,
  List,
  ListItemText,
  ListItem,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const Blog = ({ blog, updateBlog, userId, deleteBlog }) => {
  const navigate = useNavigate();

  if (!blog) return null;

  const handleAddLike = async () => {
    try {
      await updateBlog(blog.id);
    } catch (error) {
      console.error("Error liking blog:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Delete blog "${blog.title}"?`)) {
      try {
        await deleteBlog(blog.id);
        navigate("/");
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  const comments = blog.comments;

  return (
    <Card
      sx={{
        maxWidth: 700,
        margin: "20px auto",
        padding: 2,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#f9f9f9",
      }}
    >
      <CardContent>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#1976d2" }}
        >
          {blog.title}
        </Typography>

        <Typography
          variant="subtitle1"
          color="text.secondary"
          gutterBottom
          sx={{ marginBottom: 2 }}
        >
          by {blog.author}
        </Typography>

        <Divider sx={{ marginY: 2 }} />

        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
          <OpenInNewIcon sx={{ marginRight: 1, color: "#1976d2" }} />
          <Typography
            variant="body1"
            component="a"
            href={blog.url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "#1976d2",
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            {blog.url}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Chip
              icon={<FavoriteIcon />}
              label={`${blog.likes} likes`}
              color="error"
              variant="outlined"
              sx={{ marginRight: 1 }}
            />
            {userId && (
              <Button
                variant="contained"
                color="primary"
                size="small"
                startIcon={<FavoriteIcon />}
                onClick={handleAddLike}
                sx={{ borderRadius: 20 }}
              >
                Like
              </Button>
            )}
          </Box>

          {userId === blog.user?.username && (
            <Button
              variant="contained"
              color="error"
              size="small"
              startIcon={<DeleteIcon />}
              onClick={handleDelete}
              sx={{ borderRadius: 20 }}
            >
              Delete
            </Button>
          )}
        </Box>

        <Divider sx={{ marginY: 2 }} />

        <Typography variant="body2" color="text.secondary">
          <strong>Added by:</strong> {blog.user?.name || "Unknown author"}
        </Typography>

        <Divider sx={{ marginY: 2 }} />

        <Typography gutterBottom sx={{ fontWeight: "bold", color: "#1976d2" }}>
          Comments
        </Typography>
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
      </CardContent>
    </Card>
  );
};

export default Blog;
