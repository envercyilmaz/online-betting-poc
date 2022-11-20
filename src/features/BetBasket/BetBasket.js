import React from 'react';
import './betBasket.scss';
import PropTypes from 'prop-types';

const BetBasket = ({ selectedBets }) => (
    <div className='outer-basket'>
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
      {selectedBets.totalOdds > 1 ? <div className="footer">{`Oran: ${selectedBets.totalOdds}`}</div> : null}
    </div>
);

BetBasket.propTypes = {
  selectedBets: PropTypes.object,
};

export default BetBasket;
