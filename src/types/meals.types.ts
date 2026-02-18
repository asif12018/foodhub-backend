
import { DietaryTag } from "../../prisma/generated/prisma/enums";

type IMeals = {
    category_id: string;
    name: string;
    description?: string;
    price: number;
    discountPrice?: number;
    imageUrl?: string;
    isAvailable?: boolean;
    prepTimeMinutes: number;
    dietary_tags?: DietaryTag[];
}


export default IMeals