import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Avatar,
  Box,
} from "@mui/material";
import userService from "../services/users";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userService.getAll().then((data) => setUsers(data));
  }, []);

  return (
    <Box sx={{ maxWidth: 800, margin: "0 auto", padding: 3 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: "#1976d2", fontWeight: "bold" }}
      >
        Users
      </Typography>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead sx={{ backgroundColor: "#1976d2" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                Name
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                Username
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", color: "white" }}
                align="center"
              >
                Blogs created
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar sx={{ bgcolor: "#1976d2", width: 32, height: 32 }}>
                      {user.name.charAt(0).toUpperCase()}
                    </Avatar>
                    <Link
                      to={`/users/${user.id}`}
                      style={{
                        color: "#1976d2",
                        textDecoration: "none",
                        fontWeight: 500,
                      }}
                    >
                      {user.name}
                    </Link>
                  </Box>
                </TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell align="center">
                  <Box
                    sx={{
                      display: "inline-block",
                      bgcolor: "#1976d2",
                      color: "white",
                      borderRadius: "50%",
                      width: 28,
                      height: 28,
                      lineHeight: "28px",
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: 14,
                    }}
                  >
                    {user.blogs?.length || 0}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Users;
