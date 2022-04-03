import Form, { Box } from './form/Form';
import { Title } from './titles/Titles';
import { useToast } from '@chakra-ui/react';
import { usePostSigninMutation } from '../services/user/apiAuth';
import { useNavigate } from '@tanstack/react-location';

const Login = () => {
  const toast = useToast();
  const [postSignIn] = usePostSigninMutation();

  const navigate = useNavigate();
  const handleFormSignIn = async (formData: any) => {
    const res = (await postSignIn(formData)) as any;
    if (res && res.error) {
      return toast({
        title: 'Ha sucedido un error',
        status: 'error',
        position: 'top-right',
      });
    }

    const { token } = res.data;
    localStorage.setItem('token', token);
    navigate({ to: '/users', replace: true });
  };

  return (
        <Box
            styles={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100%',
              marginTop: '10rem',
            }}
        >
            <Box>
                <Title styles={{ fontSize: '32px', color: '#008080' }}>
                    Inicio de sesión
                </Title>
            </Box>
            <Box>
                <Form
                    styles={{ width: '100%' }}
                    onSubmit={handleFormSignIn}
                    name="login"
                    inputs={[
                      {
                        name: 'email',
                        label: 'Email',
                        validationRegex: /^\S+@\S+\.\S+$/,
                        required: true,
                        type: 'email',
                        stylesInput: {
                          width: '100%',
                          marginTop: '2rem',
                        },
                      },
                      {
                        name: 'password',
                        label: 'Contraseña',
                        validationRegex: /^\w{6}/,
                        type: 'password',
                        required: true,
                        stylesInput: {
                          width: '100%',
                          marginTop: '2rem',
                        },
                      },
                    ]}
                    buttons={[
                      {
                        stylesButton: {
                          fontWeight: 700,
                          textAlign: 'center',
                          marginTop: 40,
                        },
                        children: 'Guardar',
                        type: 'submit',
                        buttonType: 'primary',
                      },
                    ]}
                />
            </Box>
        </Box>
  );
};

export default Login;
