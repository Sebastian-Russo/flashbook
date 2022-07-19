import * as React from "react";
// import * as RB from "rebass";

interface CheckBoxProps {
	checked: boolean,
	onChange: (event:any) => void;
}

const Checkbox: React.FC<CheckBoxProps> = ({ checked, onChange }) => {
  return (
    <label className="toggle-switch">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="switch" />
    </label>
  );
}

export {
	Checkbox
}
