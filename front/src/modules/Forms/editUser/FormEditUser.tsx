import React from 'react';
import Form, { Box } from '../../../components/form/Form';
import { useUpdateUserMutation } from '../../../services/user/apiUsers';
import { UserDetail } from '../../../services/user/userTypes';
import { pick, mergeDeepLeft } from 'ramda';

import { useToast } from '@chakra-ui/react';

const FormEditUser = ({
  userDetail,
  onClick,
  onClose,
}: {
  userDetail: UserDetail;
  onClick: () => void;
  onClose: () => void;
}) => {
  const [updateUser] = useUpdateUserMutation();
  const toast = useToast();
  const handleFormToUpdate = async (
    formData: Record<string, string | number>,
  ) => {
    const cleanForm = Object.fromEntries(
      Object.entries(formData).filter(
        (inputName) => inputName[1].toString().length > 0,
      ),
    );
    const address = pick(
      [
        'exterior',
        'country',
        'interior',
        'municipality',
        'zip',
        'street',
        'state',
      ],
      cleanForm,
    );
    const userInformation = pick(
      ['email', 'legal_name', 'tax_id', 'tax_system'],
      cleanForm,
    );
    const updateUserData = mergeDeepLeft({ address }, userInformation);

    const res = (await updateUser({
      userId: userDetail.id,
      updateUserData,
    })) as any;

    if (res && res.error) {
      return toast({
        title: 'Ha sucedido un error d' + res.error.data.msg.message,
        status: 'error',
        position: 'top-right',
      });
    }
    toast({
      title: 'Cliente actualizado',
      status: 'success',
      position: 'top-right',
    });
    onClick();
    onClose();
  };

  return (
        <Box>
            <Box
                styles={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
            >
                <h1>Editar Usuario</h1>
            </Box>
            <Box>
                <Form
                    name="editUser"
                    onSubmit={handleFormToUpdate}
                    styles={{
                      width: '100%',
                      display: 'inline-grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gridTemplateRows: 'repeat(3, 1fr)',
                      margin: '1rem 0 2rem 0',
                      gap: '3rem',
                      justifyItems: 'center',
                      alignItems: 'center',
                    }}
                    stylesButtonContainer={{
                      margin: '2rem 0',
                      display: 'flex',
                      justifyContent: 'space-around',
                      width: '100%',
                    }}
                    inputs={[
                      {
                        name: 'legal_name',
                        label: 'Nombre de la empresa',
                        required: true,
                        value: userDetail.legal_name,
                        stylesInput: {
                          width: '70%',
                        },
                      },
                      {
                        name: 'email',
                        label: 'Email',
                        validationRegex: /^\S+@\S+\.\S+$/,
                        required: true,
                        type: 'email',
                        value: userDetail.email,
                        stylesInput: {
                          width: '70%',
                        },
                      },
                      {
                        name: 'tax_id',
                        label: 'RFC',
                        required: true,
                        validationRegex: /[\w\W]{10,15}/g,
                        value: userDetail.tax_id,
                        stylesInput: {
                          width: '70%',
                        },
                      },
                      {
                        name: 'tax_system',
                        label: 'Clave del régimen fiscal',
                        validationRegex: /^[\w+]{3}$/,
                        required: true,
                        value: userDetail.tax_system,
                        stylesInput: {
                          width: '70%',
                        },
                      },
                      {
                        name: 'street',
                        label: 'Calle',
                        value: userDetail.address.street,
                        stylesInput: {
                          width: '70%',
                        },
                      },
                      {
                        name: 'interior',
                        label: 'No Int',
                        validationRegex: /^[\d]{1,3}$/,
                        value: userDetail.address.interior,
                        stylesInput: {
                          width: '40%',
                        },
                      },
                      {
                        name: 'exterior',
                        label: 'No Ext',
                        validationRegex: /^[\d]{1,3}$/,
                        value: userDetail.address.exterior,
                        stylesInput: {
                          width: '40%',
                        },
                      },
                      {
                        name: 'state',
                        label: 'Estado',
                        value: userDetail.address.state,
                        stylesInput: {
                          width: '70%',
                        },
                      },
                      {
                        name: 'municipality',
                        label: 'Municipio',
                        value: userDetail.address.municipality,
                        stylesInput: {
                          width: '70%',
                        },
                      },

                      {
                        name: 'country',
                        label: 'País',
                        value: userDetail.address.country,
                        stylesInput: {
                          width: '70%',
                        },
                      },
                      {
                        name: 'zip',
                        label: 'Zip',
                        validationRegex: /^[\d]{2,7}$/,
                        value: userDetail.address.zip,
                        required: true,
                        stylesInput: {
                          width: '70%',
                        },
                      },
                    ]}
                    buttons={[
                      {
                        children: 'Salir',
                        buttonType: 'secondary',
                        onClick: onClick,
                      },
                      {
                        children: 'Guardar',
                        buttonType: 'primary',
                        type: 'submit',
                      },
                    ]}
                />
            </Box>
        </Box>
  );
};

export default FormEditUser;
