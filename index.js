// exporting app in nodejs
module.exports = (app) => {
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
}
