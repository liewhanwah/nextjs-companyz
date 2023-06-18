import styles from "../../styles/Home.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRouter as useRouterNav } from "next/navigation";

function NavbarCpn() {
  // const { data: session } = useSession();
  const router = useRouter();
  const { push } = useRouterNav();
  const { data, status } = useSession();
  var session = data;
  if (status == "unauthenticated" && router.pathname !== "/") {
    push("/");
  } else if (status == "authenticated" && router.pathname == "/") {
    push("/home");
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
            {session && session.user ? (
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
            {session && session.user && session.user.name ? (
              session.user.name + " | "
            ) : (
              <></>
            )}
          </div>
          <div className="navbar-nav">
            {session && session.user ? (
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
                onClick={() => signIn()}
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
