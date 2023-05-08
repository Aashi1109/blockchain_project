import React, { useState, useEffect } from "react";
import Web3 from "web3";
import SupplyChainABI from "./artifacts/SupplyChain.json";
import { useHistory } from "react-router-dom";

function AssignRoles() {
  const history = useHistory();
  useEffect(() => {
    loadWeb3();
    loadBlockchaindata();
  }, []);
  const [currentaccount, setCurrentaccount] = useState("");
  const [loader, setloader] = useState(true);
  const [SupplyChain, setSupplyChain] = useState();
  const [RMSname, setRMSname] = useState();
  const [MANname, setMANname] = useState();
  const [DISname, setDISname] = useState();
  const [RETname, setRETname] = useState();
  const [RMSplace, setRMSplace] = useState();
  const [MANplace, setMANplace] = useState();
  const [DISplace, setDISplace] = useState();
  const [RETplace, setRETplace] = useState();
  const [RMSaddress, setRMSaddress] = useState();
  const [MANaddress, setMANaddress] = useState();
  const [DISaddress, setDISaddress] = useState();
  const [RETaddress, setRETaddress] = useState();
  const [RMS, setRMS] = useState({});
  const [MAN, setMAN] = useState({});
  const [DIS, setDIS] = useState({});
  const [RET, setRET] = useState({});

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
      const rmsCtr = await supplychain.methods.rmsCtr().call();
      const rms = {};
      for (i = 0; i < rmsCtr; i++) {
        rms[i] = await supplychain.methods.RMS(i + 1).call();
      }
      setRMS(rms);
      const manCtr = await supplychain.methods.manCtr().call();
      const man = {};
      for (i = 0; i < manCtr; i++) {
        man[i] = await supplychain.methods.MAN(i + 1).call();
      }
      setMAN(man);
      const disCtr = await supplychain.methods.disCtr().call();
      const dis = {};
      for (i = 0; i < disCtr; i++) {
        dis[i] = await supplychain.methods.DIS(i + 1).call();
      }
      setDIS(dis);
      const retCtr = await supplychain.methods.retCtr().call();
      const ret = {};
      for (i = 0; i < retCtr; i++) {
        ret[i] = await supplychain.methods.RET(i + 1).call();
      }
      setRET(ret);
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
  const handlerChangeAddressRMS = (event) => {
    setRMSaddress(event.target.value);
  };
  const handlerChangePlaceRMS = (event) => {
    setRMSplace(event.target.value);
  };
  const handlerChangeNameRMS = (event) => {
    setRMSname(event.target.value);
  };
  const handlerChangeAddressMAN = (event) => {
    setMANaddress(event.target.value);
  };
  const handlerChangePlaceMAN = (event) => {
    setMANplace(event.target.value);
  };
  const handlerChangeNameMAN = (event) => {
    setMANname(event.target.value);
  };
  const handlerChangeAddressDIS = (event) => {
    setDISaddress(event.target.value);
  };
  const handlerChangePlaceDIS = (event) => {
    setDISplace(event.target.value);
  };
  const handlerChangeNameDIS = (event) => {
    setDISname(event.target.value);
  };
  const handlerChangeAddressRET = (event) => {
    setRETaddress(event.target.value);
  };
  const handlerChangePlaceRET = (event) => {
    setRETplace(event.target.value);
  };
  const handlerChangeNameRET = (event) => {
    setRETname(event.target.value);
  };
  const handlerSubmitRMS = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
        .addRMS(RMSaddress, RMSname, RMSplace)
        .send({ from: currentaccount });
      if (reciept) {
        loadBlockchaindata();
      }
    } catch (err) {
      alert("An error occured!!!");
    }
  };
  const handlerSubmitMAN = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
        .addManufacturer(MANaddress, MANname, MANplace)
        .send({ from: currentaccount });
      if (reciept) {
        loadBlockchaindata();
      }
    } catch (err) {
      alert("An error occured!!!");
    }
  };
  const handlerSubmitDIS = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
        .addDistributor(DISaddress, DISname, DISplace)
        .send({ from: currentaccount });
      if (reciept) {
        loadBlockchaindata();
      }
    } catch (err) {
      alert("An error occured!!!");
    }
  };
  const handlerSubmitRET = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
        .addRetailer(RETaddress, RETname, RETplace)
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
      <div className="d-flex justify-content-between  mb-3">
        <span>
          <b>Current Account Address:</b> {currentaccount}
        </span>
        <span onClick={redirect_to_home} className="btn btn-danger btn-sm">
          {" "}
          HOME
        </span>
      </div>
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">Raw Material Suppliers:</h5>
          <form onSubmit={handlerSubmitRMS}>
            <div className="mb-3">
              <label htmlFor="input-raw-eth-address" className="form-label">
                Address
              </label>
              <input
                className="form-control"
                type="text"
                onChange={handlerChangeAddressRMS}
                placeholder="Ethereum Address"
                id="input-raw-eth-address"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="input-raw-supplier" className="form-label">
                Supplier Name
              </label>
              <input
                className="form-control"
                type="text"
                onChange={handlerChangeNameRMS}
                placeholder="Raw Material Supplier Name"
                id="input-raw-supplier"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="input-raw-location" className="form-label">
                Location
              </label>{" "}
              <input
                className="form-control"
                type="text"
                id="input-raw-location"
                onChange={handlerChangePlaceRMS}
                placeholder="Based In"
                required
              />
            </div>

            <button
              className="btn btn-success btn-sm"
              onSubmit={handlerSubmitRMS}
            >
              Register
            </button>
          </form>
          {Object.keys(RMS).length === 0 ? (
            <div className="text-center">No data found</div>
          ) : (
            <table className="table mt-2">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Place</th>
                  <th scope="col">Ethereum Address</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(RMS).map(function (key) {
                  return (
                    <tr key={key}>
                      <td>{RMS[key].id}</td>
                      <td>{RMS[key].name}</td>
                      <td>{RMS[key].place}</td>
                      <td>{RMS[key].addr}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {/* for manufacturers */}
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">Manufacturers</h5>
          <form onSubmit={handlerSubmitMAN}>
            <div className="mb-3">
              <label htmlFor="input-man-eth-address" className="form-label">
                Address
              </label>
              <input
                className="form-control"
                type="text"
                onChange={handlerChangeAddressMAN}
                placeholder="Ethereum Address"
                id="input-man-eth-address"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="input-man-supplier" className="form-label">
                Manufacturer
              </label>
              <input
                className="form-control"
                type="text"
                onChange={handlerChangeNameMAN}
                placeholder="Manufacturer Name"
                id="input-man-supplier"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="input-man-location" className="form-label">
                Location
              </label>
              <input
                className="form-control"
                type="text"
                id="input-man-location"
                onChange={handlerChangePlaceMAN}
                placeholder="Based In"
                required
              />
            </div>

            <button
              className="btn btn-success btn-sm"
              onSubmit={handlerSubmitMAN}
            >
              Register
            </button>
          </form>
          {Object.keys(MAN).length === 0 ? (
            <div className="text-center">No data found</div>
          ) : (
            <table className="table mt-2">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Place</th>
                  <th scope="col">Ethereum Address</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(MAN).map(function (key) {
                  return (
                    <tr key={key}>
                      <td>{MAN[key].id}</td>
                      <td>{MAN[key].name}</td>
                      <td>{MAN[key].place}</td>
                      <td>{MAN[key].addr}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}{" "}
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">Distributors</h5>
          <form onSubmit={handlerSubmitDIS}>
            <div className="mb-3">
              <label htmlFor="input-DIS-eth-address" className="form-label">
                Address
              </label>
              <input
                className="form-control"
                type="text"
                onChange={handlerChangeAddressDIS}
                placeholder="Ethereum Address"
                id="input-DIS-eth-address"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="input-DIS-supplier" className="form-label">
                Distrubutor
              </label>{" "}
              <input
                className="form-control"
                type="text"
                onChange={handlerChangeNameDIS}
                placeholder="Distributor Name"
                id="input-DIS-supplier"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="input-DIS-location" className="form-label">
                Location
              </label>
              <input
                className="form-control"
                type="text"
                id="input-DIS-location"
                onChange={handlerChangePlaceDIS}
                placeholder="Based In"
                required
              />
            </div>

            <button
              className="btn btn-success btn-sm"
              onSubmit={handlerSubmitDIS}
            >
              Register
            </button>
          </form>

          {Object.keys(DIS).length === 0 ? (
            <div className="text-center">No data found</div>
          ) : (
            <table className="table mt-2">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Place</th>
                  <th scope="col">Ethereum Address</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(DIS).map(function (key) {
                  return (
                    <tr key={key}>
                      <td>{DIS[key].id}</td>
                      <td>{DIS[key].name}</td>
                      <td>{DIS[key].place}</td>
                      <td>{DIS[key].addr}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">Retailers</h5>
          <form onSubmit={handlerSubmitRET}>
            <div className="mb-3">
              <label htmlFor="input-RET-eth-address" className="form-label">
                Address
              </label>{" "}
              <input
                className="form-control"
                type="text"
                onChange={handlerChangeAddressRET}
                placeholder="Ethereum Address"
                id="input-RET-eth-address"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="input-RET-supplier" className="form-label">
                Retailer
              </label>
            </div>
            <input
              className="form-control"
              type="text"
              onChange={handlerChangeNameRET}
              placeholder="Retailer Name"
              id="input-RET-supplier"
              required
            />
            <div className="mb-3">
              <label htmlFor="input-RET-location" className="form-label">
                Location
              </label>{" "}
              <input
                className="form-control"
                type="text"
                id="input-RET-location"
                onChange={handlerChangePlaceRET}
                placeholder="Based In"
                required
              />
            </div>

            <button
              className="btn btn-success btn-sm"
              onSubmit={handlerSubmitRET}
            >
              Register
            </button>
          </form>
          {Object.keys(RET).length === 0 ? (
            <div className="text-center">No data found</div>
          ) : (
            <table className="table mt-2">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Place</th>
                  <th scope="col">Ethereum Address</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(RET).map(function (key) {
                  return (
                    <tr key={key}>
                      <td>{RET[key].id}</td>
                      <td>{RET[key].name}</td>
                      <td>{RET[key].place}</td>
                      <td>{RET[key].addr}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default AssignRoles;
