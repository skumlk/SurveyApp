import * as express from "express";

export function successResponse(res: express.Response, data: any = null){
    return res.send({success: true, data})
}