import React, { useState } from "react";
import {
    Box,
    Button,
    Input,
    Container,
    FormControl,
    InputLabel,
    Typography,
    Alert,
} from "@mui/material";

function Login() {
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState("success"); // 'success' or 'error'

    const handleLogin = async (e) => {
        e.preventDefault();

        const data = {
            username: loginUsername,
            password: loginPassword
        };

        try {
            const response = await fetch("http://localhost:18080/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const token = await response.json();
                document.cookie = `token=${token};path=/;`;

                setMessageType("success");
                setMessage("Login successful");
                setLoginUsername("");
                setLoginPassword("");
                // Redirect or perform further actions here
            } else {
                setMessageType("error");
                setMessage("Login failed. Please check your credentials.");
            }
        } catch (error) {
            setMessageType("error");
            setMessage("Error during login. Please try again later.");
            console.error("Error during login:", error);
        }
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
                    Login
                </Typography>
                {message && (
                    <Alert severity={messageType} sx={{ mt: 2 }}>
                        {message}
                    </Alert>
                )}
                <Box
                    component="form"
                    onSubmit={handleLogin}
                    sx={{ width: "100%", mt: 3 }}
                >
                    <FormControl 
                        sx={{
                            mt: 5,
                            width: "100%",
                            border: "none",
                            '& .MuiInputBase-root': {
                                borderRadius: "8px 8px 0px 0px",
                                backgroundColor: '#12543a',

                                '&:hover': {
                                    backgroundColor: '#113e2c',
                                    transition: 'all 0.4s ease'
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: '#fff'
                            },
                        }} 
                        variant="outlined" >
                        <InputLabel htmlFor="login-username">Username</InputLabel>
                        <Input
                            id="login-username"
                            name="login-username"
                            type="text"
                            value={loginUsername}
                            onChange={(e) => setLoginUsername(e.target.value)}
                            required
                        />
                    </FormControl>
                    <FormControl 
                         sx={{
                            mt: 5,
                            width: "100%",
                            border: "none",
                            '& .MuiInputBase-root': {
                                borderRadius: "8px 8px 0px 0px",
                                backgroundColor: '#12543a',

                                '&:hover': {
                                    backgroundColor: '#113e2c',
                                    transition: 'all 0.4s ease'
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: '#fff'
                            },
                        }}  
                        variant="outlined">
                        <InputLabel htmlFor="login-password">Password</InputLabel>
                        <Input
                            id="login-password"
                            name="login-password"
                            type="password"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            required
                        />
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Login
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default Login;