import { FlowModel } from "../models/flow";
import {NotFound} from "lin-mizar/lin";
import {MusicModel} from "../models/music";

class Flow {
  static async createFlow(v) {
    const res = await FlowModel.create({
      index: v.get('body.index'),
      type: v.get('body.type'),
      art_id: v.get('body.art_id'),
      status: v.get('body.status')
    })
    return res
  }

  static async getFlowList() {
    return FlowModel.findAll({
      order: ['index']
    })
  }

  static async editFlow(id, index, type, art_id, status) {
    const flow = await FlowModel.findByPk(id)

    if (!flow) {
      throw new NotFound()
    }

    await flow.update({id, index, type, art_id, status})
  }

  static async delFlow (id) {
    const flow = await FlowModel.findByPk(id)

    if (!flow) {
      throw new NotFound()
    }
    await flow.destroy()
  }
}

export { Flow as FlowDao }