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

    uint256 public mintPrice;
    ERC20 public communityToken;
    bool public mintEnabled;

    constructor(
        ERC20 _communityToken,
        uint256 _mintPrice
    ) ERC721("DragonBallSuperNFT", "DBSNFT") {
        mintPrice = _mintPrice;
        communityToken = _communityToken;
    }

    modifier isMintEnabled() {
        require(mintEnabled, "Minting not enabled");
        _;
    }

    function mint(string memory _uri) public isMintEnabled {
        require(
            balanceOf(msg.sender) == 0,
            "Community members not allowed to mint twice"
        );

        communityToken.transferFrom(msg.sender, address(this), mintPrice);

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, _uri);

        _updateMintPrice();
    }

    function safeMint(
        address to,
        string memory uri
    ) public onlyOwner isMintEnabled {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function setMintingStatus(bool _mintEnabled) public onlyOwner {
        mintEnabled = _mintEnabled;
    }

    function withdrawMintFee() public onlyOwner {
        uint256 tokens = communityToken.balanceOf(address(this));
        communityToken.transfer(owner(), tokens);
    }

    function _updateMintPrice() private {
        mintPrice = mintPrice + mintPrice / 100;
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
}
