import React from "react";

const NumberUnitInput = ({
  id,
  label = null,
  value,
  onChangeValue,
  options,
  onChangeOption = (option) => {},
  selectedOption = null,
}) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <br />
      <div className="rounded-lg border-2 border-gray-300 bg-violet-500 text-white w-full box-border">
        <input
          type="number"
          required
          className="rounded-l-lg bg-violet-600 text-white p-2 outline-none"
          id={id}
          placeholder="0.0"
          onChange={(e) => onChangeValue(e.target.value)}
          value={value}
        />
        <select
          size={1}
          className="rounded-r-lg bg-violet-500 text-white p-2 h-10 w-20 outline-none hover:cursor-pointer"
          value={
            (selectedOption && JSON.stringify(selectedOption)) ||
            JSON.stringify(options[0])
          }
          onChange={(e) => onChangeOption(JSON.parse(e.target.value))}
        >
          {options.map((option) => (
            <option value={JSON.stringify(option)} key={option.value}>
              {option.value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default NumberUnitInput;
