import React, {useState} from 'react';
import { RadioGroup, RadioButton } from 'react-radio-buttons';

function RadioSelection(props) {
  const [selectedOption, setSelectedOption] = useState(1);

  function radioChange(e) {
    setSelectedOption(e.currentTarget.value);
    props.set(e.currentTarget.value);
  }

  return (
    <div>
      <input type="radio"
             value="1"
             checked={selectedOption === "1"}
             onChange={radioChange} />

      <input type="radio"
             value="2"
             checked={selectedOption === "2"}
             onChange={radioChange}/>

      <input type="radio"
             value="3"
             checked={selectedOption === "3"}
             onChange={radioChange} />

      <input type="radio"
             value="4"
             checked={selectedOption === "4"}
             onChange={radioChange}/>

      <input type="radio"
             value="5"
             checked={selectedOption === "5"}
             onChange={radioChange}/>
    </div>
  );
}

export default RadioSelection;