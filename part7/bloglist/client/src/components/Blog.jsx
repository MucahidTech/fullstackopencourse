import { useNavigate, useMatch } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Divider,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import BlogComments from "./BlogComments";

import { useUser } from "../stores/userStore";
import { useBlogs, useBlogsControls } from "../stores/blogsStore";
import { useNotifyControls } from "../stores/notifiyStore";

const Blog = () => {
  const user = useUser();
  const blogs = useBlogs();
  const { like, remove } = useBlogsControls();
  const { show } = useNotifyControls();

  const navigate = useNavigate();
  const match = useMatch("/blogs/:id");

  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;

  if (!blog) return null;

  const handleAddLike = async () => {
    try {
      await like(blog.id);
      show(`Liked blog "${blog.title}"`);
    } catch (error) {
      show(`Error liking blog: ${error}`, "error");
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Delete blog "${blog.title}"?`)) {
      try {
        await remove(blog.id);
        navigate("/");
        show(`Blog "${blog.title}" has been deleted`);
      } catch (error) {
        show(`Error deleting blog: ${error}`, "error");
      }
    }
  };

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
            {user && (
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

          {user?.username === blog.user?.username && (
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

        <BlogComments blogId={blog.id} comments={blog.comments || []} />
      </CardContent>
    </Card>
  );
};

export default Blog;
