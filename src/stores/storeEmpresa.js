import { defineStore } from 'pinia';

export const useCompanyStore = defineStore('company', {
  state: () => ({
    selectedCompany: '', // Almacena el nombre de la empresa seleccionada
  }),
  actions: {
    setCompany(name) {
      this.selectedCompany = name;
    },
  },
});
