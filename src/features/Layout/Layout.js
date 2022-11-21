import React, {
  useCallback, useContext, useMemo, useState,
} from 'react';
import { useMediaQuery } from 'react-responsive';
import { BultenContext } from '../../context/BultenProvider';
import LayoutView from './LayoutView';
import LayoutMobileView from './LayoutMobileView';
import './layout.scss';

const bettingIndexMap = {
  matchResult: 1,
  doubleChance: 2,
  overUnder: 5,
};

const Layout = () => {
  const isMediumScreen = useMediaQuery({ query: '(max-width: 1200px) and (min-width: 801px)' });
  const isMobileScreen = useMediaQuery({ query: '(max-width: 800px)' });

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
    const id = isMobileScreen
      ? el.parentElement.parentElement.children[0].children[0].innerHTML
      : el.parentElement.children[0].innerHTML;
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

  const viewProps = {
    selectedBets,
    eventCount,
    competitionList,
    eventsByCompetition,
    handleBettingAreaClick,
    bettingIndexMap,
    isMediumScreen,
    isMobileScreen,
  };

  if (isMobileScreen) {
    return <LayoutMobileView {...viewProps}/>;
  }

  return <LayoutView {...viewProps}/>;
};

export default Layout;
