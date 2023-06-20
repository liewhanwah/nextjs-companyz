import MasterLayout from "../../components/layout/master";
import styles from "../../styles/Home.module.css";
import { NextPage } from "next";
import { getToken } from "../../services/auth/googleAPI";
import { useRouter } from "next/router";
import { useRouter as useRouterNav } from "next/navigation";
import { setUser } from "../../state/login/userState";
import { useAppDispatch } from "../../state/hooks";
import { useEffect } from "react";

const GoogleAuth: NextPage = () => {
  const router = useRouter();
  const { push } = useRouterNav();
  const dispatch = useAppDispatch();
  useEffect(() => {
    (async () => {
      if (!router.isReady) return;
      if (router?.query?.code) {
        const userData = await getToken(router.query.code as string);
        if (userData && userData?.name) {
          dispatch(setUser(userData));
          push("/home");
        } else {
          push("/");
        }
      } else {
        push("/");
      }
    })();
  }, [push, dispatch, getToken]);
  return (
    <MasterLayout title="Google Auth | CompanyZ Customer Portal">
      <div className="row">
        <div className="col">
          <div
            className={`${styles.homeSection} d-flex justify-content-center`}
          >
            <h1>Loading Profile ...</h1>
          </div>
        </div>
      </div>

      <div></div>
    </MasterLayout>
  );
};

export default GoogleAuth;
