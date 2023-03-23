import Securex from "../artifacts/src/contracts/Securex.sol/Securex.json";
import React, { Component } from "react";
import { Card, Button, Form } from "react-bootstrap";

import Navbar from "./Navbar";

import Web3 from "web3";
import "./App.css";

//Declare IPFS
const ipfsClient = require("ipfs-http-client");
const projectId = "2N2kHSm8zQMUB3TsTIQBvC3l0jy";
const projectSecret = "a3005ef5a99c6b19c16f7f0ea197f178";
const authorization = "Basic " + btoa(projectId + ":" + projectSecret);
// const ipfs = ipfsClient({
//   host: "ipfs.infura.io",
//   port: 5001,
//   protocol: "https",
// }); // leaving out the arguments will default to these values

const ipfs = ipfsClient.create({
  url: "https://ipfs.infura.io:5001/api/v0",
  headers: {
    authorization,
  },
});
class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
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
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();

    this.setState({ account: accounts[0] });
    // Network ID
    const networkId = await web3.eth.net.getId();
    // const networkData = Securex.networks[networkId]
    const networkAdress = "0x83749167D4B8D7cAb243BD45875EA1fA2b2726a2";
    // const networkAdress = "0xE4f76e3aE3C6D77Ad74E5276663F9e79D066CE6B"

    if (networkAdress) {
      const securex = new web3.eth.Contract(Securex.abi, networkAdress);
      console.log("here");
      console.log(securex);

      this.setState({ securex });
      const caseCount = await securex.methods.totalCases().call();
      this.setState({ caseCount });
      console.log("here");
      //console.log(securex);
      console.log(caseCount);
      for (var i = 1; i <= caseCount; i++) {
        const aCase = await securex.methods.cases(i).call();
        this.setState({
          cases: [...this.state.cases, aCase],
        });
      }

      console.log(this.state.cases);

      this.setState({ loading: false });
    } else {
      window.alert("Securex contract not deployed to detected network.");
    }
  }
  getEvidencesOfCase = async () => {
    console.log("Get Evidences Called");
    const caseId = this.state.getCaseId;
    const contextCase = this.state.cases[caseId - 1];

    for (var j = 1; j <= contextCase.totalEvidences; j++) {
      let evd = await this.state.securex.methods
        .getEvidenceById(caseId, j)
        .call();
      this.setState({
        evidences: [...this.state.evidences, evd],
      });
    }
    console.log(this.state.evidences);
  };

  captureFile = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);

    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) });
      console.log("buffer", this.state.buffer);
    };
  };

  uploadFile = () => {
    console.log("Submitting file to ipfs...");

    //adding file to the IPFS
    // ipfs.add(this.state.buffer, (error, result) => {
    //   console.log("Ipfs result", result);
    //   if (error) {
    //     console.error(error);
    //     return;
    //   }

    //   this.setState({ loading: true });

    //   console.log(this.state.evidenceDetails);

    //   this.state.securex.methods
    //     .registerEvidence(
    //       this.state.evidenceDetails.caseId,
    //       this.state.evidenceDetails.description,
    //       result[0].hash,

    //       this.state.evidenceDetails.createdDate
    //     )
    //     .send({ from: this.state.account })
    //     .on("transactionHash", (hash) => {
    //       window.location.reload();
    //       this.setState({ loading: false });
    //     });
    // });
    return new Promise(async (resolve, reject) => {
      console.log("new working...");
      try {
        const { cid } = await ipfs.add(this.state.buffer);
        resolve(cid.toString());

        console.log({ cid });
        console.log(cid.toString());

        this.state.securex.methods
          .registerEvidence(
            this.state.evidenceDetails.caseId,
            this.state.evidenceDetails.description,
            cid.toString(),

            this.state.evidenceDetails.createdDate
          )
          .send({ from: this.state.account })
          .on("transactionHash", (hash) => {
            window.location.reload();
            this.setState({ loading: false });
          });
      } catch (error) {
        reject(error);
      }
    });
  };
  registerCase = () => {
    console.log("Registering Case...");

    console.log(this.state.caseDetails);

    this.setState({ loading: true });

    this.state.securex.methods
      .registerCase(
        this.state.caseDetails.courtId,

        this.state.caseDetails.caseDescription,
        this.state.caseDetails.startDateTime
      )
      .send({ from: this.state.account })
      .on("transactionHash", (hash) => {
        let newCaseId = this.state.cases.length + 1;
        window.alert("Successfully registered with Case ID: " + newCaseId);
        this.setState({ loading: false });
      });
  };

  handleCaseInputChange = (event) => {
    this.setState({
      caseDetails: {
        ...this.state.caseDetails,
        [event.target.name]: event.target.value,
      },
    });
  };
  handleEvidenceInputChange = (event) => {
    this.setState({
      evidenceDetails: {
        ...this.state.evidenceDetails,
        [event.target.name]: event.target.value,
      },
    });
  };
  handleEvidenceCaseInput = (event) => {
    this.setState({
      getCaseId: event.target.value,
    });
  };
  tipEvidenceOwner(address, tipAmount) {
    this.setState({ loading: true });
    this.state.securex.methods
      .tipEvidenceOwner(address)
      .send({ from: this.state.account, value: tipAmount })
      .on("transactionHash", (hash) => {
        this.setState({ loading: false });
      });
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      securex: null,
      loading: true,
      evidenceDetails: {
        caseId: "",
        description: "",

        createdDate: "",
      },
      caseDetails: {
        courtId: "",

        caseDescription: "",
        startDateTime: "",
      },
      uploadedImage: "",
      cases: [],
      evidences: [],
      getCaseId: "",
    };

    this.uploadFile = this.uploadFile.bind(this);
    this.captureFile = this.captureFile.bind(this);
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        {this.state.loading ? (
          <div id="loader" className="text-center mt-5">
            <p>Loading...</p>
          </div>
        ) : (
          <div>
            <div className="container-fluid mt-5">
              <div className="row">
                <main
                  role="main"
                  className="col-lg-12 ml-auto mr-auto"
                  style={{ maxWidth: "500px" }}
                >
                  <div className="content mr-auto ml-auto">
                    <p>&nbsp;</p>
                    <Card>
                      <Card.Header as="h2">Register Case</Card.Header>
                      <Card.Body>
                        <Card.Title>
                          Provide the below details to register a case.
                        </Card.Title>

                        <Form
                          onSubmit={(event) => {
                            console.log("Form Submitted");
                            event.preventDefault();
                            this.registerCase();
                          }}
                        >
                          <Form.Group className="mb-3">
                            <Form.Label>Court ID</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Court ID"
                              value={this.state.caseDetails.courtId}
                              onChange={this.handleCaseInputChange}
                              name="courtId"
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Case Description</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              placeholder="Case Description"
                              value={this.state.caseDetails.caseDescription}
                              onChange={this.handleCaseInputChange}
                              name="caseDescription"
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control
                              type="date"
                              placeholder="Select Date"
                              value={this.state.caseDetails.startDateTime}
                              onChange={this.handleCaseInputChange}
                              name="startDateTime"
                            />
                          </Form.Group>
                          <Button variant="primary" type="submit">
                            Register Case
                          </Button>
                        </Form>
                      </Card.Body>
                    </Card>
                    <br />
                    <br />
                    <Card>
                      <Card.Header as="h2">Submit Evidence</Card.Header>
                      <Card.Body>
                        <Card.Title>
                          Provide the below details to submit an evidence.
                        </Card.Title>

                        <Form
                          onSubmit={(event) => {
                            console.log("Form Submitted");
                            event.preventDefault();

                            this.uploadFile();
                          }}
                        >
                          <Form.Group className="mb-3">
                            <Form.Label>Case ID</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Case ID"
                              value={this.state.evidenceDetails.caseId}
                              onChange={this.handleEvidenceInputChange}
                              name="caseId"
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Upload Evidence File</Form.Label>
                            <Form.Control
                              type="file"
                              id="fname"
                              onChange={this.captureFile}
                              name="fileHash"
                              placeholder="Enter the Hash"
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                              type="date"
                              placeholder="Select Date"
                              name="createdDate"
                              id="dateofbirth"
                              value={this.state.evidenceDetails.createdDate}
                              onChange={this.handleEvidenceInputChange}
                            />
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Evidence Description</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              placeholder="Evidence Description"
                              value={this.state.evidenceDetails.description}
                              onChange={this.handleEvidenceInputChange}
                              name="description"
                            />
                          </Form.Group>

                          <Button variant="primary" type="submit">
                            Submit Evidence
                          </Button>
                        </Form>
                      </Card.Body>
                    </Card>
                    <br />
                    <br />
                    <Card>
                      <Card.Header as="h2">Get Evidences of a case</Card.Header>
                      <Card.Body>
                        <Form
                          onSubmit={(event) => {
                            console.log("Form Submitted");
                            event.preventDefault();

                            this.getEvidencesOfCase();
                          }}
                        >
                          <Form.Group className="mb-3">
                            <Form.Label>Case ID</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Case ID"
                              value={this.state.getCaseId}
                              onChange={this.handleEvidenceCaseInput}
                              name="caseId"
                            />
                          </Form.Group>

                          <Button variant="primary" type="submit">
                            Get Evidences
                          </Button>
                        </Form>
                      </Card.Body>
                    </Card>
                    {this.state.evidences.length > 0 ? (
                      this.state.evidences.map((evidence, key) => {
                        return (
                          <div className="card mb-4" key={key}>
                            <ul
                              id="imageList"
                              className="list-group list-group-flush"
                            >
                              <li className="list-group-item">
                                <p className="text-center">
                                  <img
                                    src={`https://ipfs.io/ipfs/${evidence[1]}`}
                                    style={{ maxWidth: "420px" }}
                                  />
                                </p>
                                <p>Evidence Description: {evidence[0]}</p>
                                <p>Date: {evidence[2]}</p>
                                <button
                                  className="btn btn-link btn-sm float-right pt-0"
                                  name={key}
                                  onClick={(event) => {
                                    let tipAmount = window.web3.utils.toWei(
                                      "0.1",
                                      "Ether"
                                    );

                                    this.tipEvidenceOwner(
                                      evidence[3],
                                      tipAmount
                                    );
                                  }}
                                >
                                  TIP 0.1 MATIC
                                </button>
                              </li>
                            </ul>
                          </div>
                        );
                      })
                    ) : (
                      <p></p>
                    )}

                    <p>&nbsp;</p>
                  </div>
                </main>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
