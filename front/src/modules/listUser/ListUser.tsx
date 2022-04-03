import { useMemo, useRef, useState } from 'react';
import { useNavigate } from '@tanstack/react-location';
import { IconButton } from '../../components/icon/Icon';
import Table from '../../components/table/Table';
import { Title } from '../../components/titles/Titles';
import { useGetUserListQuery } from '../../services/user/apiUsers';
import { UserDetail } from '../../services/user/userTypes';
import Layout from '../../wrapper/Layout';
import DetailUsers from '../detailUsers/DetailUsers';
import { HEADERS_DATA } from './DATA_USERS';
import FormEditUser from '../Forms/editUser/FormEditUser';

const TEXT_TABLE_STYLE = { fontSize: '14px' };

function ListUser() {
  const [showForm, setShowForm] = useState(false);
  const [currentUser, setCurrentIndexUser] = useState<null | number>(null);
  const previousCurrentUser = useRef(currentUser);
  const navigate = useNavigate();
  const { data: fetchData, isLoading } = useGetUserListQuery();

  const { data } = fetchData || {};

  const rows = useMemo(
    () => data?.data
            && data.data.map((user: UserDetail, index) => [
              {
                component: (
                  <Title styles={{ color: '#3FBDBC', fontSize: '16px' }}>
                    {user.legal_name}
                  </Title>
                ),
              },
              {
                component: (
                  <Title styles={TEXT_TABLE_STYLE}>{user.tax_id}</Title>
                ),
              },
              {
                component: (
                  <Title
                    styles={{ color: '#3FBDBC', ...TEXT_TABLE_STYLE }}
                  >
                    {user.email}
                  </Title>
                ),
              },
              {
                component: (
                  <Title styles={TEXT_TABLE_STYLE}>
                    {user.address.municipality}
                    ,
                    {user.address.state}
                    ,
                    {' '}
                    {user.address.zip}
                  </Title>
                ),
              },
              {
                component: (
                  <IconButton
                    iconProps={{
                      iconCode: 'feather-chevron-down',
                      size: 20,
                    }}
                    onClick={() => {
                      if (previousCurrentUser.current === index) {
                        setCurrentIndexUser(null);
                        setShowForm(false);
                        previousCurrentUser.current = null;
                        return;
                      }
                      setCurrentIndexUser(index);
                      setShowForm(false);
                      previousCurrentUser.current = index;
                    }}
                  />
                ),
              },
            ]),
    [data?.data],
  );

  const hasData = data?.total_results ?? -1 > 0;

  const extraRow = () => (currentUser !== null
    ? {
      component: showForm ? (
        <FormEditUser
          userDetail={data?.data[currentUser!] as UserDetail}
          onClick={() => setShowForm(!showForm)}
          onClose={() => {
            previousCurrentUser.current = null;
            setCurrentIndexUser(null);
          }}
        />
      ) : (
        <DetailUsers
          userId={data?.data[currentUser!].id}
          onClickEdit={() => setShowForm(!showForm)}
          onClickDeleteExternal={() => navigate({ to: 'users', replace: true })}
        />
      ),
      currentUser,
    }
    : null);

  return (
    <div>
      <Layout>
        {isLoading ? (
          <div>Cargando</div>
        ) : (
          <div>
            {hasData ? (
              <Table
                headers={HEADERS_DATA}
                rows={rows}
                extraRow={extraRow()}
              />
            ) : (
              <>Sin datos</>
            )}
          </div>
        )}
      </Layout>
    </div>
  );
}

export default ListUser;
