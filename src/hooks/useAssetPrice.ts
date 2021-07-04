/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useCallback, useState } from 'react';

import { AssetPrice } from '../types/api/assetPrice';
import { useMessage } from './useMessage';

export const useAssetPrice = () => {
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);
  const [assetPrice, setAssetPrice] = useState<Array<AssetPrice>>([]);

  const getAssetPrice = useCallback((assetCode: string | undefined) => {
    setLoading(true);
    axios
      .get<Array<AssetPrice>>(`http://127.0.0.1:3000/fund/${assetCode}/?fromDate=2021-01-10&toDate=2021-05-20`)
      .then((res) => {
        if (res.data) {
          setAssetPrice(res.data);
        } else {
          showMessage({ title: 'AssetCodeに合致する資産データは見つかりません', status: 'error' });
        }
      })
      .catch(() => {
        showMessage({ title: '資産データの取得に失敗しました', status: 'error' });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { getAssetPrice, loading, assetPrice };
};
