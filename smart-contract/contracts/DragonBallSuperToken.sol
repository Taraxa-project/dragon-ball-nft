// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DragonBallSuperToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("Dragon Ball Super Token", "DBS") {
        _mint(msg.sender, initialSupply);
    }
}
