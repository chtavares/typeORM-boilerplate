import 'babel-polyfill'
import app from 'server'
import { PORT } from 'config'

import { createConnection } from 'typeorm'

createConnection()

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))

export default app
