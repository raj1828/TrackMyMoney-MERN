import React, { useState, useEffect } from 'react';
import Layout from './../components/Layout/Layout';
import { Form, Modal, Input, Select, message, Table, DatePicker } from 'antd';
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import Spinner from './../components/Spinner';
import moment from 'moment';
import Analytics from '../components/Analytics';
import './HomePage.css';

const { RangePicker } = DatePicker;

const HomePage = () => {
       const [showModal, setShowModal] = useState(false);
       const [loading, setLoading] = useState(false);
       const [allTransection, setAllTransection] = useState([]);
       const [fequency, setFequency] = useState('7');
       const [selectedDate, setSelectedDate] = useState([]);
       const [type, setType] = useState('all');
       const [viewData, setViewData] = useState('table');
       const [editable, setEditable] = useState(null);

       const [form] = Form.useForm();

       const fetchTransactions = async () => {
              try {
                     const user = JSON.parse(localStorage.getItem('user'));
                     setLoading(true);
                     const res = await axios.post('https://trackmymoney-mern.onrender.com/api/v1/transections/get-transection', {
                            userid: user._id,
                            fequency,
                            selectedDate,
                            type
                     });
                     setLoading(false);
                     setAllTransection(res.data);
              } catch (error) {
                     setLoading(false);
                     message.error("Fetching Error");
              }
       };

       useEffect(() => {
              fetchTransactions();
       }, [fequency, selectedDate, type]);

       const handelDelete = async (record) => {
              try {
                     setLoading(true);
                     await axios.post('https://trackmymoney-mern.onrender.com/api/v1/transections/delete-transection', { transectionId: record._id });
                     setLoading(false);
                     message.success("Transaction deleted successfully");
                     fetchTransactions();
              } catch (error) {
                     setLoading(false);
                     message.error("Failed to delete transaction");
              }
       };

       const handleSubmit = async (values) => {
              try {
                     const user = JSON.parse(localStorage.getItem('user'));
                     setLoading(true);
                     if (editable) {
                            await axios.post('https://trackmymoney-mern.onrender.com/api/v1/transections/edit-transection', {
                                   payload: {
                                          ...values,
                                          userId: user._id,
                                   },
                                   transectionId: editable._id,
                            });
                            message.success('Transaction Updated successfully');
                     } else {
                            await axios.post('https://trackmymoney-mern.onrender.com/api/v1/transections/add-transection', { ...values, userid: user._id });
                            message.success('Transaction added successfully');
                     }
                     setLoading(false);
                     setShowModal(false);
                     setEditable(null);
                     form.resetFields();
                     fetchTransactions();
              } catch (error) {
                     setLoading(false);
                     message.error("Failed to add transaction");
              }
       };

       const openModal = (record) => {
              if (record) {
                     setEditable(record);
                     form.setFieldsValue(record);
              } else {
                     setEditable(null);
                     form.resetFields();
              }
              setShowModal(true);
       };

       const columns = [
              {
                     title: 'Date',
                     dataIndex: 'date',
                     render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>
              },
              {
                     title: 'Amount',
                     dataIndex: 'amount',
              },
              {
                     title: 'Type',
                     dataIndex: 'type',
              },
              {
                     title: 'Category',
                     dataIndex: 'category',
              },
              {
                     title: 'Reference',
                     dataIndex: 'reference',
              },
              {
                     title: 'Actions',
                     render: (text, record) => (
                            <div className="actions">
                                   <EditOutlined onClick={() => openModal(record)} />
                                   <DeleteOutlined className='mx-2' onClick={() => handelDelete(record)} />
                            </div>
                     ),
              },
       ];

       return (
              <Layout>
                     {loading && <Spinner />}
                     <div className="filters">
                            <div className="filter-group">
                                   <h6>Select Frequency</h6>
                                   <Select value={fequency} onChange={(values) => setFequency(values)}>
                                          <Select.Option value="7">LAST 1 Week</Select.Option>
                                          <Select.Option value="30">LAST 1 Month</Select.Option>
                                          <Select.Option value="365">LAST 1 Year</Select.Option>
                                          <Select.Option value="custom">Custom</Select.Option>
                                   </Select>
                                   {fequency === "custom" && <RangePicker value={selectedDate} onChange={(values) => setSelectedDate(values)} />}
                            </div>
                            <div className="filter-group">
                                   <h6>Select Type</h6>
                                   <Select value={type} onChange={(values) => setType(values)}>
                                          <Select.Option value="all">All</Select.Option>
                                          <Select.Option value="income">Income</Select.Option>
                                          <Select.Option value="expense">Expense</Select.Option>
                                   </Select>
                            </div>
                            <div className="switch-icons">
                                   <UnorderedListOutlined className={`icon ${viewData === 'table' ? 'active' : ''}`} onClick={() => setViewData("table")} />
                                   <AreaChartOutlined className={`icon ${viewData === 'analytics' ? 'active' : ''}`} onClick={() => setViewData("analytics")} />
                            </div>
                            <div>
                                   <button className="btn btn-primary" onClick={() => openModal(null)}>Add New</button>
                            </div>
                     </div>
                     <div className="content">
                            {
                                   viewData === 'table' ?
                                          (<Table columns={columns} dataSource={allTransection} />)
                                          :
                                          (<Analytics allTransection={allTransection} />)
                            }
                     </div>
                     <Modal title={editable ? 'Edit Transaction' : 'Add Transaction'}
                            open={showModal}
                            onCancel={() => {
                                   setShowModal(false);
                                   form.resetFields();
                            }}
                            footer={false}
                     >
                            <Form form={form} layout='vertical' onFinish={handleSubmit}>
                                   <Form.Item label="Amount" name="amount">
                                          <Input type="text" />
                                   </Form.Item>
                                   <Form.Item label="Type" name="type">
                                          <Select>
                                                 <Select.Option value="income">Income</Select.Option>
                                                 <Select.Option value="expense">Expense</Select.Option>
                                          </Select>
                                   </Form.Item>
                                   <Form.Item label="Category" name="category">
                                          <Select>
                                                 <Select.Option value="salary">Salary</Select.Option>
                                                 <Select.Option value="tip">Tip</Select.Option>
                                                 <Select.Option value="project">Project</Select.Option>
                                                 <Select.Option value="food">Food</Select.Option>
                                                 <Select.Option value="movie">Movie</Select.Option>
                                                 <Select.Option value="bills">Bills</Select.Option>
                                                 <Select.Option value="medical">Medical</Select.Option>
                                                 <Select.Option value="fee">Fee</Select.Option>
                                                 <Select.Option value="tax">Tax</Select.Option>
                                          </Select>
                                   </Form.Item>
                                   <Form.Item label="Reference" name="reference">
                                          <Input type="text" />
                                   </Form.Item>
                                   <Form.Item label="Description" name="description">
                                          <Input type="text" />
                                   </Form.Item>
                                   <Form.Item label="Date" name="date">
                                          <Input type="date" />
                                   </Form.Item>
                                   <div className="d-flex justify-content-end">
                                          <button type='submit' className="btn btn-primary">SAVE</button>
                                   </div>
                            </Form>
                     </Modal>
              </Layout>
       );
}

export default HomePage;
