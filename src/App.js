import Features from "./components/Features";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ItemManagement from "./components/ItemManagement";
import MenuManagement from "./components/MenuManagement";
import MenuItem from "./components/MenuItem";
import Order from "./components/Order";
import { useEffect, useState } from "react";
import { getCookie } from "./api/api";
import LiveOrders from "./components/LiveOrders";
const App = () => {
  const [name, setName] = useState("");
  const [user, setUser] = useState();
  useEffect(() => {
    (async () => {
      const userData = await JSON.parse(getCookie("userData"));
      setUser(userData);
      setName(userData.name);
    })();
  }, []);

  return (
    <Router>
      <Header user={name} />
      <Switch>
        <Route path="/" render={() => <Home user={name} />} exact />
        <Route path="/about" component={About} />
        <Route path="/join" component={() => <Login setusername={setName} />} />
        <Route path="/register" component={Register} />
        <Route path="/itemManagement" component={ItemManagement} />
        <Route path="/menuManagement" component={MenuManagement} />
        <Route path="/menuItem" render={(props) => <MenuItem {...props} />} />
        <Route path="/order" component={Order} />
        <Route path="/liveOrders" component={LiveOrders} />
      </Switch>
      <Footer />
    </Router>
  );
};

const Home = (props) => {
  return (
    <>
      <Hero user={props.user} />
      <Features />
    </>
  );
};
export default App;
