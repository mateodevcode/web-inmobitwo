// views/admin/rutas/AdminRutasPage.jsx

import { FrontendRoutes } from "./components/FrontendRoutes";
import { BackendRoutes } from "./components/BackendRoutes";

const AdminRutasPage = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-white font-montserrat">
      <h1 className="text-xl font-bold mb-1 text-black">Mapa de rutas</h1>
      <p className="text-sm text-black/50 mb-6">
        Frontend: clickeable, navega de verdad. Backend: informativo, no es
        navegable.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FrontendRoutes />
        <BackendRoutes />
      </div>
    </div>
  );
};

export default AdminRutasPage;
