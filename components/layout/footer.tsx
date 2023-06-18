function FooterCpn() {
  return (
    <footer className="py-5">
      <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
        <p>&copy; 2023 CompanyZ. All rights reserved.</p>
        <ul className="list-unstyled d-flex">
          <li className="ms-3">
            <a className="link-dark" href="#">
              <svg className="bi" width="24" height="24"></svg>
            </a>
          </li>
          <li className="ms-3">
            <a className="link-dark" href="#">
              <svg className="bi" width="24" height="24"></svg>
            </a>
          </li>
          <li className="ms-3">
            <a className="link-dark" href="#">
              <svg className="bi" width="24" height="24"></svg>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default FooterCpn;
