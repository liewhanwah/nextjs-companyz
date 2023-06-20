import MasterLayout from "../components/layout/master";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { fetchListing, getList } from "../state/login/userListState";
import { useRouter } from "next/router";
import { NextPage } from "next";

const Home: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const userData = useAppSelector(getList);
  useEffect(() => {
    if (!router.isReady) return;
    dispatch(fetchListing());
  }, [dispatch]);

  return (
    <MasterLayout title="Home | CompanyZ Customer Portal">
      <div className="row">
        <div className="col">
          <div className={`d-flex justify-content-center title-default`}>
            <h1>Home</h1>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className={`d-flex justify-content-center`}>
            <br />
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Email</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Avatar</th>
                </tr>
              </thead>
              <tbody>
                {userData.length > 0 ? (
                  userData.map((v) => (
                    <tr key={v.id}>
                      <td>{v.id}</td>
                      <td>{v.email}</td>
                      <td>{v.first_name}</td>
                      <td>{v.last_name}</td>
                      <td>
                        <>
                          <img
                            src={v.avatar}
                            alt="..."
                            className="img-thumbnail"
                            width={50}
                          />
                        </>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5}>No Data</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div></div>
    </MasterLayout>
  );
};

export default Home;
