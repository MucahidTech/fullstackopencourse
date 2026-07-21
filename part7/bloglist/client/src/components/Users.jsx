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
} from "@mui/material";
import userService from "../services/users";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userService.getAll().then((data) => setUsers(data));
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Username</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Blogs created
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell align="center">{user.blogs?.length || 0}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Users;
