import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

// CUSTOM COMPONENTS
import AlertMessages from '../../AlertMessages/AlertMessages';
import CreatureAttributes from '../../CreatureAttributes/CreatureAttributes';
import CreatureHabitats from '../../CreatureHabitats/CreatureHabitats';

function Details(props) {
  const dispatch = useDispatch();
  const creatureDetails = useSelector((store) => store.creatureDetails);
  const urlParams = useParams();
  const history = useHistory();

  useEffect(() => {
    dispatch({
      type: 'GET_CREATURE_DETAILS',
      payload: parseInt(urlParams.id),
    });
  }, []);

  const handleClickBACK = (event) => {
    history.push('/');
  };

  const handleClickToEdit = (event) => {
    if (!creatureDetails.id) {
      return; // exit early if the id is not available
    }

    history.push(`/creature-edit/${creatureDetails.id}`);
  };

  return (
    <div>
      <div>
        <h2>Creature Details</h2>
        <button className="btn" onClick={handleClickBACK}>
          BACK TO LIST
        </button>
        <button className="btn" onClick={handleClickToEdit}>
          EDIT
        </button>
      </div>
      <div>
        <h3>{creatureDetails.name}</h3>
        <p>
          <strong>Type:</strong> {creatureDetails.type_label}
        </p>
        <div>
          <div>
            {creatureDetails.img_path && (
              <img
                src={`images/${creatureDetails.img_path}`}
                alt={creatureDetails}
              />
            )}
          </div>
          <div>
            <p>
              <strong>Physical Description:</strong>{' '}
              {creatureDetails.physical_description}
            </p>
            <p>
              <strong>Background:</strong> {creatureDetails.background}
            </p>
          </div>
        </div>

        <div>
          <CreatureAttributes attributes={creatureDetails.attributes} />
        </div>

        <div>
          <CreatureHabitats habitats={creatureDetails.habitats} />
        </div>
      </div>

      <AlertMessages />
    </div>
  );
}

export default Details;
