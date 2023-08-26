# GitHub Repo Setup

```sh
mkdir infrastructure
cd infrastructure
pulumi new # then select template for github repository
# pulumi will ask you to provide the github user name and a Personal Access Token -> https://docs.github.com/en/enterprise-server@3.6/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens or click here https://github.com/settings/tokens
# for the access token choose `repo` scope (and maybe workflows???)
# comment out the repo in index.ts

pulumi config set repoName <REPO NAME>
pulumi config set --secret p12Base64 <SECRET>
pulumi config set --secret mobileProvisionBase64 <SECRET>
pulumi config set --secret iosTeamId <SECRET>
pulumi config set --secret iosCertificatePassword <SECRET>
```

```sh
gh secret set IOS_TEAM_ID
gh secret set CERTIFICATE_PASSWORD
gh secret set MOBILEPROVISION_BASE64
gh secret set P12_BASE64
```

## Upload to Google

1. Go to Google Play Console. From All Apps overview page -> Setup -> API Access.
2. Enable `Google Play Android Developer API`.
3. Create a new service account in the associated Google Cloud project (access the project via the page you are already on).
4. Remember the email of the service account. You will need it later.
5. Under tab _Keys_ -> Add Key -> Create New Key -> JSON.
6. This downloads the service-account.json file to your local machine.
7. Set the content of the file as a secret in GitHub.

   1. Note: Since this is a JSON and not a binary, we do NOT need to base64 encode it.

   ```sh
   SERVICE_ACCOUNT_JSON=$(cat typescriptteatimerncic.google-services.key.json )
   gh secret set GOOGLE_PLAY_UPLOADER_SERVICE_ACCOUNT_JSON --body $SERVICE_ACCOUNT_JSON
   ```

8. Go back to Googlee Play Console. From All Apps overview page -> Users and Permissions -> Invite new User -> Enter the email of the service account you created earlier, if you want you can also create an expiry date for security. Under heading Permissions -> App Permissions -> Add App -> enable Release apps to testing tracks -> save changes.
   1. Note: This is also were you would set "Release to production" - but let's not do that yet.
   2. Note: after saving it will say 2 permissions (view info + release to testing tracks) - this is correct.

Notes for work:

- I've set `status: completed` down to `status: draft` because in my testing app, I received the following error: `Only releases with status draft may be created on draft app.` ([pipeline](https://github.com/mkraenz/react-native-continuous-delivery/actions/runs/5975493591/job/16234028772))

### Resources

- [Add developer account users and manage permissions](https://support.google.com/googleplay/android-developer/answer/9844686?hl=en)
- [r0adkill/upload-google-play The caller does not have permission error](https://github.com/r0adkll/upload-google-play/issues/55)
