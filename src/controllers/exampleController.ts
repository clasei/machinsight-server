import { Request, Response } from "express";

const home = (req: Request, res: Response) => {
    res.send("hi there, this is Machinsight");
};

export default home;
