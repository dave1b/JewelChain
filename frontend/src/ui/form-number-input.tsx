import { InputNumber, InputNumberProps, InputNumberValueChangeParams } from 'primereact/inputnumber';
import { classNames } from 'primereact/utils';
import React from 'react';

interface FormNumberInputProps {
  value?: number;
  id: string;
  label: string;
  hideValidationErrors?: boolean;
  onInputChange: (e: InputNumberValueChangeParams) => void;
  className?: string;
  required?: boolean;
  inputNumberProps?: InputNumberProps;
}

/**
 * A PrimeReact InputNumber within a form field with a label and an optional "required" error message.
 */
export const FormNumberInput = ({
  value,
  id,
  label,
  hideValidationErrors,
  onInputChange,
  className,
  required,
  inputNumberProps,
}: FormNumberInputProps) => {
  const showRequiredError = required && !hideValidationErrors && (!value || value !== 0);

  return (
    <div className={`field ${className}`}>
      <label htmlFor={id}>{label}</label>
      <InputNumber
        useGrouping={false}
        {...inputNumberProps}
        id={id}
        name={id}
        value={value}
        onChange={onInputChange}
        className={classNames({ 'p-invalid': showRequiredError })}
      />
      {showRequiredError && <small className="p-error">{label} ist benötigt.</small>}
    </div>
  );
};
