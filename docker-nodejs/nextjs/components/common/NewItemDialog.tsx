/**
 * NewItemDialogコンポーネント
 *
 * このファイルには、新しいアイテムを作成するためのダイアログコンポーネントが含まれています。
 * ユーザーがアイテムの名前を入力し、APIを介して新しいアイテムを作成します。
 *
 * Author: kazuki.matsuoka
 * Date: 2025/1/19
 */

import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { createItem } from "@/services/apiService";

// NewItemDialogコンポーネントのプロパティ型定義
interface NewItemDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

// NewItemDialogコンポーネントの定義
const NewItemDialog: React.FC<NewItemDialogProps> = ({
  open,
  onClose,
  onSuccess,
}) => {
  const [name, setName] = useState(""); // 名前のステートを初期化

  // フォーム送信時の処理
  const handleSubmit = async () => {
    try {
      const response = await createItem(name);
      if (response) {
        onSuccess(); // 登録成功時のコールバックを呼び出す
        onClose(); // ダイアログを閉じる
      }
    } catch (error) {
      console.error("Error creating item:", error); // エラーをログに表示
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>新規登録</DialogTitle>
      <DialogContent>
        <DialogContentText>
          新しいアイテムを登録してください。
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="name"
          type="text"
          fullWidth
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)} // 入力値の変更をステートに反映
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          キャンセル
        </Button>
        <Button onClick={handleSubmit} color="primary">
          作成
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewItemDialog;
