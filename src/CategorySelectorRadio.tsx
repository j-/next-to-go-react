import { useId, type FC, type InputHTMLAttributes } from 'react';

export type CategorySelectorRadioProps = InputHTMLAttributes<HTMLInputElement>;

/**
 * Renders a fragment containing an input/label pair. Automatically associates
 * the label with the input via an internally generated ID.
 */
export const CategorySelectorRadio: FC<CategorySelectorRadioProps> = ({
  children,
  ...props
}) => {
  const id = `CategorySelectorRadio-${useId()}`;

  return (
    <>
      <input
        id={id}
        type="radio"
        className="hidden peer"
        {...props}
      />

      <label
        htmlFor={id}
        className="cursor-pointer inline-flex items-center w-full p-4 rounded bg-gray-700 text-gray-50 peer-checked:bg-red-500 peer-checked:text-white peer-checked:ring ring-red-800 ring-offset-1 opacity-90 hover:opacity-100 active:bg-gray-800 active:peer-checked:bg-red-600"
      >
        {children}
      </label>
    </>
  );
};
