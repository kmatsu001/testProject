using System.Collections.Generic;
using System.Threading.Tasks;
using TestProject.Models;
using TestProject.Repository;

namespace TestProject.Services
{
    /// <summary>
    /// TestService
    /// 
    /// このサービスクラスは、Testモデルに対するビジネスロジックを提供します。
    /// リポジトリを使用してデータの取得、作成、更新を行います。
    /// 
    /// 作成者: kazuki.matsuoka
    /// 作成日: 2025/1/19
    /// </summary>
    public class TestService
    {
        private readonly TestRepository _repository;

        /// <summary>
        /// コンストラクタ
        /// リポジトリを受け取り、フィールドに設定します。
        /// </summary>
        /// <param name="repository">Testリポジトリのインスタンス</param>
        public TestService(TestRepository repository)
        {
            _repository = repository;
        }

        /// <summary>
        /// 全てのアイテムを取得するメソッド
        /// </summary>
        /// <returns>アイテムのリスト</returns>
        public async Task<List<Test>> GetItemsAsync()
        {
            return await _repository.GetItemsAsync();
        }

        /// <summary>
        /// 指定されたIDのアイテムを取得するメソッド
        /// </summary>
        /// <param name="id">アイテムのID</param>
        /// <returns>アイテム、またはnull</returns>
        public async Task<Test?> GetItemByIdAsync(int id)
        {
            return await _repository.GetItemByIdAsync(id);
        }

        /// <summary>
        /// 新しいアイテムを作成するメソッド
        /// </summary>
        /// <param name="newItem">作成する新しいアイテム</param>
        /// <returns>作成されたアイテム</returns>
        public async Task<Test> CreateItemAsync(Test newItem)
        {
            return await _repository.CreateItemAsync(newItem);
        }

        /// <summary>
        /// アイテムを更新するメソッド
        /// </summary>
        /// <param name="id">更新するアイテムのID</param>
        /// <param name="updatedItem">更新されたアイテムのデータ</param>
        /// <returns>更新成功時には true、失敗時には false</returns>
        public async Task<bool> UpdateItemAsync(int id, Test updatedItem)
        {
            var existingItem = await _repository.GetItemByIdAsync(id);
            if (existingItem == null)
            {
                return false; // アイテムが存在しない場合は false を返す
            }

            existingItem.Name = updatedItem.Name;
            // 必要に応じて他のプロパティも更新

            await _repository.UpdateItemAsync(existingItem);
            return true; // 更新成功時には true を返す
        }
    }
}
