export function EditFields({ formDataUsuario, onChange }) {
  return (
    <>
      <div className="flex flex-col gap-2 mt-6 md:mt-8">
        <label
          htmlFor="perfil-nombre"
          className="font-semibold text-base md:text-lg text-segundo"
        >
          Nombre
        </label>
        <input
          id="perfil-nombre"
          type="text"
          value={formDataUsuario?.name ?? ""}
          name="name"
          onChange={onChange}
          autoComplete="name"
          maxLength={80}
          className="border border-segundo/50 p-3 w-full md:w-80 text-segundo"
        />
      </div>

      <div className="flex flex-col gap-2 md:mt-8 mt-6">
        <label
          htmlFor="perfil-telefono"
          className="font-semibold text-base md:text-lg text-segundo"
        >
          Teléfono
        </label>
        <div className="flex flex-row items-center relative">
          <p className="p-3 border-r border-segundo/50 absolute">+57</p>
          <input
            id="perfil-telefono"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={formDataUsuario?.telefono ?? ""}
            name="telefono"
            onChange={onChange}
            maxLength={15}
            placeholder="300 123 4567"
            className="p-3 text-segundo border border-segundo/50 w-full md:w-80 pl-16"
          />
        </div>
      </div>
    </>
  );
}
