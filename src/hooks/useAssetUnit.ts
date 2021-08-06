/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useCallback, useState } from 'react';

import { AssetUnit } from '../types/api/assetUnit';
import { useMessage } from './useMessage';

export const useAssetUnit = () => {
  const { showMessage } = useMessage();
  const [loadingUnit, setLoading] = useState(true);
  const [assetUnit, setAssetUnit] = useState<Array<AssetUnit>>([]);

  const getAssetUnit = useCallback((assetCode: string | undefined) => {
    let url = `http://127.0.0.1:3000/unit/${assetCode}`;

    axios
      .get<Array<AssetUnit>>(url)
      .then((res) => {
        if (res.data) {
          setAssetUnit(res.data);
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

  return { getAssetUnit, assetUnit, loadingUnit };
};
