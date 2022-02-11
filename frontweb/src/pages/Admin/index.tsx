import { Route, Switch } from "react-router-dom";
import Navbar from "./NavBar";
import './styles.css';
import Users from "./User";

const Admin = () => {
  return (
    <div className="admin-container">
      <Navbar />
      <div className="admin-content">
        <Switch>
          <Route path="/admin/products">
            <h1>Produtos CRUD</h1>
          </Route>
          <Route path="/admin/categories">
            <h1>Categorias CRUD</h1>
          </Route>
          <Route path="/admin/users">
            <Users />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Admin;
