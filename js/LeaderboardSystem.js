"use strict";
var LeaderboardSystem;
(function (LeaderboardSystem) {
    LeaderboardSystem.allLeaderboardHeaders = [];
    LeaderboardSystem.allLeaderboardEntriesElements = [];
    LeaderboardSystem.allLeaderboardEntries = [];
    LeaderboardSystem.randomEntryAmount = Math.floor(Math.random() * (25 - 5) + 5);
    document.addEventListener("DOMContentLoaded", init);
    function init() {
        LeaderboardSystem.leaderboardHeadersContainer = document.getElementById("leaderboardHeadersContainer");
        LeaderboardSystem.leaderboardEntriesContainer = document.getElementById("leaderboardEntriesContainer");
        LeaderboardSystem.generateLeaderboardHeaderElements();
        LeaderboardSystem.generateLeaderboardEntryElements();
    }
    function populateLeaderboard() {
        for (var i = 0; i < LeaderboardSystem.allLeaderboardEntries.length; i++) {
            var entry = LeaderboardSystem.allLeaderboardEntries[i];
            var entryElements = LeaderboardSystem.allLeaderboardEntriesElements[i];
            if (!entry || !entryElements)
                return;
            entryElements.positionElement.innerHTML = entry.position.toString();
            entryElements.gamertagElement.innerHTML = entry.gamerTag;
            entryElements.rankElement.innerHTML = entry.rank.toString();
            entryElements.scoreElement.innerHTML = entry.score.toString();
            entryElements.gamesPlayedElement.innerHTML = entry.gamesPlayed.toString();
            entryElements.timePlayedElement.innerHTML = entry.timePlayed.toString();
        }
    }
    LeaderboardSystem.populateLeaderboard = populateLeaderboard;
})(LeaderboardSystem || (LeaderboardSystem = {}));
