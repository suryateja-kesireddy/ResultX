import { useContext } from "react";
import { HodContext } from "../context/hod/HodContext";

function useHod() {
  return useContext(HodContext);
}

export default useHod;