using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("sample_table")]
public class SampleTable
{
    [Key]
    [Column("id")]
    public int Id { get; set; } // 主キー (AUTO_INCREMENT)

    [Column("sei", TypeName = "varchar(255)")]
    [Required]
    public string sei { get; set; } = string.Empty;// 姓

    [Column("mei", TypeName = "varchar(255)")]
    [Required]
    public string mei { get; set; } = string.Empty; // 名

    [Column("email", TypeName = "varchar(255)")]
    public string? email { get; set; } // メール

    [Column("phone_number", TypeName = "varchar(255)")]
    public string? phone_number { get; set; } // 電話番号

    [Column("address", TypeName = "varchar(255)")]
    public string? address { get; set; } // 住所

    [Column("city", TypeName = "varchar(255)")]
    public string? city { get; set; } // 市区町村

    [Column("created_at", TypeName = "timestamp")]
    public DateTime created_at { get; set; } = DateTime.Now;  // 作成日時

    [Column("updated_at", TypeName = "timestamp")]
    public DateTime updated_at { get; set; } = DateTime.Now;  // 更新日時
}
