import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

// CUSTOM COMPONENT
import AlertMessages from '../../AlertMessages/AlertMessages';
import CreatureHabitats from '../../CreatureHabitats/CreatureHabitats';
import CreatureAttributes from '../../CreatureAttributes/CreatureAttributes';
import TypeEditor from '../../TypeEditor/TypeEditor';

function Edit(props) {
  // LOCAL STATE
  const [editState, setEditState] = useState({
    hasEdited: false,
    edit_img_path: '',
    form: {
      name: '',
      img_path: '',
      physical_description: '',
      background: '',
    },
  });
  // GLOBAL STATE
  const dispatch = useDispatch();
  const creatureDetails = useSelector((store) => store.creatureDetails);

  const urlParams = useParams();
  const history = useHistory();

  useEffect(() => {
    if (!creatureDetails.id || creatureDetails.id !== urlParams.id) {
      dispatch({
        type: 'GET_CREATURE_DETAILS',
        payload: parseInt(urlParams.id),
      });
    }
  }, [dispatch]);

  /**
   * Scan through the current state and extract only updated values.
   * @returns {object}
   */
  function assembleEditedValues() {
    const possibleValueKeys = Object.keys(creatureDetails);
    const editedValues = {};

    for (let fieldKey of possibleValueKeys) {
      const currentValue = editState.form[fieldKey];
      const storedValue = creatureDetails[fieldKey];

      if (currentValue && currentValue !== storedValue) {
        editedValues[fieldKey] = currentValue;
      }
    }

    return editedValues;
  }

  const handleSubmitEdit = (event) => {
    event.preventDefault();
    const onlyEditedValues = assembleEditedValues();
    const allCreatureData = {
      ...creatureDetails,
      ...onlyEditedValues,
    };

    dispatch({
      type: 'UPDATE_CREATURE_DETAILS',
      payload: allCreatureData,
    });
    history.push(`/creature-details/${allCreatureData.id}`);
  };

  const changeType = (newTypeId) => {
    handleChangeField('type_id')({ target: { value: newTypeId } });
  };

  const handleChangeField = (fieldKey) => (event) => {
    const enteredValue = event.target.value;
    let imageFile = creatureDetails.img_path;

    if (
      fieldKey === 'img_path' &&
      (enteredValue.indexOf('.jpg') !== -1 ||
        enteredValue.indexOf('.jpeg') !== -1 ||
        enteredValue.indexOf('.png') !== -1 ||
        enteredValue.indexOf('.gif') !== -1)
    ) {
      imageFile = enteredValue;
    }

    setEditState({
      hasEdited: true,
      edit_img_path: imageFile,
      form: {
        ...editState.form,
        [fieldKey]: enteredValue,
      },
    });
  };

  const handleClickToBack = () => {
    const creatureId = urlParams.id;
    history.push(`/creature-details/${creatureId}`);
  };

  let editableImgPath = creatureDetails.img_path;

  if (editState.edit_img_path) {
    editableImgPath = editState.edit_img_path;
  }

  return (
    <div>
      <div>
        <h2>Edit Creature Details</h2>
        <button type="button" className="btn" onClick={handleClickToBack}>
          BACK TO DETAILS
        </button>
      </div>
      <form onSubmit={handleSubmitEdit}>
        <label className="vr vr_x2">
          <div>Name:</div>
          <input
            type="text"
            placeholder="Creature Name"
            defaultValue={creatureDetails.name}
            onChange={handleChangeField('name')}
          />
        </label>
        <TypeEditor
          typeId={creatureDetails.type_id}
          changeCallback={changeType}
        />
        <div className="vr">
          {editableImgPath && (
            <img src={`images/${editableImgPath}`} alt={creatureDetails.name} />
          )}
        </div>
        <label className="vr vr_x2">
          <div>Image File Name:</div>
          <input
            type="text"
            placeholder="Enter File Name:"
            defaultValue={creatureDetails.img_path}
            onChange={handleChangeField('img_path')}
          />
        </label>
        <label className="vr vr_x2">
          <div>Physical Description:</div>
          <textarea
            placeholder="What does the creature look like?"
            defaultValue={creatureDetails.physical_description}
            onChange={handleChangeField('physical_description')}
          ></textarea>
        </label>
        <label className="vr vr_x2">
          <div>Background:</div>
          <textarea
            placeholder="What does the creature look like?"
            defaultValue={creatureDetails.background}
            onChange={handleChangeField('background')}
          ></textarea>
        </label>

        <div className="vr vr_x2">
          <CreatureAttributes
            editable
            attributes={creatureDetails.attributes}
          />
        </div>

        <div className="vr vr_x2">
          <CreatureHabitats editable habitats={creatureDetails.habitats} />
        </div>

        <div>
          <button className="btn" disabled={!editState.hasEdited}>
            SAVE CHANGES
          </button>
        </div>
      </form>

      <AlertMessages />
    </div>
  );
}

export default Edit;
