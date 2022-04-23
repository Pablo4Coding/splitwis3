//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract SplitConnect {
    string public name;
    // address[] public participants;
    uint256 private total;

    mapping(address => uint256) private participants;

    event AddExpense(address indexed from, uint256 amount, string description);

    struct Expense {
      uint id;
      address owner;
      uint256 amount;
    }

    mapping(uint => Expense) private idToExpense;
    // mapping(string => Post) private hashToPost;

    constructor(string memory _name, address[] memory _participants) {
      console.log("Deploying SplitConnect with name:", _name);
      name = _name;
      for(uint i=0; i<_participants.length; i++) {
        participants[_participants[i]] = 0;
      }
    }

    function addExpense(string memory description, uint256 amount) public {
      // for(uint i=0; i<participants.length; i++) {
      //   if() {}
      // }
      if(participants[msg.sender] >= 0) {
        participants[msg.sender] += amount;
        total += amount;
        emit AddExpense(msg.sender, amount, description);
      }
    }
}