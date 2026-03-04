import { createContext, useState, useEffect, useContext, ReactNode, FC } from 'react';

interface FeatureToggles {
  logistics: boolean;
  foodDelivery: boolean;
}

interface FeatureToggleContextType {
  toggles: FeatureToggles;
  setToggle: (feature: keyof FeatureToggles, value: boolean) => void;
}

const FeatureToggleContext = createContext<FeatureToggleContextType | undefined>(undefined);

const defaultToggles: FeatureToggles = {
  logistics: false,
  foodDelivery: false,
};

const getInitialToggles = (): FeatureToggles => {
  try {
    const storedToggles = localStorage.getItem('featureToggles');
    if (storedToggles) {
      return { ...defaultToggles, ...JSON.parse(storedToggles) };
    }
  } catch (error) {
    console.error("Error reading feature toggles from localStorage", error);
  }
  return defaultToggles;
};

export const FeatureToggleProvider: FC<{children: ReactNode}> = ({ children }) => {
  const [toggles, setToggles] = useState<FeatureToggles>(getInitialToggles);

  useEffect(() => {
    try {
      localStorage.setItem('featureToggles', JSON.stringify(toggles));
    } catch (error) {
      console.error("Error writing feature toggles to localStorage", error);
    }
  }, [toggles]);

  const setToggle = (feature: keyof FeatureToggles, value: boolean) => {
    setToggles(prevToggles => ({
      ...prevToggles,
      [feature]: value,
    }));
  };

  return (
    <FeatureToggleContext.Provider value={{ toggles, setToggle }}>
      {children}
    </FeatureToggleContext.Provider>
  );
};

export const useFeatureToggles = (): FeatureToggleContextType => {
  const context = useContext(FeatureToggleContext);
  if (context === undefined) {
    throw new Error('useFeatureToggles must be used within a FeatureToggleProvider');
  }
  return context;
};
