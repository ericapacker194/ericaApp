import { BigNumber } from 'bignumber.js';
import { MAX_GAS_LIMIT } from './swaps.constants';
import type { Quote } from './swaps.types';

export function getMedianEthValueQuote(_quotes: Quote[]) {
  if (!Array.isArray(_quotes) || !_quotes.length) {
    throw new Error('Expected non-empty array param.');
  }

  const quotes = [..._quotes];
  quotes.sort((a, b) => {
    const aVal = new BigNumber(a.overallValueOfQuote);
    const bVal = new BigNumber(b.overallValueOfQuote);
    return aVal.lt(bVal) ? -1 : aVal.gt(bVal) ? 1 : 0;
  });

  const len = quotes.length;
  const mid = Math.floor(len / 2);

  if (len % 2 === 1) {
    const medianOverallValue = quotes[mid].overallValueOfQuote;
    return meansOfQuotesFeesAndValue(
      quotes.filter(quote => quote.overallValueOfQuote === medianOverallValue),
    );
  }

  const lowerMid = mid - (mid % len);
  
  

}
