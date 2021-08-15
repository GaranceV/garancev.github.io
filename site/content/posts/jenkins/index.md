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

At work, whenever I start a new code repository for a new project, I'm responsible for everything about it, including its deployment.
Our systems team makes it easy enough in principle: I just have to write a working `Jenkinsfile`, and it works!

The systems team is codeowner of all the Jenkinsfiles throughout our GitHub, meaning we can't change them without their approval.
And of course, there are a lot less System developers than application developers...
So I try to always write the most minimal `Jenkinsfile`, and keep as much code as possible in files that I own myself. In practice, that means using the Jenkinsfile simply for calling a script, and doing whatever I want in that script!

The other day, I had a very simple frontend app to deploy on S3.
With this in mind, I first took the most straightforward road (for me!) and wrote all the deploy code in a node script, using the S3 JS API:

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

This was good, because it required minimum meddling with Jenkins!
However, it turned out the S3 JS API gives waaay too much freedom compares to the AWS cli.
The main problem I encountered with my script was that old files never got deleted, so my bucket kept growing.
Deleting the old files first in my script would have implied some downtime on my app, in the interval where new files are not uploaded yet, or some too-complicated-to-be-worth-it juggling between different folders and versioning.

It turns out, the AWS cli had the solution already! It has a `sync` command, with a `delete` option: exactly what I neded!

I ended up with just one extra stage, installing the AWS cli first:

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
```

Dropping the credentials in the environment worked without any additional config too.

Now you know what's the best way to publish compiled assets to an S3 bucket, using the AWS cli!