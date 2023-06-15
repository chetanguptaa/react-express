import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';

const defaultTheme = createTheme();

export default function Login() {
    const handleLogin = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        const password = data.get('password');
        try {
            const response = await fetch('http://localhost:8000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, password}),
            });
            const responseData = await response.json();
            if (responseData.accessToken && responseData.refreshToken) {
                localStorage.setItem('accessToken', responseData.accessToken);
                localStorage.setItem('refreshToken', responseData.refreshToken);
                window.location.href = '/me';
            } else {
                console.error('Access token or refresh token is missing');
            }
            event.target.reset();
        } catch (error) {
            console.log('An error occured: ', error);
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Container component="main" maxWidth="xs" sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 4,
                    border: '1px solid #ccc',
                    borderRadius: '12px',
                    boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
                    backgroundColor: '#fff',
                }}
                >
                    <Avatar sx={{ m: 'auto', bgcolor: '#FF033E' }}>
                        <LoginOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
                        Log In
                    </Typography>
                    <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 3, width: '100%' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        >
                        Log In
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/signin" variant="body2">
                                {"Don't have an account? Sign In"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}