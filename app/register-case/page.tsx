'use client'
import { Input, Textarea, Button } from "@nextui-org/react";
import { useRef, useState } from "react";
import { Inter } from "next/font/google";
import { addCase } from "@/utils/helpers";

const inter = Inter({ subsets: ["latin"] });

export default function RegisterCase() {
  const courtId = useRef<any>();
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const caseDescription = useRef<any>();
  const startDate = useRef<any>();

  const handleAddCase = async () => {
    setIsButtonLoading(true);

    try {
      const response = await addCase(
        courtId.current.value,
        caseDescription.current.value,
        startDate.current.value
      );
      if (response.status) {
        alert("Case is registered with Case ID: " + response.newCaseId);
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
          Register Contract
        </h1>
        <div className="flex flex-col gap-4">
          <Input
            className="w-full sm:w-[450px]"
            size="lg"
            label="Contract ID"
            ref={courtId}
            isRequired
          />
          <Textarea
            className="w-full sm:w-[450px]"
            size="lg"
            label="Contract Description"
            ref={caseDescription}
            isRequired
          />

          <Input
            className="w-full sm:w-[450px]"
            size="lg"
            type="date"
            label="Contract Date"
            placeholder="Enter start date of case"
            ref={startDate}
            isRequired
          />

          <Button
            color="primary"
            isLoading={isButtonLoading}
            onClick={handleAddCase}
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
}
