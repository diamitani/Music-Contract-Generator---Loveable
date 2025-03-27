
import { useState } from "react";
import { ContractProvider } from "@/context/ContractContext";
import Header from "@/components/Header";
import ContractForm from "@/components/ContractForm";

const ContractGenerator = () => {
  return (
    <ContractProvider>
      <div className="min-h-screen">
        <Header />
        <div className="pt-32 pb-20 px-6">
          <ContractForm />
        </div>
      </div>
    </ContractProvider>
  );
};

export default ContractGenerator;
