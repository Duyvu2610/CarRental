import config from "../config";
import DefaultLayout from "../layouts/DefaultLayout";
import SimpleHeaderLayout from "../layouts/SimpleHeaderLayout";
import AboutPage from "../pages/AboutPage/AboutPage";
import AccountPage from "../pages/AccountPage/AccountPage";
import CarPage from "../pages/Car/CarPage";
import CarRegisterPage from "../pages/CarRegisterPage/CarRegisterPage";
import SelfDriver from "../pages/CarRegisterPage/Selfdrive";
import CartPage from "../pages/Cart/CartPage";
import Contact from "../pages/Contact";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import Home from "../pages/Home/Home";
import LoginPage from "../pages/LoginPage";
import PageNotFound from "../pages/PageNotFound";
import Product from "../pages/Product/Product";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import SignUpPage from "../pages/SignUpPage";
import ThankYou from "../pages/ThankYou/ThankYou";

const publicRoutes = [
  { path: config.routes.home, component: Home, layout: DefaultLayout },
  { path: config.routes.car, component: CarPage, layout: DefaultLayout },
  { path: config.routes.about, component: AboutPage, layout: DefaultLayout },
  { path: config.routes.account, component: AccountPage, layout: DefaultLayout },
  { path: config.routes.login, component: LoginPage, layout: DefaultLayout },
  { path: config.routes.carregistermodel, component: CarRegisterPage, layout: DefaultLayout },
  { path: config.routes.selfdrive, component: SelfDriver, layout: DefaultLayout },
  {
    path: config.routes.signup,
    component: SignUpPage,
    layout: SimpleHeaderLayout,
  },
  { path: config.routes.product, component: Product, layout: DefaultLayout },
  { path: config.routes.contact, component: Contact, layout: DefaultLayout },
  { path: config.routes.cart, component: CartPage, layout: DefaultLayout },
  { path: config.routes.thank, component: ThankYou, layout: DefaultLayout },
  {
    path: config.routes["forgot-pass"],
    component: ForgotPassword,
    layout: DefaultLayout,
  },
  {
    path: config.routes["reset-pass"],
    component: ResetPassword,
    layout: DefaultLayout,
  },
  {
    path: config.routes["produc-detail"],
    component: ProductDetail,
    layout: DefaultLayout,
  },
  { path: config.routes["page-not-found"], component: PageNotFound },
];

const privateRoutes: any[] = [];

export { publicRoutes, privateRoutes };
