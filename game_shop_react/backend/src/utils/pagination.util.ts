import {Request} from "express";

export const getPaginationParams = (req: Request) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;
    return { page, limit, offset };
}

export const formatPaginationResponse = (data: any[], totalItems: number, page:number, limit:number)=>{
    return {
        data,
        pagination: {
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
            currentPage: page,
            limit
        }
    };
};