interface UpdateAuctionDTO {
    name: string;
    description: string;
    photo: File | null;
    isCompleted: boolean;
}

export default UpdateAuctionDTO