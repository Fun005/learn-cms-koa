import {LinRouter} from "lin-mizar";
import {groupRequired} from "../../middleware/jwt";
import {logger} from "../../middleware/logger";
import {AddFlowValidator, EditFlowValidator, DeleteFlowValidator} from "../../validators/flow";
import {FlowDao} from "../../dao/flow";
import {FlowService} from "../../service/flow";

const flowApi = new LinRouter({
  prefix: '/v1/flow',
})

/**
 * 新增最新期刊
 */
flowApi.linPost(
  'addFlow',
  '/',
  {
    permission: '添加最新期刊',
    module: '期刊管理',
    mount: true
  },
  groupRequired,
  logger("{user.username}新增了最新期刊"), // logger，参数为日志内容
  async ctx => {
//  1 参数校验
    const v = await new AddFlowValidator().validate(ctx)
//  2 实现业务逻辑
//  3 操作数据库
    await FlowDao.createFlow(v)
//  4 返回信息
    ctx.success({
      msg: '最新期刊新增成功',
    })
  })

/**
 * 查询最新期刊
 */
flowApi.get('/', async ctx => {
  const flowList = await FlowService.getFlowList()
  ctx.json(flowList)
})

/**
 * 编辑最新期刊
 */
flowApi.linPut(
  'editFlow',
  '/:id',
  {
    permission: '编辑最新期刊',
    module: '期刊管理',
    mount: true
  },
  groupRequired,
  logger('{user.username}编辑了最新期刊'),
  async ctx => {
    // 1 参数校验
    const v = await new EditFlowValidator().validate(ctx)
    //  2 实现业务逻辑
    const id = v.get('path.id')
    const index = v.get('body.index')
    const type = v.get('body.type')
    const art_id = v.get('body.art_id')
    const status = v.get('body.status')
    //  3 操作数据库
    await FlowDao.editFlow(id, index, type, art_id, status)

    //  4 返回信息
    ctx.success({
      msg: '最新期刊编辑成功',
    })
  }
)

/**
 * 删除最新期刊
 */
flowApi.linDelete('deleteFlow',
  '/:id',
  {
    permission: '删除最新期刊',
    module: '期刊管理',
    mount: true
  },
  groupRequired,
  logger('{user.username}删除了最新期刊'),
  async ctx => {
    // 1 参数校验
    const v = await new DeleteFlowValidator().validate(ctx)
    //  2 实现业务逻辑
    const id = v.get('path.id')

    //  3 操作数据库
    await FlowDao.delFlow(id)

    //  4 返回信息
    ctx.success({
      msg: '最新期刊删除成功',
    })
  })

module.exports = { flowApi }