import { useEffect, useMemo } from "react";

import { Link } from "react-router-dom";
import { List, ListItem, ListItemText, Paper, Typography } from "@mui/material";
import { useBlogs, useBlogsControls } from "../stores/blogsStore";

const BlogForm = () => {
  const blogs = useBlogs();
  const { initialize } = useBlogsControls();

  useEffect(() => {
    initialize();
  }, [initialize]);

  const sortedBloges = useMemo(() => {
    return [...blogs].sort((a, b) => b.likes - a.likes);
  }, [blogs]);

  return (
    <Paper
      elevation={2}
      sx={{
        padding: 3,
        maxWidth: 600,
        margin: "20px auto",
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" component="h2" gutterBottom>
        Blogs
      </Typography>
      <List>
        {sortedBloges.map((blog) => (
          <ListItem
            key={blog.id}
            component={Link}
            to={`/blogs/${blog.id}`}
            sx={{
              textDecoration: "none",
              color: "inherit",
              "&:hover": {
                backgroundColor: "#f0f0f0",
                borderRadius: 1,
              },
            }}
          >
            <ListItemText
              primary={
                <Typography sx={{ fontWeight: "bold", color: "#1976d2" }}>
                  {blog.title}
                </Typography>
              }
              secondary={`by ${blog.author}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default BlogForm;
