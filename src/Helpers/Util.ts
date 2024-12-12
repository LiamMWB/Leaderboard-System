namespace LeaderboardSystem {

    export function generateGamerTag(): string {
        const adjectives = [
            "Swift", "Shifty", "Mighty", "Stealthy", "Fierce", "Wild", "Epic", "Deadly", "Blazing", "Frozen", "Dark", "Shiny"
        ];
        const nouns = [
            "Panther", "Gam3r", "Dragon", "Raven", "Wolf", "Phoenix", "Domino", "Knight", "Wizard", "Titan", "Hunter", "Warrior"
        ];
        const suffixes = ["X", "99", "101", "007"];
        
        // Randomly pick one item from each array
        const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
        
        // Optionally add a suffix or a number for variety
        const useSuffix = Math.random() > 0.5; // 50% chance to add a suffix
        const randomSuffix = useSuffix
            ? suffixes[Math.floor(Math.random() * suffixes.length)]
            : Math.floor(Math.random() * 10000); // Random number as fallback
        
        return `${randomAdjective}${randomNoun}${randomSuffix}`;
    }

    export function formatTimePlayed(totalMinutes: number): string {
        const days = Math.floor(totalMinutes / (24 * 60));
        const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
        const minutes = Math.floor(totalMinutes % 60);
    
        return `${days}d ${hours}h ${minutes}m`;
    }

    // -------------------------------------------------------------------------------------------------------------------------- \\

    export function generateLeaderboardEntries() {
        let currentLeaderboardEntries: EntryItem[] = [];
        
        for (let i = 0; i < randomEntryAmount; i++) {
            
            // Create Entry Items
            currentLeaderboardEntries.push(
                {
                    position: 0,
                    gamerTag: generateGamerTag(),
                    rank: Math.floor(Math.random() * (500 - 25) + 25),
                    score: Math.floor(Math.random() * (50000 - 5000) + 5000),
                    gamesPlayed: Math.floor(Math.random() * (1000 - 25) + 25),
                    timePlayed: formatTimePlayed(Math.random() * (25000 - 2500) + 2500)
                }
            )
        }

        // Update leaderboard entries with new entries
        allLeaderboardEntries = assignPositions(currentLeaderboardEntries);
        
        // Set Up Leaderboard
        populateLeaderboard();
    }    

    export function assignPositions(currentEntryList: EntryItem[]): EntryItem[] {
        const sortedEntryList = currentEntryList.slice();
    
        // Sort items by score in descending order
        sortedEntryList.sort((a, b) => b.score - a.score);
    
        // Apply position based on sorted order
        sortedEntryList.forEach((item, index) => {
            item.position = index + 1;
        });
    
        return sortedEntryList;
    }    

    export function sortEntries(sortBy: keyof EntryItem = "score", order: "ascending" | "descending" = "descending") {
        const sortedEntryList = allLeaderboardEntries.slice();
    
        sortedEntryList.sort((a, b) => {
            const aValue = a[sortBy];
            const bValue = b[sortBy];
    
            if (typeof aValue === "number" && typeof bValue === "number") {
                return order === "descending" ? bValue - aValue : aValue - bValue;
            }

            if (typeof aValue === "string" && typeof bValue === "string") {
                return order === "descending" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            }
    
            return 0;
        });
    
        // Update Leaderboard
        allLeaderboardEntries = sortedEntryList;
        populateLeaderboard();
    }

    // -------------------------------------------------------------------------------------------------------------------------- \\

    export function updateHeaders(selectedHeader: EntryHeaderItem) {
         // Find the index of the header to update
        const index = allLeaderboardHeaders.findIndex(header => header.type === selectedHeader.type);
        if (index !== -1) {
            allLeaderboardHeaders[index] = {
            ...selectedHeader,
            sortOrder: selectedHeader.sortOrder === "descending" ? "ascending" : "descending",
        };
        } else {
            console.warn("Header not found in allLeaderboardHeaders:", selectedHeader.type);
        }

        // Update Header Classes
        allLeaderboardHeaders.forEach(header => {
            header.containerElement.classList.remove("is-Selected");
        });
        allLeaderboardHeaders[index].containerElement.classList.add("is-Selected");
        allLeaderboardHeaders[index].containerElement.classList.toggle("ascending", allLeaderboardHeaders[index].sortOrder === "ascending");

        sortEntries(allLeaderboardHeaders[index].type as keyof EntryItem, allLeaderboardHeaders[index].sortOrder);
    }
}