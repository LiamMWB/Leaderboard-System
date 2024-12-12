namespace LeaderboardSystem {
    export interface EntryHeaderItem {
        type: string;
        sortOrder: "descending" | "ascending" | undefined
        containerElement: HTMLElement;
    }

    export enum HeaderType {
        position = "Position",
        gamerTag = "GamerTag",
        rank = "Rank",
        score = "Score",
        gamesPlayed = "Games Played",
        timePlayed = "Time Played"
    }

    // -------------------------------------------------------------------------------------------------------------------------- \\

    export interface EntryItem {
        position: number;
        gamerTag: string;
        rank: number;
        score: number;
        gamesPlayed: number;
        timePlayed: string;
    }

    // References to HTML elements
    export interface EntryItemElements {
        positionElement: HTMLElement;
        gamertagElement: HTMLElement;
        rankElement: HTMLElement;
        scoreElement: HTMLElement;
        gamesPlayedElement: HTMLElement;
        timePlayedElement: HTMLElement;
    }

    // -------------------------------------------------------------------------------------------------------------------------- \\
}