import { Sequelize, Model } from 'sequelize'
import sequelize from '../libs/db'

class Flow extends Model {

}

Flow.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  art_id: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  index: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  type: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  status: {
    type: Sequelize.INTEGER,
  }
}, {
  // 定义表名
  tableName: 'flow',
  // 定义模型名称
  modelName: 'flow',
  // 启用软删除
  paranoid: true,
  // 自动导入时间
  timestamps: true,
  underscored: true,
  // 重命名时间段
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  sequelize,
})

export { Flow as FlowModel }