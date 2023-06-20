import styles from "../../styles/Home.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRouter as useRouterNav } from "next/navigation";
import {
  getParam,
  tokenRefresh,
  tokenRevoke,
} from "../../services/auth/google";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { selectUser, reset, setUser } from "../../state/login/userState";
import { reset as resetUserList } from "../../state/login/userListState";
import { useEffect } from "react";
import { purge } from "../../pages/_app";

function NavbarCpn() {
  const userProfile = useAppSelector(selectUser);
  let router = useRouter();
  let { push } = useRouterNav();
  const dispatch = useAppDispatch();
  useEffect(() => {
    (async () => {
      if (!router.isReady) return;
      if (!userProfile?.email && router.pathname !== "/") {
        push("/");
      } else if (userProfile?.email && router.pathname == "/") {
        push("/home");
      }

      if (userProfile?.email) {
        let userData = await tokenRefresh(userProfile);
        if (userData != null) {
          dispatch(setUser(userData));
        }
      }
    })();
  }, [userProfile]);

  async function signOut() {
    if (userProfile?.access_token && userProfile?.access_token !== "") {
      const accessToken = userProfile.access_token; 
      dispatch(reset());
      dispatch(resetUserList());
      await tokenRevoke(accessToken);
      await purge();
      window.location.href = "/";
    }
  }

  return (
    <nav className={`navbar navbar-expand-lg ${styles.navZ}`}>
      <div className="container-fluid">
        <a href="#" className={`navbar-brand ${styles.navZ}`}>
          CompanyZ
        </a>
        <button
          type="button"
          className="navbar-toggler font-white"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-light navbar-toggler-icon">
            <i className="fas fa-bars"></i>
          </span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav">
            {userProfile && userProfile.email ? (
              <>
                <Link className={`nav-item nav-link link-white`} href="/home">
                  Home
                </Link>
                <Link className="nav-item nav-link link-white" href="/profile">
                  Profile
                </Link>
                <div className="nav-item dropdown">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle link-white"
                    data-bs-toggle="dropdown"
                  >
                    Policies
                  </a>
                  <div className="dropdown-menu">
                    <Link
                      className="dropdown-item"
                      href="/policies/my-policies"
                    >
                      My Policies
                    </Link>
                    <Link className="dropdown-item" href="/policies/renewal">
                      Renewal
                    </Link>
                    <Link className="dropdown-item" href="/policies/purchase">
                      Purchase
                    </Link>
                  </div>
                </div>
                <div className="nav-item dropdown">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle link-white"
                    data-bs-toggle="dropdown"
                  >
                    Claims
                  </a>
                  <div className="dropdown-menu">
                    <Link className="dropdown-item" href="/claims/my-claims">
                      My Claims
                    </Link>
                    <Link className="dropdown-item" href="/claims/report-claim">
                      Report Claim
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <span></span>
            )}
          </div>
          <div className="navbar-nav ms-auto">
            {userProfile && userProfile.email ? (
              userProfile.name + " | "
            ) : (
              <></>
            )}
          </div>
          <div className="navbar-nav">
            {userProfile && userProfile.email ? (
              <a
                href="#"
                className="nav-item nav-link link-white"
                onClick={() => signOut()}
              >
                Sign Out
              </a>
            ) : (
              <a
                href="#"
                className="nav-item nav-link link-white"
                onClick={() => push(getParam())}
              >
                Sign In
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavbarCpn;
