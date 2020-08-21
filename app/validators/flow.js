import { LinValidator } from "lin-mizar/lin";
import { Rule } from "lin-mizar/lin"

class AddFlowValidator extends LinValidator {
  constructor() {
    super();
    this.index = [
      new Rule('isNotEmpty', '必须指定期刊内容排序'),
      new Rule('isInt', '期刊内容序号必须是数字且大于0', { min: 1 })
    ]
    this.type = [
      new Rule('isNotEmpty', '期刊类型不能为空'),
      new Rule('isInt', '期刊内容ID必须为数字'),
    ]
    this.art_id = [
      new Rule('isNotEmpty', '期刊内容ID不能为空'),
      new Rule('isInt', '期刊内容ID必须为数字'),
    ]
    this.status = [
      new Rule('isNotEmpty', '期刊内容上线状态未指定'),
      new Rule('isInt', '期刊状态标识不正确'),
    ]
  }
}

class EditFlowValidator extends AddFlowValidator {
  constructor() {
    super();
    this.id= [
      new Rule('isNotEmpty', '最新期刊ID不能为空'),
      new Rule('isInt', '最新期刊ID必须是数字且大于0', { min: 1})
    ]
  }
}

class DeleteFlowValidator extends LinValidator {
  constructor() {
    super();
    this.id= [
      new Rule('isNotEmpty', '最新期刊ID不能为空'),
      new Rule('isInt', '最新期刊ID必须是数字且大于0', { min: 1})
    ]
  }
}

export { AddFlowValidator, EditFlowValidator, DeleteFlowValidator }