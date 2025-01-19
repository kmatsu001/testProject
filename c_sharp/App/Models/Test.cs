/**
 * Test.cs
 * 
 * This file contains the Test model class for the ASP.NET Core application.
 * The Test class represents a table in the database with columns for the
 * primary key (Id) and a varchar(100) column for the name. Data annotations
 * are used for defining the primary key and column types.
 * 
 * Author: kazuki.matsuoka
 * Date: 2025/1/19
 */

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TestProject.Models
{
    public class Test
    {
        // プライマリキーを表すプロパティ
        [Key]
        public int Id { get; set; } // プライマリキー

        // 名前のカラム（varchar(100)として定義）
        [Column(TypeName = "varchar(100)")]
        public string? Name { get; set; } // 名前のカラム（長さ100まで）
    }
}
