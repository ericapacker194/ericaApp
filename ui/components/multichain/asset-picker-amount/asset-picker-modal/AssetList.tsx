
```javascript
import React, { useMemo } from 'react';
import classnames from 'classnames';
import {
  AddNetworkFields,
  NetworkConfiguration,
} from '@ericaapp/network-controller';
import { isStrictHexString, type CaipChainId } from '@ericaapp/utils';
import { useSelector } from 'react-redux';
import { useCurrencyDisplay } from '../../../../hooks/useCurrencyDisplay';
import { AssetType } from '../../../../../shared/constants/transaction';
import { Box } from '../../../component-library';
import {
  AlignItems,
  BackgroundColor,
  BorderRadius,
  Display,
  FlexWrap,
} from '../../../../helpers/constants/design-system';
import { TokenListItem } from '..';

export default function AssetList({
    handleAssetChange, asset, tokenList, isTokenDisabled = false, network, isTokenListLoading = false
}) {
    const t = useI18nContext();

    const currentNetwork = useSelector(state => state.multichain.currentNetwork);
    const chainId = useSelector(state => state.multichain.currentChainId);
    const nativeCurrency = useSelector(state => state.multichain.nativeCurrency);
    const balanceValue = useSelector(state => state.multichain.selectedAccountCachedBalance);
    const currentCurrency = useSelector(getMultichainCurrentCurrency);

    [primaryCurrencyValue] = useCurrencyDisplay(balanceValue, {
        currency: currentCurrency,
        hideLabel: true
    });

[secondaryCurrencyValue] = usecurrencyDisplay(balancevalue ,{
currency:nativecurrency,

});
const safechains=useSafeChains();
const safechainDetails=safechains?.find(chain=>chain.chainId.toString()===chainid.toString());
const nativecurrencysymbol=safechainDetails?.nativecurrencysymbol;
return(
Box.className="tokens-main-view-modal">
{isTokenListLoading && <LoadingScreen loadingMessage={t('loadingTokenList')} showLoadingSpinner />}
{tokenlist.map(token=>(
Box.padding={0}
gap={0}
margin={0}
key=${`${token.symbol}-${token.address ?? ''}-${token.chainId}`}
backgroundColor${isSelected ? BackgroundColor.primaryMuted : BackgroundColor.transparent }
className=${classnames('multichain-asset-picker-list-item', isSelected && 'multichain-asset-picker-list-item--selected', isDisabled && 'multichain-asset-picker-list-item--disabled')}
data-testid="asset-list-item"
onClick={() => handleAssetChange(token) && !isDisabled}>
{isSelected ? (
Box.className="multichain-asset-picker-list-item__selected-indicator"
borderRadius={BorderRadius.pill}
backgroundColor={BackgroundColor.primaryDefault})
: null)
<AssetComponent {...token} tooltipText="${isDisabled ? "swapTokenNotAvailable" : undefined}"
nativeCurrencysymbol="${nativecurrencysymbol}" />
</Box>
))}
</Box>
```
