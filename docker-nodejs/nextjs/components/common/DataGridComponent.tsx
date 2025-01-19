/**
 * DataGridComponent.tsx
 *
 * このファイルにはDataGridComponentコンポーネントが含まれています。
 * このコンポーネントは、渡されたデータを表示し、編集機能を提供します。
 * Material-UIのDataGridを使用しています。
 * TypeScriptは型の安全性を提供します。
 *
 * Author: kazuki.matsuoka
 * Date: 2025/1/19
 */

import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRowModel } from "@mui/x-data-grid";
import { updateItem } from "@/services/apiService"; // インポートパスを絶対パスに変更

/**
 * DataGridComponentのプロパティ型定義
 */
interface DataGridComponentProps {
  rows: any[];
  setRows: React.Dispatch<React.SetStateAction<any[]>>;
}

/**
 * 列の定義
 */
const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
    editable: true,
  },
  {
    field: "date",
    headerName: "Date",
    width: 150,
    editable: false,
  },
];

/**
 * DataGridComponentコンポーネントの定義
 *
 * @param rows - データ行
 * @param setRows - データ行を更新する関数
 * @returns DataGridコンポーネント
 */
const DataGridComponent: React.FC<DataGridComponentProps> = ({
  rows,
  setRows,
}) => {
  /**
   * セル編集コミット時のハンドラ
   *
   * @param newRow - 更新された行のデータ
   * @returns 更新された行のデータ
   */
  const processRowUpdate = async (newRow: GridRowModel) => {
    const { id, name } = newRow;
    const numericId = Number(id); // IDを数値に変換
    const updatedRowIndex = rows.findIndex((row) => row.id === numericId);
    if (updatedRowIndex !== -1) {
      const updatedRow = { ...rows[updatedRowIndex], name };
      try {
        await updateItem(numericId, updatedRow);
        const updatedRows = [...rows];
        updatedRows[updatedRowIndex] = updatedRow;
        setRows(updatedRows); // 状態を更新
      } catch (error) {
        console.error("Error updating item:", error);
      }
    }
    return newRow;
  };

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        processRowUpdate={processRowUpdate}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};

// DataGridComponentコンポーネントをエクスポート
export default DataGridComponent;
