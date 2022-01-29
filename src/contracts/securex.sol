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
        totalCases++;
        Case storage newCase = cases[totalCases];

        newCase.courtId = _courtId;

        newCase.caseId = totalCases;
        newCase.caseDescription = _caseDescription;
        newCase.totalEvidences = 0;
        newCase.startDateTime = _startDateTime;
        newCase.initialised = true;

        //emit CaseRegistered();
    }

    function registerEvidence(
        uint256 _caseId,
        string memory _description,
        string memory _fileHash,
        string memory _createdDateTime
    ) public {
        // require(_id > 0 && _id <= imageCount);

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
    }
}