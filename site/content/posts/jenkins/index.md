---
title: "Jenkins"
date: 2020-04-05T13:39:36+02:00
draft: false
tags: ["Jenkins", "s3"]
summaryImage: "jenkins.png"
keepImageRatio: true
summary: "A Jenkins adventure to publish to S3"
resources:
- src: jenkins.png
---

# Deploy to S3 from a Jenkinsfile

I first tried to write a node script, using the S3 API, building all the files and later uploading them via the script:

```
stage('Deploy on S3') {
    withCredentials([usernamePassword(
        credentialsId: 'AWS_',
        usernameVariable: 'AWS_ACCESS_KEY_ID',
        passwordVariable: 'AWS_SECRET_ACCESS_KEY')
    ]) {
    sh "npm run publish:s3"
    }
}
```

This was good, because it required minimum meddling with Jenkins.
But it turns out this is very impractical, as old files never get deleted this way.

I ended up using AWS cli, as it has a `sync` command, with a `delete` option: exactly what I neded!

Dropping the credentials in the environment worked without any additional config too.

```
stage('install AWS cli') {
    steps {
        sh 'curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"'
        sh "unzip awscliv2.zip"
        sh "./aws/install -i ${env.JENKINS_HOME}/aws-cli -b ${env.JENKINS_HOME}/bin"
   }
}
stage('Deploy on S3') {
    withCredentials([usernamePassword(
        credentialsId: 'AWS_',
        usernameVariable: 'AWS_ACCESS_KEY_ID',
        passwordVariable: 'AWS_SECRET_ACCESS_KEY')
    ]) {
        sh "${env.JENKINS_HOME}/bin/aws --region eu-west-1 s3 sync dist/ s3://projectbucket/ --delete"
    }
}
````
