// Global variables
let currentUser = null;
let users = JSON.parse(localStorage.getItem('bankUsers')) || {};
let currentPage = 'welcome';

// Currency exchange rates (simplified)
const exchangeRates = {
    USD: 1,
    EUR: 0.85,
    GBP: 0.73,
    JPY: 110.0,
    CAD: 1.25,
    AUD: 1.35
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadPage();

    // Login form handler
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Create account form handler
    const createAccountForm = document.getElementById('createAccountForm');
    if (createAccountForm) {
        createAccountForm.addEventListener('submit', handleCreateAccount);
    }
});

// Page navigation
function loadPage(page = currentPage) {
    currentPage = page;

    switch(page) {
        case 'welcome':
            showWelcomePage();
            break;
        case 'homepage':
            showHomepage();
            break;
        case 'history':
            showHistoryPage();
            break;
        case 'exit':
            showExitPage();
            break;
    }
}

// Welcome page functions
function showWelcomePage() {
    document.body.innerHTML = `
        <div class="container">
            <div class="welcome-card">
                <h1>Welcome to Simple Bank</h1>
                <p>Your trusted banking partner</p>

                <div class="auth-section">
                    <div class="login-form">
                        <h2>Login to Your Account</h2>
                        <form id="loginForm">
                            <div class="form-group">
                                <label for="username">Username:</label>
                                <input type="text" id="username" required>
                            </div>
                            <div class="form-group">
                                <label for="password">Password:</label>
                                <input type="password" id="password" required>
                            </div>
                            <button type="submit" class="btn btn-primary">Login</button>
                        </form>
                    </div>

                    <div class="divider">
                        <span>or</span>
                    </div>

                    <div class="create-account">
                        <h2>New to Simple Bank?</h2>
                        <button onclick="showCreateAccount()" class="btn btn-secondary">Create Account</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Create Account Modal -->
        <div id="createAccountModal" class="modal">
            <div class="modal-content">
                <span class="close" onclick="closeModal()">&times;</span>
                <h2>Create New Account</h2>
                <form id="createAccountForm">
                    <div class="form-group">
                        <label for="newUsername">Username:</label>
                        <input type="text" id="newUsername" required>
                    </div>
                    <div class="form-group">
                        <label for="newPassword">Password:</label>
                        <input type="password" id="newPassword" required>
                    </div>
                    <div class="form-group">
                        <label for="confirmPassword">Confirm Password:</label>
                        <input type="password" id="confirmPassword" required>
                    </div>
                    <div class="form-group">
                        <label for="initialDeposit">Initial Deposit ($):</label>
                        <input type="number" id="initialDeposit" min="0" step="0.01" required>
                    </div>
                    <button type="submit" class="btn btn-primary">Create Account</button>
                </form>
            </div>
        </div>
    `;

    // Re-attach event listeners
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('createAccountForm').addEventListener('submit', handleCreateAccount);
}

function showCreateAccount() {
    document.getElementById('createAccountModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('createAccountModal').style.display = 'none';
}

// Authentication functions
function handleLogin(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (users[username] && users[username].password === password) {
        currentUser = username;
        loadPage('homepage');
    } else {
        alert('Invalid username or password!');
    }
}

function handleCreateAccount(e) {
    e.preventDefault();

    const username = document.getElementById('newUsername').value;
    const password = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const initialDeposit = parseFloat(document.getElementById('initialDeposit').value);

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    if (users[username]) {
        alert('Username already exists!');
        return;
    }

    if (initialDeposit < 0) {
        alert('Initial deposit cannot be negative!');
        return;
    }

    // Create new user
    users[username] = {
        password: password,
        balance: initialDeposit,
        transactions: [{
            type: 'Initial Deposit',
            amount: initialDeposit,
            balance: initialDeposit,
            date: new Date().toLocaleString()
        }]
    };

    // Save to localStorage
    localStorage.setItem('bankUsers', JSON.stringify(users));

    alert('Account created successfully!');
    closeModal();

    // Auto-login
    currentUser = username;
    loadPage('homepage');
}

// Homepage functions
function showHomepage() {
    const user = users[currentUser];

    document.body.innerHTML = `
        <div class="container homepage">
            <div class="balance-section">
                <h2>Welcome back, ${currentUser}!</h2>
                <div class="balance-amount">$${user.balance.toFixed(2)}</div>
                <p>Current Balance</p>
            </div>

            <div class="actions-grid">
                <div class="action-card" onclick="showTransactionModal('deposit')">
                    <h3>💰 Cash In</h3>
                    <p>Deposit money into your account</p>
                </div>

                <div class="action-card" onclick="showTransactionModal('withdraw')">
                    <h3>💸 Cash Out</h3>
                    <p>Withdraw money from your account</p>
                </div>

                <div class="action-card" onclick="showCurrencyExchange()">
                    <h3>💱 Currency Exchange</h3>
                    <p>Convert between different currencies</p>
                </div>

                <div class="action-card" onclick="loadPage('history')">
                    <h3>📊 Transaction History</h3>
                    <p>View your transaction history</p>
                </div>

                <div class="action-card" onclick="loadPage('exit')">
                    <h3>🚪 Exit</h3>
                    <p>Logout and exit</p>
                </div>
            </div>
        </div>

        <!-- Transaction Modal -->
        <div id="transactionModal" class="modal">
            <div class="modal-content transaction-modal">
                <span class="close" onclick="closeTransactionModal()">&times;</span>
                <h2 id="transactionTitle">Transaction</h2>
                <form id="transactionForm" class="transaction-form">
                    <div class="form-group">
                        <label for="transactionAmount">Amount ($):</label>
                        <input type="number" id="transactionAmount" min="0.01" step="0.01" required>
                    </div>
                    <button type="submit" class="btn btn-primary">Confirm</button>
                </form>
            </div>
        </div>

        <!-- Currency Exchange Modal -->
        <div id="currencyModal" class="modal">
            <div class="modal-content">
                <span class="close" onclick="closeCurrencyModal()">&times;</span>
                <h2>Currency Exchange</h2>
                <div class="currency-grid">
                    <div>
                        <label for="fromCurrency">From:</label>
                        <select id="fromCurrency" class="currency-input">
                            <option value="USD">USD ($)</option>
                            <option value="EUR">EUR (€)</option>
                            <option value="GBP">GBP (£)</option>
                            <option value="JPY">JPY (¥)</option>
                            <option value="CAD">CAD (C$)</option>
                            <option value="AUD">AUD (A$)</option>
                        </select>
                    </div>
                    <div>
                        <label for="toCurrency">To:</label>
                        <select id="toCurrency" class="currency-input">
                            <option value="EUR">EUR (€)</option>
                            <option value="USD">USD ($)</option>
                            <option value="GBP">GBP (£)</option>
                            <option value="JPY">JPY (¥)</option>
                            <option value="CAD">CAD (C$)</option>
                            <option value="AUD">AUD (A$)</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label for="exchangeAmount">Amount:</label>
                    <input type="number" id="exchangeAmount" min="0.01" step="0.01" required>
                </div>
                <div class="exchange-rate">Exchange Rate: <span id="rateDisplay">1.0000</span></div>
                <div class="exchange-result" id="exchangeResult"></div>
                <button onclick="performExchange()" class="btn btn-primary">Exchange Currency</button>
            </div>
        </div>
    `;

    // Attach event listeners
    document.getElementById('transactionForm').addEventListener('submit', handleTransaction);
    document.getElementById('fromCurrency').addEventListener('change', updateExchangeRate);
    document.getElementById('toCurrency').addEventListener('change', updateExchangeRate);
    document.getElementById('exchangeAmount').addEventListener('input', calculateExchange);
}

// Transaction functions
function showTransactionModal(type) {
    const modal = document.getElementById('transactionModal');
    const title = document.getElementById('transactionTitle');
    const form = document.getElementById('transactionForm');

    title.textContent = type === 'deposit' ? 'Cash In' : 'Cash Out';
    form.setAttribute('data-type', type);

    modal.style.display = 'block';
}

function closeTransactionModal() {
    document.getElementById('transactionModal').style.display = 'none';
    document.getElementById('transactionAmount').value = '';
}

function handleTransaction(e) {
    e.preventDefault();

    const type = e.target.getAttribute('data-type');
    const amount = parseFloat(document.getElementById('transactionAmount').value);
    const user = users[currentUser];

    if (type === 'withdraw' && amount > user.balance) {
        alert('Insufficient funds!');
        return;
    }

    if (amount <= 0) {
        alert('Amount must be positive!');
        return;
    }

    // Update balance
    if (type === 'deposit') {
        user.balance += amount;
    } else {
        user.balance -= amount;
    }

    // Add transaction to history
    user.transactions.push({
        type: type === 'deposit' ? 'Cash In' : 'Cash Out',
        amount: amount,
        balance: user.balance,
        date: new Date().toLocaleString()
    });

    // Save to localStorage
    localStorage.setItem('bankUsers', JSON.stringify(users));

    alert(`${type === 'deposit' ? 'Deposit' : 'Withdrawal'} successful!`);
    closeTransactionModal();
    loadPage('homepage');
}

// Currency exchange functions
function showCurrencyExchange() {
    document.getElementById('currencyModal').style.display = 'block';
    updateExchangeRate();
}

function closeCurrencyModal() {
    document.getElementById('currencyModal').style.display = 'none';
    document.getElementById('exchangeAmount').value = '';
    document.getElementById('exchangeResult').textContent = '';
}

function updateExchangeRate() {
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const rate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];

    document.getElementById('rateDisplay').textContent = rate.toFixed(4);
    calculateExchange();
}

function calculateExchange() {
    const amount = parseFloat(document.getElementById('exchangeAmount').value) || 0;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const rate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];
    const result = amount * rate;

    const resultDiv = document.getElementById('exchangeResult');
    if (amount > 0) {
        resultDiv.textContent = `${amount.toFixed(2)} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
    } else {
        resultDiv.textContent = '';
    }
}

function performExchange() {
    const amount = parseFloat(document.getElementById('exchangeAmount').value);
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const user = users[currentUser];

    if (!amount || amount <= 0) {
        alert('Please enter a valid amount!');
        return;
    }

    // Convert USD amount needed for the exchange
    const usdAmount = fromCurrency === 'USD' ? amount : amount / exchangeRates[fromCurrency];

    if (usdAmount > user.balance) {
        alert('Insufficient funds for this exchange!');
        return;
    }

    // Update balance (deduct USD equivalent)
    user.balance -= usdAmount;

    // Add transaction to history
    user.transactions.push({
        type: `Currency Exchange (${fromCurrency} to ${toCurrency})`,
        amount: -usdAmount,
        balance: user.balance,
        date: new Date().toLocaleString()
    });

    // Save to localStorage
    localStorage.setItem('bankUsers', JSON.stringify(users));

    alert(`Currency exchange successful! $${usdAmount.toFixed(2)} deducted from your account.`);
    closeCurrencyModal();
    loadPage('homepage');
}

// History page
function showHistoryPage() {
    const user = users[currentUser];
    const transactions = user.transactions || [];

    let historyHTML = `
        <div class="container history-container">
            <div class="history-header">
                <h1>Transaction History</h1>
                <p>View all your banking transactions</p>
            </div>
    `;

    if (transactions.length === 0) {
        historyHTML += `
            <div class="no-history">
                <p>No transactions yet.</p>
            </div>
        `;
    } else {
        historyHTML += `
            <table class="history-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Balance After</th>
                    </tr>
                </thead>
                <tbody>
        `;

        transactions.reverse().forEach(transaction => {
            historyHTML += `
                <tr>
                    <td>${transaction.date}</td>
                    <td>${transaction.type}</td>
                    <td>$${Math.abs(transaction.amount).toFixed(2)}</td>
                    <td>$${transaction.balance.toFixed(2)}</td>
                </tr>
            `;
        });

        historyHTML += `
                </tbody>
            </table>
        `;
    }

    historyHTML += `
            <div style="text-align: center; margin-top: 30px;">
                <button onclick="loadPage('homepage')" class="btn btn-primary">Back to Homepage</button>
            </div>
        </div>
    `;

    document.body.innerHTML = historyHTML;
}

// Exit page
function showExitPage() {
    document.body.innerHTML = `
        <div class="container exit-page">
            <div class="exit-message">
                <h1>Thank You for Banking with Us!</h1>
                <p>We hope to see you again soon.</p>
                <p>Safe travels!</p>
                <button onclick="logout()" class="btn btn-primary" style="margin-top: 20px;">Return to Login</button>
            </div>
        </div>
    `;
}

function logout() {
    currentUser = null;
    loadPage('welcome');
}
