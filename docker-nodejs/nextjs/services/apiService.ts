/**
 * apiService.ts
 *
 * このファイルには、バックエンドAPIとのやり取りを行う関数が含まれています。
 * repository層から関数をインポートし、それらをエクスポートします。
 *
 * 作成者: kazuki.matsuoka
 * 作成日: 2025/1/19
 */

import {
  fetchItems,
  updateItem,
  createItem,
} from "../repository/testRepository";

// インポートした関数をエクスポート
export { fetchItems, updateItem, createItem };
