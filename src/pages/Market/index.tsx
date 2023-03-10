import { useDebounceFn, useMemoizedFn, useSetState } from "ahooks";
import { useEffect, useState } from "react";
import Detail from "./Detail";
import Filter from "./Filter";
import List from "./List";
import Sort from "./Sort";
import Style from "./Style";
import Tags from "./Tags";
import useUrlState from "@ahooksjs/use-url-state";
import useApi from "@utils/useApi";
import Decimal from "decimal.js";
import { useWeb3Object, useWeb3Utils } from "@utils/web3/useWeb3Object";
import { Drawer, message } from "antd";
import DOWN from "@img/phone/down.png";
import { useAppDispatch, useAppSelector } from "@ar/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { addSpining, delSpining, setLoginVisible } from "@ar/state";
import config from "@utils/web3/config";
import { useTranslation } from "react-i18next";

export default function Market() {
  const {
    marketNFTList: list,
    tokenName,
    nativeTokenName,
  } = useAppSelector((state) => state.web3Info); 
  const [open, setOpen] = useState(false);
  const [currenList, setCurrentList] = useState<NFTCard[]>([]); 
  const { getMarketNftList, getMyNftList } = useApi();
  const web3Object = useWeb3Object();
  const location = useLocation();
  const { account } = useWeb3React();
  const dispatch = useAppDispatch();
  const { fromWei, toWei, toNativeWei } = useWeb3Utils();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { run: refreshList } = useDebounceFn(
    () => {
      getMarketNftList(true);
    },
    {
      wait: 500,
    }
  );

  useEffect(() => {
    if (web3Object) {
      refreshList();
    }
  }, [refreshList, web3Object]);

  useEffect(() => {
    if (
      web3Object &&
      location.pathname === "/market" &&
      location.search === ""
    ) {
      refreshList();
    }
  }, [location, refreshList, web3Object]);

  //filter
  const [filter, setFilter] = useSetState<FilterBody>({
    search: "",
    state: "sale",
    price: {
      unit: "",
    },
    quality: "all",
  });
  //sort
  const [sort, setSort] = useSetState<SortBody>({
    price: "",
    time: "newest",
  });

  //reset filter list
  useEffect(() => {
    const filterFunc = (ele: NFTCard) => {
      if (filter.search && !~ele.id.indexOf(filter.search)) {
        // exist search
        return false;
      }
      if (filter.state === "sale" && !ele.isSale) {
        //select sale ntf
        return false;
      }
      if (filter.price.unit && filter.price.unit !== ele.unit) {
        //price and unit error
        return false;
      }
      if (filter.price.min && ele.price < filter.price.min) {
        //price over lowerest price
        return false;
      }
      if (filter.price.max && ele.price > filter.price.max) {
        //prive over hightest price
        return false;
      }
      if (filter.quality !== "all" && filter.quality !== ele.quality) {
        //level search
        return false;
      }
      return true;
    };
    let sortFunc: any = () => 0;
    if (sort.time === "newest") {
      sortFunc = (a: NFTCard, b: NFTCard) => {
        return b.blockNumber - a.blockNumber;
      };
    } else if (sort.time === "oldest") {
      sortFunc = (a: NFTCard, b: NFTCard) => {
        return a.blockNumber - b.blockNumber;
      };
    } else if (sort.price === "asc") {
      sortFunc = (a: NFTCard, b: NFTCard) => {
        return Decimal.sub(a.price, b.price);
      };
    } else if (sort.price === "desc") {
      sortFunc = (a: NFTCard, b: NFTCard) => {
        return Decimal.sub(b.price, a.price);
      };
    }
    setCurrentList(
      list
        .filter(filterFunc)
        .sort(sortFunc)
        .map((ele: NFTCard) => {
          return { ...ele, amount: undefined };
        })
    );
  }, [sort, filter, list]);

  const [{ nftid }, setNftid] = useUrlState<{ nftid?: string }>({
    nftid: undefined,
  });

  //buy nft
  const buyNft = useMemoizedFn(async (nftInfo: NFTCard) => {
    //check login
    if (!account || !web3Object) {
      dispatch(setLoginVisible(true));
      return;
    }
    //check have nft
    if (!nftInfo) {
      return message.error(t("message.ne"));
    }
    //chech buy the nft not is mine
    if (nftInfo.address?.toLocaleLowerCase() === account.toLocaleLowerCase()) {
      return message.warn(t("message.db"));
    }
    //start buy
    dispatch(addSpining());
    //balance enough
    if (nftInfo.unit === tokenName) {
      
      const TokenBanlance = await web3Object.ContractToken.methods
        .balanceOf(account)
        .call()
        .then((res: string) => {
          return fromWei(res);
        });
      if (TokenBanlance < nftInfo.price) {
        //balance error
        dispatch(delSpining());
        return message.warn(t("message.it"));
      }
    } else if (nftInfo.unit === nativeTokenName) {
      
      const Banlance = await web3Object.web3.eth
        .getBalance(account)
        .then((res) => {
          return web3Object.web3.utils.fromWei(res, "ether");
        });
      if (Banlance < nftInfo.price) {
        
        dispatch(delSpining());
        return message.warn(t("message.it"));
      }
    } else {
      dispatch(delSpining());
      return message.error(t("message.pr"));
    }
    //approve
    const isApprove = await web3Object.ContractCards.methods
      .isApprovedForAll(account, config.MarketAddress)
      .call();
    if (!isApprove) {
      //if not approve
      await web3Object.ContractCards.methods
        .setApprovalForAll(config.MarketAddress, true)
        .send({
          from: account,
        })
        .on("transactionHash", function (hash: any) {
          console.log( hash);
        })
        .on("receipt", async (receipt: any) => {
          console.log( receipt);
        })
        .on("error", function (error: any) {
          console.log( error);
          message.error(error.message);
          dispatch(delSpining());
        });
    }

    //to approve
    if (nftInfo.unit === tokenName) {
      //get approve
      const allowance = await web3Object.ContractToken.methods
        .allowance(account, config.MarketAddress)
        .call()
        .then((res: string) => {
          return fromWei(res);
        });

      if (allowance < nftInfo.price) {
        //approve not enough，please go to approve
        await web3Object.ContractToken.methods
          .approve(config.MarketAddress, toWei(nftInfo.price))
          .send({
            from: account,
          })
          .on("transactionHash", function (hash: any) {
            console.log( hash);
          })
          .on("receipt", async (receipt: any) => {
            console.log( receipt);
          })
          .on("error", function (error: any) {
            console.error( error);
            message.error(error.message);
            dispatch(delSpining());
          });
      }
    }
    //buy
    await web3Object.ContractMarket.methods
      .purchase(nftInfo.marketEventIndex)
      .send({
        from: account,
        value:
          nftInfo.unit === nativeTokenName
            ? toNativeWei(nftInfo.price)
            : undefined,
      })
      .on("transactionHash", function (hash: any) {
        console.log( hash);
      })
      .on("receipt", async (receipt: any) => {
        console.log( receipt);
        message.success(t("message.ps"));
        getMarketNftList(true).then(() => {
          if (nftid) {
            navigate(-1);
          }
        });
        getMyNftList(account, true);
      })
      .on("error", function (error: any) {
        console.log( error);
        message.error(error.message);
      })
      .finally(() => {
        dispatch(delSpining());
      });
  });

  return (
    <Style nftid={nftid}>
      {!nftid && (
        <>
          <div className="market-title"></div>
          <div className="market-tips">
            {t("market.tip", { count: currenList.length })}
          </div>
          <div className="market-content">
            {window.isPhone && (
              <>
                <div
                  className="filters-phone"
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  <div className="filters-phone-main">
                    <div className="icon1"></div>
                    {t("market.filters.filters")}
                    <img src={DOWN} alt="" className="down" />
                  </div>
                </div>
                <div className="search"></div>
                <Drawer
                  height={550}
                  title={t("market.filters.filters")}
                  placement={"bottom"}
                  closable={false}
                  onClose={() => setOpen(false)}
                  open={open}
                  key={"bottom"}
                >
                  <Filter
                    filter={filter}
                    setFilter={setFilter}
                    onClick={() => {
                      setOpen(false);
                    }}
                  />
                </Drawer>
              </>
            )}
            {!window.isPhone && (
              <div className="left">
                <Filter filter={filter} setFilter={setFilter} />
              </div>
            )}
            <div className="right">
              <div className="right-top">
                <div className="tags">
                  <Tags filter={filter} setFilter={setFilter} />
                </div>
                <div className="sort">
                  <Sort setSort={setSort} />
                </div>
              </div>
              <div className="right-top-line"></div>
              <div className="content">
                <List list={currenList} clickCard={setNftid} buyNft={buyNft} />
              </div>
            </div>
          </div>
        </>
      )}
      {nftid && (
        <div className="detail">
          <Detail nftid={nftid} buyNft={buyNft} />
        </div>
      )}
    </Style>
  );
}
