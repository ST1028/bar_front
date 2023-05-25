import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import theme from '@/src/theme';
import { LoginResponse } from '@/src/types/Responses/LoginResponse';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Collapse from '@mui/material/Collapse';
import { useRouter } from 'next/router';
import { serialize } from 'cookie'
import { GetServerSideProps } from 'next';
import { parseCookies, hasToken } from '@/src/methods/cookie';

export default function SignIn() {
  const router = useRouter();
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const account: string = data.get('account') as string;
    const password: string = data.get('password') as string;

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ account, password })
      })
      const res: LoginResponse = await response.json();
      
      document.cookie = serialize('token', res.data.token, {
        maxAge: 60 * 60 * 24 * 365 // 1 year
      });
      const myHeaders = new Headers();
      myHeaders.append('Authorization', 'Bearer ' + res.data.token);

      router.push('/');
    } catch (error) {
      setAlertOpen(true);
      setAlertMessage('アカウントまたはパスワードが誤ってます');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} src="/bar-icon.png"/>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          
          <Collapse in={alertOpen}>
            <Typography component="div" sx={{padding: "15px"}}>
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {alertMessage}
            </Alert>
            </Typography>
          </Collapse>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="account"
              label="Account"
              name="account"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = parseCookies(context.req.headers.cookie);
  // リダイレクトが必要な条件をチェックします
  if (hasToken(cookies)) {
    return {
      redirect: {
        destination: '/menus',
        permanent: false,
      },
    };
  }

  return {
    props: {
    },
  };
};