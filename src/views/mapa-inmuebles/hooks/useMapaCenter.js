import { useEffect, useRef, useState } from "react";
import { apiBackend } from "@/actions/apiBackend.js";
import { slugToName } from "../lib/routeParams";

async function geocodeCenter(address) {
  try {
    const res = await apiBackend(
      `/api/geocode?address=${encodeURIComponent(address)}`,
      "GET",
    );
    if (res.success && res.data) {
      return { lat: res.data.latitude, lng: res.data.longitude };
    }
  } catch {}
  return null;
}

async function fetchBoundaryGeometry(endpoint) {
  try {
    const res = await apiBackend(endpoint);
    if (res.success && res.data?.geometry) return res.data.geometry;
  } catch {}
  return null;
}

export function useMapaCenter({ lat, lng, zoom, cityAndDepartment }) {
  const hasPoint = Boolean(lat && lng);

  const [center, setCenter] = useState(
    hasPoint
      ? {
          lat: Number(lat),
          lng: Number(lng),
          zoom: Number(zoom) || 16,
        }
      : { lat: 4.6, lng: -74.1, zoom: 6 },
  );
  const [boundary, setBoundary] = useState(null);
  const [geocoding, setGeocoding] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    if (hasPoint || !cityAndDepartment || doneRef.current) return;
    doneRef.current = true;
    setGeocoding(true);

    const geoParts = cityAndDepartment.split("-");
    const hasCity = geoParts.length >= 2;

    async function init() {
      let endpoint = null;
      let zoomLevel = 6;

      if (hasCity) {
        const deptSlug = geoParts.pop();
        const citySlug = geoParts.join("-");
        endpoint = `/api/location-geojson?tipo=ciudad&city=${citySlug}&dept=${deptSlug}`;
        zoomLevel = 13;

        const point = await geocodeCenter(
          `${slugToName(citySlug)}, ${slugToName(deptSlug)}, Colombia`,
        );
        if (point) setCenter({ ...point, zoom: zoomLevel });
      } else {
        const slug = geoParts[0];
        const regionRes = await apiBackend(
          `/api/location-geojson?tipo=region&region=${slug}`,
        );
        if (regionRes.success && regionRes.data) {
          endpoint = `/api/location-geojson?tipo=region&region=${slug}`;
          zoomLevel = 7;
        } else {
          endpoint = `/api/location-geojson?tipo=departamento&dept=${slug}`;
          zoomLevel = 9;
        }

        const point = await geocodeCenter(
          `${slugToName(slug)}, Colombia`,
        );
        if (point) setCenter({ ...point, zoom: zoomLevel });
      }

      if (endpoint) {
        const geometry = await fetchBoundaryGeometry(endpoint);
        if (geometry) setBoundary(geometry);
      }

      setGeocoding(false);
    }

    init();
  }, [cityAndDepartment]);

  return { center, boundary, geocoding };
}
