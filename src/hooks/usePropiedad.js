
import { useRouter } from "next/navigation";// src/hooks/usePropiedad.js


const usePropiedad = () => {
  //   const { setPropiedades } = useAppContext();
  const router = useRouter();

  const onVer = (id) => router.push(`/inmueble/${id}`);
  const onEditar = (id) => router.push(`/inmueble/${id}/editar`);

  return {
    onEditar,
    onVer,
  };
};

export default usePropiedad;
