interface CreateAuctionDTO {
    name: string;
    description: string;
    photo: File | null;
    isCompleted: boolean;
}

export default CreateAuctionDTO