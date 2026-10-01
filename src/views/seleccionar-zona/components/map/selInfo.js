// Selección derivada de selectedZone: qué código va "selected" y cuál
// "ancestor" en cada nivel. Puro, sin estado.

export function getSelInfo(sel) {
  if (!sel)
    return {
      region: null,
      dpto: null,
      mpio: null,
      barrio: null,
      regionRole: null,
      dptoRole: null,
      mpioRole: null,
    };
  if (sel.type === "region")
    return {
      region: sel.slug || sel.name,
      dpto: null,
      mpio: null,
      barrio: null,
      regionRole: "selected",
      dptoRole: null,
      mpioRole: null,
    };
  if (sel.type === "departamento")
    return {
      region: null,
      dpto: sel.daneCode,
      mpio: null,
      barrio: null,
      regionRole: "ancestor",
      dptoRole: "selected",
      mpioRole: null,
    };
  if (sel.type === "municipio")
    return {
      region: null,
      dpto: sel.dptoDaneCode,
      mpio: sel.daneCode,
      barrio: null,
      regionRole: "ancestor",
      dptoRole: "ancestor",
      mpioRole: "selected",
    };
  if (sel.type === "barrio")
    return {
      region: null,
      dpto: sel.dptoDaneCode,
      mpio: sel.mpioDaneCode,
      barrio: sel.daneCode,
      regionRole: "ancestor",
      dptoRole: "ancestor",
      mpioRole: "ancestor",
    };
  return {
    region: null,
    dpto: null,
    mpio: null,
    barrio: null,
    regionRole: null,
    dptoRole: null,
    mpioRole: null,
  };
}

// departamento/municipio "activos" independientemente del nivel más profundo seleccionado
export function currentDptoCode(sel) {
  if (!sel) return null;
  if (sel.type === "departamento") return sel.daneCode;
  return sel.dptoDaneCode ?? null;
}

export function currentMpioCode(sel) {
  if (!sel) return null;
  if (sel.type === "municipio") return sel.daneCode;
  if (sel.type === "barrio") return sel.mpioDaneCode;
  return null;
}

// asigna estado (selected / ancestor / none) + hover a un FeatureCollection
export function withState(features, codeKey, selectedCode, role, hovCode) {
  return features.map((f) => {
    const code = f.properties[codeKey];
    const state = code === selectedCode ? role : "none";
    return {
      ...f,
      properties: { ...f.properties, state, isHovered: code === hovCode },
    };
  });
}
