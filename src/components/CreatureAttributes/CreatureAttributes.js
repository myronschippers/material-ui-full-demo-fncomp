import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

function CreatureAttributes(props) {
  // ON MOUNT OF COMPONENT
  useEffect(() => {
    dispatch({ type: 'GET_ALL_ATTRIBUTES' });
  }, [dispatch]);

  // LOCAL STATE
  const [attrState, setAttrState] = useState({
    isAdding: false,
    newAttributeId: '',
  });
  // GLOBAL STATE
  const dispatch = useDispatch();
  const creatureDetails = useSelector((store) => store.creatureDetails);
  const allAttributes = useSelector((store) => store.allAttributes);

  const handleClickDeleteAttr = (attribute) => (event) => {
    dispatch({
      type: 'DELETE_CREATURE_ATTRIBUTE',
      payload: {
        attribute: matchAvailableAttributes(attribute),
        creatureId: creatureDetails.id,
      },
    });
  };

  function matchAvailableAttributes(attributeTag) {
    const matchedAttributes = allAttributes.filter(
      (item) => attributeTag === item.tag
    );
    return matchedAttributes[0];
  }

  const handleClickAddAttribute = () => {
    dispatch({
      type: 'SAVE_CREATURE_ATTRIBUTE',
      payload: {
        attributeId: attrState.newAttributeId,
        creatureId: creatureDetails.id,
      },
    });
    toggleAdd();
  };

  const handleChangeSelection = (event) => {
    setAttrState({
      newAttributeId: parseInt(event.target.value),
    });
  };

  const toggleAdd = () => {
    console.log('Toggle Add');
    setAttrState({
      isAdding: !attrState.isAdding,
      newAttributeId: !attrState.isAdding ? '' : attrState.newAttributeId,
    });
  };

  const { attributes, editable } = props;
  const selectableOptions = allAttributes.filter((attrOpt, index) => {
    let matchWithSaved = attributes.filter(
      (attrSaved) => attrOpt.tag === attrSaved
    );
    return matchWithSaved.length === 0;
  });

  return (
    <div>
      <h4>Attributes:</h4>
      <ul className="blocks">
        {attributes.map((item, index) => {
          return (
            <li key={index}>
              {item}
              {editable && (
                <button type="button" onClick={handleClickDeleteAttr(item)}>
                  x
                </button>
              )}
            </li>
          );
        })}
        {editable && !attrState.isAdding && (
          <li>
            <button type="button" onClick={toggleAdd}>
              ADD
            </button>
          </li>
        )}
      </ul>
      {attrState.isAdding && (
        <div>
          <select onChange={handleChangeSelection}>
            <option value="">Select an Attribute</option>
            {selectableOptions.map((item, index) => {
              return (
                <option key={index} value={item.id}>
                  {item.tag}
                </option>
              );
            })}
          </select>
          <div>
            <button
              type="button"
              className="btn"
              onClick={handleClickAddAttribute}
            >
              Add Attribute
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreatureAttributes;
