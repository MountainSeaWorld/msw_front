import Style from "./Style";

import cardbg from "@img/card-bg.png";
import { message } from "antd";
import { useWeb3React } from "@web3-react/core";
import { addSpining, delSpining, setLoginVisible } from "@ar/state";
import { useCallback,useEffect, useRef, useState } from "react";
import { useBoolean, useDebounceFn, useToggle } from "ahooks";
import { useWeb3Object, useWeb3Utils } from "@utils/web3/useWeb3Object";
import { useAppDispatch, useAppSelector } from "@ar/hooks";

import Pagination from "@com/Pagination";
import config from "@utils/web3/config";
import { useMemoizedFn } from "ahooks";
import useApi from "@utils/useApi";
import { useTranslation } from "react-i18next";

import CardStake, { TemCard } from "@com/CardStake";
import Button from "@com/Button";
import { setInterval } from "timers/promises";

export default function Stake() {

  const { active, account } = useWeb3React();
  const web3Object = useWeb3Object();

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { toNativeWei, fromWei } = useWeb3Utils();
  const RootDom = useRef<HTMLElement | null>(null);
  const list = useAppSelector((state) => state.web3Info.myNftList);
  const stakeList = useAppSelector((state) => state.web3Info.myStakeNftList);
  const { getMyNftList,getMyStakeNftList } = useApi();
  const [userStakedNft, setUserStakedNft] = useState([]);
  const [viewList, setViewList] = useState<NFTCard[]>([]);
  const [pageInfo, setPageInfo] = useState({ pageSize: 20, pageIndex: 1 });
  const [tabCheck,setTabCheck] = useState(true);

  const [userEarn,setUserEarn] = useState(0);
  const [userEarnRate,setUserEarnRate] = useState(0);

  const [selectStakeNft,setselectStakeNft] = useState<String[]>([]);
  const [selectStakeNftLength,setselectStakeNftLength] = useState(0);

  useEffect(() => {
    RootDom.current = document.getElementById("root");
  }, []);

  // 获取当前质押盈利的代币数量
   async function getUserEarnAmount(){
     if (!active || !web3Object || !account) {
       dispatch(setLoginVisible(true));
       return;
     }

     const result = await web3Object.ContractMine.methods
     .earned(account).call().then((num:number)=>{
       let numto_fix = Number(fromWei(num));
       setUserEarn(Number(numto_fix.toFixed(2)))
     })

     const earn_rate = await web3Object.ContractMine.methods
     .users(account).call().then((data:any)=>{
       setUserEarnRate(data['0'] || 0)
     })

   }

  function getInitData(){
    if (account && web3Object) {
      getMyNftList(account);
      getMyStakeNftList(account)
      getUserEarnAmount()
    }
  }
  function getUpdateData(){
    if (account && web3Object) {
      console.log(stakeList)
      getMyNftList(account,true);
      getMyStakeNftList(account,true)
      tabViewList()
      console.log(stakeList)
    }
  }
  useEffect(() => {
      getInitData()
  }, [getMyNftList, account, web3Object,list,getMyStakeNftList]);

  useEffect(() => {
      tabViewList()
    }, [list,pageInfo,stakeList,tabCheck]);


  function tabViewList(){
    const start = (pageInfo.pageIndex - 1) * pageInfo.pageSize;
    const end = pageInfo.pageIndex * pageInfo.pageSize;
    if(tabCheck){
      setViewList(list.slice(start, end));
    }else{
      setViewList(stakeList.slice(start, end));
    }
  }

const changePage = useCallback(
    (pageIndex: number, pageSize: number) => {
      setPageInfo({
        pageSize: pageSize,
        pageIndex: pageIndex,
      });
    },
    [setPageInfo]
  );

 const selectBurl = useMemoizedFn((item: NFTCard) => {
    let nftid = item.id;
    let oldselectStakeNft = selectStakeNft;
    if (oldselectStakeNft.indexOf(nftid) > -1){
      let newarr = oldselectStakeNft.filter(x=>x != nftid);
      oldselectStakeNft = newarr;
    }else{
      oldselectStakeNft.push(nftid);
    }
    setselectStakeNft(oldselectStakeNft)
    setselectStakeNftLength(oldselectStakeNft.length)
  });

  // 质押
  async function stakeSend(){
    if (!active || !web3Object || !account) {
      dispatch(setLoginVisible(true));
      return;
    }
    dispatch(addSpining());
    let nftids = selectStakeNft.filter(x=>x!= '')
    if(nftids.length == 0){
      message.error('please select nft');
      dispatch(delSpining());
      return;
    }
    //检查是否授权
    const isApprove = await web3Object.ContractCards.methods
      .isApprovedForAll(account, config.MineAddress)
      .call();
    if (!isApprove) {
      //如果没授权，则授权
      await web3Object.ContractCards.methods
        .setApprovalForAll(config.MineAddress, true)
        .send({
          from: account,
        })
        .on("transactionHash", function (hash: any) {
          console.log("stake", hash);
        })
        .on("receipt", async (receipt: any) => {
          console.log("stake", receipt);
        })
        .on("error", function (error: any) {
          console.log("stake", error);
          dispatch(delSpining());
          message.error(error.message);
        });
    }
    await web3Object.ContractMine.methods.stake(nftids).send({
        from: account
    }).on("transactionHash", function (hash: any) {
        console.log("stake", hash);
    }).on("receipt", async (receipt: any) => {

      setselectStakeNft([])
      getUpdateData()
    }).finally(() => {
        dispatch(delSpining());
      });
  }

  // 赎回 UNSTAKE
  async function withdraw(){

    if (!active || !web3Object || !account) {
       dispatch(setLoginVisible(true));
       return;
     }
     let nftids = selectStakeNft.filter(x=>x!= '')
     if(nftids.length == 0){
       message.error('please select nft');
       dispatch(delSpining());
       return;
     }
     dispatch(addSpining());
     const result = await web3Object.ContractMine.methods
     .withdraw(nftids).send({from: account})
     .on("transactionHash", function (hash: any) {
        console.log("withdraw", hash);
      }).on("receipt", async (receipt: any) => {

        setselectStakeNft([]);
        getUpdateData()
      }).on("error", function (error: any) {
        console.log("withdraw", error);
        message.error(error.message);

        dispatch(delSpining());
      }).finally(() => {
        dispatch(delSpining());
      });
  }
 // 领取收益的代币：
 async function getClaim(){
   if (!active || !web3Object || !account) {
     dispatch(setLoginVisible(true));
     return;
   }

   dispatch(addSpining());
   const result = await web3Object.ContractMine.methods
   .claim().send({from: account}).then((res:any)=>{
       console.log(res)
   }).on("error", function (error: any) {
        console.log("getClaim", error);
        message.error(error.message);
        dispatch(delSpining());
      }).finally(() => {
      dispatch(delSpining());
      getInitData();
   });
 }


  function selectTabs(){
   setTabCheck(true)
   setselectStakeNft([])
  }
  function selectTabs2(){
   setTabCheck(false)
   setselectStakeNft([])
  }

  return (
    <Style>
      <div className='title'></div>
      <div className="staking-content">
        <div className="reward">
          <div className="stake-item">
            <div className="label">Reward</div>
            <div className="value">
              {userEarnRate} MSW <span className="unit">/ DAY</span>
            </div>
          </div>
        </div>
        <div className="early">
          <div className="label">Earned</div>
          <div className="value">{userEarn} MSW</div>
          <div className="btn"><div className="sc-bcXHqe jqPWEm animation-button" onClick={getClaim} >Get</div></div>
          <div className="record">Record</div>
        </div>
        <div className="tips">
          <div className="tip">
            <div className="icon green"></div>
            <div className="label">Green</div>
            <div className="value">20MSW / DAY</div>
          </div>
          <div className="tip">
            <div className="icon blue"></div>
            <div className="label">Blue</div>
            <div className="value">110MSW / DAY</div>
          </div>
        </div>
      </div>
      <div className="actions">
        <div className="tabs">
          <div className={tabCheck ? "tabs-item on" :"tabs-item off"} onClick={selectTabs} >STAKE</div>
          <div className={tabCheck ? "tabs-item off" :"tabs-item on"} onClick={selectTabs2}>STAKED</div>
        </div>
        <div className="confirm">
          <span>Selected:{selectStakeNft.length}/5</span>
          <div className="stake-btn">
            <Button type="buy" size="small"
                        callbackData={''}
                        onClick={tabCheck ? stakeSend : withdraw} >{tabCheck ? 'STAKE': 'WITHDRAW'}</Button>

          </div>
         </div>
      </div>
      {viewList.length > 0 ? (
        <>
      	<div className="list">
          {viewList.map((item) => {
            return (
              <CardStake
                key={item.id}
                data={item}
                onClick={() => {
                  selectBurl(item);
                }} />
            );
          })}
          <TemCard />
          <TemCard />
          <TemCard />
          <TemCard />
        </div>
      	<div className="paging">
      	  <Pagination
      	    total={tabCheck ? list.length : stakeList.length}
      	    pageSize={20}
      	    onChange={changePage}
      	  />
      	</div>
        </>
        ) : (
          <div className="no-data">
            <div className="no-data-title">{t("nd")}</div>
            <div className="no-data-tips">{t("nd.tip")}</div>
          </div>
        )}
    </Style>
  )

}
