export function filterData(records, filterKey, searchTerm) {
    if (!searchTerm) return records; // Si no hay búsqueda, devuelve todos los datos
    return records.filter(record =>
      record[filterKey]?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }