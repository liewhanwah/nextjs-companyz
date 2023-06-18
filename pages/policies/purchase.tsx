import type { NextPage } from "next";
import MasterLayout from "../../components/layout/master";

const Purchase: NextPage = () => {
  return (
    <MasterLayout title="Purchase | CompanyZ Customer Portal">
      <div className="row">
        <div className="col">
          <div className={`d-flex justify-content-center title-default`}>
            <h1>Purchase</h1>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className={`d-flex justify-content-center title-default`}>
            <br />
            <h3>Coming Soon....</h3>
          </div>
        </div>
      </div>

      <div></div>
    </MasterLayout>
  );
};

export default Purchase;
