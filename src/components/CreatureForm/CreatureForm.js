import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

function CreatureForm() {
  const [formFields, setFormFields] = useState({
    enteredName: '',
    enteredOrigin: '',
  });
  const dispatch = useDispatch();

  const handleClickAdd = () => {
    // dispatch to redux
    dispatch({
      type: 'ADD_TO_CREATURE_LIST',
      payload: {
        name: formFields.enteredName,
        origin: formFields.enteredOrigin,
      },
    });

    setFormFields({
      enteredName: '',
      enteredOrigin: '',
    });
  };

  const handleAllChange = (fieldKey) => (event) => {
    setFormFields({
      ...formFields,
      [fieldKey]: event.target.value,
    });
  };

  return (
    <div className="stackBlock">
      <h2>Add a New Creature</h2>
      <div className="formWrap">
        <input
          className="field"
          type="text"
          placeholder="Creature Name"
          onChange={handleAllChange('enteredName')}
          value={formFields.enteredName}
        />
        <input
          className="field"
          type="text"
          placeholder="Creature Origin"
          onChange={handleAllChange('enteredOrigin')}
          value={formFields.enteredOrigin}
        />
        <button className="btn" onClick={handleClickAdd}>
          ADD CREATURE
        </button>
      </div>
    </div>
  );
}

export default CreatureForm;
