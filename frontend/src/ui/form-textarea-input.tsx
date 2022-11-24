import { InputTextarea, InputTextareaProps } from 'primereact/inputtextarea';
import { classNames } from 'primereact/utils';
import React, { ChangeEventHandler } from 'react';

interface FormTextareaInputProps {
  value?: string;
  id: string;
  label: string;
  hideValidationErrors?: boolean;
  onInputChange: ChangeEventHandler<HTMLTextAreaElement>;
  className?: string;
  required?: boolean;
  inputTextProps?: InputTextareaProps;
}

/**
 * A PrimeReact Inputarea within a form field with a label and an optional "required" error message.
 */
export const FormTextareaInput = ({
  value = '',
  id,
  label,
  hideValidationErrors,
  onInputChange,
  className,
  required,
  inputTextProps,
}: FormTextareaInputProps) => {
  const showRequiredError = required && !hideValidationErrors && !(value && value.trim());

  return (
    <div className={`field ${className}`}>
      <label htmlFor={id}>{label}</label>
      <InputTextarea
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
