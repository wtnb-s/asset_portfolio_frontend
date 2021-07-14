/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useCallback, useState } from 'react';

import { AssetMaster } from '../types/api/assetMaster';
import { useMessage } from './useMessage';

export const useAssetMaster = () => {
  const { showMessage } = useMessage();
  const [loadingMaster, setLoading] = useState(false);
  const [assetMaster, setAssetMaster] = useState<Array<AssetMaster>>([]);

  const getAssetMaster = useCallback((assetCode: string | undefined) => {
    setLoading(true);
    let url = `http://127.0.0.1:3000/asset/`;
    if (assetCode) {
        url += `?assetCode=${assetCode}`;
    }
    axios
      .get<Array<AssetMaster>>(url)
      .then((res) => {
        if (res.data) {
          setAssetMaster(res.data);
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

  return { getAssetMaster, assetMaster, loadingMaster };
};