// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const apiKey = process.env.SPORTSDB_API_KEY

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const team = req.body.team

    const response = await fetch(`https://www.thesportsdb.com/api/v1/json/${apiKey}/searchteams.php?t=${team}`)

    const teamData = await response.json()
    
    res.status(200).json(teamData)
  }
  
}
