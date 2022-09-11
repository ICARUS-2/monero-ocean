import {useEffect} from 'react';
import { BrowserRouter as RouterOutlet, Route, Routes as RouteDictionary, Navigate } from 'react-router-dom';
import './App.css';
import NavbarComponent from './components/shared/navbar/navbar';
import LoginPage from './components/login-page/login-page';
import MainDashboard from './components/dashboard/main-dashboard/main-dashboard';
import SiteRoutes from './lib/site-routes';
import ErrorPage from './components/error/error-page';
import Settings from './components/settings/settings';
import SettingsHelper from './lib/settings-helper';
import Coins from './components/coins/coins';
import TransactionReport from './components/transaction-report/transaction-report';
import UserBlockPayments from './components/user-block-payments/user-block-payments';
import UpdateThreshold from './components/update-threshold/update-threshold';
import ExchangeRates from './components/exchange-rates/exchange-rates';
import SingleChart from './components/charts/single-chart/single-chart';
import DependencyContainer from './lib/dependencies';
import TestMoneroOceanClient from './lib/monero-ocean-client/test-monero-ocean-client';
import LocalStorageHelper from './lib/local-storage-helper';
import SignInHelper from './lib/sign-in-helper';
import HashrateConverter from './lib/hashrate-converter';
import AllWorkersChart from './components/charts/all-workers-chart/all-workers-chart';

function App() {

  useEffect( () =>
  { 
    SettingsHelper.loadDefaultSettingsIntoStorage();
  }, [] )

  return (
    <div className='app'>

      <RouterOutlet>
        <NavbarComponent />
        {DependencyContainer.moneroOceanClient instanceof TestMoneroOceanClient && <div className='alert alert-warning' style={{width : "450px"}}>[!] DEV MODE ACTIVE - TEST DATA DISPLAYED [!]</div>}

        <RouteDictionary>
          {/*Guest-accessible routes*/}
          <Route path={SiteRoutes.getBaseRoute()} element={<Navigate to={SiteRoutes.getLoginRoute()}/>}></Route>
          <Route path={SiteRoutes.getLoginRoute()} element={<LoginPage />}></Route>
          <Route path={SiteRoutes.getDashboardRoute()} element={<MainDashboard />}></Route>
          <Route path={SiteRoutes.getExchangeRatesRoute()} element={<ExchangeRates />}></Route>
          <Route path={SiteRoutes.getSettingsRoute()} element={<Settings />}></Route>
          <Route path={SiteRoutes.getCoinsRoute()} element={<Coins />}></Route> 
          <Route path={SiteRoutes.getConnectedMinersChartRoute()} element={<SingleChart headerText='Connected Miners: ' pullChartData={DependencyContainer.moneroOceanClient.getConnectedMinersChart.bind(DependencyContainer.moneroOceanClient)}/>}></Route>

          {/*Authentication required*/}
          <Route path={SiteRoutes.getUserTransactionReportRoute()} element={<TransactionReport />}></Route>
          <Route path={SiteRoutes.getUserBlockPaymentsRoute()} element={<UserBlockPayments />}></Route>
          <Route path={SiteRoutes.getUpdateThresholdRoute()} element={<UpdateThreshold />}></Route>
          <Route path={SiteRoutes.getUserGlobalHashrateChartRoute()} element={<SingleChart headerText='Pay Hashrate: ' pullChartData={ 
            () =>
            {
              if (!SignInHelper.isSignedIn)
              {
                return Promise.resolve(null);
              }
              
              //@ts-ignore
              return DependencyContainer.moneroOceanClient.getUserGlobalHashrateChart(LocalStorageHelper.getMoneroAddress());
            }
          } statFormat={HashrateConverter.parseHashrate}/>}></Route>
          <Route path={SiteRoutes.getAllWorkersChartRoute()} element={<AllWorkersChart />}></Route>

          {/*404*/}
          <Route path='*' element={<ErrorPage />}></Route>
          <Route path={SiteRoutes.getErrorRoute()} element={<ErrorPage />}></Route>
        </RouteDictionary>
      </RouterOutlet>
    </div>
  );
}

export default App;
