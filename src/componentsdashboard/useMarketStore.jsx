import { create } from 'zustand';

const useMarketStore = create((set) => {
  // Load initial active offers from local storage
  const initialActiveOffers = JSON.parse(localStorage.getItem('activeOffers')) || [];

  return {
    activeTab: "USDT",
    showForm: false,
    selectedOffer: null,
    tradeMyAmount: 0,
    forAmount: 0,
    platformFee: 0,
    totalAmountDue: 0,
    selectedAsset: "",
    dropdownActive: false,
    offersData: [], // Initial offers data
    activeOffers: initialActiveOffers, // Load from local storage
    setIsMobileMenuActive: (isActive) => set({ isMobileMenuActive: isActive }),
    setActiveTab: (tab) => set({ activeTab: tab }),
    setShowForm: (show) => set({ showForm: show }),
    setSelectedOffer: (offer) => set({ selectedOffer: offer }),
    setTradeMyAmount: (amount) => set({ tradeMyAmount: amount }),
    setForAmount: (amount) => set({ forAmount: amount }),
    setPlatformFee: (fee) => set({ platformFee: fee }),
    setTotalAmountDue: (total) => set({ totalAmountDue: total }),
    setSelectedAsset: (asset) => set({ selectedAsset: asset }),
    setDropdownActive: (isActive) => set({ dropdownActive: isActive }),
    addActiveOffer: (offer) => {
      set((state) => {
        const updatedOffers = [...state.activeOffers, offer];
        localStorage.setItem('activeOffers', JSON.stringify(updatedOffers)); // Save to local storage
        return { activeOffers: updatedOffers };
      });
    },
    removeActiveOffer: (id) => {
      set((state) => {
        const updatedOffers = state.activeOffers.filter((offer) => offer.id !== id);
        localStorage.setItem('activeOffers', JSON.stringify(updatedOffers)); // Update local storage
        return { activeOffers: updatedOffers };
      });
    }
  };
});

export default useMarketStore;
