import React from 'react';
import { Route } from 'react-router-dom'
import { Layout } from 'antd'
import './content.less'
import List from '../page/list/index.js'
import Add from '../page/add/index.js'
const { Content } = Layout

export default class Contents extends React.Component {
  render() {
    return (
      <Content className="content">
        <Route path="/list" component={List} />
        <Route path="/add" component={Add} />
      </Content>
    );
  }
}