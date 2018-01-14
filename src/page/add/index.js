import React, {Component} from 'react'
import { Form, Input, Button, notification, Icon, Select, DatePicker } from 'antd';
import './index.less'
import {connect} from 'react-redux'

const FormItem = Form.Item;
class AddPage extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault();
        let songName = e.target.elements[0].value;
        console.log("songName: " + songName)
        this.props.history.push('/list')
    }

    componentDidMount() {

    }

    generateOptions = (items) => {
        const optionDoms = [];
        items.map(item => {
          const key = Object.keys(item)[0];
          const val = item[key];
          optionDoms.push(<Select.Option key={key}>{val}</Select.Option>);
          return optionDoms;
        });
        return optionDoms;
    }

    render() {
        const { getFieldDecorator } = this.props.form
        const languages = [
          { 1: '全部' },
          { 2: '国语' },
          { 3: '英语' },
          { 4: '粤语' },
          { 5: '韩语' },
          { 6: '闽南语'}
        ];
        const countries = [
          { 1: '全部' },
          { 2: '中国' },
          { 3: '美国' },
          { 4: '英国' },
          { 5: '韩国' },
          { 6: '中国台湾'}
        ];
        return (
            <div>
                <div className="box">
                    <div className="addWrap">
                        <Form onSubmit={this.handleSubmit}>
                            <FormItem>
                                <span>歌曲名: </span><br/><Input id="songname" type="text" style={{width: '50%'}}/>
                            </FormItem>
                            <FormItem>
                                <span>歌手名: </span><br/><Input id="singername" type="text" style={{width: '50%'}}/>
                            </FormItem>
                            <FormItem>
                                <span>发行国家: </span><br/>
                                <Select placeholder="请选择" style={{width: '50%'}}>              
                                      { this.generateOptions(countries) }
                                </Select>
                            </FormItem>
                            <FormItem>
                                <span>歌曲语种: </span><br/>
                                <Select placeholder="请选择" style={{width: '50%'}}>              
                                      { this.generateOptions(languages) }
                                </Select>
                            </FormItem>
                            <FormItem>
                                <span>发行时间: </span><br/>
                                <DatePicker
                                  format="YYYY-MM-DD"
                                  placeholder="请选择时间"
                                  showToday={true} style={{width: '50%'}}/>
                            </FormItem>
                            <Button type="primary" htmlType="submit" className="saveBtn" style={{width: '50%'}}>Save</Button>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

let Add = Form.create()(AddPage);
export default Add;