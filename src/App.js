import React, { useState } from 'react';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);

  const addTransaction = (e) => {
    e.preventDefault();
    if (!text || !amount) return;

    const newTransaction = {
      id: Math.floor(Math.random() * 100000),
      text,
      amount: parseFloat(amount),
    };
    setTransactions([...transactions, newTransaction]);
    setText('');
    setAmount('');
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
  };

  const handleLogin = (username, password) => {
    setIsLoggedIn(true);
    setUser(username);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  const handleSignUp = (username, password) => {
    setIsSignUp(false);
    setUser(username);
    setIsLoggedIn(true);
  };

  return (
    <div className="app-container">
      {!isLoggedIn ? (
        !isSignUp ? (
          <LoginForm handleLogin={handleLogin} setIsSignUp={setIsSignUp} />
        ) : (
          <SignUpForm handleSignUp={handleSignUp} setIsSignUp={setIsSignUp} />
        )
      ) : (
        <Dashboard
          user={user}
          transactions={transactions}
          addTransaction={addTransaction}
          deleteTransaction={deleteTransaction}
          total={transactions.reduce((acc, transaction) => acc + transaction.amount, 0)}
          income={transactions.filter((t) => t.amount > 0).reduce((acc, t) => acc + t.amount, 0)}
          expense={transactions.filter((t) => t.amount < 0).reduce((acc, t) => acc + t.amount, 0)}
          handleLogout={handleLogout}
          text={text}
          setText={setText}
          amount={amount}
          setAmount={setAmount}
        />
      )}
    </div>
  );
}

const LoginForm = ({ handleLogin, setIsSignUp }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(username, password);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn">Login</button>
      </form>
      <button className="link-btn" onClick={() => setIsSignUp(true)}>Don't have an account? Sign Up</button>
    </div>
  );
};

const SignUpForm = ({ handleSignUp, setIsSignUp }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignUp(username, password);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn">Sign Up</button>
      </form>
      <button className="link-btn" onClick={() => setIsSignUp(false)}>Already have an account? Login</button>
    </div>
  );
};

const Dashboard = ({
  user,
  transactions,
  addTransaction,
  deleteTransaction,
  total,
  income,
  expense,
  handleLogout,
  text,
  setText,
  amount,
  setAmount,
}) => {
  return (
    <div className="dashboard-container">
      <div className="header">
        <h2>Welcome, {user}</h2>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <div className="balance-section">
        <h4>Your Balance</h4>
        <h1 className={total >= 0 ? 'positive' : 'negative'}>${total.toFixed(2)}</h1>
      </div>

      <div className="income-expense-section">
        <div className="income">
          <h4>Income</h4>
          <p>${income.toFixed(2)}</p>
        </div>
        <div className="expense">
          <h4>Expense</h4>
          <p>${Math.abs(expense).toFixed(2)}</p>
        </div>
      </div>

      <div className="transactions">
        <h4>Transactions</h4>
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.id} className="transaction-item">
              <span>{transaction.text}</span>
              <span className={transaction.amount < 0 ? 'negative' : 'positive'}>
                ${Math.abs(transaction.amount).toFixed(2)}
              </span>
              <button className="delete-btn" onClick={() => deleteTransaction(transaction.id)}>x</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="transaction-form">
        <h4>Add New Transaction</h4>
        <form onSubmit={addTransaction}>
          <div className="input-group">
            <label>Text</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <button type="submit" className="btn">Add Transaction</button>
        </form>
      </div>
    </div>
  );
};

export default App;