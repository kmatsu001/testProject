/**
 * HeaderDiv.tsx
 *
 * このファイルにはHeaderDivコンポーネントが含まれています。このコンポーネントは
 * プロパティとして渡されたタイトルを表示する機能を持っています。TypeScriptによる
 * 型の安全性とReactによるレンダリングを使用しています。
 *
 * Author: Matsuoka.kazuki
 * Date: 2024/10/01
 */

import React from "react";

// 型定義: HeaderDivコンポーネントが受け取るプロパティの型
interface HeaderDivProps {
  title: string;
}

// HeaderDivコンポーネントの定義
// React.FCはFunctional Componentの略で、HeaderDivProps型のプロパティを受け取る
const HeaderDiv: React.FC<HeaderDivProps> = ({ title }) => {
  // 受け取ったtitleプロパティを表示する
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};

// HeaderDivコンポーネントをエクスポート
export default HeaderDiv;
