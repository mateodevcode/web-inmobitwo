// Sección "Datos de contacto" (presentacional).
// La lógica (teléfonos, preferencia, PATCH silencioso) vive en useDatosBasicos.

import useDatosBasicos from "@/hooks/useDatosBasicos";
import { ContactNameField } from "./ContactNameField";
import { PhonesField } from "./PhonesField";
import { ContactPreference } from "./ContactPreference";
import { ContactContinue } from "./ContactContinue";

const ContactForm = () => {
  const {
    usuario,
    contactName,
    handleNameChange,
    phones,
    handlePhoneChange,
    handleAddPhone,
    handleRemovePhone,
    countryCode,
    handleCountryCodeChange,
    preference,
    handleChangePreference,
    opcionesTelefono,
    selectedPhoneValue,
    handleChangeSelectedPhone,
    guardandoContacto,
    handleContinuarContacto,
  } = useDatosBasicos();

  return (
    <div className="flex max-w-xl flex-col gap-10 font-poppins">
      <div className="flex max-w-xl flex-col gap-6">
        <h2 className="text-2xl font-bold text-slate-900 mt-10">
          Tus datos de contacto
        </h2>

        <ContactNameField
          email={usuario?.email}
          name={contactName}
          onNameChange={handleNameChange}
        />

        <PhonesField
          phones={phones}
          onPhoneChange={handlePhoneChange}
          onAddPhone={handleAddPhone}
          onRemovePhone={handleRemovePhone}
          countryCode={countryCode}
          onCountryCodeChange={handleCountryCodeChange}
        />
      </div>

      <ContactPreference
        preference={preference}
        onChange={handleChangePreference}
        phoneOptions={opcionesTelefono}
        selectedPhone={selectedPhoneValue}
        onSelectPhone={handleChangeSelectedPhone}
      />

      <ContactContinue
        saving={guardandoContacto}
        onContinue={handleContinuarContacto}
      />
    </div>
  );
};

export default ContactForm;
