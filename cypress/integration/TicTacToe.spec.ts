import cypress from "cypress";

function makeMove(cellNum: number) {
  cy.get(`#cell${cellNum}`).click();
}

describe("Tic Tac Toe game", () => {
  beforeEach(() => {
    cy.visit("");
  });

  describe("Status bar", () => {
    it("Prompts X to move at game start", () => {
      cy.get(".statusBarContainer").contains("Player X to move");
    });

    it("Prompts O to move after one move", () => {
      makeMove(0);
      cy.get(".statusBarContainer").contains("Player O to move");
    });

    it("Prompts X to move after two moves", () => {
      makeMove(0);
      makeMove(1);
      cy.get(".statusBarContainer").contains("Player X to move");
    });

    it("Announces X has won when appropriate", () => {
      makeMove(0);  // X moves
      makeMove(6);  // O moves
      makeMove(1);  // X moves
      makeMove(7);  // O moves
      makeMove(2);  // X moves, completing top row
      cy.get(".statusBarContainer").contains("Player X has won!");
    });

    it("Announces O has won when appropriate", () => {
      makeMove(0);  // X moves
      makeMove(6);  // O moves
      makeMove(1);  // X moves
      makeMove(7);  // O moves
      makeMove(5);  // X moves
      makeMove(8);  // O moves, completing top row
      cy.get(".statusBarContainer").contains("Player O has won!");
    });

    it("Announces drawn game when appropriate", () => {
      makeMove(0); // X moves
      makeMove(1); // O moves
      makeMove(3); // X moves
      makeMove(4); // O moves
      makeMove(7); // X moves
      makeMove(6); // O moves
      makeMove(2); // X moves
      makeMove(5); // O moves
      makeMove(8); // X moves, filling board
      cy.get(".statusBarContainer").contains("Game is drawn!");
    });
  });

  describe("New game button", () => {
    it("Resets the game after one move", () => {
      makeMove(0);
      cy.get("#newGameButton").click();
      cy.get(".statusBarContainer").contains("Player X to move");
    });
  });
});
