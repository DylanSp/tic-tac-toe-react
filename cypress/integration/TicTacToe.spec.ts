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
      makeMove(0); // X moves
      makeMove(6); // O moves
      makeMove(1); // X moves
      makeMove(7); // O moves
      makeMove(2); // X moves, completing top row
      cy.get(".statusBarContainer").contains("Player X has won!");
    });

    it("Announces O has won when appropriate", () => {
      makeMove(0); // X moves
      makeMove(6); // O moves
      makeMove(1); // X moves
      makeMove(7); // O moves
      makeMove(5); // X moves
      makeMove(8); // O moves, completing bottom row
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

  describe("Gameboard cells", () => {
    it("Marks a cell as X when Player X clicks", () => {
      // X moves
      makeMove(0);

      cy.get(`#cell0`).should("have.attr", "aria-label", "X");
    });

    it("Marks a cell as O when Player O clicks", () => {
      // X moves
      makeMove(0);

      // O moves
      makeMove(1);

      cy.get("#cell1").should("have.attr", "aria-label", "O");
    });
  });

  describe("Notifications", () => {
    it("Shows a message for X's victory when X clicks a winning cell", () => {
      makeMove(0); // X moves
      makeMove(6); // O moves
      makeMove(1); // X moves
      makeMove(7); // O moves
      makeMove(2); // X moves, completing top row

      cy.get("div[role=alert]").contains(/PlayerX has won/);
    });

    it("Shows a message for O's victory when O clicks a winning cell", () => {
      makeMove(0); // X moves
      makeMove(6); // O moves
      makeMove(1); // X moves
      makeMove(7); // O moves
      makeMove(4); // X moves
      makeMove(8); // O moves, completing bottom row

      cy.get("div[role=alert]").contains(/PlayerO has won/);
    });

    it("Shows a message for drawn game when board is filled without a winner", () => {
      makeMove(0); // X moves
      makeMove(1); // O moves
      makeMove(3); // X moves
      makeMove(4); // O moves
      makeMove(7); // X moves
      makeMove(6); // O moves
      makeMove(2); // X moves
      makeMove(5); // O moves
      makeMove(8); // X moves, filling board

      cy.get("div[role=alert]").contains(/Game drawn/);
    });

    it("Shows a message for when a player clicks on an already-filled cell", () => {
      makeMove(0);

      makeMove(0); // click on already-filled cell

      cy.get("div[role=alert]").contains(/Square is already filled/);
    });

    it("Shows a message for when a player clicks on a cell in a completed game", () => {
      makeMove(0); // X moves
      makeMove(6); // O moves
      makeMove(1); // X moves
      makeMove(7); // O moves
      makeMove(2); // X moves, completing top row

      makeMove(4); // move that should trigger notification

      cy.get("div[role=alert]").contains(/Game is already over/);
    });
  });
});
