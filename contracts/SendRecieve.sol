//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/access/Ownable.sol";
contract sm is Ownable{
 constructor(address initialOwner)  Ownable(initialOwner){}

function deposit() payable public onlyOwner{

    require(msg.value > 0.005 ether,"Add a bit more money, please");
}


    function send(address[] calldata recipients) public payable onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds available");
         uint256 amountPerRecipient = balance / recipients.length;
        require(amountPerRecipient > 0, "Not enough Ether to distribute");

        // Send Ether to each recipient
        for (uint i = 0; i < recipients.length; i++) {
            (bool success, ) = recipients[i].call{value: amountPerRecipient}("");
            require(success, "Ether transfer failed");
        }
        
   
    }


}