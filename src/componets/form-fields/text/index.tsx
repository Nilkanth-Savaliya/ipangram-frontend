import { forwardRef } from "react";

const Text = ({ label, placeholder, type, error, name, ...rest }, ref) => {
  return (
    <div>
      <label>
        <span className="block text-sm font-medium text-gray-700">{label}</span>
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          className="w-full p-2 my-2  border-1 rounded-md border-gray-300 border"
          ref={ref}
          {...rest}
        />
        {error && <p className="text-red-500 text-sm">{error?.message}</p>}
      </label>
    </div>
  );
};

export const TextField = forwardRef(Text);
