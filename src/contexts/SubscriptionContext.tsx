import React, { createContext, useContext, useState, useEffect } from 'react';

type SubscriptionTier = 'free' | 'premium';

interface SubscriptionContextType {
  tier: SubscriptionTier;
  isPremium: boolean;
  upgradeToPremium: () => void;
  cancelSubscription: () => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tier, setTier] = useState<SubscriptionTier>(() => {
    const saved = localStorage.getItem('subscriptionTier');
    return (saved as SubscriptionTier) || 'free';
  });

  useEffect(() => {
    localStorage.setItem('subscriptionTier', tier);
  }, [tier]);

  const upgradeToPremium = () => {
    setTier('premium');
  };

  const cancelSubscription = () => {
    setTier('free');
  };

  return (
    <SubscriptionContext.Provider
      value={{
        tier,
        isPremium: tier === 'premium',
        upgradeToPremium,
        cancelSubscription,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within SubscriptionProvider');
  }
  return context;
};
