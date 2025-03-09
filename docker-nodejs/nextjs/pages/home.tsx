/**
 * Homeコンポーネント
 *
 * このコンポーネントはアプリケーションのメインページです。
 * コンポーネントはバックエンドAPIからデータを取得し、
 * DataGridComponentとHeaderDivコンポーネントを使用して表示します。
 * TypeScriptは型の安全性を提供します。
 *
 * 作成者: kazuki.matsuoka
 * 作成日: 2025/1/19
 */

import { useState, useEffect } from "react";
import HeaderDiv from "@/components/common/HeaderDiv";
import DataGridComponent from "@/components/common/DataGridComponent";
import NewItemDialog from "@/components/common/NewItemDialog";
import { Button } from "@mui/material";
import {
  initializeItems,
  handleDialogOpen,
  handleDialogClose,
  handleSuccess,
} from "@/services/homeService";
import { SampleType } from "@/types/sample";

const Home = () => {
  const [items, setItems] = useState<SampleType[]>([]); // itemsステートを初期化
  const [dialogOpen, setDialogOpen] = useState(false); // ダイアログのステートを初期化

  useEffect(() => {
    initializeItems(setItems); // コンポーネントがマウントされたときにデータを取得
  }, []);

  // items を DataGrid 用のデータに変換
  const rows = items.map((item, index) => ({
    id: item.id,
    sei: item.sei,
    mei: item.mei,
    address: item.address,
    city: item.city,
    email: item.email,
    phone_number: item.phone_number,
    created_at: item.created_at,
    updated_at: item.updated_at,
  }));

  return (
    <div>
      {/* ヘッダーコンポーネント */}
      <HeaderDiv title="DBテスト連携システム" />
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleDialogOpen(setDialogOpen)}
        sx={{ marginBottom: 5 }}
      >
        新規登録
      </Button>
      {/* DataGridコンポーネント */}
      <DataGridComponent rows={rows} setRows={setItems} />
      {/* ダイアログコンポーネント */}
      <NewItemDialog
        open={dialogOpen}
        onClose={() => handleDialogClose(setDialogOpen)}
        onSuccess={() => handleSuccess(setItems)}
      />
    </div>
  );
};

export default Home;
