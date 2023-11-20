import db from "../config/db.config.js"
import env from "../config/env.config.js";
import {hashSync} from 'bcrypt'
import sign from 'jsonwebtoken'

async function registr(req, res) {
  try {
    const {name,tel,passwort} = req.body;
    const [[user]] = await db.query("SELECT * FROM users WHERE tel = ?", passwort)
    if (user) {
      const error = new Error(`Users ${passwort}`)
      error.status = 406
      throw error
    }
    const keshpaswort = hashSync(passwort, 1)
    const paramsObj = {
      name,
      passwort: keshpaswort,
      tel
    }
    const [{insertId}] = await db.query("INSERT INTO users SET ?", paramsObj)
    const accessToken = sign({id:insertId, role: "user"}, env.ACCESS_TOKEN, {expiresIn: "60s"})
    const refreshToken = sign({id:insertId, role: "user"}, env.REFRESH_TOKEN, {expiresIn: "180"})
    res.json({refreshToken, accessToken})
    const hashedRefreshToken = hashSync(refreshToken, 1)
    db.query("UPDATE users SET refresh_token = ? WHERE id = ?", [hashedRefreshToken, insertId])
  } catch (error) {
    res.status(error.status || 500).json({error: "error"+error.message})
  }
}

async function login(req, res) {
  const {email, passwort} = req.body
}

export {
  registr
}
