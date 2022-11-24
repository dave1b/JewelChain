import { InputText, InputTextProps } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import React, { ChangeEventHandler } from 'react';

interface FormTextInputProps {
  value?: string;
  id: string;
  label: string;
  hideValidationErrors?: boolean;
  onInputChange: ChangeEventHandler<HTMLInputElement>;
  className?: string;
  required?: boolean;
  inputTextProps?: InputTextProps;
}

/**
 * A PrimeReact InputText within a form field with a label and an optional "required" error message.
 */
export const FormTextInput = ({
  value = '',
  id,
  label,
  hideValidationErrors,
  onInputChange,
  className,
  required,
  inputTextProps,
}: FormTextInputProps) => {
  const showRequiredError = required && !hideValidationErrors && !(value && value.trim());

  return (
    <div className={`field ${className}`}>
      <label htmlFor={id}>{label}</label>
      <InputText
        {...inputTextProps}
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
