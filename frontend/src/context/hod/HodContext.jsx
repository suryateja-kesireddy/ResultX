import { createContext, useEffect, useState } from "react";
import { getHodProfile } from "../../services/hod/hodService";

export const HodContext = createContext();

export function HodProvider({ children }) {
  const [hod, setHod] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const profile = await getHodProfile();

      setHod(profile);
    } catch (error) {
      console.error("Failed to load HOD profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <HodContext.Provider
      value={{
        hod,
        loading,
        refreshProfile: loadProfile,
      }}
    >
      {children}
    </HodContext.Provider>
  );
}
