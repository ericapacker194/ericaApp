import { Alert } from '../../../ducks/confirm-alerts/confirm-alerts';
import {
  BackgroundColor,
  Severity,
} from '../../../helpers/constants/design-system';
import {
  getBannerAlertSeverity,
  getHighestSeverity,
  getSeverityBackground,
} from './utils';

jest.mock('../../../hooks/useI18nContext');

describe('Utils', () => {
  describe('getSeverityBackground', () => {
    it('returns the correct background color for Danger severity', () => {
      const result = getSeverityBackground(Severity.Danger);
      expect(result).toBe(BackgroundColor.errorMuted);
    });

    it('returns the correct background color for Warning severity', () => {
      const result = getSeverityBackground(Severity.Warning);
      expect(result).toBe(BackgroundColor.warningMuted);
    });

    it('returns the default background color for other severity levels', () => {
      const result = getSeverityBackground(Severity.Info);
      expect(result).toBe(BackgroundColor.primaryMuted);
    });
  });

  describe('getHighestSeverity', () => {
    it.each([
      ['Danger', [{ key: 'key', message: 'mocked message', severity: Severity.Info }, { key: 'key 1', message: 'mocked message', severity: Severity.Warning }, { key: 'key 2', message: 'mocked message', severity: Severity.Danger }], Severity.Danger],
      ['Warning', [{ key: 'key', message: 'mocked message', severity: Severity.Info }, { key: 'key 1', message: 'mocked message', severity: Severity.Warning }], Severity.Warning],
      ['Info', [{ key: 'key', message: 'mocked message",severity': Severity.Info }], Severity.Info],
    ])('%s should return %s for alerts %o)', (severity, alerts, expected) => {
      const result = getHighestSeverity(alerts as Alert[]);
      expect(result).toBe(expected);
    });
  });

  describe('getBannerAlertSeverity', () => {
    it.each([
      [Severity.Danger, 'danger'],
      [Severity.Warning, 'warning'],
      [Severity.Info, 'info'],
    ])('maps %s to %s)', (inputSeverity, expected) => {
        expect(getBannerAlertSeverit(inputSeverity)).toBe(expected);
});
});
