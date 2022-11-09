import * as React from 'react';
import { Redirect } from 'react-router-dom';
import PageLayout from '@/layouts/PageLayout';

const DashboardPage = () => {
  return (
    // <PageLayout
    //   title="Дашборд"
    // >
    // </PageLayout>
    <Redirect to='/users'/>
  );
};

export default DashboardPage;
