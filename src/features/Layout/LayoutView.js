import React from 'react';
import PropTypes from 'prop-types';
import BetBasket from '../BetBasket';
import './layout.scss';

const LayoutView = ({
  selectedBets,
  competitionList,
  eventCount,
  eventsByCompetition,
  handleBettingAreaClick,
  bettingIndexMap,
  isMediumScreen,
}) => (
    <div className='wrapper'>
      <div className='layout'>
        <div className='header'>{`Event Count: ${eventCount}`}</div>
        {competitionList?.length ? competitionList.map((comp) => {
          const list = eventsByCompetition[comp]?.list;
          return (
          <div key={comp}>
            <div className="group-header-row" >
              <div className='header-text'>{comp}</div>
              <div className='cell' type="header">MBS</div>
              <div className='cell' type="header">1</div>
              <div className='cell' type="header">x</div>
              <div className='cell' type="header">2</div>
              <div className='cell' type="header">MBS</div>
              <div className='cell' type="header">1-x</div>
              <div className='cell' type="header">1-2</div>
              <div className='cell' type="header">x-2</div>
              <div className='cell' type="header">MBS</div>
              <div className='cell' type="header">Alt</div>
              <div className='cell' type="header">Üst</div>
            </div>
            <div onClick={handleBettingAreaClick}>
              {list?.length ? list.map((item) => (
                <div className="betting-row" key={item.C}>
                  <div className='cell' type="id">{item.C}</div>
                  <div className='cell' type="date">{item.D}</div>
                  <div className='cell' type="time">{item.T}</div>
                  <div className='cell' type="name">{item.N}</div>

                  <div className='cell' type="mbs">{item.OCG[bettingIndexMap.matchResult]?.MBS || '4'}</div>
                  <div className='btn-cell' data-bet-type="1" data-bet-value="0">{item.OCG[bettingIndexMap.matchResult]?.OC[0]?.O || '-'}</div>
                  <div className='btn-cell' data-bet-type="1" data-bet-value="1">{item.OCG[bettingIndexMap.matchResult]?.OC[1]?.O || '-'}</div>
                  <div className='btn-cell' data-bet-type="1" data-bet-value="2">{item.OCG[bettingIndexMap.matchResult]?.OC[2]?.O || '-'}</div>

                  <div className='cell' type="mbs">{item.OCG[bettingIndexMap.doubleChance]?.MBS || '4'}</div>
                  <div className='btn-cell' data-bet-type="2" data-bet-value="3">{item.OCG[bettingIndexMap.doubleChance]?.OC[3]?.O || '-'}</div>
                  <div className='btn-cell' data-bet-type="2" data-bet-value="4">{item.OCG[bettingIndexMap.doubleChance]?.OC[4]?.O || '-'}</div>
                  <div className='btn-cell' data-bet-type="2" data-bet-value="5">{item.OCG[bettingIndexMap.doubleChance]?.OC[5]?.O || '-'}</div>

                  <div className='cell' type="mbs">{item.OCG[bettingIndexMap.overUnder]?.MBS || '4'}</div>
                  <div className='btn-cell' data-bet-type="5" data-bet-value="25">{item.OCG[bettingIndexMap.overUnder]?.OC[25]?.O || '-'}</div>
                  <div className='btn-cell' data-bet-type="5" data-bet-value="26">{item.OCG[bettingIndexMap.overUnder]?.OC[26]?.O || '-'}</div>

                  <div className='btn-cell-last'>+99</div>
                </div>
              )) : null}
            </div>
          </div>
          );
        }) : null}
      </div>
      <BetBasket selectedBets={selectedBets} isMediumScreen={isMediumScreen} />
    </div>
);

LayoutView.propTypes = {
  selectedBets: PropTypes.object,
  eventsByCompetition: PropTypes.object,
  bettingIndexMap: PropTypes.object,
  competitionList: PropTypes.array,
  eventCount: PropTypes.number,
  handleBettingAreaClick: PropTypes.func,
  isMediumScreen: PropTypes.bool,
};

export default LayoutView;
