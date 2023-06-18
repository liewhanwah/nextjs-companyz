import MasterLayout from "../components/layout/master";
import styles from "../styles/Home.module.css";
import { NextPage } from "next";

const Login: NextPage = () => {
  return (
    <MasterLayout title="Login | CompanyZ Customer Portal">
      <div className="row">
        <div className="col">
          <div
            className={`${styles.homeSection} d-flex justify-content-center`}
          >
            <h1>Create a brighter future together.</h1>
          </div>
        </div>
      </div>

      <div></div>
    </MasterLayout>
  );
};

export default Login;
