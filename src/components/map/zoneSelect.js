export const toQueryLabel = (item) => {
  if (item.tipo === "region") return item.region_name;
  if (item.tipo === "departamento") return item.state_name;
  return `${item.city_name}, ${item.state_name}`;
};

export const toZoneSelection = (item) => {
  if (item.tipo === "region") {
    return {
      type: "region",
      name: item.region_name,
      slug: item.region_slug,
    };
  }
  if (item.tipo === "departamento") {
    return {
      type: "departamento",
      daneCode: item.state_dane_code,
      name: item.state_name,
    };
  }
  return {
    type: "municipio",
    daneCode: item.city_dane_code,
    name: item.city_name,
    dptoDaneCode: item.state_dane_code,
  };
};
