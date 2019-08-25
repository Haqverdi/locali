import React from 'react';
import { Row, Col, Layout, Typography, Table, Button } from 'antd';
import AddForm from './components/AddForm';

const renderItem = value => (
  <div style={{ textOverflow: 'ellipsis', overflow: 'hidden', width: 250 }}>
    {value}
  </div>
);

const columns = [
  {
    title: 'No',
    dataIndex: 'key',
    key: 'key',
    editable: true,
    width: '5%',
    // render: ,
  },
  {
    title: 'Key',
    dataIndex: 'key',
    key: 'key',
    editable: true,
    width: '20%',
    render: renderItem,
  },
  {
    title: 'Az',
    dataIndex: 'az',
    key: 'az',
    editable: true,
    width: '20%',
    render: renderItem,
  },
  {
    title: 'English',
    dataIndex: 'en',
    key: 'en',
    editable: true,
    width: '20%',
    render: renderItem,
  },
  {
    title: 'Ru',
    dataIndex: 'ru',
    key: 'ru',
    editable: true,
    width: '20%',
    render: renderItem,
  },
  {
    title: 'Delete',
    dataIndex: 'ru',
    key: 'ru',
    editable: true,
    width: '10%',
    // render: (),
  },
];

function App() {
  const [data, setData] = React.useState([]);

  function handleSubmit(values) {
    console.log('values', values);
    if (!data.find(item => item.key === values.key)) {
      setData(prevData => [values, ...prevData]);
    }
  }

  function reset() {
    setData([]);
  }

  return (
    <Layout>
      <Layout.Header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography.Title style={{ color: 'white', margin: 0 }}>
          Locali
        </Typography.Title>
        <div>
          <Button htmlType="submit" icon="save" style={{}}>
            Save
          </Button>
          <Button
            type="danger"
            htmlType="submit"
            icon="delete"
            onClick={reset}
            style={{ marginLeft: 10 }}
          >
            Reset
          </Button>
        </div>
      </Layout.Header>
      <Layout.Content
        style={{ height: 'calc(100vh - 152px)', background: '#fff' }}
      >
        <Row style={{ display: 'flex', justifyContent: 'center' }}>
          <Col span={18}>
            <Table
              dataSource={data}
              columns={columns}
              bordered
              pagination={false}
            />
          </Col>
        </Row>
      </Layout.Content>
      <Layout.Footer style={{ position: 'fixed', bottom: '0', width: '100vw' }}>
        <Row style={{ display: 'flex', justifyContent: 'center' }}>
          <Col>
            <AddForm handleSubmit={handleSubmit} />
          </Col>
        </Row>
      </Layout.Footer>
    </Layout>
  );
}

export default App;
