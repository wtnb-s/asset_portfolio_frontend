/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useCallback, useState } from 'react';

import { AssetPrice } from '../types/api/assetPrice';
import { useMessage } from './useMessage';

export const useAssetPrice = () => {
  const { showMessage } = useMessage();
  const [loadingPrice, setLoading] = useState(false);
  const [assetPrice, setAssetPrice] = useState<Array<AssetPrice>>([]);

  const getAssetPrice = useCallback((assetCode: string | undefined) => {
    setLoading(true);
    axios
      .get<Array<AssetPrice>>(`http://127.0.0.1:3000/fund/${assetCode}`)
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

  return { getAssetPrice, assetPrice, loadingPrice };
};
