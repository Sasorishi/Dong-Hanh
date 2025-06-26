import { create } from 'zustand'

export const useStore = create((set) => ({
  token: sessionStorage.getItem('token') || null,
  user: sessionStorage.getItem('user') || null,

  setToken: (token) => {
    sessionStorage.setItem('token', token)
    set({ token })
  },

  setUser: (user) => {
    sessionStorage.setItem('user', user)
    set({ user })
  },

  logout: () => {
    sessionStorage.removeItem('token')
    set({ token: null, user: null })
  },
}))
