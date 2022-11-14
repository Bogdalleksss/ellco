import * as React from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';

import MainLayout from '@/layouts/MainLayout';
import DashboardPage from '@/pages/Dashboard/DashboardPage';
import NotFound404 from '@/pages/NotFound404';
import UsersPage from '@/pages/Users/UsersPage';
import UsersEditPage from '@/pages/Users/UsersEditPage';
import NewsPage from '@/pages/News/NewsPage';
import NewsEditPage from '@/pages/News/NewsEditPage';
import PromotionsPage from '@/pages/Promotions/PromotionsPage';
import PromotionsEditPage from '@/pages/Promotions/PromotionsEditPage';
import SettlementsPage from '@/pages/Settlements/SettlementsPage';
import SettlementsEditPage from '@/pages/Settlements/SettlementsEditPage';
import DistrictsPage from '@/pages/Districts/DistrictsPage';
import DistrictsEditPage from '@/pages/Districts/DistrictsEditPage';
import SettingInformationPage from '@/pages/Settings/Information/SettingInformationPage';
import SettingOrderPage from '@/pages/Settings/Order/SettingOrderPage';
import TariffsPage from '@/pages/Tariffs/TariffsPage';
import TariffsEditPage from '@/pages/Tariffs/TariffsEditPage';
import OrdersPage from '@/pages/Orders/OrdersPage';
import SettingCCTVPage from '@/pages/Settings/CCTV/SettingCCTVPage';

const MainRouter: React.FC = (): JSX.Element => {
  return (
    <MainLayout>
      <Switch>
         {/* <Route exact path="/"> */}
         {/* <DashboardPage /> */}
         {/* </Route> */}

        <Route exact path="/">
           <UsersPage />
        </Route>
        <Route exact path="/users/create">
          <UsersEditPage type="CREATE" />
        </Route>
        <Route exact path="/users/:id/edit">
          <UsersEditPage type="EDIT" />
        </Route>

        <Route exact path="/news">
          <NewsPage />
        </Route>
        <Route exact path="/news/create">
          <NewsEditPage type="CREATE" />
        </Route>
        <Route exact path="/news/:id/edit">
          <NewsEditPage type="EDIT" />
        </Route>

        <Route exact path="/orders">
          <OrdersPage />
        </Route>
        <Route exact path="/orders/:id">
          <NewsEditPage type="CREATE" />
        </Route>

        <Route exact path="/promotions">
          <PromotionsPage />
        </Route>
        <Route exact path="/promotions/create">
          <PromotionsEditPage type="CREATE" />
        </Route>
        <Route exact path="/promotions/:id/edit">
          <PromotionsEditPage type="EDIT" />
        </Route>

        <Route exact path="/districts">
          <DistrictsPage />
        </Route>
        <Route exact path="/districts/create">
          <DistrictsEditPage type="CREATE" />
        </Route>
        <Route exact path="/districts/:id/edit">
          <DistrictsEditPage type="EDIT" />
        </Route>

        <Route exact path="/settlements">
          <SettlementsPage />
        </Route>
        <Route exact path="/settlements/create">
          <SettlementsEditPage type="CREATE" />
        </Route>
        <Route exact path="/settlements/:id/edit">
          <SettlementsEditPage type="EDIT" />
        </Route>

        <Route exact path="/tariffs">
          <TariffsPage />
        </Route>
        <Route exact path="/tariffs/create">
          <TariffsEditPage type="CREATE" />
        </Route>
        <Route exact path="/tariffs/:id/edit">
          <TariffsEditPage type="EDIT" />
        </Route>

        <Route exact path="/settings/information">
          <SettingInformationPage />
        </Route>
        <Route exact path="/settings/order">
          <SettingOrderPage />
        </Route>
        <Route exact path="/settings/cctv">
          <SettingCCTVPage />
        </Route>

        <Route path="*">
          <NotFound404 />
        </Route>
      </Switch>
    </MainLayout>
  );
};

export default MainRouter;
