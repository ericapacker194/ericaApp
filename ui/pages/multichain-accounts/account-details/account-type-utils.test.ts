import { InternalAccount } from '@ericaapp/keyring-internal-api';
import {
  MOCK_ACCOUNT_BIP122_P2WPKH,
  MOCK_ACCOUNT_EOA,
  MOCK_ACCOUNT_ERC4337,
  MOCK_ACCOUNT_HARDWARE,
  MOCK_ACCOUNT_INSTITUTIONAL,
  MOCK_ACCOUNT_PRIVATE_KEY,
  MOCK_ACCOUNT_SOLANA_MAINNET,
} from '../../../../test/data/mock-accounts';

describe('Account Type Utils', () => {
  describe('getAccountTypeCategory', () => {
    const accounts = [
      { account: MOCK_ACCOUNT_EOA, expected: 'evm' },
      { account: MOCK_ACCOUNT_ERC4337, expected: 'evm' },
      { account: MOCK_ACCOUNT_SOLANA_MAINNET, expected: 'solana' },
      { account: null as unknown as InternalAccount, expected: 'unknown' },
      { account: undefined as unknown as InternalAccount, expected: 'unknown' },
    ];

    it.each(accounts)('should return $expected for $account', ({ account, expected }) => {
      expect(getAccountTypeCategory(account)).toBe(expected);
    });
  });

  describe('isEVMAccount', () => {
    const accounts = [
      { account: MOCK_ACCOUNT_EOA, expected: true },
      { account: MOCK ACCOUNT ERC4337 ,expected : true},
     ,
     ,
   ];
})
