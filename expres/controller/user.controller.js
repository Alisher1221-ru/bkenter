import db from "../config/db.config.js"

async function createUser(req, res) {
  try {
    const appQuery = 'INSERT INTO users (name, age, tel) VALUES (?, ?, ?)'
    const { name, age, tel } = req.body
    db.query(appQuery, [name, age, tel])
  } catch (error) {
    console.error(error);
    res.end()
  }
}


async function getUser(req, res) {
  try {
    const appQuery = 'SELECT * FROM users'
    const [users, columns] = await db.query(appQuery)
    console.table(users)
    res.json(users)
  } catch (error) {
    console.error(error);
  }
}

// rows

async function deleteUser(req, res) {
  try {
    const appQuery = "DELETE FROM users WHERE id=?;"
    const [users, columns] = await db.query(appQuery, [req.params.id])
    res.send(users)
  } catch (error) {
    console.error(error);
    res.end()
  }
}


async function updateUser(req,res) {
  try {
    const id = req.params.id
    const [[user]] = await db.query("SELECT * FROM users WHERE id = ?", id)
    if (!user) {
      const err = new Error(`error is ${id}`)
      err.status = 404
      throw err
    }
    const appQuery = 'UPDATE users SET name = ?, age = ?, tel = ? WHERE id = ?'
    db.query(appQuery, [req.body.name || user.name, req.body.age || user.age, req.body.tel || user.tel, req.params.id])
    res.send("users")
  } catch (err) {
    console.log(err);
    res.json(err.message)
  }
}

export {
  createUser,
  updateUser,
  deleteUser,
  getUser
}
