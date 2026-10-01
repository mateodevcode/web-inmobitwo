// Utilidades GeoJSON puras (sin dependencias de mapa ni de vistas).

export function coords(g) {
  if (!g) return [];
  const t = g.type;
  if (t === "Point") return [g.coordinates];
  if (t === "MultiPoint" || t === "LineString") return g.coordinates;
  if (t === "MultiLineString" || t === "Polygon") return g.coordinates.flat();
  if (t === "MultiPolygon") return g.coordinates.flat(2);
  if (t === "GeometryCollection") return g.geometries.flatMap(coords);
  return [];
}

export function featBounds(feat) {
  if (!feat?.geometry) return null;
  const c = coords(feat.geometry);
  if (!c.length) return null;
  let x1 = Infinity,
    y1 = Infinity,
    x2 = -Infinity,
    y2 = -Infinity;
  c.forEach(([lng, lat]) => {
    if (lng < x1) x1 = lng;
    if (lng > x2) x2 = lng;
    if (lat < y1) y1 = lat;
    if (lat > y2) y2 = lat;
  });
  return [
    [x1, y1],
    [x2, y2],
  ];
}

export function collectionBounds(fc) {
  if (!fc?.features?.length) return null;
  let x1 = Infinity,
    y1 = Infinity,
    x2 = -Infinity,
    y2 = -Infinity;
  fc.features.forEach((f) =>
    coords(f.geometry).forEach(([lng, lat]) => {
      if (lng < x1) x1 = lng;
      if (lng > x2) x2 = lng;
      if (lat < y1) y1 = lat;
      if (lat > y2) y2 = lat;
    }),
  );
  return x1 === Infinity
    ? null
    : [
        [x1, y1],
        [x2, y2],
      ];
}

export function findFeature(fc, propKey, code) {
  return fc?.features?.find((f) => f.properties[propKey] === code) || null;
}

const ZONA_FILL = "#e6007a";

export function drawGeometry(map, geometry) {
  map.addSource("zonaboundary", {
    type: "geojson",
    data: { type: "Feature", geometry, properties: {} },
  });
  map.addLayer({
    id: "zona-fill",
    type: "fill",
    source: "zonaboundary",
    paint: {
      "fill-color": ZONA_FILL,
      "fill-opacity": 0.35,
    },
  });
  map.addLayer({
    id: "zona-line",
    type: "line",
    source: "zonaboundary",
    paint: {
      "line-color": ZONA_FILL,
      "line-width": 2,
    },
  });

  const c = coords(geometry);
  if (c.length > 0) {
    const bounds = c.reduce(
      (b, [lng, lat]) => {
        return [
          [Math.min(b[0][0], lng), Math.min(b[0][1], lat)],
          [Math.max(b[1][0], lng), Math.max(b[1][1], lat)],
        ];
      },
      [
        [Infinity, Infinity],
        [-Infinity, -Infinity],
      ],
    );
    map.fitBounds(bounds, { padding: 10 });
  }
}
