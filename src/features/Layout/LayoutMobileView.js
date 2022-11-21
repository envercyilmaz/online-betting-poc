import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BetBasket from '../BetBasket';
import './layout.scss';

const LayoutMobileView = ({
  selectedBets,
  competitionList,
  eventCount,
  eventsByCompetition,
  handleBettingAreaClick,
  bettingIndexMap,
}) => {
  const [showBetBasket, setShowBetBasket] = useState(false);

  return (
    <div className='layout-mobile'>
      <div className='header'>{`Event Count: ${eventCount}`}</div>
      {competitionList?.length ? competitionList.map((comp) => {
        const list = eventsByCompetition[comp]?.list;
        return (
          <div key={comp}>
            <div className='group-header-row' >
              <div className='header-text'>{comp}</div>
            </div>
            <div onClick={handleBettingAreaClick}>
              {list?.length ? list.map((item) => (
                <div className='betting-section-mobile' key={item.C}>
                  <div className='betting-row-mobile'>
                    <div className='cell' type='id'>{item.C}</div>
                    <div className='cell' type='date'>{item.D}</div>
                    <div className='cell' type='time'>{item.T}</div>
                    <div className='cell' type='name'>{item.N}</div>
                  </div>
                  <div className='betting-header-row-mobile' >
                    <div></div>
                    <div className='mobile-header'>1</div>
                    <div className='mobile-header'>x</div>
                    <div className='mobile-header'>2</div>
                    <div></div>
                    <div className='mobile-header'>Alt</div>
                    <div className='mobile-header'>Üst</div>
                  </div>
                  <div className='betting-row-mobile'>
                    <div className='cell' type='mbs'>{item.OCG[bettingIndexMap.matchResult]?.MBS || '4'}</div>
                    <div className='btn-cell' data-bet-type='1' data-bet-value='0'>{item.OCG[bettingIndexMap.matchResult]?.OC[0]?.O || '-'}</div>
                    <div className='btn-cell' data-bet-type='1' data-bet-value='1'>{item.OCG[bettingIndexMap.matchResult]?.OC[1]?.O || '-'}</div>
                    <div className='btn-cell' data-bet-type='1' data-bet-value='2'>{item.OCG[bettingIndexMap.matchResult]?.OC[2]?.O || '-'}</div>

                    <div className='cell' type='mbs'>{item.OCG[bettingIndexMap.overUnder]?.MBS || '4'}</div>
                    <div className='btn-cell' data-bet-type='5' data-bet-value='25'>{item.OCG[bettingIndexMap.overUnder]?.OC[25]?.O || '-'}</div>
                    <div className='btn-cell' data-bet-type='5' data-bet-value='26'>{item.OCG[bettingIndexMap.overUnder]?.OC[26]?.O || '-'}</div>

                    <div className='btn-cell-last'>+99</div>
                  </div>
                </div>
              )) : null}
            </div>
          </div>
        );
      }) : null}
      {showBetBasket && (
        <div className='bet-basket-container'>
          <BetBasket selectedBets={selectedBets} isMobileScreen={true}/>
        </div>
      )}
      <div className='bet-button-mobile'>
        <div>{`Maç: ${selectedBets.list?.length}`}</div>
        {!showBetBasket ? (
          <div onClick={() => setShowBetBasket(true)}>Kuponu gör</div>
        ) : (
          <div onClick={() => setShowBetBasket(false)}>Kuponu Kapat</div>
        )}
        <div>{`Oran: ${selectedBets.totalOdds}`}</div>
      </div>
    </div>
  );
};

LayoutMobileView.propTypes = {
  selectedBets: PropTypes.object,
  eventsByCompetition: PropTypes.object,
  bettingIndexMap: PropTypes.object,
  competitionList: PropTypes.array,
  eventCount: PropTypes.number,
  handleBettingAreaClick: PropTypes.func,
  isMediumScreen: PropTypes.bool,
};

export default LayoutMobileView;
