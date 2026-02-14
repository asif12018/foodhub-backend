import { UserRole } from "../../middleware/auth";
import IUser from "../../types/user.types";
import { prisma } from "../../lib/prisma";
import { OrderStatus } from "../../../prisma/generated/prisma/enums";

const getProviderStats = async (user: IUser) => {
    if (user.roles !== UserRole.Provider) {
        throw new Error("Unauthorized");
    }

    const providerId = user.id;

    // 1. Total Meals
    const totalMeals = await prisma.meals.count({
        where: {
            provider_id: providerId,
            isDeleted: false
        }
    });

    // 2. Total Orders
    const totalOrders = await prisma.order.count({
        where: {
            provider_id: providerId
        }
    });

    // 3. Total Income (Sum of totalPrice for READY orders)
    const totalIncomeResult = await prisma.order.aggregate({
        where: {
            provider_id: providerId,
            status: OrderStatus.READY
        },
        _sum: {
            totalPrice: true
        }
    });
    const totalIncome = totalIncomeResult._sum.totalPrice || 0;

    // 4. Order counts by status
    const totalPreparingOrder = await prisma.order.count({
        where: {
            provider_id: providerId,
            status: OrderStatus.PREPARING
        }
    });

    const totalReadyOrder = await prisma.order.count({
        where: {
            provider_id: providerId,
            status: OrderStatus.READY
        }
    });

    const totalCancelledOrder = await prisma.order.count({
        where: {
            provider_id: providerId,
            status: OrderStatus.CANCELLED
        }
    });

    // 5. Total Reviews
    const totalReview = await prisma.reviews.count({
        where: {
            providerId: providerId
        }
    });

    return {
        totalMeals,
        totalOrders,
        totalIncome,
        totalPreparingOrder,
        totalReadyOrder,
        totalCancelledOrder,
        totalReview
    };
};

export const providerStatsService = {
    getProviderStats
};