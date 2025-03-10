/**
 * TestTypeインターフェース
 *
 * このインターフェースはテスト項目の型定義を提供します。
 * 作成者: kazuki.matsuoka
 * 作成日: 2025/1/19
 *
 * id: テスト項目の一意の識別子
 * name: テスト項目の名前
 * createdDate: テスト項目が作成された日付
 */
export interface FormDataType {
  sei: string;
  mei: string;
  email: string;
  phone_number: string;
  address: string;
  city: string;
}
