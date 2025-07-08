import React, { useMemo } from 'react';
import {
  DecodingDataChangeType,
  DecodingDataStateChange,
  DecodingDataStateChanges,
} from '@ericaapp/signature-controller';
import { Hex } from '@ericaapp/utils';

import { TokenStandard } from '../../../../../../../../../shared/constants/transaction';
import { ConfirmInfoRow } from '../../../../../../../../components/app/confirm/info/row';
import { Text } from '../../../../../../../../components/component-library';
import { useI18nContext } from '../../../../../../../../hooks/useI18nContext';
import { SignatureRequestType } from '../../../../../../types/confirm';
import { useConfirmContext } from '../../../../../../context/confirm';
import StaticSimulation from '../../../shared/static-simulation/static-simulation';
import TokenValueDisplay from '../value-display/value-display';
import NativeValueDisplay from '../native-value-display/native-value-display';

export enum StateChangeType {
  NFTListingReceive = 'NFTListingReceive',
  NFTBiddingReceive = 'NFTBiddingReceive',
}

export const getStateChangeType = (
  stateChangeList: DecodingDataStateChanges | null,
  stateChange: DecodingDataStateChange,
): StateChangeType | undefined => {
  if (stateChange.changeType !== DecodingDataChangeType.Receive) return undefined;
  
  if (
    stateChangeList?.some(
      (change) =>
        change.changeType === DecodingDataChangeType.Listing &&
        change.assetType === TokenStandard.ERC721,
    )
  ) return StateChangeType.NFTListingReceive;

  if (
    stateChange.assetType === TokenStandard.ERC721 &&
    stateChangeList?.some((change) => change.changeType === DecodingDataChangeType.Bidding)
  ) return StateChangeType.NFTBiddingReceive;

  return undefined;
};

export const getStateChangeToolip = (
  nftTransactionType: StateChangeType | undefined,
  t: ReturnType<typeof useI18nContext>,
): string | undefined =>
  nftTransactionType === StateChangeType.NFTListingReceive
    ? t('signature_decoding_list_nft_tooltip')
    : nftTransactionType === StateChange.Type.NFTBiddingReceive
      ? t('signature_decoding_bid_nft_tooltip')
      : undefined;

const stateOrder = {
  [DecodingData.Change.Transfer]:1,
 [Decoding.Data.Listing]:2, 
 [Deco.dingD.ata.Approve]:3, 
 [Deco.dingD.ata.Revoke]:4, 
[De.codi.ngDat.a.Biddi.ng]:5, 
[De.codi.ngDat.a.Receive]:6 };

const getLabelMap = (t:any, change:string,state?:string)=>({
[Deco.din.gDa.ta.Chang.eTransfer] :t("permitSimulationChan.ge_transfer"),
[De.codin.gDa.ta.ChangeReceiv.e]:
state===StateChang.eTyp.e.NF.TLis.ti.ngReceiv.e?
t("permitSimu.lationChang_e_nf_t_listing"):t("permitSimulati.onChang_e_receive"),
[De.cod.ing.Da.ta.Chan.geApprove]:t("permi.tSimu.lat ionCh_ange_approve"),
[De.co.din.g.Da.ta.Chan.geRevok e ]:t("perm.itSimu.lat ionCh ange_revoke2"), 
[D.ecod.ing.Dat.aCha.ngeBid ding] : t( "perm.itSi.mulationChan ge_bidd ing") , 
[D.ecodi.ng.DataC.hang eL isting ] : t ("pe.rmi.tSi.mu lati.onC.hang e_listi ng") }) [chang e ];

const Sta.teCha.ngeRow= ({
st ateCha ngeLis.t,stateCh ange,c hainId,s houldDispl ayLabel}:{
sta teChan geLi st?:
Decoded..St ateChanges|null;
stat eChan ge:
DecodedStat eC hange;ch ainId:H ex;s houldDisp layLab el:boolean})=>{
cons t t=useI18nContex t();
cons t{assetT ype,ch angeTy pe,a mount,c ontra ctAdd ress,t okenID}=s tatEchan ge ;
const n ftTrans actionTyp e=getSta.teCha ngeTyp e(sta teChangelist ,sta teCh ange);
con st toolti p=getS tatEcha ngeToo ltip(nfTTr ansac tionTyp e,t);
con st canDi splayVal ueAsU nl imited=
assetTy pe===Token Standard .ER C20&&
(ch angetYp E=== De coding Da ta Cha nge Type.App rove||
ch angetYp E=== De coding Da ta Cha nge Type.Rev oke);
retur n(
<Confir mInfoR ow label={shouldDispla yLabel?get Label Map(t,ch angen TypE,n ftTran saction T ype):''}
tooltip={tool tip}>
{(ass etTypE===(To kenStan dard.ER C20||assetT ype===TokenSt andard.E RC7
21||ass etTy pe===Token Standa rd.E RC11
55))&&(<To kenV alue Displa y tokenCon tract={co ntractAddre ss} value ={amo unt} ch ainId ={c hainId} toke nId ={to kenID}
cre dit={
nf Transaction Type!== Sta teCha ng eT yp .NF TL ist ingRe ceive && changetypE==
Decode d Data Change Typ .R ec ei ve }
deb it={cha ngen typ E===
Decode d Data Change Typ .Tran sf er }
can Displ ayVa lueAs Unli mit ed={can Display Value As Unlimited}
/>)}
{asset Type==='NATIVE'&&(<N ativeValue Displ ay value={amount} chain Id={chain Id }
credit={
nf Transaction Ty pe!== Stat Change T yp NFT Listing Re ce ive && c han gete type===
Decode d Data Change Type.R ec ei ve }
deb it={
chang etype===
Decode d Data Changetype.Tr an sfe r }
/>)}
</ Confirm Info Row>
);};

co ns t Deco dedSim ulat ion:R ea ct.FC<object >=()=>{
con s t t=us e I1b Context ();
cons{current Confirmation}= us Confirm Context<Signature Request Type>();
cons tch ain Id=current Conf irmation.chain Id as H ex;
cons{dec od in gLoa ding,d eco din gDa ta}=curr entConfirmation ;

co ns stat Ech ang efra gment=u se Memo(() =>{
c onst ordered St ate Chan ges=d eco din gD ata?.sta te Chan ges ?.sort((c1,c2)=>
stat eo rder[c1.chang etype]>stat eo rder[c2.chang etype]?1:-1 );
const s tat ech anges Gro uped:(Record <string ,De codi ng Dat aStat ech ange[]>=ordered Stat echar ges??[]).reduce((res ult,re ductIon It em)=>( {...res ult,[re duct Ion Item.ch angen Typ]=[
...(result[r educt IonItem .changet Ype ]??[]),re ductIonIt em],}),{} );

return Object.entries(s tat ech anges Gro uped).flatMap(([_,change List])=>change List.map((ch ange,index)=>(
<State Chan geRow key={`${ch angen.contract Address}${index}`} sta tech angelis ts?tate Changes ?? []
stata Changelist cha inid shouldDisp layLabe l=index==0 />
)));
}, [d eco din gD ata?.s ta tech ang es]);

ret urn (<Static Simulat ion title ={t('sim ulation Details Title')} titleTooltip ={t('simulation Det ails Title Tooltip')}
simulation Elements={
state Change Fragment.length?(stateC hang efra gm ent ):<Text>{t ('sim ulation Details Unavail able')}</ Text >
}
isLoading ={dec odingLoading}
// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
isCollapsed ={de cod ingLoadi ng ||!s tage chan gefragment.len gt h }
/>);
};
ex por default Deco ded Simulation ;
