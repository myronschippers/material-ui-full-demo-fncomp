import React from 'react';
import { useHistory } from 'react-router-dom';

function CreatureListItem(props) {
  const history = useHistory();

  const handleClickDetails = () => {
    // navigate to creature details page
    history.push(`/creature-details/${props.creature.id}`);
  };

  const { creature } = props;

  return (
    <div className="card">
      <div className="card-bd">
        <h4 className="cardHdg">{creature.name}</h4>
        <p>
          <strong>Type:</strong> {creature.type_label}
        </p>
        <p className="cardSubHdg">{creature.physical_description}</p>
      </div>
      <div className="card-action">
        <button className="btn" onClick={handleClickDetails}>
          SEE DETAILS
        </button>
      </div>
    </div>
  );
}

export default CreatureListItem;
