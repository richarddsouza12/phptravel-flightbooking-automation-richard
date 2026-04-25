pipeline {
  agent any


  parameters {
      choice(name: 'WORKERS', choices: ['1', '2'], description: 'Workers/Threads')
      choice(name: 'ENVIRONMENT', choices: ['dev','stage','uat'], description: 'Env to run on')
    }

  stages {

    stage('Install') {
      steps {
        bat 'npm install'
      }
    }

    stage('Run Tests') {
      steps {
         bat "set ENV=${params.ENVIRONMENT} && npx playwright test --workers=${params.WORKERS}"
      }
    }
  }

  post {
      always {
        publishHTML([
          reportDir: 'playwright-report',
          reportFiles: 'index.html',
          reportName: 'Playwright Report',
          keepAll: true,
          alwaysLinkToLastBuild: true,
          allowMissing: true
        ])
      }
    }
  }