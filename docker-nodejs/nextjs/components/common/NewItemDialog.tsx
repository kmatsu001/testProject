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
import { FormDataType } from "@/types/formData";

interface NewItemDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const NewItemDialog: React.FC<NewItemDialogProps> = ({
  open,
  onClose,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    sei: "",
    mei: "",
    email: "",
    phone_number: "",
    address: "",
    city: "",
  });

  const [errors, setErrors] = useState({
    sei: false,
    mei: false,
    email: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // 必須項目やフォーマットのチェック
    if (name === "sei" || name === "mei") {
      setErrors((prev) => ({ ...prev, [name]: value.trim() === "" }));
    }

    if (name === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setErrors((prev) => ({
        ...prev,
        email: !emailPattern.test(value) && value !== "",
      }));
    }
  };

  const handleSubmit = async () => {
    // 必須項目チェック
    if (!formData.sei.trim() || !formData.mei.trim()) {
      setErrors({
        sei: formData.sei.trim() === "",
        mei: formData.mei.trim() === "",
        email: errors.email,
      });
      return;
    }

    try {
      // apiService経由でcreateItemを呼び出し
      await createItem(formData);

      onSuccess(); // 登録成功時のコールバック
      onClose(); // ダイアログを閉じる
    } catch (error) {
      console.error("Error creating item:", error);
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
          name="sei"
          label="姓 (必須)"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.sei}
          onChange={handleChange}
          error={errors.sei}
          helperText={errors.sei ? "姓を入力してください" : ""}
        />
        <TextField
          margin="dense"
          name="mei"
          label="名 (必須)"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.mei}
          onChange={handleChange}
          error={errors.mei}
          helperText={errors.mei ? "名を入力してください" : ""}
        />
        <TextField
          margin="dense"
          name="email"
          label="メールアドレス"
          type="email"
          fullWidth
          variant="outlined"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          helperText={
            errors.email ? "正しいメールアドレスを入力してください" : ""
          }
        />
        <TextField
          margin="dense"
          name="phone_number"
          label="電話番号"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.phone_number}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="address"
          label="住所"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.address}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="city"
          label="市区町村"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.city}
          onChange={handleChange}
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
