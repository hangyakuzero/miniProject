// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract VPS is ERC721, ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;
    uint256 public minted;
    uint256 public maxmint = 100;

    mapping(uint256 => uint256) public expirationDate;

    constructor(address initialOwner) ERC721("VPS", "sfvp") Ownable(initialOwner) {}

    // Function to mint NFTs, requiring at least 0.005 ether
    function payToMint(address recipient) public payable returns (uint256) {
        require(msg.value >= 0.005 ether, "Need to pay up!");
        require(minted < maxmint, "Sold out");

        uint256 tokenId = _nextTokenId++;
        expirationDate[tokenId] = block.timestamp + 2 minutes; // Set expiration date

        _mint(recipient, tokenId);
        minted++;

        return tokenId;
    }

    // Override the tokenURI function to provide expiration logic
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        string memory currentBaseURI = "https://lavender-fantastic-antelope-698.mypinata.cloud/ipfs/QmQDXH4UJrTzwgm4oYMSe1j73Btb7fgsVAfByxeZzL2mzA";
        string memory expiredMessage = "expired";

        // If token is still valid, return the base URI; otherwise, return "expired"
        if (expirationDate[tokenId] > block.timestamp) {
            return currentBaseURI;
        } else {
            return expiredMessage;
        }
    }

    // The following functions are overrides required by Solidity.

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    // Withdraw function for the contract owner to withdraw the contract's balance
    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds available");

        (bool success, ) = payable(owner()).call{value: balance}("");
        require(success, "Withdrawal failed");
    }
}