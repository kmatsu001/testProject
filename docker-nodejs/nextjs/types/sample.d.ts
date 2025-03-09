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
export interface SampleType {
  id: number; // テスト項目の一意の識別子
  sei: string; // 姓
  mei: string; // 名
  email: string; // メールアドレス
  phone_number: string; // 電話番号
  address: string; // 住所
  city: string; // 市区町村
  created_at: datetime; // 作成日時
  updated_at: datetime; // 更新日時
}
