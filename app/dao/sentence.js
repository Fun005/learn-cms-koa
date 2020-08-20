import { SentenceModel } from "../models/sentence";
import { NotFound } from "lin-mizar/lin";

class Sentence {
  static async getSentenceList() {
    return SentenceModel.findAll();
  }
  static async addSentence (v) {
    return SentenceModel.create(v);
  }
  static async editSentence(id, params) {
    const sentence = await SentenceModel.findByPk(id)
    if(!sentence) {
      throw new NotFound()
    }
    return await sentence.update({...params})
  }
  static async deleteSentenceById(id) {
    return SentenceModel.destroy({
      where: {id}
    });
  }
}

export { Sentence as SentenceDao }