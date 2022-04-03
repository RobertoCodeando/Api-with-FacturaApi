import React, { FC } from 'react';
import Card from '../../components/cardTable/Card';
import { Box } from '../../components/form/Form';
import { IconButton } from '../../components/icon/Icon';
import { Title } from '../../components/titles/Titles';
import {
  useDeleteUserMutation,
  useGetUserByIdQuery,
} from '../../services/user/apiUsers';
import { useToast } from '@chakra-ui/react';

const DetailUsers: FC<{
  userId?: string;
  onClickEdit: (x: any) => void;
  onClickDeleteExternal: () => void;
}> = ({ userId = '', onClickEdit, onClickDeleteExternal }) => {
  const { data } = useGetUserByIdQuery(userId);
  const [deleteUser] = useDeleteUserMutation();
  const toast = useToast();

  const onClickDelete = async () => {
    const confirmation = window.confirm(
      '¿Estas seguro de eliminar a este usuario?',
    );
    if (confirmation) {
      const res = (await deleteUser(userId)) as any;

      if (res && res.error) {
        toast({
          title:
                        'Ha sucedido un error d' + res.error.data.msg.message,
          status: 'error',
          position: 'top-right',
        });
        return onClickDeleteExternal();
      }
      toast({
        title: 'Usuario eliminado con éxito',
        status: 'success',
        position: 'top-right',
      });
    }
  };

  return (
        <Box
            styles={{
              width: '100%',
              background: '#F5F5F5',
              height: '30%',
              color: '#3696a2',
            }}
        >
            <Box
                styles={{
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  height: '80%',
                  padding: '0 0 0 2.5rem',
                }}
            >
                <Box
                    styles={{
                      color: '#3696a2',
                      flex: 0.5,
                    }}
                >
                    <Box
                        styles={{
                          width: '50%',
                          textAlign: 'left',
                          padding: '0.5rem 0 0 0rem',
                        }}
                    >
                        <Title
                            styles={{
                              color: 'inherit',
                              fontWeight: 700,
                              fontSize: '20px',
                            }}
                        >
                            {data?.data.legal_name}
                        </Title>
                    </Box>
                    <Card title="RFC" text={data?.data.tax_id} />
                    <Card title="Sistema" text={data?.data.tax_system} />
                    <Card title="Email" text={data?.data.email} />
                    <Card
                        title="Fecha de creación"
                        text={
                            data?.data.created_at
                              ? new Intl.DateTimeFormat('es-MX').format(
                                new Date(data?.data.created_at),
                              )
                              : ''
                        }
                    />
                </Box>
                <Box
                    styles={{
                      flex: 0.5,
                      padding: '0.5rem 0 0 3rem',
                    }}
                >
                    <Box
                        styles={{
                          width: '100%',
                          textAlign: 'left',
                        }}
                    >
                        <Title
                            styles={{
                              color: 'inherit',
                              fontWeight: 700,
                              fontSize: '20px',
                            }}
                        >
                            Domicilio
                        </Title>
                    </Box>
                    <Card title={'Estado'} text={data?.data.address.state} />
                    <Card
                        text={data?.data.address.municipality}
                        title="Municipio"
                    />
                    <Card text={data?.data.address.zip} title="Código postal" />
                    <Card text={data?.data.address.country} title="País" />
                </Box>
                <Box
                    style={{
                      color: 'black',
                      padding: '0.5rem 2.5rem 0 0',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-around',
                    }}
                >
                    <IconButton
                        iconProps={{ iconCode: 'feather-edit-2', size: 25 }}
                        onClick={onClickEdit}
                    />
                    <IconButton
                        iconProps={{ iconCode: 'feather-trash-2', size: 25 }}
                        onClick={onClickDelete}
                    />
                </Box>
            </Box>
        </Box>
  );
};

export default DetailUsers;
