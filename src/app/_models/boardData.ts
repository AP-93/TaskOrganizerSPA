export interface Card {
    id: number;
    cardText: string;
    boardListId: number;
    description?: string;
    cardPosition: number;
}

export interface BoardList {
    id: number;
    ListPosition: number;
    listName: string;
    cards: Card[];
    boardId: number;
}

export interface Board {
    id: number;
    title: string;
    ownerId: number;
    boardLists: BoardList[];
    users?: any;
}
