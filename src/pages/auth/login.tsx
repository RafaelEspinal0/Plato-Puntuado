
import { AuthLoyout } from '@/components/layouts/AuthLayout';
import { AuthContext } from '@/context';
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, Link, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Toaster, toast } from 'react-hot-toast';



type FormData = {
  username: string,
  password: string
}

const LoginPage = () => {

  const router = useRouter();
  const { loginUser } = useContext(AuthContext);
  const {register, handleSubmit, formState: {errors}} = useForm<FormData>();

  const onLogin = async( {username, password}: FormData ) => {
      toast.promise(
        loginUser(username, password)
        .then((data)=>{
          if(!data){
            throw new Error()
          }

          const destination = router.query.p?.toString() || '/';
          router.replace(destination)

        }),
        {
          loading: 'Loading...',
          success: `You have successfully logged in`,
          error: `Uh oh, there was an error in the credentials! 🤮`,
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
    <AuthLoyout title='Login'>
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
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onLogin)} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="username"
              label="Username"
              autoComplete="username"
              autoFocus
              { ...register('username', {
                required: 'This field is required.'
              })}
              error={!!errors.username}
              helperText={errors.username?.message}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register('password', {
                required: 'This field is required.',
                minLength: { value: 8, message: 'Password must be at least 8 characters' }
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: 'black', color: 'white', ":hover": {
                bgcolor: '#383838',
                color: 'white'
              }}}
            >
              Sign In
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link href={router.query.p ? `/auth/register?p=${router.query.p}`: '/auth/register'} variant="body2" sx={{color: '#383838', textDecoration:'none', ":hover":{
                    color: 'GrayText'
                }}}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </AuthLoyout>
  )
}

export default LoginPage