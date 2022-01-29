// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Securex {
    string public name;

    mapping(uint256 => Case) public cases;

    uint256 public totalCases = 0;

    struct Evidence {
        string description;
        string fileHash;
        address owner;
        uint256 timestamp;
        string createdDateTime;
    }

    struct Case {
        string courtId;
        uint256 caseId;
        string caseDescription;
        mapping(uint256 => Evidence) evidences;
        uint256 totalEvidences;
        string startDateTime;
        bool initialised;
    }
    event EvidenceRegistered(
        string description,
        string fileHash,
        address owner,
        uint256 timestamp,
        string createdDateTime
    );

    event CaseRegistered(
        string courtId,
        string caseDescription,
        uint256 totalEvidences,
        string startDateTime
    );
    event EvidenceTipped(uint256 tipAmount, address payable author);

    constructor() public {
        name = "secureX";
    }

    function registerCase(
        string memory _courtId,
        string memory _caseDescription,
        string memory _startDateTime
    ) public {
        require(bytes(_courtId).length > 0);
        require(bytes(_caseDescription).length > 0);
        require(bytes(_startDateTime).length > 0);

        totalCases++;
        Case storage newCase = cases[totalCases];

        newCase.courtId = _courtId;

        newCase.caseId = totalCases;
        newCase.caseDescription = _caseDescription;
        newCase.totalEvidences = 0;
        newCase.startDateTime = _startDateTime;
        newCase.initialised = true;

        emit CaseRegistered(_courtId, _caseDescription, 0, _startDateTime);
    }

    function registerEvidence(
        uint256 _caseId,
        string memory _description,
        string memory _fileHash,
        string memory _createdDateTime
    ) public {
        require(_caseId > 0);
        require(bytes(_description).length > 0);
        require(bytes(_fileHash).length > 0);
        require(bytes(_createdDateTime).length > 0);

        Case storage contextCase = cases[_caseId];
        Evidence memory newEvidence = Evidence({
            description: _description,
            fileHash: _fileHash,
            owner: msg.sender,
            createdDateTime: _createdDateTime,
            timestamp: block.timestamp
        });

        contextCase.totalEvidences++;
        contextCase.evidences[contextCase.totalEvidences] = newEvidence;
        emit EvidenceRegistered(
            _description,
            _fileHash,
            msg.sender,
            block.timestamp,
            _createdDateTime
        );
    }

    function getCaseById(uint256 caseId)
        external
        view
        returns (
            string memory,
            string memory,
            string memory,
            uint256
        )
    {
        require(cases[caseId].initialised, "No such case exists!");
        Case storage reqcase = cases[caseId];
        return (
            reqcase.courtId,
            reqcase.caseDescription,
            reqcase.startDateTime,
            reqcase.totalEvidences
        );
    }

    function getEvidenceById(uint256 caseId, uint256 evidenceId)
        external
        view
        returns (
            string memory,
            string memory,
            string memory,
            address
        )
    {
        require(cases[caseId].initialised, "No such case exists!");
        Evidence memory evd = cases[caseId].evidences[evidenceId];
        return (evd.description, evd.fileHash, evd.createdDateTime, evd.owner);
    }

    function tipEvidenceOwner(address payable user) public payable {
        user.transfer(msg.value);
        emit EvidenceTipped(msg.value, user);
    }
}
