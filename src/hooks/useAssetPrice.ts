import axios from "axios";
import { useCallback, useState } from "react";

import { AssetPrice } from "../types/api/assetPrice";
//import { useMessage } from "./useMessage";

export const useAssetPrice = () => {
  //const { showMessage } = useMessage();

  const [loading, setLoading] = useState(false);
  const [assetPrice, setAssetPrice] = useState<Array<AssetPrice>>([]);

  const getAssetPrice = useCallback(() => {
    setLoading(true);
    axios
      .get<Array<AssetPrice>>("http://127.0.0.1:3000/fund/9C311125/?fromDate=2021-01-01&toDate=2021-01-15")
      .then((res) => {
        let obj = res.data;
        console.log(obj);
        setAssetPrice(obj);
      })
      .catch(() => {
        //showMessage({ title: "ユーザ取得に失敗しました", status: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { getAssetPrice, loading, assetPrice };
};
