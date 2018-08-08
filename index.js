// exporting app in nodejs
/*module.exports = (app) => {
  // app.log logs info
  app.log('Yay! The app was loaded!')

  // example of probot responding 'Hello World' to a new issue being opened
  app.on('issues.opened', async context => {
    // context.payload
    // context.github is pretty much octokit (see link for docs below)
    // `context` extracts information from the event, which can be passed to
    // GitHub API calls. This will return:
    //   {owner: 'yourname', repo: 'yourrepo', number: 123, body: 'Hello World!}
    // Every time an issue is opened, it will comment Hello WOrld
    const params = context.issue({body: 'Hello World!'})

    // Post a comment on the issue
    // docs: https://octokit.github.io/rest.js/#api-Gists-createComment
    return context.github.issues.createComment(params)
  })
}*/

const got = require('got') // required in package.json b/c imported got $ nmp install got
module.exports = (app) => {
  app.on('issues.opened', async context => {
    if (context.payload.issue.body.includes(`/GIFME`)) {
      // process.env.GIPHY_API_KEY
      const searchTerm = context.payload.issue.body.split(`/GIFME`).join(' ')
      // URL based on giphy api; needs to have ` (backticks) to work
      const url = `http://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${searchTerm}`
      let giphy = await got(url)
      giphy = JSON.parse(giphy.body)
      // app.log(giphy) // for debugging
      // data[0] to get first image only
      const gifURL = giphy.data[0].images.original.url
      
      const params = context.issue({body: `![cats gif](${gifURL})`})
      return context.github.issues.createComment(params)
      }
  })
}
