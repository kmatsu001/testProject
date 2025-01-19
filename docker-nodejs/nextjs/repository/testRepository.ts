/**
 * TESTリポジトリ
 *
 * このファイルには、バックエンドAPIとのやり取りを行う関数が含まれています。
 * 環境変数からAPIのベースURLを取得し、APIリクエストを実行してデータを取得、更新、作成する機能を提供します。
 *
 * Author: kazuki.matsuoka
 * Date: 2025/1/19
 */

import axios from "axios";
import { TestType } from "@/types/test";

// 環境変数からAPIのベースURLを取得
const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/Test`;

/**
 * fetchItems関数
 *
 * APIからアイテムを取得する非同期関数
 *
 * @returns アイテムの配列
 */
export const fetchItems = async (): Promise<TestType[]> => {
  try {
    const response = await axios.get<TestType[]>(`${API_BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};

/**
 * updateItem関数
 *
 * APIにアイテムを更新する非同期関数
 *
 * @param id - 更新するアイテムのID
 * @param updatedItem - 更新されたアイテムのデータ
 * @returns 更新されたアイテム
 */
export const updateItem = async (
  id: number,
  updatedItem: Partial<TestType>
): Promise<TestType> => {
  try {
    const response = await axios.put<TestType>(
      `${API_BASE_URL}/${id}`,
      updatedItem
    );
    return response.data;
  } catch (error) {
    console.error("Error updating item:", error);
    throw error;
  }
};

/**
 * createItem関数
 *
 * APIにアイテムを作成する非同期関数
 *
 * @param name - 作成するアイテムの名前
 * @returns 作成されたアイテム
 */
export const createItem = async (name: string): Promise<TestType> => {
  try {
    const response = await axios.post<TestType>(`${API_BASE_URL}`, { name });
    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error("Failed to create item");
    }
  } catch (error) {
    console.error("Error creating item:", error);
    throw error;
  }
};
