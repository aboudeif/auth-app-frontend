import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { apiRequests } from '../services/requestService';
import { IAuthRequest, IRestResponseError } from '../interfaces';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link as MuiLink,
  Paper,
  Alert,
  CircularProgress,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useRequest } from '../hooks';
import { getAuthUser, storeUserData } from '../services/authService';
import { StorageKeyEnum } from '../enums/storageKeyEnum';
import { routeLinks, RoutesEnum } from '../enums';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<IAuthRequest>({
    email: '',
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState<IRestResponseError|undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const {success, sendRequest: login, error: loginError, data} = useRequest((data?: IAuthRequest) => apiRequests.login(data!));
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(undefined);
    setLoading(true);

    login(formData);
  };

  useEffect(()=> {
    if (success) {
      setLoading(false);
      const user = data?.user;
      if (user) {
      storeUserData(user);
      navigate(routeLinks[RoutesEnum.APPLICATION]);
      }
    } else if(loginError) {
      setError(loginError)
    }
  }, [success, loginError])

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Box
            sx={{
              backgroundColor: 'primary.main',
              borderRadius: '50%',
              p: 1,
              mb: 2,
            }}
          >
            <LockOutlinedIcon sx={{ color: 'white' }} />
          </Box>
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Sign in
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: '90%', mb: 2 }}>
              {error.msg}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
              error={!!loginError}
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
              value={formData.password}
              onChange={handleChange}
              error={!!loginError}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!error && loading}
            >
              {!error && loading ? <CircularProgress size={24} /> : 'Sign In'}
            </Button>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <MuiLink component={Link} to={routeLinks[RoutesEnum.SIGNUP]} variant="body2">
                {"Don't have an account? Sign Up"}
              </MuiLink>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
} 