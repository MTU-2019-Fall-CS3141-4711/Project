# Auto Deployment and Testing

## Automated Testing
#### File: `.github/workflows/test.yml`

The automated test suite fires whenever any commit it pushed to any branch period.  This triggers the following NPM scripts:
```
- test
- test-coverage
```
If any of these specified tests trigger an exit code of 1 the build will fail.  The commit will still be available on the remote branch, however.

If linters or any non-mandatory for usage tests are failing it is highly advised to add them into a new NPM script section, as deployments could fail for non-critical reasons at noted in the next session.

## Automated Deployment
#### File: `.github/workflows/test-deploy.yml`
The automated  deployment stack begins by triggering the standard `test` and `test-coverage` runs from NPM.  If either of these fail, the deployment action will cancel.
The deployment tasks auto generates a commit and push hook onto the lone branch `gh-pages` which contains *only* the required contents for production usage.

Note, that the building for this is triggered by the NPM script `deploy` and the gh-page hook and deploy is triggered by the [peaceiris static page action set](https://github.com/peaceiris/actions-gh-pages) that is retrieved from a docker image.

## Setup Documentation

### Adding test scripts
Adding a test script is simple, simply add the proper NPM command to the desired test workflow file under the `run` section.  Note that only NPM commands should be run here, if you need to invoke another interpreter another [job](https://help.github.com/en/articles/workflow-syntax-for-github-actions#jobs) should be created for it with the proper interpreter.

### Initial setup
#### Production asset generation:
The initial problem was dealing with generating all files to work correct when deployed to `./bin/` in the repositories root.  In order to get this working the following things were required to happen.

- Add the following dynamically generated (and static) files into ./bin/
	- Change the pathing in the files to work when all files were in the ./bin/ directory.
		```
    	"build-index": "copyfiles index.html bin/"
    	"deploy": "npm run build; npm run-script build-index; copyfiles style.css bin/"
  		```
- Modify the files to work in the build dir, since the pathing was modified in build compilation.
  - The pathing wasn't hard changed due to concerns with breaking development builds.
  - This was accomplished with the following NPM script addition
   	```
    replace-in-files --string='./bin/app.js' --replacement='./app.js' bin/index.html
    ```
    - More can be added at any time if we're ever forced to hard path things.

This resulted in the following additions:
```
"build-index": "copyfiles index.html bin/; replace-in-files --string='./bin/app.js' --replacement='./app.js' bin/index.html",
"deploy": "npm run build; npm run-script build-index; copyfiles style.css bin/",
```
#### Automation Scripts
The next piece to this puzzle was writing the automation scripts.  These are written as yaml configuration files in at `.github/workflows/`.  Most of the [documentation here](https://help.github.com/en/articles/workflow-syntax-for-github-actions#in-this-article) is fairly simple and straightforward.  If you find yourself struggling with it or don't understand something feel free to contact @Kiro47 .
#### Deployment Keys:
One of the things required to create and commit on a sectionalized branch is the ability to authorized those actions.  We're using [Github Deploy Keys](https://developer.github.com/v3/guides/managing-deploy-keys/#deploy-keys) for this, which are essentially service tokens.
##### Generation
```
ssh-keygen -t rsa -b 4096 -C "GH-Pages Deploy Key - YouTwobe" -f gh-deploy-keys -N ""
```
This generated a 4096 bit RSA key pair.  `-C` declares the public key comment, `-f` declares the file basename, and `-N` denotes the password phrase (which needs to be empty since this is automated).
##### Adding to GitHub
###### Add Deploy Key:
Copy the contents of the `.pub` key into a new deploy key creatable at `Settings -> Deploy Keys -> Add Deploy Key`
###### Add private key to secrets
In order for the deployment manager to make use of the key pair it needs to be able to access the private key.  However, giving that key in plain text is bad, as anyone can use it.  So we need to add it as a secret so it can be used without plaintext exposure.
`Settings -> Deploy Keys -> Secrets` then add the contents from the non `.pub` key generated file: `gh-deploy-keys`.

It's important at this step that the secret name is the *exact* same name as that in the github action files that use it, otherwise it will not work.
