import React from 'react';
import { createMockInternalAccount } from '../../../../test/jest/mocks';
import AccountList from '.';

const account1 = {
  ...createMockInternalAccount({
    address: '0x64a845a5b02460acf8a3d84503b0d68d028b4bb4',
    name: 'Account 1',
  }),
  addressLabel: 'Account 1 (0xbc641...29713)',
};

const account2 = {
  ...createMockInternalAccount({
    address: '0x64a845a5b02460acf8a3d84503b0d68d028b4bb7',
    name: 'Very long account name',
  }),
};

const account3 = {
  ...createMockInternalAccount({
    address: 'abcd123...efgh',
    name: 'DeFi Account',
});
}

const accounts = [account1, account2, account3];

export default {
title:'Components/UI/AccountList',argTypes:{accounts:{control:'object'},selectNewAcountViaModal:{action:'selectNewAcountViaModal'},addressLastConnectedMap:{control:'object'},nativeCurrency:{control:'text'},selectedAccounts:{control:'object'}},args:{
accounts,
selectedAccounts=new Set(['abcdef']),
addressLastConnectedMap={'abcd':"Feb-",allAreSelected:true,nativeCurrency:"USD"},
}
};
export const DefaultStory=(args)=><AccountList{...args}/>;
