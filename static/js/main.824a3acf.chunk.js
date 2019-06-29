(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{20:function(e,t,n){e.exports=n(47)},39:function(e,t,n){},41:function(e,t,n){},42:function(e,t,n){},43:function(e,t,n){},44:function(e,t,n){},45:function(e,t,n){},46:function(e,t,n){},47:function(e,t,n){"use strict";n.r(t);var r=n(3),a=n(13),i=(n(26),n(19)),o=n(1),c=n(2),s=n(5),l=n(4),u=n(6),d=n(9),h=(n(38),n(39),n(8)),f=(n(41),function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(s.a)(this,Object(l.a)(t).call(this,e))).canvasRef=void 0,n.componentDidUpdate=function(){n.drawCellState()},n.componentWillUpdate=function(){n.drawCellState()},n.canvasRef=r.createRef(),n}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return r.createElement("canvas",{ref:this.canvasRef,height:"100",width:"100",className:"cell",onClick:function(){return e.props.handleMove(e.props.cellNum)}})}},{key:"drawCellState",value:function(){var e=this.canvasRef.current;if(e&&h.a){var t=h.a.canvas(e);if("X"===this.props.cellState)t.line(20,20,80,80),t.line(20,80,80,20);else if("O"===this.props.cellState)t.circle(50,50,60);else{var n=e.getContext("2d");n&&n.clearRect(0,0,e.width,e.height)}}}}]),t}(r.PureComponent)),v=(n(42),n(43),function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(s.a)(this,Object(l.a)(t).call(this,e))).canvasRef=void 0,n.componentDidMount=function(){if(n.canvasRef.current&&h.a){var e=h.a.canvas(n.canvasRef.current);e.line(100,0,100,300),e.line(200,0,200,300),e.line(0,100,300,100),e.line(0,200,300,200)}},n.canvasRef=r.createRef(),n}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.createElement("canvas",{id:"gridCanvas",ref:this.canvasRef,height:"300",width:"300",className:"grid"})}}]),t}(r.PureComponent)),m=function(e){return r.createElement("div",{className:"boardWrapper"},e.boardState.map(function(t,n){return r.createElement(f,{key:n,cellNum:n,cellState:t,handleMove:e.handleMove})}),r.createElement(v,null))},w=(n(44),function(e){return r.createElement("div",{className:"newGameButtonContainer"},r.createElement("button",{id:"newGameButton",className:"newGameButton",type:"button",onClick:e.startNewGame},"Start New Game"))}),b=(n(45),function(e){function t(){return Object(o.a)(this,t),Object(s.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e;if(this.props.isGameOver)if("PlayerX"===this.props.winningPlayer)e="Player X has won!";else if("PlayerO"===this.props.winningPlayer)e="Player O has won!";else{if("DrawnGame"!==this.props.winningPlayer)throw new Error("Game logic error; game is won with unspecified victor");e="Game is drawn!"}else e="PlayerX"===this.props.currentPlayer?"Player X to move":"Player O to move";return r.createElement("div",{className:"statusBarContainer"},e)}}]),t}(r.PureComponent)),g=function(){function e(){Object(o.a)(this,e),this._currentPlayer=void 0,this._winningPlayer=void 0,this._board=void 0,this._board=new Array(9).fill("EMPTY"),this._currentPlayer="PlayerX",this._winningPlayer=void 0}return Object(c.a)(e,[{key:"makeMove",value:function(t){var n=new e;return n._currentPlayer=this.currentPlayer,n._winningPlayer=this.winningPlayer,n._board=this._board.map(function(e){return e}),"EMPTY"!==n._board[t]?["SquareFilled",n]:n.winningPlayer?["GameAlreadyOver",n]:("PlayerX"===n.currentPlayer?n._board[t]="X":n._board[t]="O",n.checkForEnd(),n.winningPlayer?["GameFinished",n]:("PlayerX"===n.currentPlayer?n._currentPlayer="PlayerO":n._currentPlayer="PlayerX",["WaitingForMove",n]))}},{key:"checkForEnd",value:function(){for(var e=0,t=[[this._board[0],this._board[1],this._board[2]],[this._board[3],this._board[4],this._board[5]],[this._board[6],this._board[7],this._board[8]],[this._board[0],this._board[3],this._board[6]],[this._board[1],this._board[4],this._board[7]],[this._board[2],this._board[5],this._board[8]],[this._board[0],this._board[4],this._board[8]],[this._board[2],this._board[4],this._board[6]]];e<t.length;e++){var n=t[e];if(n.every(function(e){return"X"===e}))return void(this._winningPlayer="PlayerX");if(n.every(function(e){return"O"===e}))return void(this._winningPlayer="PlayerO")}this._board.every(function(e){return"EMPTY"!==e})?this._winningPlayer="DrawnGame":this._winningPlayer=void 0}},{key:"currentPlayer",get:function(){return this._currentPlayer}},{key:"winningPlayer",get:function(){return this._winningPlayer}},{key:"board",get:function(){return this._board}}]),e}(),y=function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(s.a)(this,Object(l.a)(t).call(this,e))).handleMove=function(e){var t=n.state.game.makeMove(e),r=Object(i.a)(t,2),a=r[0],o=r[1];switch(a){case"GameAlreadyOver":d.toast.error("Game is already over!",{hideProgressBar:!0});break;case"SquareFilled":d.toast.error("Square is already filled!",{hideProgressBar:!0});break;case"GameFinished":"DrawnGame"===o.winningPlayer?d.toast.info("Game drawn!",{hideProgressBar:!0}):d.toast.success("".concat(o.winningPlayer," has won! Congratulations!"),{hideProgressBar:!0}),n.setState({game:o});break;case"WaitingForMove":n.setState({game:o})}},n.state={game:new g},n}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return r.createElement("div",null,r.createElement(d.ToastContainer,null),r.createElement("div",{className:"visibleElementsContainer"},r.createElement(b,{isGameOver:!!this.state.game.winningPlayer,currentPlayer:this.state.game.currentPlayer,winningPlayer:this.state.game.winningPlayer}),r.createElement(m,{boardState:this.state.game.board,handleMove:this.handleMove}),r.createElement(w,{startNewGame:function(){return e.setState({game:new g})}})))}}]),t}(r.Component),P=(n(46),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)));function p(e){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var t=e.installing;t&&(t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}a.render(r.createElement(y,null),document.getElementById("root")),function(){if("serviceWorker"in navigator){if(new URL("/tic-tac-toe-react",window.location.toString()).origin!==window.location.origin)return;window.addEventListener("load",function(){var e="".concat("/tic-tac-toe-react","/service-worker.js");P?(function(e){fetch(e).then(function(t){404===t.status||-1===t.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):p(e)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://goo.gl/SC7cgQ")})):p(e)})}}()}},[[20,1,2]]]);
//# sourceMappingURL=main.824a3acf.chunk.js.map