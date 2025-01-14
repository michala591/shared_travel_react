import MyAccountLink from "./MyAccountLink";
import MyAccountCar from "./MyAccountCar";
import MyAccountTrips from "./MyAccountTrips";
import MyAccountSetting from "./MyAccountSetting";

function MyAccountPage() {


  return (
    <div className="container mt-5">
      <br></br>
      <br></br>
      <div className="row">
        <MyAccountLink />
        <div className="col-md-9">
          <MyAccountCar />
          <MyAccountTrips />
          <MyAccountSetting />
        </div>
      </div>
    </div>
  );
}

export default MyAccountPage;
