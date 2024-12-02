// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract RewardDistributor {
    IERC721 public nftContract;
    mapping(uint256 => bool) public hasClaimed; // Tracks claimed rewards
    address public owner;

    constructor(address _nftContract) {
        nftContract = IERC721(_nftContract); // Set the NFT contract
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can perform this action");
        _;
    }

    function claimReward(uint256 tokenId) external {
        // Verify NFT ownership
        require(nftContract.ownerOf(tokenId) == msg.sender, "You do not own this NFT");
        require(!hasClaimed[tokenId], "Reward already claimed for this NFT");

        // Mark reward as claimed
        hasClaimed[tokenId] = true;

        // Send reward (e.g., Ether)
        uint256 rewardAmount = 0.1 ether; // Set reward amount
        require(address(this).balance >= rewardAmount, "Insufficient funds in contract");

        payable(msg.sender).transfer(rewardAmount);
    }

    // Fund the reward contract
    function depositFunds() external payable onlyOwner {}

    // Withdraw funds (optional)
    function withdrawFunds() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
}
