import React from 'react'
import { Progress } from 'antd'
import './Analytics.css'; // Import the CSS file

const Analytics = ({ allTransection }) => {
       // Category definitions
       const categories = ['salary', 'tip', 'project', 'food', 'movie', 'bills', 'medical', 'fee', 'tax']

       // Total transactions and turnovers
       const totalTransections = allTransection.length;
       const totalIncomeTransections = allTransection.filter(transection => transection.type === 'income');
       const totalExpenseTransections = allTransection.filter(transection => transection.type === 'expense');
       const totalIncomePercent = (totalIncomeTransections.length / totalTransections) * 100;
       const totalExpensePercent = (totalExpenseTransections.length / totalTransections) * 100;

       // Total turnover
       const totalTurnover = allTransection.reduce((acc, transection) => acc + transection.amount, 0);
       const totalIncomeTurnover = allTransection.filter((transection) => transection.type === 'income').reduce((acc, transection) => acc + transection.amount, 0);
       const totalExpenseTurnover = allTransection.filter((transection) => transection.type === 'expense').reduce((acc, transection) => acc + transection.amount, 0);
       const totalIncomeTurnoverPercent = (totalIncomeTurnover / totalTurnover) * 100;
       const totalExpenseTurnoverPercent = (totalExpenseTurnover / totalTurnover) * 100;

       return (
              <div className="analytics-container">
                     <div className="card-container">
                            <div className="card">
                                   <div className="card-header">Total Transactions: {totalTransections}</div>
                                   <div className="card-body">
                                          <h5 className='text-success'>Income: {totalIncomeTransections.length}</h5>
                                          <h5 className='text-danger'>Expense: {totalExpenseTransections.length}</h5>
                                          <div className="progress-circles">
                                                 <Progress type='circle' strokeColor='green' percent={totalIncomePercent.toFixed(0)} />
                                                 <Progress type='circle' strokeColor='red' percent={totalExpensePercent.toFixed(0)} />
                                          </div>
                                   </div>
                            </div>
                            <div className="card">
                                   <div className="card-header">Total Turnover: {totalTurnover}</div>
                                   <div className="card-body">
                                          <h5 className='text-success'>Income: {totalIncomeTurnover}</h5>
                                          <h5 className='text-danger'>Expense: {totalExpenseTurnover}</h5>
                                          <div className="progress-circles">
                                                 <Progress type='circle' strokeColor='green' percent={totalIncomeTurnoverPercent.toFixed(0)} />
                                                 <Progress type='circle' strokeColor='red' percent={totalExpenseTurnoverPercent.toFixed(0)} />
                                          </div>
                                   </div>
                            </div>
                     </div>
                     <div className="category-container">
                            <div className="category-card">
                                   <h4>Categorywise Income</h4>
                                   {categories.map(category => {
                                          const amount = allTransection.filter(transection => transection.type === 'income' && transection.category === category).reduce((acc, transection) => acc + transection.amount, 0);
                                          return (
                                                 amount > 0 &&
                                                 <div className="card" key={category}>
                                                        <div className="card-body">
                                                               <h5>{category}</h5>
                                                               <Progress percent={((amount / totalIncomeTurnover) * 100).toFixed(0)} />
                                                        </div>
                                                 </div>
                                          )
                                   })}
                            </div>
                            <div className="category-card">
                                   <h4>Categorywise Expense</h4>
                                   {categories.map(category => {
                                          const amount = allTransection.filter(transection => transection.type === 'expense' && transection.category === category).reduce((acc, transection) => acc + transection.amount, 0);
                                          return (
                                                 amount > 0 &&
                                                 <div className="card" key={category}>
                                                        <div className="card-body">
                                                               <h5>{category}</h5>
                                                               <Progress percent={((amount / totalExpenseTurnover) * 100).toFixed(0)} />
                                                        </div>
                                                 </div>
                                          )
                                   })}
                            </div>
                     </div>
              </div>
       )
}

export default Analytics;
