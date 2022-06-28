import React from 'react';
import { connect } from 'react-redux';
import { Ad as AdBase } from '../components';

const Ad = ({ currentDialogId, dialogs }) => {
  if (!dialogs.length || !currentDialogId || currentDialogId.includes('/chat')) {
    return null;
  }
  let ad;   
  dialogs.forEach((item) => {
    if (item._id === currentDialogId) {
      ad = item.ad;
    }
  });
  return (<AdBase picture={ad.picture} price={ad.price} animalName={ad.animalName} id={ad._id} />);
}

export default connect(({dialogs, user}) => ({dialogs:dialogs.items, currentDialogId:dialogs.currentDialogId, user: user.data}))(Ad);