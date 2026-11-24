// Capa de chinchetas del mapa de inmuebles.
//
// Antes se borraban y recreaban TODOS los marcadores en cada movimiento y al
// seleccionar uno. Ahora se reconcilian por clave: lo que sigue en pantalla
// se reutiliza, solo se crea lo nuevo y se quita lo que salió. Seleccionar
// o marcar como visto solo cambia clases en una o dos chinchetas.
import * as maplibregl from "maplibre-gl";
import { createGroupPin, createPricePin, setEstadoPin } from "@/components/map/mapPins";
import { esVisto } from "@/components/map/vistos";

export class CapaChinchetas {
  constructor(map, { onClickPunto, onClickGrupo }) {
    this.map = map;
    this.onClickPunto = onClickPunto;
    this.onClickGrupo = onClickGrupo;
    this.vivos = new Map(); // clave → { marker, el, item }
    this.seleccionadoId = null;
  }

  // items: [{ clave, tipo: "grupo"|"punto", lng, lat, total?, punto? }]
  render(items) {
    const enPantalla = new Set();
    for (const item of items) {
      enPantalla.add(item.clave);
      if (this.vivos.has(item.clave)) continue;
      this.vivos.set(item.clave, this.crear(item));
    }
    for (const [clave, v] of this.vivos) {
      if (!enPantalla.has(clave)) {
        v.marker.remove();
        this.vivos.delete(clave);
      }
    }
  }

  crear(item) {
    let el;
    if (item.tipo === "grupo") {
      el = createGroupPin(item.total);
      el.addEventListener("click", (ev) => {
        ev.stopPropagation();
        this.onClickGrupo(item);
      });
    } else {
      const id = item.punto.id;
      el = createPricePin(item.punto, id === this.seleccionadoId, esVisto(id));
      el.addEventListener("click", (ev) => {
        ev.stopPropagation();
        this.onClickPunto(item.punto);
      });
    }
    const marker = new maplibregl.Marker({ element: el, anchor: "bottom" })
      .setLngLat([item.lng, item.lat])
      .addTo(this.map);
    return { marker, el, item };
  }

  // Actualiza solo las chinchetas afectadas (la anterior y la nueva).
  seleccionar(id) {
    const anterior = this.seleccionadoId;
    this.seleccionadoId = id ?? null;
    for (const pid of [anterior, this.seleccionadoId]) {
      if (pid == null) continue;
      const v = this.vivos.get(`p:${pid}`);
      if (v) {
        setEstadoPin(v.el, {
          seleccionado: pid === this.seleccionadoId,
          visto: esVisto(pid),
        });
      }
    }
  }

  destruir() {
    for (const v of this.vivos.values()) v.marker.remove();
    this.vivos.clear();
  }
}
