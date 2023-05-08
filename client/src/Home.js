import React from "react";
import { useHistory } from "react-router-dom";

function Home() {
  const history = useHistory();
  const redirect_to_roles = () => {
    history.push("/roles");
  };
  const redirect_to_addmed = () => {
    history.push("/addmed");
  };
  const redirect_to_supply = () => {
    history.push("/supply");
  };
  const redirect_to_track = () => {
    history.push("/track");
  };
  return (
    <div>
      <div className="text-center">
        <h3>Pharmaceutical Supply Chain Flow </h3>

        <h6>
          (Note: Here <u>Owner</u> is the person who deployed the smart contract
          on the blockchain)
        </h6>
      </div>
      <div className="card">
        <div className="card-header">Step 1</div>
        <div className="card-body">
          <h5 className="card-title">Registeration By Owner</h5>
          <p className="card-text">
            Owner Should Register Raw material suppliers ,Manufacturers,
            Distributors and Retailers
            <br />
            <strong>
              (Note: This is a one time step. Skip to step 2 if already done)
            </strong>
          </p>
          <button
            onClick={redirect_to_roles}
            className="btn btn-outline-primary btn-sm"
          >
            Register
          </button>
        </div>
      </div>

      <div className="card my-3">
        <div className="card-header">Step 2</div>
        <div className="card-body">
          <h5 className="card-title"> Owner should order medicines</h5>
          <button
            onClick={redirect_to_addmed}
            className="btn btn-outline-primary btn-sm"
          >
            Order Medicines
          </button>
        </div>
      </div>
      <div className="card">
        <div className="card-header">Step 3</div>
        <div className="card-body">
          <h5 className="card-title">Control Supply Chain</h5>
          <button
            onClick={redirect_to_supply}
            className="btn btn-outline-primary btn-sm"
          >
            Control Supply Chain
          </button>
        </div>
      </div>
      <div className="text-center d-grid mt-2">
        <h5>
          <b>Track</b> the medicines:
        </h5>
        <button onClick={redirect_to_track} className="btn btn-primary">
          Track Medicines
        </button>
      </div>
    </div>
  );
}

export default Home;
