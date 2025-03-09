import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRowModel } from "@mui/x-data-grid";
import { updateItem, deleteItem } from "@/services/apiService";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface DataGridComponentProps {
  rows: any[];
  setRows: React.Dispatch<React.SetStateAction<any[]>>;
}

const DataGridComponent: React.FC<DataGridComponentProps> = ({
  rows,
  setRows,
}) => {
  const [selectedRow, setSelectedRow] = React.useState<number | null>(null);
  const [openDialog, setOpenDialog] = React.useState(false);

  /**
   * 更新処理
   */
  const processRowUpdate = async (newRow: GridRowModel) => {
    const numericId = Number(newRow.id);

    // 姓名の必須チェック
    if (!newRow.sei || !newRow.mei) {
      alert("姓と名は必須項目です。入力してください。");
      throw new Error("Validation Error: 姓と名は必須です");
    }

    // メールアドレスのフォーマットチェック
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 簡易メールアドレスフォーマット
    if (newRow.email && !emailRegex.test(newRow.email)) {
      alert("メールアドレスの形式が正しくありません。");
      throw new Error("Validation Error: メールアドレスの形式が不正です");
    }

    // 更新処理
    const updatedRowIndex = rows.findIndex((row) => row.id === numericId);

    if (updatedRowIndex !== -1) {
      const updatedRow = { ...rows[updatedRowIndex], ...newRow };
      const updatedRows = [...rows];
      updatedRows[updatedRowIndex] = updatedRow;

      try {
        await updateItem(numericId, updatedRow); // APIで更新
        setRows(updatedRows); // 状態を更新
      } catch (error) {
        console.error("Error updating item:", error);
        alert("データの保存に失敗しました");
      }
    }
    return newRow;
  };

  /**
   * 削除処理
   */
  const handleRowDelete = async () => {
    if (selectedRow !== null) {
      try {
        await deleteItem(selectedRow); // APIで削除をリクエスト

        const updatedRows = rows.filter((row) => row.id !== selectedRow);
        setRows(updatedRows); // 状態を更新
        setOpenDialog(false); // ダイアログを閉じる
        setSelectedRow(null); // 選択をリセット
      } catch (error) {
        console.error("Error deleting item:", error);
        alert("削除に失敗しました");
      }
    }
  };

  /**
   * 列定義
   */
  const columns: GridColDef[] = [
    {
      field: "actions",
      headerName: "削除",
      width: 100,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={() => {
            setSelectedRow(params.row.id); // 削除対象の行IDを設定
            setOpenDialog(true); // ダイアログを開く
          }}
        >
          削除
        </Button>
      ),
    },
    { field: "id", headerName: "ID", width: 90, editable: false },
    { field: "sei", headerName: "姓", width: 150, editable: true },
    { field: "mei", headerName: "名", width: 150, editable: true },
    {
      field: "email",
      headerName: "メール",
      width: 200,
      editable: true,
    },
    {
      field: "phone_number",
      headerName: "電話番号",
      width: 150,
      editable: true,
    },
    {
      field: "address",
      headerName: "住所",
      width: 200,
      editable: true,
    },
    {
      field: "city",
      headerName: "市区町村",
      width: 150,
      editable: true,
    },
    {
      field: "created_at",
      headerName: "作成日",
      width: 200,
      editable: false,
      valueFormatter: (params) => {
        const date = new Date(params);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
          2,
          "0"
        )}-${String(date.getDate()).padStart(2, "0")} ${String(
          date.getHours()
        ).padStart(2, "0")}:${String(date.getMinutes()).padStart(
          2,
          "0"
        )}:${String(date.getSeconds()).padStart(2, "0")}`;
      },
    },
    {
      field: "updated_at",
      headerName: "更新日",
      width: 200,
      editable: false,
      valueFormatter: (params) => {
        const date = new Date(params);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
          2,
          "0"
        )}-${String(date.getDate()).padStart(2, "0")} ${String(
          date.getHours()
        ).padStart(2, "0")}:${String(date.getMinutes()).padStart(
          2,
          "0"
        )}:${String(date.getSeconds()).padStart(2, "0")}`;
      },
    },
  ];

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      {/* DataGrid */}
      <DataGrid
        rows={rows}
        columns={columns}
        processRowUpdate={processRowUpdate} // 更新処理
        disableRowSelectionOnClick
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
      />

      {/* 確認ダイアログ */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>削除確認</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ID {selectedRow} を削除しますか？この操作は元に戻せません。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            キャンセル
          </Button>
          <Button onClick={handleRowDelete} color="secondary">
            削除
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DataGridComponent;
