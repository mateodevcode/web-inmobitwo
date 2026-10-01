export const toQueryLabel = (item) => {
  if (item.tipo === "region") return item.region_name;
  if (item.tipo === "departamento") return item.state_name;
  return `${item.city_name}, ${item.state_name}`;
};

export const toGeoSelection = (item) => {
  if (item.tipo === "region") {
    return { type: "region", regionSlug: item.region_slug };
  }
  if (item.tipo === "departamento") {
    return { type: "departamento", departmentSlug: item.state_slug };
  }
  return {
    type: "ciudad",
    citySlug: item.city_slug,
    departmentSlug: item.state_slug,
  };
};
