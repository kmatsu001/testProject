using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using TestProject.Models;

namespace TestProject.Repository
{
    /// <summary>
    /// SampleTableRepository
    /// 
    /// このリポジトリは、SampleTableモデルに対するデータアクセスロジックを提供します。
    /// データの取得、作成、更新を非同期に行います。
    /// 
    /// 作成者: kazuki.matsuoka
    /// 作成日: 2025/1/19
    /// </summary>
    public class SampleTableRepository
    {
        private readonly MyDbContext _context;

        /// <summary>
        /// コンストラクタでDbContextを受け取り、フィールドに設定
        /// </summary>
        /// <param name="context">MyDbContextインスタンス</param>
        public SampleTableRepository(MyDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// 全てのアイテムを取得するメソッド
        /// </summary>
        /// <returns>アイテムのリスト</returns>
        public async Task<List<SampleTable>> GetItemsAsync()
        {
            return await _context.SampleTable.ToListAsync();
        }

        /// <summary>
        /// 指定されたIDのアイテムを取得するメソッド
        /// </summary>
        /// <param name="id">アイテムのID</param>
        /// <returns>アイテム、またはnull</returns>
        public async Task<SampleTable?> GetItemByIdAsync(int id)
        {
            return await _context.SampleTable.FindAsync(id);
        }

        /// <summary>
        /// 新しいアイテムを作成するメソッド
        /// </summary>
        /// <param name="newItem">作成する新しいアイテム</param>
        /// <returns>作成されたアイテム</returns>
        public async Task<SampleTable> CreateItemAsync(SampleTable newItem)
        {
            _context.SampleTable.Add(newItem);
            await _context.SaveChangesAsync();
            return newItem;
        }

        /// <summary>
        /// アイテムを更新するメソッド
        /// </summary>
        /// <param name="updatedItem">更新されたアイテムのデータ</param>
        public async Task UpdateItemAsync(SampleTable updatedItem)
        {
            _context.Entry(updatedItem).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        /// アイテムを削除するメソッド
        /// </summary>
        /// <param name="id">削除ID</param>
        public async Task DeleteItemsAsync(int id)
        {
            // EF Coreを使用した例
            var itemToDelete = await _context.SampleTable
                .FirstOrDefaultAsync(item => item.Id == id); // 単一のIDを直接検索

            if (itemToDelete != null)
            {
                _context.SampleTable.Remove(itemToDelete); // 単一アイテムの削除
                await _context.SaveChangesAsync(); // データベースに変更を保存
            }
        }

    }
}
