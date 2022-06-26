import e, { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import { pool } from "../utils/db";
import log from "../utils/log";

export const getUsers = async (req: Request, res: Response) => {

  try {
    const result = <UserModel[]>(await pool.query("select * from users")).rows;
    log.info(result);

    if (result.length == 0) res.status(404).send('no any user')

    return res.status(200).json(result);
  } catch (error: any) {
    log.error(error.message);
    res.status(501).json({
      message: error.message,
      error
    })
  }  
};

export const getUserByName = async (req: Request, res: Response) => {

  const name = req.params.name;
  log.info(name);

  try {
    const result =  <UserModel[]>(await pool.query(
      `select * from users where name = '${name}'`)).rows;
    log.info(result);

    if (result.length == 0) 
      res.status(404).send(`no username like ${name}`); 

    return res.status(200).json(result);

  } catch(error: any) {
    log.error(error.message);
    res.status(501).json({
      message: error.message,
      error
    })
  }  
};

export const createUser = async (req: Request, res: Response) => {

  const { name, email } = req.body;
  log.info(`creating user for ${name} and ${email}`);

  try {
    const result = await pool.query(
      `insert into users(name, email) values('${name}', '${email}')`);
    log.info(result);
    return res.status(201).send('created');
  } catch (error: any) {
    log.error(error.message);
    return res.status(500).json({
      message: error.message,
      error
    });
  }
  
}

export const updateUser = async (req: Request, res: Response) => {
  const name = req.params.name;
  const { email } = req.body;
  log.info(`updating ${name}'s info`);
  
  try {
    const result = await pool.query(
      `update users set email = '${email}' where name = '${name}'`);

    if (result.rowCount == 0) return res.status(400).send('no this user')

    return res.status(200).send("updated")
  } catch (error: any) {
    log.error(error.message);
    res.status(500).json({
      message: error.message,
      error
    });
  }
}

export const deleteUser= async (req: Request, res: Response) => {
  const name = req.params.name;
  log.info(`deleting ${name}'s info`);
  
  try {
    const result = await pool.query(
      `delete from users where name = '${name}'`);

    if (result.rowCount == 0) return res.status(400).send('no this user')

    return res.status(200).send("deleted")
  } catch (error: any) {
    log.error(error.message);
    res.status(500).json({
      message: error.message,
      error
    });
  }
}