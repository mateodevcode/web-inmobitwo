import RadioGroupInput from "../../components/ui/RadioGroupInput";
import { OPERATION_OPTIONS } from "@/data/operation_options";

const Operacion = ({ value, onChange, getDisabled }) => {
  return (
    <RadioGroupInput
      className="mt-6"
      label="Operación"
      options={OPERATION_OPTIONS}
      value={value}
      onChange={onChange}
      getDisabled={getDisabled}
    />
  );
};

export default Operacion;
