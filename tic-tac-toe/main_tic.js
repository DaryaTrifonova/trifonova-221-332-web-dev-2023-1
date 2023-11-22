const board = document.getElementById("board");
    const cells = [];
    const message = document.getElementById("message");
    let currentPlayer = "X";
    let gameActive = true;
    
    // Создаем игровое поле
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.index = i;
      cell.addEventListener("click", handleCellClick);
      cells.push(cell);
      board.appendChild(cell);
    }

    // Обработчик клика по ячейке
    function handleCellClick(e) {
      const cell = e.target;
      const cellIndex = cell.dataset.index;

      if (cells[cellIndex].textContent === "" && gameActive) {
        cells[cellIndex].textContent = currentPlayer;
        checkResult();
        togglePlayer();
      }
    }

    // Проверка результата (выигрыш или ничья)
    function checkResult() {
      const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];

      for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
          message.textContent = `${currentPlayer} выиграл!`;
          gameActive = false;
          return;
        }
      }

      if (cells.every(cell => cell.textContent !== "")) {
        message.textContent = "Ничья!";
        gameActive = false;
      }
    }

    // Смена текущего игрока
    function togglePlayer() {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }