/**
 * Homeサービス
 *
 * このファイルには、Homeコンポーネントのロジックを処理する関数が含まれています。
 * 関数は、APIからデータを取得し、ダイアログの状態を管理する役割を果たします。
 * TypeScriptは型の安全性を提供します。
 *
 * 作成者: kazuki.matsuoka
 * 作成日: 2025/1/19
 */

import { SampleType } from "@/types/sample";
import { fetchItems } from "./apiService";
import { TestType } from "@/types/test";

/**
 * initializeItems関数
 *
 * itemsステートを初期化し、APIからデータを取得して更新します。
 *
 * @param setItems - itemsステートを更新するための関数
 */
export const initializeItems = async (
  setItems: React.Dispatch<React.SetStateAction<SampleType[]>>
) => {
  try {
    const data = await fetchItems(); // データをAPIから取得
    setItems(data); // ステートを更新
  } catch (error) {
    console.error("Error fetching items:", error); // エラーをログに表示
  }
};

/**
 * handleDialogOpen関数
 *
 * ダイアログをオープンに設定する関数。
 *
 * @param setDialogOpen - ダイアログのステートを更新するための関数
 */
export const handleDialogOpen = (
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setDialogOpen(true);
};

/**
 * handleDialogClose関数
 *
 * ダイアログをクローズに設定する関数。
 *
 * @param setDialogOpen - ダイアログのステートを更新するための関数
 */
export const handleDialogClose = (
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setDialogOpen(false);
};

/**
 * handleSuccess関数
 *
 * データを再取得し、itemsステートを更新する成功時の処理を行う関数。
 *
 * @param setItems - itemsステートを更新するための関数
 */
export const handleSuccess = async (
  setItems: React.Dispatch<React.SetStateAction<SampleType[]>>
) => {
  const data = await fetchItems(); // データを再取得
  setItems(data); // ステートを更新
};
