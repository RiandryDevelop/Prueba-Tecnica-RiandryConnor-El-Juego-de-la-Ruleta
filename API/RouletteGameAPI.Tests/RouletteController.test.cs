using Microsoft.AspNetCore.Mvc;
using Moq;
using RouletteGameAPI.Controllers;
using RouletteGameAPI.Models;

namespace RouletteGameAPI.Tests
{
    public class RouletteControllerTests
    {
        private readonly Mock<DbrouletteGameContext> _mockContext;
        private readonly RouletteController _controller;

        public RouletteControllerTests()
        {
            _mockContext = new Mock<DbrouletteGameContext>();
            _controller = new RouletteController(_mockContext.Object);
        }

        [Fact]
        public async Task InitializePlayer_ReturnsOk_WithExistingPlayer()
        {
            var player = new Player { Name = "John", Balance = 100 };
            _mockContext.Setup(c => c.Players.FindAsync("John")).ReturnsAsync(player);


            var result = await _controller.InitializePlayer(player);
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnedPlayer = Assert.IsType<Player>(okResult.Value);
            Assert.Equal(200, okResult.StatusCode);
            Assert.Equal(100, returnedPlayer.Balance);
        }

        [Fact]
        public async Task InitializePlayer_ReturnsOk_WithNewPlayer()
        {
            var player = new Player { Name = "Jane", Balance = 200 };
            _mockContext.Setup(c => c.Players.FindAsync("Jane")).ReturnsAsync((Player)null);

            var result = await _controller.InitializePlayer(player);

            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnedPlayer = Assert.IsType<Player>(okResult.Value);
            Assert.Equal(200, okResult.StatusCode);
            Assert.Equal(200, returnedPlayer.Balance);
        }

        [Fact]
        public void GetRandomNumberAndColor_ReturnsOk()
        {
            var result = _controller.GetRandomNumberAndColor();

            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(200, okResult.StatusCode);
        }


    }
}
