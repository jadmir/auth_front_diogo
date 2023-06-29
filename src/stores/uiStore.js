import { defineStore } from 'pinia'

export default defineStore({
  id: 'uiStore',

  state: () => ({
    photosDrawer: false,
  }),

  actions: {
    togglePhotosDrawer() {
      this.photosDrawer = !this.photosDrawer
    },
  },
})
