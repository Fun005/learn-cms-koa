import { Sequelize, Model } from 'sequelize'
import sequelize from '../libs/db'
import config from 'lin-mizar'

class Music extends Model {

}

Music.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  image: {
    type: Sequelize.STRING(64),
    // get() {
    //   const image = this.getDataValue('image')
    //   return config.getItem('localMainImgUrlPrefix') + image
    // }
  },
  content: {
    type: Sequelize.STRING(300),
    allowNull: true
  },
  url: {
    type: Sequelize.STRING(100),
  },
  pubdate: {
    type: Sequelize.DATE,
    allowNull: true
  },
  fav_nums: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  title: {
    type: Sequelize.STRING(50),
  },
  type: {
    type: Sequelize.INTEGER,
  },
  status: {
    type: Sequelize.INTEGER,
  }
}, {
  // 定义表名
  tableName: 'music',
  // 定义模型名称
  modelName: 'music',
  // 启用软删除
  paranoid: true,
  underscored: true,
  // 自动导入时间
  timestamps: true,
  // 重命名时间段
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  sequelize,
})

export { Music as MusicModel }