export function renderBoundary(map, geom) {
  if (map.getSource("zonaboundary")) {
    map
      .getSource("zonaboundary")
      .setData({ type: "Feature", geometry: geom, properties: {} });
  } else {
    map.addSource("zonaboundary", {
      type: "geojson",
      data: { type: "Feature", geometry: geom, properties: {} },
    });
    map.addLayer({
      id: "zona-fill",
      type: "fill",
      source: "zonaboundary",
      paint: { "fill-color": "#e6007a", "fill-opacity": 0.15 },
    });
    map.addLayer({
      id: "zona-line",
      type: "line",
      source: "zonaboundary",
      paint: {
        "line-color": "#e6007a",
        "line-width": 2,
        "line-opacity": 0.6,
      },
    });
  }
  let x1 = Infinity,
    y1 = Infinity,
    x2 = -Infinity,
    y2 = -Infinity;
  function walk(c) {
    if (typeof c[0] === "number") {
      if (c[0] < x1) x1 = c[0];
      if (c[0] > x2) x2 = c[0];
      if (c[1] < y1) y1 = c[1];
      if (c[1] > y2) y2 = c[1];
    } else c.forEach(walk);
  }
  walk(geom.coordinates || []);
  if (x1 !== Infinity)
    map.fitBounds(
      [
        [x1, y1],
        [x2, y2],
      ],
      { padding: 40, duration: 1000, maxZoom: 14 },
    );
}
