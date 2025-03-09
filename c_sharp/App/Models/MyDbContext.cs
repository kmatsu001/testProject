/**
 * MyDbContext.cs
 * 
 * This file contains the MyDbContext class, which is the Entity Framework Core 
 * database context for the ASP.NET Core application. It defines the DbSet for 
 * the Test model, allowing CRUD operations on the Test table in the database.
 * 
 * Author: kazuki.matsuoka
 * Date: 2025/1/19
 */

using Microsoft.EntityFrameworkCore;

namespace TestProject.Models
{
    /// <summary>
    /// MyDbContext
    /// 
    /// このクラスは、ASP.NET CoreアプリケーションのEntity Framework Coreデータベースコンテキストです。
    /// TestモデルのDbSetを定義し、データベースのSampleテーブルに対するCRUD操作を可能にします。
    /// 
    /// 作成者: kazuki.matsuoka
    /// 作成日: 2025/1/19
    /// </summary>
    public class MyDbContext : DbContext
    {
        /// <summary>
        /// コンストラクタでDbContextOptionsを受け取り、ベースクラスに渡す
        /// </summary>
        /// <param name="options">DbContextOptionsインスタンス</param>
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options) { }

        /// <summary>
        /// SampleTableモデルのDbSetを定義
        /// </summary>
        public DbSet<SampleTable> SampleTable { get; set; }
    }
}
