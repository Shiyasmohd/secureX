"use client";
import { title, subtitle } from "@/components/primitives";
import RegisterCase from "./register-case/page";
import SubmitEvidence from "./submit-evidence/page";
import GetEvidences from "./evidences/page";
import { Link } from "@nextui-org/react";
import { button as buttonStyles } from "@nextui-org/theme";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center mt-12">
        <h1 className={title()}>Blockchain for&nbsp;</h1>
        <h1 className={title({ color: "cyan" })}>Justice.&nbsp;</h1>
        <br />

        <h2 className={subtitle({ class: "mt-4" })}>
          A blockchain-based evidence management system to prevent manipulation
          in courts.
        </h2>
      </div>
      <div className="flex flex-col md:flex-row gap-3 mt-12">
        <Link
          href="/register-case"
          className={`${buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })} md:py-3 md:px-6 lg:py-4 lg:px-8`}
        >
          Register Contract
        </Link>
        <Link
          href="/submit-evidence"
          className={`${buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })} md:py-3 md:px-6 lg:py-4 lg:px-8`}
        >
          Submit Evidence
        </Link>
        <Link
          href="/evidences"
          className={`${buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })} md:py-3 md:px-6 lg:py-4 lg:px-8`}
        >
          Get Evidences
        </Link>
      </div>
    </section>
  );
}
