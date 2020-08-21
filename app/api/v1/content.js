import {LinRouter} from "lin-mizar";
import {AddContentValidator, EditContentValidator, DeleteContentValidator} from "../../validators/content";
import {ContentService} from "../../service/content";
import {groupRequired} from "../../middleware/jwt";
import {logger} from "../../middleware/logger";

const contentApi = new LinRouter({
  prefix: '/v1/content',
})

/**
 * 新增期刊内容
 */
contentApi.linPost(
  'addContent',
  '/',
  {
    permission: '添加期刊内容',
    module: '内容管理',
    mount: true
  },
  groupRequired,
  logger("{user.username}新增了期刊内容"), // logger，参数为日志内容
  async ctx => {
//  1 参数校验
  const v = await new AddContentValidator().validate(ctx)
//  2 实现业务逻辑
//  3 操作数据库
  await ContentService.addContent(v.get('body'))
//  4 返回信息
  ctx.success({
    msg: '期刊内容新增成功',
  })
})

/**
 * 查询期刊内容
 */
contentApi.get('/', async ctx => {
  const contentList = await ContentService.getContentList()
  ctx.json(contentList)
})

/**
 * 编辑期刊内容
 */
contentApi.linPut(
  'editContent',
  '/:id',
  {
    permission: '编辑期刊内容',
    module: '内容管理',
    mount: true
  },
  groupRequired,
  logger("{user.username}编辑了期刊内容"), // logger，参数为日志内容
  async ctx => {
  const v = await new EditContentValidator().validate(ctx)
  const id = v.get('path.id')
  const params = v.get('body')

  await ContentService.editContent(id, params)
  ctx.success({
    msg: '期刊内容更新成功'
  })
})

/**
 * 期刊内容删除
 */
contentApi.linDelete(
  'deleteContent',
  '/:id',
  {
    permission: '删除期刊内容',
    module: '内容管理',
    mount: true
  },
  groupRequired,
  logger("{user.username}删除了期刊内容"), // logger，参数为日志内容
  async ctx => {
  const v = await new DeleteContentValidator().validate(ctx)
  const id = v.get('path.id')
  const type = v.get('query.type')

  await ContentService.deleteContent(id, type)
  ctx.success({
    msg: '期刊内容删除成功'
  })
})


module.exports = { contentApi }