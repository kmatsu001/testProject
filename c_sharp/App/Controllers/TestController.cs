using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using TestProject.Models;
using TestProject.Services;

namespace TestProject.Controllers
{
    /**
     * TestController
     *
     * このコントローラーは、Testモデルに対するAPIリクエストを処理します。
     * GET、POST、PUTメソッドを提供し、サービスを使用してデータの取得、作成、更新を行います。
     *
     * 作成者: kazuki.matsuoka
     * 作成日: 2025/1/19
     */
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly TestService _service;

        // コンストラクタでサービスを受け取り、フィールドに設定
        public TestController(TestService service)
        {
            _service = service;
        }

        /// <summary>
        /// 全てのアイテムを取得するエンドポイント
        /// </summary>
        /// <returns>アイテムのリスト</returns>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var items = await _service.GetItemsAsync();
            return Ok(items); // 200 OKとデータを返す
        }

        /// <summary>
        /// 新しいアイテムを作成するエンドポイント
        /// </summary>
        /// <param name="newItem">作成する新しいアイテム</param>
        /// <returns>作成されたアイテム</returns>
        [HttpPost]
        public async Task<IActionResult> Post(Test newItem)
        {
            var createdItem = await _service.CreateItemAsync(newItem);
            return CreatedAtAction(nameof(Get), new { id = createdItem.Id }, createdItem); // 201 Createdと新しいアイテムを返す
        }

        /// <summary>
        /// 指定されたIDのアイテムを更新するエンドポイント
        /// </summary>
        /// <param name="id">更新するアイテムのID</param>
        /// <param name="updatedItem">更新されたアイテムのデータ</param>
        /// <returns>ステータスコード</returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Test updatedItem)
        {
            var updateResult = await _service.UpdateItemAsync(id, updatedItem);
            if (!updateResult)
            {
                return NotFound(); // 404 Not Foundを返す
            }

            return NoContent(); // 204 No Contentを返す
        }
    }
}
