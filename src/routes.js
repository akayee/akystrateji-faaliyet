// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import AssessmentIcon from '@material-ui/icons/Assessment';
import GroupIcon from '@material-ui/icons/Group';
import TuneIcon from '@material-ui/icons/Tune';
import DescriptionIcon from '@material-ui/icons/Description';
// core components/views for Admin layout
import Home from "views/Home/Home.jsx";
import AccountDetail from "views/MyAccounts/AccountDetail.jsx";
import EditAccount from "views/MyAccounts/EditAccount.jsx";
import Register from "views/Register/Register.jsx";
import Numarataj from "views/Numarataj/Numarataj.jsx";
import Birimler from "./views/Birimler/Birimler";
import Hedefler from "./views/Hedefler/Hedefler";
import Raporlar from "./views/Raporlar/Raporlar";
import Ayarlar from "./views/Ayarlar/Ayarlar";


const dashboardRoutes = [
  {
    path: "/home/",
    name: "Anasayfa",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: Home,
    layout: "/admin"
  },
  {
    path:"/register",
    name:"Register",
    icon:Person,
    component: Register,
    invisible:true

  },
  {
    path:"/accountdetail",
    name:"AccountDetail",
    icon:Person,
    component: AccountDetail,
    layout: "/admin",
    invisible:true

  },
  {
    path:"/editaccount",
    name:"EditAccount",
    icon:Person,
    component: EditAccount,
    layout: "/admin",
    invisible:true

  },
  {
    path:"/numarataj",
    name:"Numarataj",
    icon:Person,
    component: Numarataj,
    layout: "/admin",
    invisible:true

  },
  {
    path:"/birimler",
    name:"Faaliyet Raporu",
    icon:GroupIcon,
    component: Birimler,
    layout: "/admin"

  },
  {
    path:"/hedefler",
    name:"Birimim",
    icon:AssessmentIcon,
    component: Hedefler,
    layout: "/admin"

  },
  {
    path:"/raporlar",
    name:"Raporlar",
    icon:DescriptionIcon,
    component: Raporlar,
    layout: "/admin"

  },
  {
    path:"/ayarlar",
    name:"Sistem Ayarları",
    icon:TuneIcon,
    component: Ayarlar,
    layout: "/admin"

  }
  

];

export default dashboardRoutes;
