/*
https://api.freeagent.com/v2/approve_app?redirect_uri=https%3A%2F%2Ffreeagent-bot.herokuapp.com%2Fauth%2Fapprove&response_type=code&client_id=C8zPq28ThYyOX0U4NtgG_Q

Description	TestDCBot
URL
OAuth identifier	C8zPq28ThYyOX0U4NtgG_Q
OAuth secret	yhcWCRl3GOrx37t3EMzWuw
OAuth redirect URIs
https://freeagent-bot.herokuapp.com/auth/approve


The POST body should include the following x-www-form-urlencoded parameters.

grant_type=authorization_code
code=the authorisation code (see previous post)
redirect_uri=your redirect URI
*/

const request =  require('superagent')
const moment =  require('moment')

const OAUTH_ID = 'C8zPq28ThYyOX0U4NtgG_Q'
const OAUTH_SECRET = 'yhcWCRl3GOrx37t3EMzWuw'

const API_URL_TOKEN = `https://api.freeagent.com/v2/token_endpoint?client_id=${OAUTH_ID}&client_secret=${OAUTH_SECRET}`
const AUTH_TOKEN = '1VB17VTl8qjCJq24VD9gnJKBpNkFSDCAia6wivGTS'
const REDIRECT_URI = 'https%3A%2F%2Ffreeagent-bot.herokuapp.com%2Fauth%2Fapprove'

const TestUserUrl = 'https://api.freeagent.com/v2/users/534540'

const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json'
}

const body = {
  grant_type: 'authorization_code',
  code: AUTH_TOKEN,
  redirect_uri: REDIRECT_URI
}

// transform body into form type manually, superagent seems to send json anyway
strBody = Object.keys(body)
  .map(key => `${key}=${body[key]}`)
  .join('&')

const getAccessToken = _ => {
  request
    .post(API_URL_TOKEN)
    .set(headers)
    .auth(OAUTH_ID, OAUTH_SECRET)
    .send(strBody)
    .end((err, res) => {

      /* res.body example
      {
        access_token: '1VbYiehDBFXkUlQzR8D2uwaAizYLrBDgktE_d5wMw',
        token_type: 'bearer',
        expires_in: 604800,
        refresh_token: '1hAo9w9d5X7gdTP8vs6KHsAl0IIx52ihgcZA6lGKW'
      }
      */
    })
}

// getAccessToken()

const ACCESS_TOKEN = '1VbYiehDBFXkUlQzR8D2uwaAizYLrBDgktE_d5wMw'

const getProjects = callback => {
  request
    .get('https://api.freeagent.com/v2/projects?sort=created_at')
    .set('Authorization', `Bearer ${ACCESS_TOKEN}`)
    .end((err, res) => {
      callback(res.body.projects)
    })
}

// getProjects()

const getTasksByProject = (projectId, callback) => {
  const urlParams = projectId && projectId !== ''
                  ? `?project=${projectId}`
                  : ''

  request
    .get(`https://api.freeagent.com/v2/tasks${urlParams}`)
    .set('Authorization', `Bearer ${ACCESS_TOKEN}`)
    .end((err, res) => {
      callback(res.body.tasks)
    })
}

// getTasksByProject('https://api.freeagent.com/v2/projects/1572337')

const getAny = url => {
  request
    .get(url)
    .set('Authorization', `Bearer ${ACCESS_TOKEN}`)
    .end((err, res) => {
      // console.log('err -------------------------------------------------->')
      // console.log(err)
      //
      // console.log('res -------------------------------------------------->')
      // console.log(res)
    })
}

// getAny('https://api.freeagent.com/v2/users')


const handleGetProjects = (filter, callback) => {
  getProjects(res => {
    const result = filter ? res.filter(p => p.name.toLowerCase().includes(filter.toLowerCase())) : res

    return callback(result
      .map((p, i) => ({
        index: i,
        id: p.url.replace('https://api.freeagent.com/v2/projects/', ''),
        name: p.name,
        url: p.url,
        status: p.status
      }))
    )
  })
}

const handleGetTasks = (project, filter, callback) => {
  getTasksByProject(project, res => {
    const result = filter ? res.filter(p => p.name.toLowerCase().includes(filter.toLowerCase())) : res

    return callback(result
      .map((p, i) => ({
        index: i,
        id: p.url.replace('https://api.freeagent.com/v2/tasks/', ''),
        name: p.name,
        url: p.url,
        status: p.status,
        projectId: p.project.replace('https://api.freeagent.com/v2/projects/', ''),
      }))
    )
  })
}

const createTimeslip = (options, callback) => {
  const { user, date, hours, project, task, message } = options

  // date is not required, moment will default it to today
  if (!(hours && project && task && message)) { // TODO user should be required when we handle users
  // if (!(user && hours && project && task && message)) {
    throw new Error('Nice try, Billy. Now RTFM.')
  }

  const data = {
    timeslip : {
      "user": TestUserUrl,
      // "user": user, // TODO
      "project":`https://api.freeagent.com/v2/projects/${project}`,
      "task":`https://api.freeagent.com/v2/tasks/${task}`,
      "dated_on": moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD'),
      "hours": hours,
      "comment": message
    }
  }

  request
    .post('https://api.freeagent.com/v2/timeslips')
    .set('Authorization', `Bearer ${ACCESS_TOKEN}`)
    .send(data)
    .end((err, res) => {
      callback(res.body)
    })
}


const handleQuery = (command, args) => {
  const options = {}

  args.forEach(arg => {
    const subparts = arg.split('=')
    if (subparts.length !== 2) {
      throw new Error('Incorrect query part : ' + arg)
    }

    switch (subparts[0]) {
      case 'u':
        options.user = subparts[1]
        break
      case 'n':
        options.name = subparts[1]
        break
      case 'd':
        options.date = subparts[1]
        break
      case 'h':
        options.hours = subparts[1]
        break
      case 'p':
        options.project = subparts[1]
        break
      case 't':
        options.task = subparts[1]
        break
      case 'f':
        options.filter = subparts[1]
        break
      case 'm':
        options.message = subparts[1]
        break
      default:
        console.log('WARNING  Unknown option : ' + subparts[0])
    }
  })

  switch (command) {
    case 'projects':
      return handleGetProjects(options.filter, projects => {
        projects.forEach(p => console.log(`${p.id} | ${p.name}`))
      })
    break;
    case 'tasks':
      return handleGetTasks(options.project, options.filter, tasks => {
        tasks.forEach(t => console.log(`${t.id} | Project : ${t.projectId} | ${t.name}`))
      })
    break;
    case 'new-time':
      return createTimeslip(options, res => {
        console.log('res -------------------------------------------------->')
        console.log(res)
      })
    break;
    default:
      console.log('Unknow command.')
  }
}

const cmdArgs = process.argv.slice(2)

handleQuery(cmdArgs[0], cmdArgs.slice(1))

/*
{
  "projects": [
    {
      "url": "https://api.freeagent.com/v2/projects/1572337",
      "name": "Test Project 1",
      "contact": "https://api.freeagent.com/v2/contacts/6099741",
      "currency": "EUR",
      "created_at": "2017-09-26T18:11:27.000Z",
      "updated_at": "2017-09-26T18:11:27.000Z",
      "budget": 0,
      "status": "Active",
      "budget_units": "Hours",
      "normal_billing_rate": "0.0",
      "hours_per_day": "8.0",
      "uses_project_invoice_sequence": false,
      "billing_period": "hour"
    }
  ]
}

{
  "tasks": [
    {
      "url": "https://api.freeagent.com/v2/tasks/1869165",
      "project": "https://api.freeagent.com/v2/projects/1572337",
      "name": "Development",
      "is_billable": true,
      "billing_rate": "0.0",
      "billing_period": "hour",
      "status": "Active",
      "created_at": "2017-09-26T22:43:31.000Z",
      "updated_at": "2017-09-26T22:43:31.000Z"
    },
    {
      "url": "https://api.freeagent.com/v2/tasks/1869166",
      "project": "https://api.freeagent.com/v2/projects/1572337",
      "name": "Gestion de projet",
      "is_billable": true,
      "billing_rate": "0.0",
      "billing_period": "hour",
      "status": "Active",
      "created_at": "2017-09-26T22:44:38.000Z",
      "updated_at": "2017-09-26T22:44:38.000Z"
    }
  ]
}

{
  "users": [
    {
      "url": "https://api.freeagent.com/v2/users/534540",
      "first_name": "Cedric",
      "last_name": "Cavrois",
      "email": "cedric@derniercri.io",
      "role": "Owner",
      "permission_level": 8,
      "opening_mileage": "0.0",
      "updated_at": "2017-09-26T22:43:07.000Z",
      "created_at": "2017-09-26T18:09:07.000Z"
    }
  ]
}

*/
