import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// CUSTOM COMPONENTS
import CreatureListItem from '../CreatureListItem/CreatureListItem';

function CreatureList(props) {
  const dispatch = useDispatch();
  const creatureList = useSelector((store) => store.creatureList);

  useEffect(() => {
    dispatch({
      type: 'GET_CREATURES',
    });
  }, [dispatch]);

  return (
    <div className="stackBlock">
      <ul className="blocks">
        {creatureList.map((item, index) => {
          return (
            <li key={index}>
              <CreatureListItem creature={item} index={index} {...props} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CreatureList;
