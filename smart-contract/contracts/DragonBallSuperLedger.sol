// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract DragonBallSuperLedger is
    ERC721,
    ERC721URIStorage,
    ERC721Enumerable,
    Ownable
{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    ERC20 public communityToken;

    struct NFTSaleItem {
        uint256 tokenId;
        address seller;
        uint256 price;
        bool forSale;
    }

    mapping(uint256 => NFTSaleItem) private _saleItems;
    event NFTListedForSale(
        uint256 indexed tokenId,
        address indexed seller,
        uint256 price
    );
    event NFTPurchased(
        uint256 indexed tokenId,
        address indexed buyer,
        address indexed seller,
        uint256 price
    );

    constructor(ERC20 _communityToken) ERC721("DragonBallSuperNFT", "DBSNFT") {
        communityToken = _communityToken;
    }

    function mint(
        string memory _uri,
        uint256 priceInCommunityTokens,
        bool listForSale
    ) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, _uri);

        if (listForSale) {
            _saleItems[tokenId] = NFTSaleItem(
                tokenId,
                msg.sender,
                priceInCommunityTokens,
                true
            );
            emit NFTListedForSale(tokenId, msg.sender, priceInCommunityTokens);
        }
    }

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId, 1);

        // If the NFT is for sale and is being transferred, remove it from sale
        if (_saleItems[tokenId].forSale) {
            _saleItems[tokenId].forSale = false;
        }
    }

    function _burn(
        uint256 tokenId
    ) internal override(ERC721URIStorage, ERC721) {
        super._burn(tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721URIStorage, ERC721) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function getCurrentTokenId() public view returns (uint256) {
        return _tokenIdCounter.current();
    }

    function listNFTForSale(uint256 tokenId) public {
        require(
            ownerOf(tokenId) == msg.sender,
            "Only NFT owner can list it for sale"
        );
        require(!_saleItems[tokenId].forSale, "NFT already listed for sale");

        _saleItems[tokenId] = NFTSaleItem(
            tokenId,
            msg.sender,
            _saleItems[tokenId].price,
            true
        );
        emit NFTListedForSale(tokenId, msg.sender, _saleItems[tokenId].price);
    }

    function buyNFT(uint256 tokenId) public {
        NFTSaleItem storage item = _saleItems[tokenId];
        require(item.forSale, "NFT not for sale");
        require(
            communityToken.balanceOf(msg.sender) >= item.price,
            "Insufficient funds to buy NFT"
        );
        require(item.seller != msg.sender, "Seller cannot buy their own NFT");

        address originalSeller = item.seller;

        // Transfer community tokens from buyer to seller
        communityToken.transferFrom(msg.sender, item.seller, item.price);

        // Transfer the ownership of the NFT from seller to buyer
        _transfer(item.seller, msg.sender, tokenId);

        // Update the sale status of the NFT
        item.forSale = false;
        item.seller = msg.sender;

        // Emit the purchase event
        emit NFTPurchased(tokenId, msg.sender, originalSeller, item.price);
    }

    function getSaleItem(
        uint256 tokenId
    ) public view returns (NFTSaleItem memory) {
        return _saleItems[tokenId];
    }

    function updateSalePrice(
        uint256 tokenId,
        uint256 newPriceInCommunityTokens
    ) public {
        require(_saleItems[tokenId].forSale, "NFT is not for sale");
        require(
            _saleItems[tokenId].seller == msg.sender,
            "Only the seller can update the price"
        );

        _saleItems[tokenId].price = newPriceInCommunityTokens;
    }

    function getAllNFTsForSale() public view returns (uint256[] memory) {
        uint256 totalNFTs = _tokenIdCounter.current();
        uint256 itemCount = 0;

        // First, count how many NFTs are for sale
        for (uint256 i = 0; i < totalNFTs; i++) {
            if (_saleItems[i].forSale) {
                itemCount++;
            }
        }

        // Create arrays to store the data
        uint256[] memory ids = new uint256[](itemCount);
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalNFTs; i++) {
            if (_saleItems[i].forSale) {
                ids[currentIndex] = _saleItems[i].tokenId;
                currentIndex++;
            }
        }

        return ids;
    }

    function getSaleItemDetails(
        uint256 tokenId
    ) public view returns (NFTSaleItem memory) {
        require(_saleItems[tokenId].forSale, "NFT is not currently for sale");
        return _saleItems[tokenId];
    }
}
