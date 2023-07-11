
import { platoApi } from '@/api';
import { AuthLoyout } from '@/components/layouts/AuthLayout';
import { AuthContext } from '@/context';
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, Link, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';


  type FormData = {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
  }

const RegisterPage = () => {

  const router = useRouter();
  const { registerUser } = useContext(AuthContext)
  const {register, handleSubmit, formState: {errors}} = useForm<FormData>();


  const onRegister = ( { firstName, lastName, username, password }: FormData) => {
    const name = firstName + ' ' + lastName; 
    toast.promise(
      registerUser(name, username, password)
      .then(({hasError, message})=>{

        if(hasError){
          throw new Error(message)
        }
        
        const destination = router.query.p?.toString() || '/';
        router.replace(destination)
      }),
      {
        loading: 'Loading...',
        success: `Your account has been created.`,
        error: (err) => `${err.message!} 🤮`,
      },
      {
        style: {
          minWidth: '250px',
        },
        success: {
          duration: 5000,
          icon: '👍🏾',
        },
      }
    );
  }

  return (
    <AuthLoyout title='Register'>
      <Toaster/>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Link display="flex" alignItems="center">
            <Box
              component="img"
              sx={{
                height: 200,
                paddingLeft: 3,
              }}
              alt=""
              src="/lighttheme.png"
            />
          </Link>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onRegister)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  { ...register('firstName', {
                    required: 'This field is required.'
                  })}
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  autoComplete="family-name"
                  { ...register('lastName', {
                    required: 'This field is required.'
                  })}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="username"
                  label="Username"
                  autoComplete="username"
                  { ...register('username', {
                    required: 'This field is required.'
                  })}
                  error={!!errors.username}
                  helperText={errors.username?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  {...register('password', {
                    required: 'This field is required.',
                    minLength: { value: 8, message: 'Password must be at least 8 characters' }
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </Grid>
              <Grid item xs={12}>
            
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: 'black', color: 'white', ":hover": {
                bgcolor: '#383838',
                color: 'white'
              }}}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href={router.query.p ? `/auth/login?p=${router.query.p}`: 'auth/login'} variant="body2" sx={{color: '#383838', textDecoration:'none', ":hover":{
                      color: 'GrayText'
                  }}}>
                    Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </AuthLoyout>
  )
}

export default RegisterPage