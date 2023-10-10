import { CONTRACT_ADDRESS } from "@/const/value";
import { abi } from "@/const/contract-abi";
import { ethers, utils } from "ethers";
import { storeFiles } from "./uploadFile";
let provider;
let contract: ethers.Contract;
let signer: string | ethers.providers.Provider | ethers.Signer;

// Check if the code is running in the browser context
if (typeof window !== "undefined") {
  // This code only runs in the browser
  // Use the window.ethereum provider
  //@ts-ignore
  provider = new ethers.providers.Web3Provider(
    //@ts-ignore
    window.ethereum as ethers.providers.ExternalProvider
  );

  contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);

  // Get the signer from the provider
  signer = provider.getSigner();
  console.log({ signer });
  console.log({ contract });
}

export const addCase = async (
  courtId: string,
  caseDescription: string,
  caseDate: string
) => {
  try {
    const totalCases = await contract.totalCases();
    await contract
      .connect(signer)
      .registerCase(courtId, caseDescription, caseDate)
      .then(async (res: any) => {
        await res.wait();
      });
    return { newCaseId: totalCases.toNumber() + 1, status: true };
  } catch (err: any) {
    console.log(err);
    return { status: false };
  }
};

export const addEvidence = async (
  caseId: string,
  evidenceDescription: string,
  evidenceDate: string,
  file: any
) => {
  try {
    let fileUrl;
    if (file) {
      fileUrl = await storeFiles(file);
      fileUrl = fileUrl + `/${file[0].name}`;
      console.log({ fileUrl });
    }
    await contract
      .connect(signer)
      .registerEvidence(caseId, evidenceDescription, fileUrl, evidenceDate)
      .then(async (res: any) => {
        await res.wait();
      });
    return { status: true };
  } catch (err: any) {
    console.log(err);
    return { status: false };
  }
};
export const getEvidences = async (caseId: string) => {
  try {
    const contextCase = await contract.cases(caseId);
    console.log(contextCase);
    const contextEvidences = [];
    for (let j = 1; j <= contextCase.totalEvidences; j++) {
      const evidenceDetails = await contract.getEvidenceById(caseId, j);
      contextEvidences.push(evidenceDetails);
    }
    return { evidences: contextEvidences, status: true };
  } catch (err: any) {
    console.log(err);
    return { status: false };
  }
};
export const tipEvidence = async (address: string, amount: string) => {
  try {
    await contract
      .connect(signer)
      .tipEvidenceOwner(address, { value: utils.parseEther(amount) })
      .then(async (res: any) => {
        await res.wait();
      });
    return { status: true };
  } catch (err: any) {
    console.log(err);
    return { status: false };
  }
};
