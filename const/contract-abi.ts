export const abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "courtId",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "caseDescription",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalEvidences",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "startDateTime",
        type: "string",
      },
    ],
    name: "CaseRegistered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "fileHash",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "createdDateTime",
        type: "string",
      },
    ],
    name: "EvidenceRegistered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "tipAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address payable",
        name: "author",
        type: "address",
      },
    ],
    name: "EvidenceTipped",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "cases",
    outputs: [
      {
        internalType: "string",
        name: "courtId",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "caseId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "caseDescription",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "totalEvidences",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "startDateTime",
        type: "string",
      },
      {
        internalType: "bool",
        name: "initialised",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "caseId",
        type: "uint256",
      },
    ],
    name: "getCaseById",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "caseId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "evidenceId",
        type: "uint256",
      },
    ],
    name: "getEvidenceById",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_courtId",
        type: "string",
      },
      {
        internalType: "string",
        name: "_caseDescription",
        type: "string",
      },
      {
        internalType: "string",
        name: "_startDateTime",
        type: "string",
      },
    ],
    name: "registerCase",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_caseId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_description",
        type: "string",
      },
      {
        internalType: "string",
        name: "_fileHash",
        type: "string",
      },
      {
        internalType: "string",
        name: "_createdDateTime",
        type: "string",
      },
    ],
    name: "registerEvidence",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "user",
        type: "address",
      },
    ],
    name: "tipEvidenceOwner",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "totalCases",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
