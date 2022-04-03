import Form, { Box } from '../../components/form/Form';
import { Title } from '../../components/titles/Titles';
import { useCreateUserMutation } from '../../services/user/apiUsers';
import { useNavigate } from '@tanstack/react-location';
import { useToast } from '@chakra-ui/react';

const FormCreateUsers = () => {
  const navigate = useNavigate();
  const [createUser] = useCreateUserMutation();

  const toast = useToast();

  const handleCreateUser = async (formData: any) => {
    const res = (await createUser({
      tax_system: formData.tax_system ?? 601,
      ...formData,
    })) as any;
    if (res && res.error) {
      return toast({
        title: 'Ha sucedido un error d' + res.error.data.msg.message,
        status: 'error',
        position: 'top-right',
      });
    }
    toast({
      title: 'Cliente creado',
      status: 'success',
      position: 'top-right',
    });
    navigate({ to: '/users', replace: true });
  };
  return (
        <Box
            styles={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              height: '100%',
            }}
        >
            <Box>
                <Title styles={{ fontSize: '32px', color: '#008080' }}>
                    Crear usuario
                </Title>
            </Box>
            <Box
                styles={{
                  flexGrow: 0.4,
                  width: '100%',
                }}
            >
                <Form
                    name="createUser"
                    onSubmit={handleCreateUser}
                    styles={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                    inputs={[
                      {
                        name: 'legal_name',
                        label: 'Nombre de la empresa',
                        required: true,
                        stylesInput: {
                          width: '30%',
                          marginTop: '2rem',
                        },
                      },
                      {
                        name: 'email',
                        label: 'Email',
                        validationRegex: /^\S+@\S+\.\S+$/,
                        required: true,
                        type: 'email',
                        stylesInput: {
                          width: '30%',
                          marginTop: '2rem',
                        },
                      },
                      {
                        name: 'tax_id',
                        label: 'RFC',
                        required: true,
                        validationRegex: /[\w\W]{10,15}/g,
                        stylesInput: {
                          width: '30%',
                          marginTop: '2rem',
                        },
                      },
                      {
                        name: 'tax_system',
                        label: 'Clave del régimen fiscal',
                        validationRegex: /^[\w+]{3}$/,
                        required: true,
                        stylesInput: {
                          width: '30%',
                          marginTop: '2rem',
                        },
                      },
                      {
                        name: 'zip',
                        label: 'Zip',
                        validationRegex: /^[\d]{2,7}$/,
                        required: true,
                        stylesInput: {
                          width: '30%',
                          marginTop: '2rem',
                        },
                      },
                    ]}
                    stylesButtonContainer={{
                      margin: '2rem 0',
                      display: 'flex',
                      justifyContent: 'space-around',
                      width: '100%',
                    }}
                    buttons={[
                      {
                        stylesButton: {
                          display: 'flex',
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

export default FormCreateUsers;
