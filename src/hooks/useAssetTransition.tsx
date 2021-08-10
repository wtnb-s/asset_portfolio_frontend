/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useCallback, useState } from 'react';

import { AssetTransition } from '../types/api/assetTransition';
import { useMessage } from './useMessage';

export const useAssetTransition = () => {
  const { showMessage } = useMessage();
  const [loadingTransition, setLoading] = useState(true);
  const [assetTransition, setAssetTransition] = useState<AssetTransition>();

  const getAssetTransition = useCallback(() => {
    let url = `http://127.0.0.1:3000/asset-transition/`;

    axios
      .get<AssetTransition>(url)
      .then((res) => {
        if (res.data) {
          setAssetTransition(res.data);
        } else {
          showMessage({ title: '資産データは見つかりません', status: 'error' });
        }
      })
      .catch(() => {
        showMessage({ title: '資産データの取得に失敗しました', status: 'error' });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { getAssetTransition, assetTransition, loadingTransition };
};
