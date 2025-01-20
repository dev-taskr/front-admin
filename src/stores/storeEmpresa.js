import { defineStore } from 'pinia';

export const useCompanyStore = defineStore('company', {
  state: () => ({
    selectedCompany: [], // Almacena el nombre de la empresa seleccionada
  }),
  actions: {
    setCompany(data) {
      this.selectedCompany = data;
      localStorage.setItem('selectedCompany', JSON.stringify(data));
    },
  },
});
