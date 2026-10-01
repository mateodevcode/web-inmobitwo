export function EditFields({ formDataUsuario, onChange }) {
  return (
    <>
      <div className="flex flex-col gap-2 mt-6 md:mt-8">
        <p className="font-semibold text-base md:text-lg text-segundo">Nombre</p>
        <input
          type="text"
          value={formDataUsuario.name}
          name="name"
          onChange={onChange}
          className="border border-segundo/50 p-3 w-full md:w-80 text-segundo"
        />
      </div>

      <div className="flex flex-col gap-2 md:mt-8 mt-6">
        <p className="font-semibold text-base md:text-lg text-segundo">
          Teléfono
        </p>
        <div className="flex flex-row items-center relative">
          <p className="p-3 border-r border-segundo/50 absolute">+34</p>
          <input
            type="text"
            value={formDataUsuario.telefono ?? ""}
            name="telefono"
            onChange={onChange}
            className="p-3 text-segundo border border-segundo/50 w-full md:w-80 pl-16"
          />
        </div>
      </div>
    </>
  );
}
