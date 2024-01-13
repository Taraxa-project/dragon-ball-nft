import React, { FC } from "react";
import { Control, Controller } from "react-hook-form";
import { Checkbox, CheckboxProps } from "@mui/material";

export interface FormCheckboxProps extends CheckboxProps {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  label: string;
  valueChanged?: () => void;
  checked?: boolean;
}

export const FormCheckbox: FC<FormCheckboxProps> = ({
  name,
  control,
  checked,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => (
        <Checkbox
          checked={checked}
          onChange={onChange}
          inputProps={{ "aria-label": "controlled" }}
        />
      )}
    />
  );
};
