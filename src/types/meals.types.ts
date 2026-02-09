

type IMeals = {
    provider_id: string;
    category_id: string;
    name: string;
    description?: string;
    price: Number;
    discountPrice?: Number;
    imageUrl?: string;
    isAvailable?: boolean;
    prepTimeMinutes: Number;
    
}


export default IMeals