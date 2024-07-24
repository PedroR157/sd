import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    Input,
    Container,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Alert
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";

function Register() {
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [permission, setPermission] = useState("view");
    const [editingUser, setEditingUser] = useState(null);
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState("success");

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        console.log(users); // Verifique o estado dos utilizadores
    }, [users]);

    const fetchUsers = async () => {
        try {
            const response = await fetch("http://localhost:18080/users");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data); // Verifique a resposta da API
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            username,
            password,
            permission
        };

        try {
            const response = await fetch(editingUser ? `http://localhost:18080/users/${editingUser.id}` : "http://localhost:18080/adduser", {
                method: editingUser ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setUsername("");
                setPassword("");
                setPermission("view");
                setEditingUser(null);
                fetchUsers();
                setMessageType("success");
                setMessage(editingUser ? "User updated successfully" : "User registered successfully");
            } else {
                setMessageType("error");
                setMessage("Failed to send data to the server");
            }
        } catch (error) {
            setMessageType("error");
            setMessage("Error sending data to the server");
            console.error("Error sending data to the server:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:18080/users/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                fetchUsers();
                setMessageType("success");
                setMessage("User deleted successfully");
            } else {
                setMessageType("error");
                setMessage("Failed to delete user");
            }
        } catch (error) {
            setMessageType("error");
            setMessage("Error deleting user");
            console.error("Error deleting user:", error);
        }
    };

    const handleEdit = (user) => {
        setUsername(user.username);
        setPassword(user.password);
        setPermission(user.permission);
        setEditingUser(user);
    };

    return (
        <Container>
            <Box
                sx={{
                    marginTop: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5">
                    {editingUser ? "Editar Utilizador" : "Registar"}
                </Typography>
                {message && (
                    <Alert severity={messageType} sx={{ mt: 2 }}>
                        {message}
                    </Alert>
                )}
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ width: "100%", mt: 3 }}
                >
                    <FormControl sx={{ mt: 2, width: "100%" }} variant="outlined">
                        <InputLabel htmlFor="username">Username</InputLabel>
                        <Input
                            id="username"
                            name="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </FormControl>
                    <FormControl sx={{ mt: 2, width: "100%" }} variant="outlined">
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </FormControl>
                    <FormControl sx={{ mt: 2, width: "100%" }} variant="outlined">
                        <InputLabel htmlFor="permission">Permissão</InputLabel>
                        <Select
                            id="permission"
                            name="permission"
                            value={permission}
                            onChange={(e) => setPermission(e.target.value)}
                            required
                        >
                            <MenuItem value="view">View</MenuItem>
                            <MenuItem value="edit">Edit</MenuItem>
                            <MenuItem value="admin">Admin</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {editingUser ? "Salvar Alterações" : "Registar"}
                    </Button>
                </Box>
                <TableContainer component={Paper} sx={{ mt: 4 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Username</TableCell>
                                <TableCell>Permissão</TableCell>
                                <TableCell>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.length > 0 ? (
                                users.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.username}</TableCell>
                                        <TableCell>{user.permission}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => handleEdit(user)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton onClick={() => handleDelete(user.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={3}>No users found</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
    );
}

export default Register;