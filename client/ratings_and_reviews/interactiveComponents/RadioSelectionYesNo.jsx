import React, {useState} from 'react';

function RadioSelectionYesNo(props) {
  const [selectedOption, setSelectedOption] = useState("true");

  function radioChange(e) {
    setSelectedOption(e.currentTarget.value);
    if (e.currentTarget.value === 'true') {
      props.set(true);
    } else if (e.currentTarget.value === 'false') {
      props.set(false);
    }
  }

  return (
    <div>
      <input type="radio"
             value="true"
             checked={selectedOption === "true"}
             onChange={radioChange}/>yes
      <input type="radio"
             value="false"
             checked={selectedOption === "false"}
             onChange={radioChange}/>no
    </div>
  );
}

export default RadioSelectionYesNo;