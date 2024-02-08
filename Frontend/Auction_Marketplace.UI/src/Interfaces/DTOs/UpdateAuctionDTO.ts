interface UpdateAuctionDTO {
    name: string;
    description: string;
    photo: File | null;
    existingDays: number;
}

export default UpdateAuctionDTO