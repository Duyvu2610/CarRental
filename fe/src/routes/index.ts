import config from "../config";
import DefaultLayout from "../layouts/DefaultLayout";
import SimpleHeaderLayout from "../layouts/SimpleHeaderLayout";
import AboutPage from "../pages/AboutPage/AboutPage";
import AccountPage from "../pages/AccountPage/AccountPage";
import AdminPage from "../pages/Admin/AdminPage";
import CarPage from "../pages/Car/CarPage";
import CarRegisterPage from "../pages/CarRegisterPage/CarRegisterPage";
import SelfDriver from "../pages/CarRegisterPage/Selfdrive";
import Contact from "../pages/Contact";
import Home from "../pages/Home/Home";
import LoginPage from "../pages/LoginPage";
import PageNotFound from "../pages/PageNotFound";
import Product from "../pages/Product/Product";
import SignUpPage from "../pages/SignUpPage";

const publicRoutes = [
  { path: config.routes.home, component: Home, layout: DefaultLayout },
  { path: config.routes.car, component: CarPage, layout: DefaultLayout },
  { path: config.routes.about, component: AboutPage, layout: DefaultLayout },
  { path: config.routes.account, component: AccountPage, layout: DefaultLayout },
  { path: config.routes.login, component: LoginPage, layout: DefaultLayout },
  { path: config.routes.carregistermodel, component: CarRegisterPage, layout: DefaultLayout },
  { path: config.routes.selfdrive, component: SelfDriver, layout: DefaultLayout },
  { path: config.routes.selfdrive, component: SelfDriver, layout: DefaultLayout },
  { path: config.routes.admin, component: AdminPage, layout: DefaultLayout },
  {
    path: config.routes.signup,
    component: SignUpPage,
    layout: SimpleHeaderLayout,
  },
  { path: config.routes.product, component: Product, layout: DefaultLayout },
  { path: config.routes.contact, component: Contact, layout: DefaultLayout },
  {
    path: config.routes["forgot-pass"],
    layout: DefaultLayout,
  },
  { path: config.routes["page-not-found"], component: PageNotFound },
];

const privateRoutes: any[] = [];

export { publicRoutes, privateRoutes };
