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
  }, [dispatch]);

  const handleChangeTypeSelection = (event) => {
    const newId = parseInt(event.target.value);

    setEditorState(
      {
        selectedType: newId,
      },
      () => {
        if (
          this.props.typeId &&
          newId !== this.props.typeId &&
          this.props.changeCallback
        ) {
          props.changeCallback(newId);
        }
      }
    );
  };

  function matchTypeById(typeId) {
    if (!typeId || typeId === ' ') {
      return null;
    }

    const matchList = allTypes.filter((item, index) => {
      return item.id === typeId;
    });

    return matchList[0];
  }

  const handleClickToSelect = (event) => {
    setEditorState({
      selectedType: props.typeId,
      isSelecting: true,
    });
  };

  const definedType = matchTypeById(props.typeId);

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
