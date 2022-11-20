import * as React from 'react';
import { useHistory } from 'react-router-dom';
import PageLayout from '@/layouts/PageLayout';
import { useEffect } from 'react';

const DashboardPage = () => {
  const history = useHistory();

  useEffect(() => {
    history.push('/');
  }, []);
  return (
    <PageLayout
      title="Дашборд"
    >
    </PageLayout>
    // <Redirect to='/users'/>
  );
};

export default DashboardPage;
