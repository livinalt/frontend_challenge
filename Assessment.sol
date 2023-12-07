// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Assessment {
    address payable public owner;
    uint256 public balance;

    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);
    event Transfer(address indexed to, uint256 amount);

    constructor(uint initBalance) payable {
        owner = payable(msg.sender);
        balance = initBalance;
    }

    function getBalance() public view returns (uint256) {
        return balance;
    }

    function deposit(uint256 _amount) public payable {
        require(msg.sender == owner, "You are not the owner of this account");
        uint256 _previousBalance = balance;
        balance += _amount;
        assert(balance == _previousBalance + _amount);
        emit Deposit(_amount);
    }

    error InsufficientBalance(uint256 balance, uint256 withdrawAmount);

    function withdraw(uint256 _withdrawAmount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        uint256 _previousBalance = balance;
        if (balance < _withdrawAmount) {
            revert InsufficientBalance({balance: balance, withdrawAmount: _withdrawAmount});
        }
        balance -= _withdrawAmount;
        assert(balance == (_previousBalance - _withdrawAmount));
        emit Withdraw(_withdrawAmount);
    }

    function transferToContract(address payable _to, uint256 _amount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        require(_to != address(0), "Invalid contract address");
        require(_amount <= balance, "Insufficient balance for transfer");
        
        // Transfer funds to the specified contract address using transfer
        _to.transfer(_amount);

        // Update the balance
        balance -= _amount;

        // Emit the transfer event
        emit Transfer(_to, _amount);
    }
}
