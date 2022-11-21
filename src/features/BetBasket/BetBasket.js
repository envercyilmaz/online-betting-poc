import React, { useState } from 'react';
import './betBasket.scss';
import PropTypes from 'prop-types';

const BetBasket = ({ selectedBets, isMediumScreen, isMobileScreen }) => {
  const [isBasketVisible, setIsBasketVisible] = useState(!isMediumScreen);
  let wrapperClass = 'outer-basket';

  if (isMobileScreen) {
    wrapperClass = 'outer-basket-mobile-screen';
  } else if (isMediumScreen) {
    wrapperClass = 'outer-basket-medium-screen';
  }

  if (!isBasketVisible && isMediumScreen) {
    return (
      <div className='medium-screen-menu' onClick={() => setIsBasketVisible(true)}>
        <div className='bet-count'>{selectedBets?.list.length || '-'}</div>
        <div className='medium-screen-odd-label'>{`Oran: ${selectedBets.totalOdds}`}</div>
      </div>);
  }
  return (
    <div className={wrapperClass}>
      <div className='header-row'>
        <div className='header-text'>İDDAA KUPONUM</div>
        <div className='bet-count'>{selectedBets?.list.length || '-'}</div>
      </div>
      <div className='bet-box-container'>
        {selectedBets?.list.length ? selectedBets.list.map((item) => (
          <div className='bet-box' key={item.id}>
            <div className='bet-row'>
              <div className='label'>{`${item.id}: `}</div>
              <div className='label'>{item.name}</div>
            </div>
            <div className='bet-row'>
              <div className='label-mbs'>{item.mbs}</div>
              <div className='label'>{item.betName}</div>
              <div className='label'>{item.betValue}</div>
              <div className='label'>{item.odd}</div>
            </div>
          </div>
        )) : (
          <div className='no-bets-warning'>Kuponunuzda maç bulunmamaktadır</div>
        )}
      </div>
      {isMediumScreen && selectedBets.totalOdds > 1 ? <div className="footer">{`Oran: ${selectedBets.totalOdds}`}</div> : null}
      {isMediumScreen && <div className='basket-medium-screen-close' onClick={() => setIsBasketVisible(false)}>X</div>}
    </div>
  );
};

BetBasket.propTypes = {
  selectedBets: PropTypes.object,
  isMediumScreen: PropTypes.bool,
  isMobileScreen: PropTypes.bool,
};

export default BetBasket;
