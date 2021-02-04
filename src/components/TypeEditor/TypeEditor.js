import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function TypeEditor(props) {
  // LOCAL STATE
  const [editorState, setEditorState] = useState({
    selectedType: '',
    isSelecting: false,
  });
  // GLOBAL STATE
  const dispatch = useDispatch();
  const allTypes = useSelector((store) => store.allTypes);

  useEffect(() => {
    dispatch({
      type: 'GET_ALL_TYPES',
    });
  }, []);

  const handleChangeTypeSelection = (event) => {
    const newId = parseInt(event.target.value);

    if (props.typeId && newId !== props.typeId && props.changeCallback) {
      console.log('TypeEditor, newId:', newId);
      props.changeCallback(newId);
    }

    setEditorState({
      selectedType: newId,
    });
  };

  function matchTypeById(typeId, defaultId) {
    let matchId = typeId != null ? typeId : defaultId;
    console.log('TypeEditor, matchTypeById - typeId:', typeId);
    console.log('TypeEditor, matchTypeById - defaultId:', defaultId);
    console.log('TypeEditor, matchTypeById - matchId:', matchId);

    if (!matchId || matchId === ' ') {
      return null;
    }

    const matchList = allTypes.filter((item, index) => {
      return item.id === matchId;
    });

    return matchList[0];
  }

  const handleClickToSelect = (event) => {
    setEditorState({
      selectedType: props.typeId != null ? props.typeId : props.defaultId,
      isSelecting: true,
    });
  };

  const definedType = matchTypeById(props.typeId, props.defaultId);

  return (
    <label className="vr vr_x2">
      <div>Type:</div>
      {definedType != null && !editorState.isSelecting && (
        <div onClick={handleClickToSelect}>{definedType.label}</div>
      )}
      {editorState.isSelecting && (
        <select
          value={editorState.selectedType}
          onChange={handleChangeTypeSelection}
        >
          <option type="">Select a Type</option>
          {allTypes.map((item, index) => {
            return (
              <option key={index} value={item.id}>
                {item.label}
              </option>
            );
          })}
        </select>
      )}
    </label>
  );
}

export default TypeEditor;
