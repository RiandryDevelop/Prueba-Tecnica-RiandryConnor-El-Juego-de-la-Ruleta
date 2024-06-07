using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using RouletteGameAPI.Controllers;
using RouletteGameAPI.Models;
using System.Threading.Tasks;
using Xunit;

namespace RouletteGameAPI.Tests
{
    public class UserControllerTests
    {
        private readonly Mock<DbrouletteGameContext> _mockContext;
        private readonly UserController _controller;

        public UserControllerTests()
        {
            _mockContext = new Mock<DbrouletteGameContext>();
            _controller = new UserController(_mockContext.Object);
        }

        [Fact]
        public async Task UpdateBalance_ReturnsOk_WithNewPlayer()
        {
            // Arrange
            var player = new Player { Name = "Alice", Balance = 300 };
            _mockContext.Setup(c => c.Players.FindAsync("Alice")).ReturnsAsync((Player)null);

            // Act
            var result = await _controller.UpdateBalance(player);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnedPlayer = Assert.IsType<Player>(okResult.Value);
            Assert.Equal(200, okResult.StatusCode);
            Assert.Equal(300, returnedPlayer.Balance);
        }

        [Fact]
        public async Task GetUserBalance_ReturnsOk_WithExistingUser()
        {
            // Arrange
            var player = new Player { Name = "Bob", Balance = 400 };
            _mockContext.Setup(c => c.Players.FindAsync("Bob")).ReturnsAsync(player);

            // Act
            var result = await _controller.GetUserBalance("Bob");

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var balance = Assert.IsType<decimal>(okResult.Value);
            Assert.Equal(200, okResult.StatusCode);
            Assert.Equal(400, balance);
        }

        [Fact]
        public async Task GetUserBalance_ReturnsNotFound_WithNonExistingUser()
        {
            // Arrange
            _mockContext.Setup(c => c.Players.FindAsync("Charlie")).ReturnsAsync((Player)null);

            // Act
            var result = await _controller.GetUserBalance("Charlie");

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        // Agrega más pruebas para otros métodos y casos.
    }
}
