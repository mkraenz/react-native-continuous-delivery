import * as github from '@pulumi/github';
import * as pulumi from '@pulumi/pulumi';

const config = new pulumi.Config();
const repoName = config.require('repoName');
const p12Base64 = config.requireSecret('p12Base64');
const mobileProvisionBase64 = config.requireSecret('mobileProvisionBase64');
const iosTeamId = config.requireSecret('iosTeamId');
const iosCertificatePassword = config.requireSecret('iosCertificatePassword');

const repo = github.Repository.get(repoName, repoName);
export const repoIdOutput = repo.id;

const p12secret = new github.ActionsSecret('p12-base64', {
  repository: repo.name,
  secretName: 'P12_BASE64', // must match the name in gh action workflow files
  plaintextValue: p12Base64,
});
const mobileProvisionSecret = new github.ActionsSecret(
  'mobile-provision-base64',
  {
    repository: repo.name,
    secretName: 'MOBILEPROVISION_BASE64', // must match the name in gh action workflow files
    plaintextValue: mobileProvisionBase64,
  },
);
const iosTeamIdSecret = new github.ActionsSecret('ios-team-id', {
  repository: repo.name,
  secretName: 'IOS_TEAM_ID', // must match the name in gh action workflow files
  plaintextValue: iosTeamId,
});
const iosCertificatePasswordSecret = new github.ActionsSecret(
  'certificate-password',
  {
    repository: repo.name,
    secretName: 'CERTIFICATE_PASSWORD', // must match the name in gh action workflow files
    plaintextValue: iosCertificatePassword,
  },
);

// export const repoName = repo.name;
