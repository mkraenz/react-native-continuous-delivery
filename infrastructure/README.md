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
