import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Web3 from "web3";
import SupplyChainABI from "./artifacts/SupplyChain.json";

function Supply() {
  const history = useHistory();
  useEffect(() => {
    loadWeb3();
    loadBlockchaindata();
  }, []);

  const [currentaccount, setCurrentaccount] = useState("");
  const [loader, setloader] = useState(true);
  const [SupplyChain, setSupplyChain] = useState();
  const [MED, setMED] = useState({});
  const [MedStage, setMedStage] = useState();
  const [ID, setID] = useState();

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };
  const loadBlockchaindata = async () => {
    setloader(true);
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    setCurrentaccount(account);
    const networkId = await web3.eth.net.getId();
    const networkData = SupplyChainABI.networks[networkId];
    if (networkData) {
      const supplychain = new web3.eth.Contract(
        SupplyChainABI.abi,
        networkData.address
      );
      setSupplyChain(supplychain);
      var i;
      const medCtr = await supplychain.methods.medicineCtr().call();
      const med = {};
      const medStage = [];
      for (i = 0; i < medCtr; i++) {
        med[i] = await supplychain.methods.MedicineStock(i + 1).call();
        medStage[i] = await supplychain.methods.showStage(i + 1).call();
      }
      setMED(med);
      setMedStage(medStage);
      setloader(false);
    } else {
      window.alert("The smart contract is not deployed to current network");
    }
  };
  if (loader) {
    return (
      <div>
        <h1 className="wait">Loading...</h1>
      </div>
    );
  }
  const redirect_to_home = () => {
    history.push("/");
  };
  const handlerChangeID = (event) => {
    setID(event.target.value);
  };
  const handlerSubmitRMSsupply = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
        .RMSsupply(ID)
        .send({ from: currentaccount });
      if (reciept) {
        loadBlockchaindata();
      }
    } catch (err) {
      alert("An error occured!!!");
    }
  };
  const handlerSubmitManufacturing = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
        .Manufacturing(ID)
        .send({ from: currentaccount });
      if (reciept) {
        loadBlockchaindata();
      }
    } catch (err) {
      alert("An error occured!!!");
    }
  };
  const handlerSubmitDistribute = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
        .Distribute(ID)
        .send({ from: currentaccount });
      if (reciept) {
        loadBlockchaindata();
      }
    } catch (err) {
      alert("An error occured!!!");
    }
  };
  const handlerSubmitRetail = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
        .Retail(ID)
        .send({ from: currentaccount });
      if (reciept) {
        loadBlockchaindata();
      }
    } catch (err) {
      alert("An error occured!!!");
    }
  };
  const handlerSubmitSold = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
        .sold(ID)
        .send({ from: currentaccount });
      if (reciept) {
        loadBlockchaindata();
      }
    } catch (err) {
      alert("An error occured!!!");
    }
  };
  return (
    <div>
      <div className="d-flex justify-content-between">
        <span>
          <b>Current Account Address:</b> {currentaccount}
        </span>
        <span onClick={redirect_to_home} className="btn btn-danger btn-sm">
          {" "}
          HOME
        </span>
      </div>
      <h6>
        <b>Supply Chain Flow:</b>
      </h6>
      <p>
        Medicine Order -&gt; Raw Material Supplier -&gt; Manufacturer -&gt;
        Distributor -&gt; Retailer -&gt; Consumer
      </p>
      <table className="table table-sm table-dark">
        <thead>
          <tr>
            <th scope="col">Medicine ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Current Processing Stage</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(MED).map(function (key) {
            return (
              <tr key={key}>
                <td>{MED[key].id}</td>
                <td>{MED[key].name}</td>
                <td>{MED[key].description}</td>
                <td>{MedStage[key]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {Object.keys(MED).length === 0 && (
        <div className="text-center mb-3 mt--2">No medicines yet.</div>
      )}
      <div className="container">
        <div className="row">
          <div className="col-6">
            <div className="card">
              <div className="card-header">Step 1</div>
              <div className="card-body">
                <h5 className="card-title">Supply Raw Materials</h5>
                <div className="card-text">
                  (Only a registered Raw Material Supplier can perform this
                  step)
                </div>
                <form onSubmit={handlerSubmitRMSsupply}>
                  <input
                    className="form-control my-3"
                    type="text"
                    onChange={handlerChangeID}
                    placeholder="Enter Medicine ID"
                    required
                  />
                  <button
                    className="btn btn-success"
                    onSubmit={handlerSubmitRMSsupply}
                  >
                    Supply
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card">
              <div className="card-header">Step 2</div>
              <div className="card-body">
                <h5 className="card-title">Manufacture</h5>
                <div className="card-text">
                  (Only a registered Manufacturer can perform this step)
                </div>
                <form onSubmit={handlerSubmitManufacturing}>
                  <input
                    className="form-control my-3"
                    type="text"
                    onChange={handlerChangeID}
                    placeholder="Enter Medicine ID"
                    required
                  />
                  <button
                    className="btn btn-success"
                    onSubmit={handlerSubmitManufacturing}
                  >
                    Manufacture
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="row my-2">
          <div className="col-6">
            <div className="card">
              <div className="card-header">Step 3</div>
              <div className="card-body">
                <h5 className="card-title">Distribute</h5>
                <div className="card-text">
                  (Only a registered Distributor can perform this step)
                </div>
                <form onSubmit={handlerSubmitDistribute}>
                  <input
                    className="form-control my-3"
                    type="text"
                    onChange={handlerChangeID}
                    placeholder="Enter Medicine ID"
                    required
                  />
                  <button
                    className="btn btn-success"
                    onSubmit={handlerSubmitDistribute}
                  >
                    Distribute
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card">
              <div className="card-header">Step 4</div>
              <div className="card-body">
                <h5 className="card-title">Retail</h5>
                <div className="card-text">
                  (Only a registered Manufacturer can perform this step)
                </div>
                <form onSubmit={handlerSubmitRetail}>
                  <input
                    className="form-control my-3"
                    type="text"
                    onChange={handlerChangeID}
                    placeholder="Enter Medicine ID"
                    required
                  />
                  <button
                    className="btn btn-success"
                    onSubmit={handlerSubmitRetail}
                  >
                    Retail
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <div className="card">
              <div className="card-header">Step 5</div>
              <div className="card-body">
                <h5 className="card-title">Mark as Sold</h5>
                <div className="card-text">
                  (Only a registered Retailer can perform this step)
                </div>
                <form onSubmit={handlerSubmitSold}>
                  <input
                    className="form-control my-3"
                    type="text"
                    onChange={handlerChangeID}
                    placeholder="Enter Medicine ID"
                    required
                  />
                  <button
                    className="btn btn-success"
                    onSubmit={handlerSubmitSold}
                  >
                    Sold
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Supply;
