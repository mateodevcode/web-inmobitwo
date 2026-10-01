// Sección "Ubicación del inmueble".
// Toda la lógica vive en useDatosBasicos (llamado aquí directamente).

import LocationCascadeSelect from "./LocationCascadeSelect.jsx";
import AddressMapModal from "./AddressMapModal.jsx";
import { BarrioFields } from "./BarrioFields";
import { StreetFields } from "./StreetFields";
import { ConfirmedLocation } from "./ConfirmedLocation";
import useDatosBasicos from "@/hooks/useDatosBasicos";

const LocationForm = () => {
  const {
    countries,
    states,
    cities,
    loadingCountries,
    loadingStates,
    loadingCities,
    country,
    state,
    city,
    handleCountryChange,
    handleStateChange,
    handleCityChange,
    barriosDeLaCiudad,
    barrioOptions,
    barrioValue,
    handleBarrioChange,
    barrioModo,
    handleBarrioManualChange,
    barrioNombre,
    streetName,
    handleStreetNameChange,
    streetNumber,
    handleStreetNumberChange,
    checkError,
    checking,
    handleCheckAddress,
    confirmedLocation,
    modalOpen,
    handleCloseModal,
    geocodeResult,
    handleConfirmLocation,
    editPosition,
    handleEditLocation,
  } = useDatosBasicos();

  return (
    <div className="flex max-w-xl flex-col gap-6 mt-6 md:mt-10 font-montserrat">
      <LocationCascadeSelect
        countries={countries}
        states={states}
        cities={cities}
        loadingCountries={loadingCountries}
        loadingStates={loadingStates}
        loadingCities={loadingCities}
        country={country}
        state={state}
        city={city}
        onCountryChange={handleCountryChange}
        onStateChange={handleStateChange}
        onCityChange={handleCityChange}
      />

      <BarrioFields
        city={city}
        barriosDeLaCiudad={barriosDeLaCiudad}
        barrioOptions={barrioOptions}
        barrioValue={barrioValue}
        onBarrioChange={handleBarrioChange}
        barrioModo={barrioModo}
        barrioNombre={barrioNombre}
        onBarrioManualChange={handleBarrioManualChange}
      />

      <StreetFields
        streetName={streetName}
        onStreetNameChange={handleStreetNameChange}
        streetNumber={streetNumber}
        onStreetNumberChange={handleStreetNumberChange}
        checkError={checkError}
        checking={checking}
        onCheckAddress={handleCheckAddress}
      />

      <ConfirmedLocation
        confirmedLocation={confirmedLocation}
        onEditLocation={handleEditLocation}
      />

      <AddressMapModal
        open={modalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmLocation}
        geocodeResult={geocodeResult}
        initialPosition={editPosition}
        fallbackPosition={
          city ? { latitude: city.latitude, longitude: city.longitude } : null
        }
      />
    </div>
  );
};

export default LocationForm;
