import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

function CreatureHabitats(props) {
  // LOCAL STATE
  const [habitatState, setHabitatState] = useState({
    isAdding: false,
    newHabitatId: '',
  });
  // GLOBAL STATE
  const dispatch = useDispatch();
  const allHabitats = useSelector((store) => store.allHabitats);
  const creatureDetails = useSelector((store) => store.creatureDetails);

  // COMPONENT HAS BEEN MOUNTED
  useEffect(() => {
    dispatch({ type: 'GET_ALL_HABITATS' });
  }, [dispatch]);

  const handleClickDeleteHabitat = (habitat) => (event) => {
    dispatch({
      type: 'DELETE_CREATURE_HABITAT',
      payload: {
        habitat: matchAvailableHabitats(habitat),
        creatureId: creatureDetails.id,
      },
    });
  };

  function matchAvailableHabitats(habitatLabel) {
    const matchedHabitats = allHabitats.filter(
      (item) => habitatLabel === item.label
    );
    return matchedHabitats[0];
  }

  const handleClickAddHabitat = () => {
    dispatch({
      type: 'SAVE_CREATURE_HABITAT',
      payload: {
        habitatId: habitatState.newHabitatId,
        creatureId: creatureDetails.id,
      },
    });
    toggleAdd();
  };

  const handleChangeSelection = (event) => {
    setHabitatState({
      newHabitatId: parseInt(event.target.value),
    });
  };

  const toggleAdd = () => {
    console.log('Toggle Add');
    setHabitatState({
      isAdding: !habitatState.isAdding,
      newHabitatId: !habitatState.isAdding ? '' : habitatState.newHabitatId,
    });
  };

  function seeHabitatSelectionDetails() {
    let habitatDetails = null;

    if (habitatState.newHabitatId) {
      const matchedHabitat = allHabitats.filter((item) => {
        return habitatState.newHabitatId === item.id;
      });
      habitatDetails = <p>{matchedHabitat[0].terrain}</p>;
    }

    return habitatDetails;
  }

  const { habitats, editable } = props;
  const selectableOptions = allHabitats.filter((habitatOpt, index) => {
    let matchWithSaved = habitats.filter(
      (habitatSaved) => habitatOpt.label === habitatSaved
    );
    return matchWithSaved.length === 0;
  });

  return (
    <div>
      <h4>Habitats:</h4>
      <ul className="blocks">
        {habitats.map((item, index) => {
          return (
            <li key={index}>
              {item}
              {editable && (
                <button type="button" onClick={handleClickDeleteHabitat(item)}>
                  x
                </button>
              )}
            </li>
          );
        })}
        {editable && !habitatState.isAdding && (
          <li>
            <button type="button" onClick={toggleAdd}>
              ADD
            </button>
          </li>
        )}
      </ul>
      {habitatState.isAdding && (
        <div>
          <select onChange={handleChangeSelection}>
            <option value="">Select a Habitat</option>
            {selectableOptions.map((item, index) => {
              return (
                <option key={index} value={item.id}>
                  {item.label}
                </option>
              );
            })}
          </select>
          {seeHabitatSelectionDetails()}
          <div>
            <button
              type="button"
              className="btn"
              onClick={handleClickAddHabitat}
            >
              Add Habitat
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default connect(mapStoreToProps('allHabitats', 'creatureDetails'))(
  CreatureHabitats
);
