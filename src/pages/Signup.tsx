import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { apiRequests } from '../services/requestService';
import { ISignupRequest } from '../interfaces';
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
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useRequest } from '../hooks';
import { routeLinks, RoutesEnum } from '../enums';
import { REGEX } from '../constants/regex';

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ISignupRequest>({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const {success, loading, error, sendRequest: signupUser} = useRequest((data?: ISignupRequest) => apiRequests.signup(data!));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loading && formData) {
      signupUser(formData);
    }
  };

  useEffect(() => {
    success && navigate(routeLinks[RoutesEnum.LOGIN])
  })

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
            <PersonAddIcon sx={{ color: 'white' }} />
          </Box>
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Create Account
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error.msg}
            </Alert>
          )}

            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              inputProps={{
                pattern: REGEX.EMAIL,
              }}
              helperText="Please enter a valid email address"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              inputProps={{
              pattern:
                REGEX.PASSWORD,
              }}
              helperText="Minimum 8 characters, at least one letter, one number, and one special character"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Create Account'}
            </Button>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <MuiLink component={Link} to={routeLinks[RoutesEnum.LOGIN]} variant="body2">
              Already have an account? Sign in
              </MuiLink>
            </Box>
            </Box>
        </Paper>
      </Box>
    </Container>
  );
}
