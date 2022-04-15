
+ <h1 style="font-weight: bold;">Server</h1>

  > register
    - hash/tokenize
    + add user to storage with 3 hours TTL
    < send token if everything's ok


  > login
    - success if token is valid
    < send full user


  > room creation (has token)
    - validate room options
    + create room with:
      - player list
      - room options
      - chat socket
    < send host room creation success response
    - ensure host arrives in 1 minute or destroy room


  > room update (has token)
    - ensure token is host
    - validate room options
    + update room options
    < broadcast changes to connected players


  > room host update (has token)
    - ensure token is host
    + update host
    < broadcast changes to connected players


  > room join ('connection', has token)
    - validate password (if any)
    - ensure room isn't full
    + add player token to socket.data
    < send player room join success response
    < broadcast changes to connected players
    + set new user as spectator if joining during active game


  > game start (has token)
    - ensure `socket.data` is host
    - ensure minimum players >4
    + load deck from room options
    + create game instance
      - assign initial scores to all players
      - build initial turn order from options + join order
    - loop (while `any players score`<`score limit`):
      - loop (while `turn count`<`room player count`):
        - determine turn order for round
        - loop (per `turn`/one of each `play` and `judge`, in order):
          - get next czar
          - pick prompt (black) card
          - pick (white) cards to distribute to players
          < broadcast black card and czar
          < send white cards to indiv. players
          < broadcast play length
          - loop (while `timer`<`time now plus play length`):
            > played card(s) (has token)
              - assign played card(s) to player token
            - end if all received early, otherwise currently selected
            - ! if NO cards played, end game?
          - add to AFK count on player skip (per player)
          < broadcast played card(s) anonymously
          < broadcast judgement length
          - loop (while `timer`<`time now plus judgement length`):
            > selected card(s) (has token)
              - award points to winning hand's player
            - end if judgement received early, otherwise currently selected
            - ! what to do if no judgement?
          < broadcast turn winner and point changes
    - winner winner chicken dinner
    < broadcast winner player with end of game


  > room leave ('disconnection')
    - if `socket.data` is host (player token) is host
      + pick new host (next to join room after host)
    + remove player from room
    + remove any game-specific player refs if game in-progress
    < broadcast change to connected players
