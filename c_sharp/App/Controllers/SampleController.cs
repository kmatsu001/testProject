using System.Runtime.Intrinsics.X86;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using TestProject.Models;
using TestProject.Services;

namespace TestProject.Controllers
{
    /**
     * SampleController
     *
     * このコントローラーは、SampleTableモデルに対するAPIリクエストを処理します。
     * GET、POST、PUTメソッドを提供し、サービスを使用してデータの取得、作成、更新を行います。
     *
     * 作成者: kazuki.matsuoka
     * 作成日: 2025/1/19
     */
    [Route("api/[controller]")]
    [ApiController]
    public class SampleController : ControllerBase
    {
        private readonly SampleService _service;

        // コンストラクタでサービスを受け取り、フィールドに設定
        public SampleController(SampleService service)
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
            return Ok(items.OrderByDescending(item => item.Id)); // 200 OKとデータを返す
        }

        /// <summary>
        /// 新しいアイテムを作成するエンドポイント
        /// </summary>
        /// <param name="newItem">作成する新しいアイテム</param>
        /// <returns>作成されたアイテム</returns>
        [HttpPost]
        public async Task<IActionResult> Post(SampleTable newItem)
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
        public async Task<IActionResult> Put(int id, SampleTable updatedItem)
        {
            var updateResult = await _service.UpdateItemAsync(id, updatedItem);
            if (!updateResult)
            {
                return NotFound(); // 404 Not Foundを返す
            }

            return NoContent(); // 204 No Contentを返す
        }

        /// <summary>
        /// 指定された複数のIDのアイテムを削除するエンドポイント
        /// </summary>
        /// <param name="ids">削除するアイテムのIDのリスト</param>s
        /// <returns>ステータスコード</returns>
        [HttpPost("delete/{id}")]
        public async Task<IActionResult> DeleteItem(int id)
        {
            if (id <= 0)
            {
                return BadRequest("削除する有効なIDが指定されていません。"); // 400 Bad Request
            }

            var deleteResult = await _service.DeleteItemAsync(id); // 単一のIDを削除するサービス呼び出し
            if (!deleteResult)
            {
                return NotFound($"指定されたID ({id}) が見つかりませんでした。"); // 404 Not Found
            }

            return NoContent(); // 204 No Content
        }

    }
}
