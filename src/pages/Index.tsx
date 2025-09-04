
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ContractTemplateCards from "@/components/ContractTemplateCards";
import AIAssistantChat from "@/components/AIAssistantChat";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <ContractTemplateCards />
      <AIAssistantChat />
    </div>
  );
};

export default Index;
