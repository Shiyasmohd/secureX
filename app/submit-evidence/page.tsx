'use client'
import { Input, Textarea, Button } from "@nextui-org/react";
import { useRef, useState } from "react";
import { Inter } from "next/font/google";
import { addEvidence } from "@/utils/helpers";

const inter = Inter({ subsets: ["latin"] });

export default function SubmitEvidence() {
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);

  const caseId = useRef<any>();
  const evidenceDescription = useRef<any>();
  const startDate = useRef<any>();
  const [file, setFile] = useState<any>();

  const handleAddEvidence = async () => {
    setIsButtonLoading(true);

    try {
      const response = await addEvidence(
        caseId.current.value,
        evidenceDescription.current.value,
        startDate.current.value,
        file
      );
      if (response.status) {
        alert("Evidence is successfully uploaded");
      }
    } catch (err: any) {
      console.log(err);
    } finally {
      setIsButtonLoading(false);
    }
  };

  return (
    <div
      className={`min-h-[calc(100vh-300px)] flex justify-center items-center ${inter.className}`}
    >
      <div className="max-w-screen-xl p-4 sm:p-6 lg:p-8">
        <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl leading-loose tracking-tighter my-6 gradient-txt-white">
          Submit Evidence
        </h1>
        <div className="flex flex-col gap-4">
          <Input
            className="w-full sm:w-[450px]"
            size="lg"
            label="Contract ID"
            ref={caseId}
            isRequired
          />
          <Textarea
            className="w-full sm:w-[450px]"
            size="lg"
            label="Evidence Description"
            ref={evidenceDescription}
            isRequired
          />

          <Input
            className="w-full sm:w-[450px]"
            size="lg"
            type="date"
            label="Start Date"
            placeholder="Enter start date of case"
            ref={startDate}
            isRequired
          />
          <Input
            className="w-full sm:w-[450px] upload-evidence"
            size="lg"
            type="file"
            onChange={(e: any) => setFile(e.target.files)}
          />

          <Button
            color="primary"
            isLoading={isButtonLoading}
            onClick={handleAddEvidence}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
