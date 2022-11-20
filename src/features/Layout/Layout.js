import React, {
  useCallback, useContext, useMemo, useState,
} from 'react';
import { BultenContext } from '../../context/BultenProvider';
import BetBasket from '../BetBasket';
import './layout.scss';

const bettingIndexMap = {
  matchResult: 1,
  doubleChance: 2,
  overUnder: 5,
};

const Layout = () => {
  const { Events: events } = useContext(BultenContext);
  const eventKeyList = Object.keys(events);
  const eventCount = eventKeyList.length;

  const [selectedBets, setSelectedBets] = useState({ list: [], totalOdds: 0 });

  const groupEventsByCompetition = (data, keyList) => {
    const groupedByLeague = {};
    keyList.forEach((key) => {
      const item = data[key];
      if (item?.LN) {
        if (groupedByLeague[item.LN]) {
          groupedByLeague[item.LN].list.push(item);
        } else {
          groupedByLeague[item.LN] = { list: [item] };
        }
      }
    });
    return groupedByLeague;
  };

  const calculateTotalOdds = (list) => {
    let val = 1;
    list.forEach((item) => {
      val *= parseFloat(item.odd);
    });
    if (!Number.isNaN(val)) {
      return val.toFixed(2);
    }
    return '';
  };

  const toggleSelectedCell = useCallback((el) => {
    const id = el.parentElement.children[0].innerHTML;
    const isElSelected = el.classList.contains('selected');
    const idExists = selectedBets.list.find((item) => item.id === id) && !isElSelected;
    if (el.innerHTML === '-' || idExists) {
      return;
    }

    if (isElSelected) {
      el.classList.remove('selected');
      setSelectedBets((prev) => {
        const prevCopy = { ...prev };
        prevCopy.list = prevCopy.list.filter((item) => String(item.id) !== id);
        prevCopy.totalOdds = calculateTotalOdds(prevCopy.list);
        return prevCopy;
      });
    } else {
      el.classList.add('selected');
      const eventData = events[id];
      const betType = el.attributes['data-bet-type'].value;
      const betValue = el.attributes['data-bet-value'].value;
      const odd = el.innerHTML;

      const betToAdd = {
        id,
        odd,
        name: eventData.N,
        betName: eventData.OCG[betType].N,
        betValue: eventData.OCG[betType].OC[betValue].N,
        mbs: eventData.OCG[betType].MBS,
      };
      setSelectedBets((prev) => {
        const prevCopy = { ...prev };
        prevCopy.list = [...prevCopy.list, betToAdd];
        prevCopy.totalOdds = calculateTotalOdds(prevCopy.list);
        return prevCopy;
      });
    }
  }, [selectedBets]);

  // Event is listened on the table rather than each cell
  const handleBettingAreaClick = useCallback((e) => {
    const el = e.target;
    if (el.classList.contains('btn-cell')) {
      toggleSelectedCell(el);
    }
  }, [selectedBets]);

  // Expensive data restructuring
  const eventsByCompetition = useMemo(() => groupEventsByCompetition(events, eventKeyList), []);
  const competitionList = Object.keys(eventsByCompetition);

  return (
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
      <BetBasket selectedBets={selectedBets}/>
    </div>

  );
};

export default Layout;
