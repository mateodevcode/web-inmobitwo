import { useEffect, useState } from "react";
import { apiBackend } from "@/actions/apiBackend.js";
import {
  GENERO_OPTIONS,
  OCUPACION_OPTIONS,
  BUSCA_CON_OPTIONS,
  TRI_OPTIONS,
  triToBool,
  boolToTri,
} from "@/data/room_seeker_options";

const inputCls =
  "border border-segundo/50 p-3 w-full md:w-80 text-segundo bg-white";
const labelCls = "font-semibold text-base md:text-lg text-segundo";

function Campo({ label, children }) {
  return (
    <div className="flex flex-col gap-2">
      <p className={labelCls}>{label}</p>
      {children}
    </div>
  );
}

function TriSelect({ value, onChange }) {
  return (
    <select
      value={boolToTri(value)}
      onChange={(e) => onChange(triToBool(e.target.value))}
      className={inputCls}
    >
      {TRI_OPTIONS.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

// Selects de departamento → ciudad en cascada (solo Colombia).
function GeoSelects({ stateId, cityId, onCampo }) {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    (async () => {
      const paises = await apiBackend("/api/countries");
      const colombia =
        paises?.data?.find?.(
          (c) => c.name?.toLowerCase() === "colombia" || c.iso2 === "CO",
        ) ?? null;
      if (!colombia?.id) return;
      const deptos = await apiBackend(`/api/states?countryId=${colombia.id}`);
      if (deptos.success) setStates(deptos.data ?? []);
    })();
  }, []);

  useEffect(() => {
    if (!stateId) return;
    (async () => {
      const res = await apiBackend(`/api/cities?stateId=${stateId}`);
      if (res.success) setCities(res.data ?? []);
    })();
  }, [stateId]);

  // Limpiar la lista es un evento (cambio de depto), no un efecto.
  const elegirDepto = (raw) => {
    const v = raw ? Number(raw) : null;
    setCities([]);
    onCampo("state_id", v);
    onCampo("city_id", null); // cambia depto => resetea ciudad
  };

  return (
    <>
      <Campo label="Departamento">
        <select
          value={stateId ?? ""}
          onChange={(e) => elegirDepto(e.target.value)}
          className={inputCls}
        >
          <option value="">Sin especificar</option>
          {states.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </Campo>
      <Campo label="Ciudad">
        <select
          value={cityId ?? ""}
          onChange={(e) =>
            onCampo("city_id", e.target.value ? Number(e.target.value) : null)
          }
          disabled={!stateId}
          className={`${inputCls} disabled:opacity-50`}
        >
          <option value="">
            {stateId ? "Sin especificar" : "Elige un departamento primero"}
          </option>
          {cities.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </Campo>
    </>
  );
}

export function RoomSeekerForm({ perfil = {}, onCampo }) {
  const aEntero = (raw) => {
    if (raw === "" || raw === null || raw === undefined) return null;
    const n = Number(raw);
    return Number.isInteger(n) && n > 0 ? n : null;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mt-6">
      <Campo label="Género">
        <select
          value={perfil.genero ?? ""}
          onChange={(e) => onCampo("genero", e.target.value || null)}
          className={inputCls}
        >
          {GENERO_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </Campo>

      <Campo label="Edad">
        <input
          type="number"
          min={16}
          max={100}
          value={perfil.edad ?? ""}
          onChange={(e) => onCampo("edad", aEntero(e.target.value))}
          placeholder="Ej. 30"
          className={inputCls}
        />
      </Campo>

      <Campo label="Ocupación">
        <select
          value={perfil.ocupacion ?? ""}
          onChange={(e) => onCampo("ocupacion", e.target.value || null)}
          className={inputCls}
        >
          {OCUPACION_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </Campo>

      <Campo label="¿Con quién buscas?">
        <select
          value={perfil.busca_con ?? "solo_yo"}
          onChange={(e) => onCampo("busca_con", e.target.value)}
          className={inputCls}
        >
          {BUSCA_CON_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </Campo>

      <Campo label="¿Fumas en casa?">
        <TriSelect
          value={perfil.fuma_en_casa}
          onChange={(v) => onCampo("fuma_en_casa", v)}
        />
      </Campo>

      <Campo label="¿Tienes mascota?">
        <TriSelect
          value={perfil.tiene_mascota}
          onChange={(v) => onCampo("tiene_mascota", v)}
        />
      </Campo>

      <Campo label="Presupuesto máximo (COP /mes)">
        <input
          type="number"
          min={0}
          step={50000}
          value={perfil.presupuesto_max ?? ""}
          onChange={(e) => onCampo("presupuesto_max", aEntero(e.target.value))}
          placeholder="Ej. 1500000"
          className={inputCls}
        />
      </Campo>

      <Campo label="Fecha de entrada">
        <input
          type="date"
          value={perfil.fecha_entrada ?? ""}
          onChange={(e) => onCampo("fecha_entrada", e.target.value || null)}
          className={inputCls}
        />
      </Campo>

      <GeoSelects
        stateId={perfil.state_id}
        cityId={perfil.city_id}
        onCampo={onCampo}
      />

      <Campo label="Habitación privada">
        <TriSelect
          value={perfil.habitacion_privada}
          onChange={(v) => onCampo("habitacion_privada", v)}
        />
      </Campo>

      <Campo label="Amoblada">
        <TriSelect
          value={perfil.amoblada}
          onChange={(v) => onCampo("amoblada", v)}
        />
      </Campo>

      <Campo label="Baño privado">
        <TriSelect
          value={perfil.bano_privado}
          onChange={(v) => onCampo("bano_privado", v)}
        />
      </Campo>
    </div>
  );
}
