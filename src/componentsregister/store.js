import {create} from 'zustand';

const useStore = create((set) => ({
  // Existing state and actions
  username: '',
  password: '',
  setUsername: (username) => set(() => ({ username })),
  setPassword: (password) => set(() => ({ password })),
  
  // New state for RegisterForm
  firstName: '',
  lastName: '',
  email: '',
  confirmPassword: '',
  accountType: 'personal',
  setFirstName: (firstName) => set(() => ({ firstName })),
  setLastName: (lastName) => set(() => ({ lastName })),
  setEmail: (email) => set(() => ({ email })),
  setConfirmPassword: (confirmPassword) => set(() => ({ confirmPassword })),
  setAccountType: (accountType) => set(() => ({ accountType })),
}));

export default useStore;
