import create from 'zustand'; //library store global

const useStore = create(set => ({
  username: '',
  password: '',
  setUsername: (username) => set(() => ({ username })),
  setPassword: (password) => set(() => ({ password })),
}));

export default useStore;
