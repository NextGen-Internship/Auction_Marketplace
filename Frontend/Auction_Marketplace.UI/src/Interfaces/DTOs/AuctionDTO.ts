interface AuctionDTO {
    auctionId: number;
    userId: number;
    user: any;
    name: string;
    photo: string;
    startPrice : number;
    description: string;
    endTime: string;
    isCompleted: boolean;
    createdAt: string;
    updatedAt: string;
    deletedOn: string | null;
}

export default AuctionDTO;