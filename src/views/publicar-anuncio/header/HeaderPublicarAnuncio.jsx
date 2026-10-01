import { useAppContext } from "@/context/AppContext";
import { LogoBar } from "./LogoBar";
import { StepsNav } from "./StepsNav";

const HeaderPublicarAnuncio = () => {
  const { contentNumber } = useAppContext();

  return (
    <>
      <LogoBar />
      <StepsNav contentNumber={contentNumber} />
    </>
  );
};

export default HeaderPublicarAnuncio;
