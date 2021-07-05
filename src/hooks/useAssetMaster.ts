/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useCallback, useState } from 'react';

import { AssetMaster } from '../types/api/AssetMaster';
import { useMessage } from './useMessage';

export const useAssetMaster = () => {
  const { showMessage } = useMessage();

  const [assetMaster, setAssetMaster] = useState<Array<AssetMaster>>([]);

  const getAssetMaster = useCallback((assetCode: string | undefined) => {
    axios
      .get<Array<AssetMaster>>(`http://127.0.0.1:3000/asset/?assetCode=${assetCode}`)
      .then((res) => {
        if (res.data) {
          setAssetMaster(res.data);
        } else {
          showMessage({ title: 'AssetCodeに合致する資産データは見つかりません', status: 'error' });
        }
      })
      .catch(() => {
        showMessage({ title: '資産データの取得に失敗しました', status: 'error' });  
      });
  }, []);

  return { getAssetMaster, assetMaster };
};