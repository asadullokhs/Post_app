import React from "react";

const Textarea = ({ value, setValue }) => {
  return (
    <textarea
      className="form-control"
      cols="30"
      rows="6"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="fill more info..."
    ></textarea>
  );
};

export default Textarea;
