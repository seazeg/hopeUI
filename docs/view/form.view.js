/*
 * @Author       : Evan.G
 * @Date         : 2020-08-04 11:25:10
 * @LastEditTime : 2020-08-05 09:36:37
 * @Description  :
 */
import {
    withKnobs,
    number,
    object,
    boolean,
    text,
    select,
    date,
    array,
    color,
} from "@storybook/addon-knobs";
import styleConf from "../styleConfig.json";
import { utils } from "../utils";

export const form = () => {
    return `
    <div class="docs-box">
    <div class="docs-title">
        <fieldset>
            <legend><a name="icon">通用</a></legend>
        </fieldset>
    </div>
    <div class="docs-content">
        <form class="hopeui-form" name="form" action="" id="form">
            <div class="hopeui-form-item">
                <label class="hopeui-form-label">下拉框</label>
                <div class="hopeui-input-block">
                    <select name="city" hope-verify="required">
                        <option value="">请选择</option>
                        <option value="青岛">青岛</option>
                        <option value="武汉">武汉</option>
                        <option value="乌鲁木齐">乌鲁木齐</option>
                        <option value="南京">南京</option>
                        <option value="天津">天津</option>
                        <option value="郑州">郑州</option>
                        <option value="重庆">重庆</option>
                        <option value="成都">成都</option>
                        <option value="云南">云南</option>
                    </select>
                </div>
            </div>
            <div class="hopeui-form-item">
                <label class="hopeui-form-label">分组下拉框</label>
                <div class="hopeui-input-block">
                    <select name="school" hope-verify="required">
                        <option value="">请选择</option>
                        <optgroup label="北京"">
                            <option value=" 北京大学">北京大学</option>
                            <option value="清华大学">清华大学</option>
                        </optgroup>
                        <optgroup label="浙江"">
                            <option value=" 浙江大学">浙江大学</option>
                        </optgroup>
                    </select>
                </div>
            </div>
            <div class="hopeui-form-item">
                <label class="hopeui-form-label">联动下拉框</label>
                <div class="hopeui-input-inline">
                    <select name="LD" id="dd" hope-verify="required">
                        <option value="">请选择</option>
                        <option value="青岛">青岛</option>
                        <option value="武汉">武汉</option>
                        <option value="乌鲁木齐">乌鲁木齐</option>
                        <option value="南京">南京</option>
                        <option value="天津">天津</option>
                        <option value="郑州">郑州</option>
                    </select>
                </div>
                <div class="hopeui-input-inline">
                    <select name="LD" hope-verify="required">
                        <option value="">请选择</option>
                        <option value="青岛">青岛</option>
                        <option value="武汉">武汉</option>
                        <option value="乌鲁木齐">乌鲁木齐</option>
                        <option value="南京">南京</option>
                        <option value="天津">天津</option>
                        <option value="郑州">郑州</option>
                    </select>
                </div>
                <div class="hopeui-input-inline">
                    <select name="LD" hope-verify="required">
                        <option value="">请选择</option>
                        <option value="青岛">青岛</option>
                        <option value="武汉">武汉</option>
                        <option value="乌鲁木齐">乌鲁木齐</option>
                        <option value="南京">南京</option>
                        <option value="天津">天津</option>
                        <option value="郑州">郑州</option>
                    </select>
                </div>
            </div>
            <div class="hopeui-form-item">
                <label class="hopeui-form-label">文本框</label>
                <div class="hopeui-input-block">
                    <input name="text" type="text" placeholder="请输入" value="" class="hopeui-input"
                        hope-verify="required" />
                </div>
            </div>
            <div class="hopeui-form-item">
                <label class="hopeui-form-label">密码框</label>
                <div class="hopeui-input-block">
                    <input name="password" type="password" placeholder="请输入" value="" class="hopeui-input"
                        hope-verify="required" />
                </div>
            </div>
            <div class="hopeui-form-item">
                <label class="hopeui-form-label">多选框</label>
                <div class="hopeui-input-block">
                    <input type="checkbox" name="subject" value="音乐" hope-verify="required" />
                    <input type="checkbox" name="subject" value="历史" hope-verify="required" />
                    <input type="checkbox" name="subject" value="生物" hope-verify="required" />
                </div>
            </div>
            <div class="hopeui-form-item">
                <label class="hopeui-form-label">多选框</label>
                <div class="hopeui-input-block">
                    <input type="checkbox" name="task" value="打桩" hope-verify="required" />
                    <input type="checkbox" name="task" value="钓鱼"" hope-verify=" required" />
                    <input type="checkbox" name="task" value="看电视" hope-verify="required" />
                </div>
            </div>
            <div class="hopeui-form-item">
                <label class="hopeui-form-label">单选框</label>
                <div class="hopeui-input-block">
                    <input type="radio" name="radio" value="男" title="男" hope-verify="required" checked />
                    <input type="radio" name="radio" value="女" title="女" hope-verify="required" />
                    <input type="radio" name="radio" value="什么玩意" title="什么玩意" hope-verify="required" />
                </div>
            </div>
            <div class="hopeui-form-item">
                <label class="hopeui-form-label">多文本域</label>
                <div class="hopeui-input-block">
                    <textarea name="textarea" class="hopeui-textarea" placeholder="请输入内容"
                        hope-verify="required"></textarea>
                </div>
            </div>
            <div class="hopeui-form-item">
                <div class="hopeui-input-block">
                    <button type="button" class="hopeui-btn hopeui-btn-primary" id="set">
                        赋值
                    </button>
                    <button type="button" class="hopeui-btn hopeui-btn-primary" id="clear">
                        重置
                    </button>
                    <button type="submit" class="hopeui-btn">
                        提交表单
                    </button>
                </div>
            </div>
        </form>
    </div>
</div>

 
    `;
};
