import { Geoman } from "@geoman-io/maplibre-geoman-free";
import { getRingClosePoint, placeCloseMarker, removeCloseMarker } from "./polygon";

function stripElevation(ring) {
  return ring.map((c) => [c[0], c[1]]);
}

function to2D(geom) {
  if (!geom) return;
  if (geom.type === "Polygon") {
    geom.coordinates = geom.coordinates.map(stripElevation);
  } else if (geom.type === "MultiPolygon") {
    geom.coordinates = geom.coordinates.map((poly) =>
      poly.map(stripElevation),
    );
  }
}

function extractCreatedGeojson(gm, event) {
  try {
    const exported = gm.features?.exportGeoJson?.();
    if (
      exported?.type === "FeatureCollection" &&
      exported.features?.length
    ) {
      const geojson = exported.features[0];
      // forzar coordenadas 2D (Geoman puede incluir elevación)
      if (geojson?.geometry) to2D(geojson.geometry);
      return geojson;
    }
  } catch {
    return undefined;
  }
  if (event.feature?._geoJson) return event.feature._geoJson;
  if (event.feature?.getGeoJson) return event.feature.getGeoJson();
  return undefined;
}

// ctx: { geomanSetupRef, gmRef, drawLayerRef, closeMarkerRef, setDrawArmed, setHasDrawLayer, onPolygonChange, onDeletePolygon }
export async function setupGeoman(map, ctx) {
  if (!map || ctx.geomanSetupRef.current) return;
  ctx.geomanSetupRef.current = true;
  try {
    const gm = new Geoman(map, {
      settings: { useControlsUi: false },
      layerStyles: {
        polygon: {
          gm_main: [
            {
              type: "fill",
              paint: { "fill-color": "#e6007a", "fill-opacity": 0.15 },
            },
            {
              type: "line",
              paint: { "line-color": "#e6007a", "line-width": 2 },
            },
          ],
          gm_temporary: [
            {
              type: "fill",
              paint: { "fill-color": "#e6007a", "fill-opacity": 0.25 },
            },
            {
              type: "line",
              paint: { "line-color": "#e6007a", "line-width": 2 },
            },
          ],
        },
      },
    });
    ctx.gmRef.current = gm;

    await new Promise((resolve) => {
      map.once("gm:loaded", () => {
        resolve();
      });
      setTimeout(() => {
        resolve();
      }, 5000);
    });

    map.on("gm:create", (event) => {
      if (ctx.drawLayerRef.current) {
        try {
          ctx.drawLayerRef.current.delete?.();
        } catch {}
      }
      ctx.drawLayerRef.current = event.feature;
      gm.disableDraw();
      ctx.setDrawArmed(false);
      ctx.setHasDrawLayer(true);

      const geojson = extractCreatedGeojson(gm, event);
      if (!geojson) return;

      if (ctx.onPolygonChange) ctx.onPolygonChange(geojson);
      const closeCoord = getRingClosePoint(geojson);
      if (closeCoord)
        placeCloseMarker(map, ctx.closeMarkerRef, closeCoord, ctx.onDeletePolygon);
    });

    map.on("gm:editend", (event) => {
      if (ctx.drawLayerRef.current && ctx.onPolygonChange) {
        let geojson;
        try {
          const exported = gm.features?.exportGeoJson?.();
          if (exported?.features?.length) {
            geojson = exported.features[0];
          }
        } catch {}
        if (!geojson) geojson = event.feature;
        ctx.onPolygonChange(geojson);
        const closeCoord = getRingClosePoint(geojson);
        if (closeCoord)
          placeCloseMarker(map, ctx.closeMarkerRef, closeCoord, ctx.onDeletePolygon);
      }
    });

    map.on("gm:remove", () => {
      ctx.drawLayerRef.current = null;
      ctx.setHasDrawLayer(false);
      removeCloseMarker(ctx.closeMarkerRef);
      if (ctx.onPolygonChange) ctx.onPolygonChange(null);
    });
  } catch (e) {
    console.error("[SelectZonaMap] setupGeoman ERROR:", e);
    ctx.geomanSetupRef.current = false;
  }
}

export function handleStartDrawing(gmRef, setDrawArmed) {
  try {
    gmRef.current?.enableDraw("polygon");
    setDrawArmed(true);
  } catch (e) {
    console.error("[SelectZonaMap] enableDraw ERROR:", e);
  }
}
