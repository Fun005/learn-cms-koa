import { MusicModel } from "../models/music";
import { NotFound } from "lin-mizar/lin";

class Music {
  static async getMusicList() {
    return MusicModel.findAll();
  }
  static async addMusic (v) {
    return MusicModel.create(v);
  }
  static async editMusic(id, params) {
    const music = await MusicModel.findByPk(id)
    if(!music) {
      throw new NotFound()
    }
    return await music.update({...params})
  }
  static async deleteMusicById(id) {
    return MusicModel.destroy({
      where: {id}
    });
  }
}

export { Music as MusicDao }