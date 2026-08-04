# 1D Tic-Tac-Toe — Step-by-step tutorial

Complete your console 1D game by following the **same architecture as Connect 4** (`../script.js`):

```
Cell  →  GameBoard  →  Game (controller)
```

Work in `1d-tic-tac-toe.js`. Finish each step before the next. Use the console (Node or browser DevTools) to test.

---

## How to use this tutorial

1. Read the step goal and the Connect 4 parallel.
2. Change only what that step asks for.
3. Run the **checkpoint** before moving on.
4. Prefer fixing one broken idea at a time over rewriting everything.

Reference file: `../script.js`  
Your file: `1d-tic-tac-toe.js`

---

## Step 0 — Orient yourself

### Goal
Know which function owns which job.

| Function | Owns | Public methods you’ll use |
|----------|------|---------------------------|
| `Cell()` | One square’s value | `addToken`, `getValue` |
| `GameBoard()` | Array of cells | place, read/print contents |
| `Game()` | Players, turns, rounds, win | `playRound`, `getActiveP`, maybe board read |

### Connect 4 parallel
- `Cell` → same role  
- `Gameboard` → your `GameBoard`  
- `GameController` → your `Game`

### Checkpoint
Without coding: point at each bug in your mind and say which *layer* should fix it (cell vs board vs game).

---

## Step 1 — Stabilize `Cell` (usually already done)

### Goal
A cell starts empty and can be overwritten with a token.

### What to verify
- Default value is your **empty sentinel** (you use `"-"`; Connect 4 uses `0` — either is fine if you’re consistent).
- `addToken(player)` sets that value.
- `getValue()` returns it.
- Nothing about “players” or “turns” lives here.

### Checkpoint
Uncomment your cell tests (or rewrite them temporarily):

1. Create a cell → value is empty.
2. `addToken("X")` → `"X"`.
3. Second cell with `"O"` doesn’t affect the first.

When solid, re-comment the tests.

---

## Step 2 — Build the board once, inside `GameBoard`

### Goal
Exactly **3** cells, created when `GameBoard()` runs — same idea as Connect 4 building the grid inside `Gameboard()`.

### Tasks
1. Keep `const board = []` and `const cells = 3` **private** inside `GameBoard`.
2. Fill `board` with three `Cell()` instances.
3. Call that setup **once** from the body of `GameBoard` (you already have `createBoard()` at the bottom — good).
4. **Remove** any second `createBoard()` call from `Game`. Calling it twice pushes 3 more cells (6, then 9…).

### Design choice
- Option A: keep `createBoard` as an internal helper and only call it once in the factory body. You can stop exporting it if nothing outside needs it.
- Option B: build with a `for` loop directly in the factory body like Connect 4 (no separate `createBoard`).

Either is fine; **once** is the rule.

### Checkpoint
```text
const b = GameBoard();
console.log(b.getCellContent());
// expect: ["-", "-", "-"]  (length 3)
```

If you see length 6, something still creates the board twice.

---

## Step 3 — Fix the board’s public API: `getCellContent` and `placeToken`

### Goal
Match Connect 4’s contract:

- **Read:** turn cells into plain values for logging/checks.  
- **Write:** board places the token; controller does not touch cells.

### `getCellContent`
You already loop cells and `getValue()` into an array. Keep that.

Optional improvement (later): a `printBoard` that `console.log`s the array, like Connect 4’s `printBoard`.

### `placeToken` — match `dropToken(column, player)`
Connect 4:

1. Receives **where** + **what token**.
2. Finds the cell and calls `addToken` **inside** the board function.
3. Does **not** return something you chain `.addToken` onto.
4. Optionally returns early if the spot is invalid/full.

### Tasks for your `placeToken`
1. Signature should accept **index and player/token** (two arguments), same idea as `dropToken`.
2. Inside: `board[index].addToken(...)` — that is the only write.
3. Do **not** rely on callers doing `.placeToken(i).addToken(...)`.
4. Decide: empty check inside `placeToken`, or only in `Game.playRound`. Pick **one** primary place so logic isn’t split and contradictory.
5. Calling `getCellContent()` at the end of `placeToken` without using the return value does nothing useful — either log it, return it, or drop that line.

### Checkpoint
```text
const b = GameBoard();
b.placeToken(1, "X");   // or whatever args you chose
console.log(b.getCellContent());
// expect something like: ["-", "X", "-"]
```

If this fails, fix the board before touching `Game`.

---

## Step 4 — Players and turns in `Game` only

### Goal
Same as Connect 4’s `players` + `activePlayer` + `switchPlayerTurn` + `getActivePlayer`.

### Tasks
1. Keep `Players` with `name` and `token` (`"X"` / `"O"`).
2. `activeP` starts as `Players[0]`.
3. `switchTurn` toggles between the two (your ternary is fine).
4. `getActiveP` should return useful info for the rest of the game:
   - Connect 4 returns the **whole player object** so you can use `.name` and `.token`.
   - Returning only the name works for messages, but then you must still get the **token** from somewhere when placing.

### Important design rule
- **Board stores tokens** (`"X"` / `"O"`), not display names.
- **Messages use names** (`"P1's turn"`).

### Checkpoint
Log active player at start. Call `switchTurn` twice in a temporary test (or via playRound later) and confirm it alternates. No board placement required yet.

---

## Step 5 — Rewrite `playRound` using only names that exist

### Goal
One complete turn when given an index `0`, `1`, or `2`.

### Connect 4 flow to copy
1. Log what you’re doing.
2. Ask the board to place the **active token**.
3. (Win check — next step.)
4. Switch player **only after a successful move** (or after a no-op policy you understand).
5. Print board + whose turn it is.

### Bugs to eliminate in your current `playRound`
Walk line by line and fix **scope** first:

| Problem | Why |
|---------|-----|
| Parameter is `ind` but you use `index` | `index` is undefined in this function |
| You use `cells` | `cells` lives inside `GameBoard`, not `Game` |
| `placeToken(ind).addToken(...)` | Wrong API; board should place once |
| Placing `activeP.name` | Prefer `activeP.token` for board state |

### Tasks
1. Bounds check using **your parameter** and the known size `3` (or a getter from the board if you add one). If invalid index → return early.
2. If cell is **not empty** (compare to `"-"` via `getCellContent()[ind]`) → log “Taken”, do **not** switch turn, return.
3. If empty → `placeToken` with index + **active token**.
4. Switch turn.
5. Print board (`getCellContent` or a print helper) and announce the new active player.

### Temporary win skip
Leave a comment where Connect 4 does:

```text
/* check for winner here */
```

You’ll fill it in Step 6.

### Checkpoint (console)
```text
const game = Game();
game.playRound(0);  // P1 / X
game.playRound(1);  // P2 / O
game.playRound(0);  // should refuse — taken, same player still active
game.playRound(2);  // other player
```

Expected behavior:

- Board shows two or three tokens correctly.
- Turns alternate only on successful placements.
- Second attempt on index `0` does not overwrite and does not steal a turn.

Do **not** continue until this checkpoint works.

---

## Step 6 — Implement `checkWin` for 1D

### Goal
After a successful place, detect three-in-a-row (all three cells same non-empty token).

### Connect 4 parallel
Connect 4 leaves win logic as a comment because 2D is hard. Your board is **one row of 3**, so the rule is simple.

### Tasks
1. Get a **snapshot** of values with `myBoard.getCellContent()` — never loop a private `board` variable from inside `Game`.
2. Win condition (conceptually):
   - `values[0] === values[1] === values[2]`
   - and that value is **not** the empty sentinel `"-"`.
3. You do **not** need nested loops or `for (let let of ...)`.
4. Return something useful: `true`/`false`, or the winning token/name, or a string message — pick one style and stick to it.

### Optional draw
If no empty cells and no winner → draw.

### Wire into `playRound`
Order after a successful place:

1. Place token.  
2. **Check win (and draw).**  
3. If game over → log winner/draw, set a flag so further `playRound`s no-op, **do not** switch turn (or switch doesn’t matter if you block plays).  
4. If not over → switch turn and print next round.

### Checkpoint
```text
// X X X on all three cells via legal turns — or force three X if testing carefully
// Expect win message for the player who just placed.
// Further playRound calls should do nothing.
```

Also test: mixed board with no three equal → no win; full board without three equal → draw if you implemented it.

---

## Step 7 — Clean startup and return value

### Goal
`Game()` should leave you ready to play, like Connect 4’s `printNewRound()` then `return { ... }`.

### Tasks
1. On create: ensure board exists (via `GameBoard()` only — no double create).
2. Print initial empty board + first player’s turn.
3. Return a **minimal public API**, e.g.:
   - `playRound`
   - `getActiveP` (or return full player object)
   - optional: way to read board for later UI

Keep private: `switchTurn`, `checkWin`, players array, `activeP`.

### Checkpoint
```text
const game = Game();
// sees empty board + "P1's turn" (or similar)
game.playRound(1);
// sees updated board + other player's turn
```

---

## Step 8 — Manual full game scripts

Play these scenarios by hand in the console and confirm each.

### Scenario A — Horizontal win for P1 (X)
Indices: `0`, then O on `1` is wrong for a pure X win — think in **turns**:

- X at 0  
- O at 1  
- X at 2  
- O somewhere free if needed  
- …or win with X at 0, O at something, X at 1, O, X at 2  

Any path where one token fills all three legally.

### Scenario B — Rejected move
Play an occupied index → message, same player still active.

### Scenario C — Out of range
`playRound(-1)` and `playRound(99)` → no crash, no board change.

### Scenario D — Draw (if implemented)
Fill board without three identical → draw message, no further moves.

---

## Step 9 — (Optional) ScreenController later

When the console game is solid, copy Connect 4’s bottom pattern:

1. `ScreenController` creates one `Game()`.
2. Renders three buttons (or one row).
3. Click → `dataset` index → `game.playRound(index)` → re-render.
4. Do **not** put DOM code inside `GameBoard` or `Cell`.

Skip this until Steps 1–8 work.

---

## Suggested order of edits (cheat sheet)

```
[ ] Cell tests pass
[ ] Board length always 3; create only once
[ ] placeToken(index, token) writes correctly
[ ] getCellContent reflects writes
[ ] Game uses tokens on board, names in logs
[ ] playRound: valid place → switch; taken/invalid → no switch
[ ] checkWin on snapshot of 3 values
[ ] game-over flag stops further play
[ ] startup print + clean return API
[ ] full manual scenarios A–D
```

---

## Common stuck points

**“Cannot read property of undefined”**  
You’re using a name from another scope (`board`, `cells`, `index` vs `ind`).

**Board has 6 or 9 cells**  
`createBoard` ran more than once.

**Turns skip or stick**  
You switch even when the move failed, or you don’t switch when it succeeded.

**Win never fires**  
You’re comparing names vs tokens, or including `"-"` as a winning value, or checking before place.

**Overwrite opponent**  
Empty check missing or comparing wrong sentinel.

**`.addToken is not a function`**  
You’re chaining on `placeToken`’s return value; place should finish the write inside the board.

---

## Done when

You can open the console, run `const game = Game()`, play several `game.playRound(n)` calls, and:

1. See the board after each move.  
2. Alternate players only on legal moves.  
3. Detect a win (and optionally a draw).  
4. Refuse moves after game over.

That’s the full Connect 4 lesson applied to 1D tic-tac-toe. Good luck — finish Step 5 before Step 6 even if win feels more exciting.
