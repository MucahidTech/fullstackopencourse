import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Box,
  Chip,
  Divider,
} from "@mui/material";
import userService from "../services/users";

const UserView = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    userService.getOne(id).then((data) => setUser(data));
  }, [id]);

  if (!user) return null;

  return (
    <Box sx={{ maxWidth: 700, margin: "0 auto", padding: 3 }}>
      <Card elevation={3} sx={{ borderRadius: 2 }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              marginBottom: 3,
            }}
          >
            <Avatar sx={{ bgcolor: "#1976d2", width: 64, height: 64 }}>
              {user.name.charAt(0).toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                {user.name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                @{user.username}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ marginY: 2 }} />

          <Typography variant="h6" gutterBottom sx={{ color: "#1976d2" }}>
            Blogs added ({user.blogs?.length || 0})
          </Typography>

          <List>
            {user.blogs?.map((blog) => (
              <ListItem
                key={blog.id}
                component={Link}
                to={`/blogs/${blog.id}`}
                sx={{
                  textDecoration: "none",
                  color: "inherit",
                  borderRadius: 1,
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                <ListItemText
                  primary={
                    <Typography sx={{ fontWeight: 500, color: "#1976d2" }}>
                      {blog.title}
                    </Typography>
                  }
                  secondary={`by ${blog.author || "Unknown"}`}
                />
                <Chip
                  label={`${blog.likes || 0} likes`}
                  size="small"
                  sx={{ bgcolor: "#e3f2fd" }}
                />
              </ListItem>
            ))}
          </List>

          {(!user.blogs || user.blogs.length === 0) && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontStyle: "italic" }}
            >
              No blogs added yet
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserView;
