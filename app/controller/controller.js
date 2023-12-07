const {authenticateUser, registerUser, getUserData, getAccountData ,
  transferMoneyService, getTransactionsData, getAllUsers , activateUser} = require('../service/service');


const loginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try{
    const response = await authenticateUser(email, password);
    console.log(response);

  if (response.error) {
    return res.status(400).json({ error: response.error });
  } else {
    const { user } = response;
    return res.json({ user });
  }
} catch (error) {
  console.error('Error during login:', error.message);
  return res.status(500).json({ error: 'Internal server error' });
}
};

const registerController = async (req, res) => {
  const { firstName, lastName,phoneNumber, email, password} = req.body;

  if (!firstName || !lastName || !phoneNumber || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try{
    const response = await registerUser(firstName, lastName, phoneNumber, email, password);

  if (response.error) {
    return res.status(400).json({ error: response.error });
  }

  return res.status(201).json({ message: response.message });

} catch (error) {
  console.error('Error during register:', error.message);
  return res.status(500).json({ error: 'Internal server error' });
}
};

const getUserDataController = async (req, res) => {
  const {email} = req.query;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try{
    const user = await getUserData(email);

  if (user.error) {
    return res.status(400).json({ error: response.error });
  }else {
    return res.json(user);
  }

  } catch (error) {
    console.error('Error fetching user data:', error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getAccountDataController = async (req, res) => {
  const {owner} = req.query;

  if (!owner) {
    return res.status(400).json({ error: 'Owner Id is required' });
  }

  try{
    const account = await getAccountData(owner);

  if (account.error) {
    console.error('Error fetching account data:', error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }else {
    return res.json(account);
  }

} catch (error) {
  console.error('Error fetching account data:', error.message);
  return res.status(500).json({ error: 'Internal server error' });
}
};


const transferController = async (req, res) => {
  const { sourceAccount, destinationAccount, amount } = req.body;

  if (!sourceAccount || !destinationAccount || !amount) {
    return res.status(400).json({ error: 'Source account, destination account, and amount are required' });
  }

  try {
    const transferResult = await transferMoneyService(sourceAccount, destinationAccount, amount);

    if (transferResult.error) {
      return res.status(400).json({ error: transferResult.error });
    }

    return res.status(201).json({ message: 'Transfer successful' });
  } catch (error) {
    console.error('Error during money transfer:', error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getTransactionsController = async (req, res) => {
  const { account } = req.query;

  if (!account) {
    return res.status(400).json({ error: 'Account number is required' });
  }

  try {
    const transactions = await getTransactionsData(account);

    if (transactions.error) {
      console.error('Error fetching transactions data:', transactions.error);
      return res.status(500).json({ error: 'Internal server error' });
    } else {
      return res.json(transactions);
    }
  } catch (error) {
    console.error('Error fetching transactions data:', error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsers();
    
    if (users.error) {
      console.error('Error fetching user data:', error.message);
      return res.status(500).json({ error: 'Internal server error' });
    }else {
      return res.json(users);
    }
  
  } catch (error) {
    console.error('Error fetching users data:', error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
};



const getActiveUsersController = async (req, res) => {
  const { userId } = req.params;
  const { active } = req.body;

  try {
    const updatedUser = await activateUser(userId, active);

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'Status changed successfully', user: updatedUser });
  } catch (error) {
    console.error('Error in activateUser:', error.message);
    res.status(500).send('Error updating user active status');
  }
};

module.exports = {
  activateUser,
};



module.exports = { loginController, registerController, getUserDataController, 
  getAccountDataController, transferController, getTransactionsController, getAllUsersController , getActiveUsersController };
