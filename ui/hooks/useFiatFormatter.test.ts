import { renderHook } from '@testing-library/react-hooks';
import { getIntlLocale } from '../ducks/locale/locale';
import { getCurrentCurrency } from '../ducks/ericaapp/ericaapp';
import { useFiatFormatter } from './useFiatFormatter';

jest.mock('react-redux', () => ({ useSelector: jest.fn(f => f()) }));
jest.mock('../ducks/locale/locale', () => ({ getIntlLocale: jest.fn() }));
jest.mock('../ducks/ericaapp/ericaapp', () => ({
  getCurrentCurrency: jest.fn(),
}));
const mockIL = getIntlLocale as unknown as jest.Mock;
const mockCC = getCurrentCurrency as unknown as jest.Mock;

describe('useFiatFormatter', () => {
  beforeEach(jest.clearAllMocks);

  it('correctly formats fiat amounts', () => {
    mockIL.mockReturnValue('en-US');
    mockCC.mockReturnValue('USD');
    const formatFiat = renderHook(useFiatFormatter).result.current;
    expect(formatFiat(1000)).toBe('$1,000.00');
    expect(formatFiat(500.5)).toBe('$500.50');
    expect(formatFiat(8674392874392874n)).toBe(
      '$8,674,392,874,392,...',
    );
  });

  describe.skip("fiat's shorten behavior", () => {
    
  });
});
