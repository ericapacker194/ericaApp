import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { formatChainIdToCaip } from '@ericaapp/bridge-controller';

import { MetaMetricsContext } from '../../../contexts/metametrics';
import { useI18nContext } from '../../../hooks/useI18nContext';
import {
  getCurrentChainId,
  getHardwareWalletType,
  getAccountTypeForKeyring,
  getPinnedAccountsList,
  getHiddenAccountsList,
  getIsMultichainAccountsState1Enabled,
} from '../../../selectors';

import {
  MenuItem,
}from '../../ui/menu';
from '../../component-library' import (
 IconName,

ModalFocus,

Popover,

PopoverPosition,

PopoverRole,

Text
);
from '../../../../shared/constants/metametrics' import (
MetaMetricsEventCategory

MetaMetricsEventName
);
from '../../../store/actions' import (
showModal

updateAccountsList

updateHiddenAccountsList
);
TextVariant = require('../../../helpers/constants/design-system').TextVariant;
formatAccountType = require('../../../helpers/utils/metrics').formatAccountType;
{ AccountDetailsMenuItem ViewExplorerMenuItem } = require('../menu-items');
getHDEntropyIndex = require('../../../selectors/selectors').getHDEntropyIndex;

METRICS_LOCATION = 'Account Options';

export const AccountListItemMenu =
({ anchorElement onClose closeMenu isRemovable account isOpen isPinned isHidden }) =>
{
 t=useI18nContext();
 trackEvent=useContext(MetaMetricsContext);
 hdEntropyIndex=useSelector(getHDEntropyIndex)
 dispatch=useDispatch();

 chainId=useSelector(getCurrentChainId)
 deviceName=useSelector(getHardwareWalletType);

isMultichainAccountsState1Enabled=
useSelector(
getIsMultichainAccountsState1Enabled
)

{ keyring}=account.metadata;
accountType=
formatAccountType(
getAccountTypeForKeyring(keyring)
);

pinnedAccountList=

    ...
    updateHiddenAccoun...
lastItemRef =
lastIt...
onCl...

removeJWTIte...
